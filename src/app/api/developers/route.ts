import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// GET /api/developers - Liste des promoteurs
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const id = searchParams.get('id');

        const where: any = {};
        if (status) where.status = status;
        if (id) where.id = id;

        const developers = await prisma.developer.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            success: true,
            developers,
            count: developers.length,
        });
    } catch (error: any) {
        console.error('Developers API error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération', details: error.message },
            { status: 500 }
        );
    }
}

// POST /api/developers - Créer un promoteur
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }
        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 401 });
        }

        const body = await request.json();

        const developer = await prisma.developer.create({ data: body });

        return NextResponse.json({ success: true, developer }, { status: 201 });
    } catch (error: any) {
        console.error('Create developer error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création', details: error.message },
            { status: 500 }
        );
    }
}
