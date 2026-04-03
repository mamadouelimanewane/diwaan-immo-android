import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// GET /api/reservations/[id] - Obtenir les détails d'une réservation
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const reservation = await prisma.plotReservation.findUnique({
            where: { id: params.id },
            include: {
                plot: {
                    include: {
                        project: true,
                        developer: true,
                    }
                },
                agency: true,
                agent: true,
                payments: {
                    orderBy: { paymentDate: 'desc' }
                }
            }
        });

        if (!reservation) {
            return NextResponse.json({ success: false, error: 'Réservation non trouvée' }, { status: 404 });
        }

        return NextResponse.json({ success: true, reservation });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PATCH /api/reservations/[id] - Mettre à jour une réservation (Statut, Validation, etc.)
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { status, cancellationReason, cancellationType } = body;

        // Si on valide ou annule, il faut peut-être mettre à jour le statut de la parcelle
        const currentReservation = await prisma.plotReservation.findUnique({
            where: { id: params.id },
            select: { plotId: true, status: true }
        });

        if (!currentReservation) {
            return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 });
        }

        const data: any = { ...body };
        if (status === 'VALIDATED') data.validatedAt = new Date();
        if (status === 'COMPLETED') data.completedAt = new Date();
        if (status === 'CANCELLED') data.cancelledAt = new Date();

        const updatedReservation = await prisma.plotReservation.update({
            where: { id: params.id },
            data,
        });

        // Logique de stock parcelle (Simplifiée)
        if (status === 'CANCELLED') {
            await prisma.developerPlot.update({
                where: { id: currentReservation.plotId },
                data: { status: 'AVAILABLE', reservedAt: null }
            });
        } else if (status === 'VALIDATED' || status === 'COMPLETED') {
            await prisma.developerPlot.update({
                where: { id: currentReservation.plotId },
                data: { status: status === 'COMPLETED' ? 'SOLD' : 'RESERVED' }
            });
        }

        return NextResponse.json({ success: true, reservation: updatedReservation });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
