import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculatePlotPrice } from '@/lib/pricing-calculator';

// POST /api/reservations/calculate-price - Calculer le prix avant réservation
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { plotId, agentId, paymentType } = body;

        if (!plotId || !paymentType) {
            return NextResponse.json(
                { success: false, error: 'plotId et paymentType sont requis' },
                { status: 400 }
            );
        }

        // Vérifier que la parcelle est disponible
        const plot = await prisma.developerPlot.findUnique({
            where: { id: plotId },
            include: {
                project: { select: { name: true } },
                agency: { select: { legalName: true } },
            },
        });

        if (!plot) {
            return NextResponse.json(
                { success: false, error: 'Parcelle non trouvée' },
                { status: 404 }
            );
        }

        if (plot.status !== 'AVAILABLE') {
            return NextResponse.json(
                { success: false, error: `Parcelle non disponible (statut: ${plot.status})` },
                { status: 400 }
            );
        }

        // Calculer le prix
        const calculation = await calculatePlotPrice({
            plotId,
            agentId,
            paymentType: paymentType as 'CASH' | 'INSTALLMENT',
        });

        return NextResponse.json({
            success: true,
            calculation,
            plot: {
                id: plot.id,
                plotNumber: plot.plotNumber,
                block: plot.block,
                project: plot.project.name,
                agency: plot.agency?.legalName,
            },
        });
    } catch (error) {
        console.error('Error calculating price:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors du calcul du prix' },
            { status: 500 }
        );
    }
}
