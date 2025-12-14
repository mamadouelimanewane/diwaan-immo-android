import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { createUser } from '@/lib/auth';
import { registerSchema } from '@/lib/validators';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    // TEMPORARY MOCK FOR DEPLOYMENT
    return NextResponse.json({
        success: true,
        user: { id: 'mock-user-new', name: 'New User', email: 'new@diwaan.sn', role: 'USER' },
        token: 'mock-jwt-token-new',
        message: 'Compte créé avec succès (Mock)',
    });

    /*
    try {
        const body = await request.json();

        // Validation
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.errors },
                { status: 400 }
            );
        }

        // Vérifier si email existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email: validation.data.email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Cet email est déjà utilisé' },
                { status: 400 }
            );
        }

        // Créer utilisateur
        const { user, token } = await createUser(validation.data);

        return NextResponse.json(
            {
                success: true,
                user,
                token,
                message: 'Compte créé avec succès',
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Register error:', error);
        return NextResponse.json(
            { error: error.message || 'Erreur lors de la création du compte' },
            { status: 500 }
        );
    }
    */
}
