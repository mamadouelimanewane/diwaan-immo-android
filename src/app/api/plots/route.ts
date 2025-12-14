import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/plots - Liste toutes les parcelles
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');
        const agencyId = searchParams.get('agencyId');
        const status = searchParams.get('status');

        const plots = await prisma.developerPlot.findMany({
            where: {
                ...(projectId && { projectId }),
                ...(agencyId && { agencyId }),
                ...(status && { status: status as any }),
            },
            orderBy: { plotNumber: 'asc' },
            include: {
                project: {
                    select: {
                        name: true,
                        location: true,
                    },
                },
                developer: {
                    select: {
                        legalName: true,
                    },
                },
                agency: {
                    select: {
                        legalName: true,
                    },
                },
                plotTypeConfig: {
                    select: {
                        code: true,
                        name: true,
                        basePrice: true,
                    },
                },
                reservation: {
                    select: {
                        reservationNumber: true,
                        clientFirstName: true,
                        clientLastName: true,
                        status: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            plots,
            count: plots.length,
        });
    } catch (error) {
        console.error('Error fetching plots:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des parcelles' },
            { status: 500 }
        );
    }
}

// POST /api/plots - Créer des parcelles
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { plots } = body;

        if (!plots || !Array.isArray(plots) || plots.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Liste de parcelles requise' },
                { status: 400 }
            );
        }

        // Créer les parcelles
        const result = await prisma.developerPlot.createMany({
            data: plots.map((plot: any) => ({
                projectId: plot.projectId,
                developerId: plot.developerId,
                partnershipId: plot.partnershipId,
                agencyId: plot.agencyId,
                plotTypeConfigId: plot.plotTypeConfigId,
                plotNumber: plot.plotNumber,
                block: plot.block,
                lotNumber: plot.lotNumber,
                surfaceArea: plot.surfaceArea,
                status: 'AVAILABLE',
            })),
        });

        // Mettre à jour le compteur du projet
        if (plots.length > 0 && plots[0].projectId) {
            await prisma.developerProject.update({
                where: { id: plots[0].projectId },
                data: {
                    availablePlots: {
                        increment: result.count,
                    },
                },
            });
        }

        return NextResponse.json(
            {
                success: true,
                count: result.count,
                message: `${result.count} parcelles créées avec succès`,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating plots:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création des parcelles' },
            { status: 500 }
        );
    }
}
