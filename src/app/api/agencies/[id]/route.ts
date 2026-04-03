import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// GET /api/agencies/[id] - Obtenir les détails d'une agence
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const agency = await prisma.realEstateAgency.findUnique({
            where: { id: params.id },
            include: {
                _count: {
                    select: {
                        agents: true,
                        partnerships: true,
                        plots: true,
                        reservations: true,
                    }
                }
            }
        });

        if (!agency) {
            return NextResponse.json({ success: false, error: 'Agence non trouvée' }, { status: 404 });
        }

        return NextResponse.json({ success: true, agency });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PATCH /api/agencies/[id] - Mettre à jour une agence
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const agency = await prisma.realEstateAgency.update({
            where: { id: params.id },
            data: body,
        });

        return NextResponse.json({ success: true, agency });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE /api/agencies/[id] - Supprimer une agence
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.realEstateAgency.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true, message: 'Agence supprimée avec succès' });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
