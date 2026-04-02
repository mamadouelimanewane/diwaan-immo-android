import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { analyzeLegalDocument } from '@/lib/ai-document-parser'; 

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const category = formData.get('category') as string;
        const projectId = formData.get('projectId') as string;
        const uploadedBy = formData.get('uploadedBy') as string || 'system';

        if (!file) {
            return NextResponse.json({ success: false, error: "Aucun fichier détecté" }, { status: 400 });
        }

        // ========================================================
        // 1. CLOUDINARY UPLOAD LOGIC
        // ========================================================
        // Conversion du fichier en buffer pour Cloudinary
        // const arrayBuffer = await file.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);
        // 
        // const uploadResult = await new Promise((resolve, reject) => {
        //     cloudinary.uploader.upload_stream({ folder: 'diwaan/vault' }, (error, result) => {
        //         if (error) reject(error);
        //         else resolve(result);
        //     }).end(buffer);
        // });
        // const fileUrl = uploadResult.secure_url;
        const fileUrl = `https://res.cloudinary.com/diwaan/image/upload/v_simulated/${file.name.replace(/\s+/g, '_')}`;

        // ========================================================
        // 2. OPEN AI ANALYSIS (Vérification et Sécurité)
        // ========================================================
        const aiAudit = await analyzeLegalDocument(file);

        // ========================================================
        // 3. DATABASE COMMIT
        // ========================================================
        const vaultDocument = await prisma.projectComplianceDocument.create({
            data: {
                title: file.name,
                category: category as any,
                fileUrl: fileUrl,
                fileSize: file.size / (1024 * 1024), // en MB
                status: aiAudit.isValid ? 'VALIDATED' : 'REJECTED',
                rejectionReason: aiAudit.isValid ? null : aiAudit.rejectionReason,
                authority: aiAudit.extractedAuthority,
                expirationDate: aiAudit.expirationDate ? new Date(aiAudit.expirationDate) : null,
                aiVerificationLog: aiAudit.rawLog,
                projectId: projectId,
                uploadedBy: uploadedBy,
            }
        });

        // 4. (Optionnel) Envoi d'une alerte Twilio/Resend ici si le document expire bientôt ou est rejeté.

        return NextResponse.json({ 
            success: true, 
            document: vaultDocument,
            audit: aiAudit 
        });

    } catch (error: any) {
        console.error("Vault Upload Error:", error);
        return NextResponse.json({ success: false, error: 'Erreur Serveur Interne' }, { status: 500 });
    }
}
