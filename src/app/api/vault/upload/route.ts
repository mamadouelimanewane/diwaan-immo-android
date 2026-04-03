import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib/prisma';
import { analyzeLegalDocument } from '@/lib/ai-document-parser';

export const dynamic = 'force-dynamic';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'df4ukakpy',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const category = formData.get('category') as string;
        const projectId = formData.get('projectId') as string;
        const uploadedBy = (formData.get('uploadedBy') as string) || 'system';

        if (!file) return NextResponse.json({ success: false, error: 'Aucun fichier détecté' }, { status: 400 });
        if (!category) return NextResponse.json({ success: false, error: 'Catégorie obligatoire' }, { status: 400 });
        if (!projectId) return NextResponse.json({ success: false, error: 'projectId obligatoire' }, { status: 400 });

        // 1. UPLOAD CLOUDINARY RÉEL
        let fileUrl: string;
        const fileType = file.type;

        if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: `diwaan/vault/${projectId}`, resource_type: 'auto', tags: ['vault', category.toLowerCase()] },
                    (error, result) => { if (error) reject(error); else resolve(result as any); }
                );
                stream.end(buffer);
            });
            fileUrl = uploadResult.secure_url;
        } else {
            fileUrl = `https://res.cloudinary.com/df4ukakpy/raw/upload/diwaan/vault/${projectId}/${file.name.replace(/\s+/g, '_')}`;
            console.warn('Cloudinary non configuré - URL simulée');
        }

        // 2. ANALYSE IA
        const aiAudit = await analyzeLegalDocument(file);

        // 3. SAUVEGARDE
        const vaultDocument = await prisma.projectComplianceDocument.create({
            data: {
                title: file.name,
                category: category as any,
                fileUrl,
                fileSize: file.size / (1024 * 1024),
                fileType,
                status: aiAudit.isValid ? 'VALIDATED' : 'REJECTED',
                rejectionReason: aiAudit.isValid ? null : aiAudit.rejectionReason,
                authority: aiAudit.extractedAuthority,
                expirationDate: aiAudit.expirationDate ? new Date(aiAudit.expirationDate) : null,
                aiVerificationLog: aiAudit.rawLog,
                projectId,
                uploadedBy,
            },
        });

        // 4. ALERTES (rejet ou expiration proche)
        const expiringSoon = aiAudit.expirationDate
            ? (new Date(aiAudit.expirationDate).getTime() - Date.now()) / 86400000 <= 30
            : false;

        if (!aiAudit.isValid || expiringSoon) {
            await sendVaultAlert({ projectId, fileName: file.name, isValid: aiAudit.isValid, reason: aiAudit.rejectionReason, expirationDate: aiAudit.expirationDate });
        }

        return NextResponse.json({
            success: true,
            document: vaultDocument,
            audit: aiAudit,
            message: aiAudit.isValid ? 'Document uploadé et validé' : `Document rejeté : ${aiAudit.rejectionReason}`,
        });
    } catch (error: any) {
        console.error('Vault Upload Error:', error);
        return NextResponse.json({ success: false, error: 'Erreur serveur', details: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const where: any = {};
        const projectId = searchParams.get('projectId');
        const category = searchParams.get('category');
        const status = searchParams.get('status');
        if (projectId) where.projectId = projectId;
        if (category) where.category = category;
        if (status) where.status = status;

        const documents = await prisma.projectComplianceDocument.findMany({ where, orderBy: { createdAt: 'desc' } });
        return NextResponse.json({ success: true, documents, count: documents.length });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

async function sendVaultAlert(params: { projectId: string; fileName: string; isValid: boolean; reason?: string; expirationDate?: string | null }) {
    const { projectId, fileName, isValid, reason, expirationDate } = params;
    const subject = isValid ? `Vault: Document expire bientôt - ${fileName}` : `Vault: Document REJETÉ - ${fileName}`;
    const body = isValid
        ? `Le document ${fileName} du projet ${projectId} expire le ${expirationDate}. Veuillez le renouveler.`
        : `Le document ${fileName} du projet ${projectId} a été rejeté. Raison: ${reason || 'Non conforme'}`;

    const resendKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'mamadouelimane.dia@gmail.com';
    if (resendKey?.startsWith('re_')) {
        try {
            const { Resend } = await import('resend');
            await new Resend(resendKey).emails.send({
                from: 'Diwaan Vault <onboarding@resend.dev>',
                to: adminEmail,
                subject,
                html: `<p>${body}</p>`,
            });
        } catch (e) { console.warn('Resend vault alert failed:', e); }
    }

    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const adminWA = process.env.ADMIN_WHATSAPP_NUMBER;
    const from = process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886';
    if (sid && token && adminWA) {
        try {
            const twilio = require('twilio')(sid, token);
            await twilio.messages.create({ from: `whatsapp:${from}`, to: `whatsapp:${adminWA}`, body: `[Diwaan Vault] ${body}` });
        } catch (e) { console.warn('Twilio vault alert failed:', e); }
    }
}
