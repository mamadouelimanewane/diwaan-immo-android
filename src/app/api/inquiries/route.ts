import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

// Lazy import prisma to avoid build-time errors
let prisma: any;
try {
    prisma = require('@/lib/prisma').prisma;
} catch (e) {
    console.warn('Prisma not available for inquiries API');
}

export async function POST(request: Request) {
    try {
        // Check if we're in build phase - return mock response
        if (process.env.NEXT_PHASE === 'phase-production-build' || !prisma) {
            return NextResponse.json(
                { success: true, inquiry: { id: 'mock' } },
                { status: 201 }
            );
        }

        const body = await request.json();
        const { name, email, phone, message, propertyId } = body;

        // Minimal validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Champs obligatoires manquants (nom, email, message)' },
                { status: 400 }
            );
        }

        const inquiry = await prisma.propertyInquiry.create({
            data: {
                name,
                email,
                phone,
                message,
                propertyId: propertyId || "unknown",
            },
        });

        // Send email notification (uniquement si Resend est configuré)
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey && resendApiKey.startsWith('re_')) {
            try {
                const { Resend } = await import('resend');
                const resend = new Resend(resendApiKey);
                await resend.emails.send({
                    from: 'Diwaan Immo <onboarding@resend.dev>',
                    to: 'mamadouelimane.dia@gmail.com',
                    subject: `Nouvelle demande pour le bien: ${propertyId || "Inconnu"}`,
                    html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h2>Nouvelle demande de contact</h2>
                        <p>Vous avez reçu un nouveau message via le formulaire de contact.</p>
                        
                        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>Nom:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</p>
                            <p><strong>Bien concerné (ID):</strong> ${propertyId || 'Non spécifié'}</p>
                        </div>

                        <h3>Message:</h3>
                        <p style="white-space: pre-wrap; background-color: white; padding: 10px; border: 1px solid #ddd;">${message}</p>
                    </div>
                `
                });
                console.log('✅ Email envoyé avec succès');
            } catch (emailError) {
                console.error("❌ Erreur lors de l'envoi de l'email :", emailError);
                // We continue even if email fails, as the DB save was successful
            }
        } else {
            console.log('⚠️ Resend non configuré - email non envoyé (configurez RESEND_API_KEY)');
        }

        return NextResponse.json(
            { success: true, inquiry },
            { status: 201 }
        );
    } catch (error) {
        console.error('❌ Error creating inquiry:', error);
        return NextResponse.json(
            { error: 'Erreur lors de l\'envoi du message' },
            { status: 500 }
        );
    }
}
