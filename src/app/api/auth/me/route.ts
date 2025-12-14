import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    if (process.env.NEXT_PHASE === 'phase-production-build') {
        return NextResponse.json({ success: true, user: null });
    }

    try {
        // MOCK FOR DEPLOYMENT SAFETY
        return NextResponse.json({ success: false, error: 'Auth service temporary unavailable during deployment' }, { status: 503 });

        /*
        // Build safety: simple check
        try {
            await prisma.$queryRaw`SELECT 1`;
        } catch (e) {
            console.warn('DB check failed in /api/auth/me');
            return NextResponse.json({ success: false, error: 'Database unavailable' }, { status: 503 });
        }

        // Extraire le token du header Authorization
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json(
                { error: 'Token manquant. Veuillez vous connecter.' },
                { status: 401 }
            );
        }

        // Vérifier le token
        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: 'Token invalide ou expiré' },
                { status: 401 }
            );
        }

        // Récupérer l'utilisateur
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                avatar: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Utilisateur non trouvé' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user,
        });
        */
    } catch (error: any) {
        console.error('Get current user error:', error);
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        );
    }
}
