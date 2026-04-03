import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// GET /api/reservations - Liste des réservations
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const agencyId = searchParams.get('agencyId');
        const developerId = searchParams.get('developerId');
        const status = searchParams.get('status');
        const plotId = searchParams.get('plotId');

        const where: any = {};
        if (agencyId) where.agencyId = agencyId;
        if (developerId) where.developerId = developerId;
        if (status) where.status = status;
        if (plotId) where.plotId = plotId;

        const reservations = await prisma.plotReservation.findMany({
            where,
            include: {
                plot: {
                    select: {
                        plotNumber: true,
                        block: true,
                        surfaceArea: true,
                        project: { select: { name: true, location: true } },
                    },
                },
                agency: { select: { legalName: true } },
                agent: { select: { firstName: true, lastName: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            success: true,
            reservations,
            count: reservations.length,
        });
    } catch (error: any) {
        console.error('Reservations API error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération', details: error.message },
            { status: 500 }
        );
    }
}

// POST /api/reservations - Créer une réservation
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

        const reservation = await prisma.plotReservation.create({
            data: body,
            include: {
                plot: {
                    select: {
                        plotNumber: true,
                        block: true,
                        project: { select: { name: true } },
                    },
                },
                agency: { select: { legalName: true } },
            },
        });

        return NextResponse.json({ success: true, reservation }, { status: 201 });
    } catch (error: any) {
        console.error('Create reservation error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création', details: error.message },
            { status: 500 }
        );
    }
}
