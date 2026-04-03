import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// GET /api/partnerships - Liste des partenariats
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const developerId = searchParams.get('developerId');
        const agencyId = searchParams.get('agencyId');

        const where: any = {};
        if (status) where.status = status;
        if (developerId) where.developerId = developerId;
        if (agencyId) where.agencyId = agencyId;

        const partnerships = await prisma.partnership.findMany({
            where,
            include: {
                developer: { select: { legalName: true, tradeName: true } },
                agency: { select: { legalName: true, tradeName: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            success: true,
            partnerships,
            count: partnerships.length,
        });
    } catch (error: any) {
        console.error('Partnerships API error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération', details: error.message },
            { status: 500 }
        );
    }
}

// POST /api/partnerships - Créer un partenariat
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

        const partnership = await prisma.partnership.create({
            data: body,
            include: {
                developer: { select: { legalName: true } },
                agency: { select: { legalName: true } },
            },
        });

        return NextResponse.json({ success: true, partnership }, { status: 201 });
    } catch (error: any) {
        console.error('Create partnership error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création', details: error.message },
            { status: 500 }
        );
    }
}
