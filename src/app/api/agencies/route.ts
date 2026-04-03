import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/agencies - Liste des agences
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const id = searchParams.get('id');

        const where: any = {};
        if (status) where.status = status;
        if (id) where.id = id;

        const agencies = await prisma.realEstateAgency.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            success: true,
            agencies,
            count: agencies.length,
        });
    } catch (error: any) {
        console.error('Agencies API error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des agences', details: error.message },
            { status: 500 }
        );
    }
}

// POST /api/agencies - Créer une agence
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const agency = await prisma.realEstateAgency.create({
            data: body,
        });

        return NextResponse.json({ success: true, agency }, { status: 201 });
    } catch (error: any) {
        console.error('Create agency error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création', details: error.message },
            { status: 500 }
        );
    }
}
