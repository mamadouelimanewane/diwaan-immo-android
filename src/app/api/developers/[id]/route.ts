import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/developers/[id] - Récupérer un promoteur
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const developer = await prisma.developer.findUnique({
            where: { id: params.id },
            include: {
                projects: {
                    include: {
                        _count: {
                            select: {
                                plots: true,
                            },
                        },
                    },
                },
                partnerships: {
                    include: {
                        agency: {
                            select: {
                                id: true,
                                legalName: true,
                                email: true,
                                phone: true,
                            },
                        },
                    },
                },
                plots: {
                    select: {
                        status: true,
                    },
                },
                sales: {
                    select: {
                        totalPaid: true,
                        cessionAmount: true,
                    },
                },
            },
        });

        if (!developer) {
            return NextResponse.json(
                { success: false, error: 'Promoteur non trouvé' },
                { status: 404 }
            );
        }

        // Calculer statistiques
        const stats = {
            totalPlots: developer.plots.length,
            availablePlots: developer.plots.filter(p => p.status === 'AVAILABLE').length,
            reservedPlots: developer.plots.filter(p => p.status === 'RESERVED').length,
            soldPlots: developer.plots.filter(p => p.status === 'SOLD').length,
            totalRevenue: developer.sales.reduce((sum, s) => sum + s.cessionAmount, 0),
        };

        return NextResponse.json({
            success: true,
            developer: {
                ...developer,
                stats,
            },
        });
    } catch (error) {
        console.error('Error fetching developer:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération du promoteur' },
            { status: 500 }
        );
    }
}

// PUT /api/developers/[id] - Modifier un promoteur
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const developer = await prisma.developer.update({
            where: { id: params.id },
            data: body,
        });

        return NextResponse.json({
            success: true,
            developer,
            message: 'Promoteur modifié avec succès',
        });
    } catch (error) {
        console.error('Error updating developer:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la modification du promoteur' },
            { status: 500 }
        );
    }
}

// DELETE /api/developers/[id] - Supprimer un promoteur
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.developer.delete({
            where: { id: params.id },
        });

        return NextResponse.json({
            success: true,
            message: 'Promoteur supprimé avec succès',
        });
    } catch (error) {
        console.error('Error deleting developer:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression du promoteur' },
            { status: 500 }
        );
    }
}
