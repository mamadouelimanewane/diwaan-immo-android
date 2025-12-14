import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/projects - Liste tous les projets
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const developerId = searchParams.get('developerId');
        const status = searchParams.get('status');

        const projects = await prisma.developerProject.findMany({
            where: {
                ...(developerId && { developerId }),
                ...(status && { status: status as any }),
            },
            orderBy: { createdAt: 'desc' },
            include: {
                developer: {
                    select: {
                        legalName: true,
                    },
                },
                plots: {
                    select: {
                        status: true,
                        surfaceArea: true,
                    },
                },
                plotTypeConfigs: true,
                _count: {
                    select: {
                        plots: true,
                        plotTypeConfigs: true,
                    },
                },
            },
        });

        // Calculer statistiques
        const projectsWithStats = projects.map(project => {
            const plots = project.plots;
            return {
                ...project,
                stats: {
                    totalPlots: plots.length,
                    availablePlots: plots.filter(p => p.status === 'AVAILABLE').length,
                    reservedPlots: plots.filter(p => p.status === 'RESERVED').length,
                    soldPlots: plots.filter(p => p.status === 'SOLD').length,
                    totalSurface: plots.reduce((sum, p) => sum + p.surfaceArea, 0),
                },
            };
        });

        return NextResponse.json({
            success: true,
            projects: projectsWithStats,
            count: projects.length,
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des projets' },
            { status: 500 }
        );
    }
}

// POST /api/projects - Créer un nouveau projet
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            developerId,
            name,
            description,
            location,
            commune,
            city,
            region,
            totalPlots,
            status = 'PLANNING',
            plannedStartDate,
            plotTypes = [],
        } = body;

        // Validation
        if (!developerId || !name || !location || !city) {
            return NextResponse.json(
                { success: false, error: 'Champs obligatoires manquants' },
                { status: 400 }
            );
        }

        // Créer le projet
        const project = await prisma.developerProject.create({
            data: {
                developerId,
                name,
                description,
                location,
                commune: commune || city,
                city,
                region: region || 'Dakar',
                totalPlots: totalPlots || 0,
                availablePlots: 0,
                status: status as any,
                plannedStartDate: plannedStartDate ? new Date(plannedStartDate) : null,
            },
        });

        // Créer les types de parcelles par défaut si fournis
        if (plotTypes.length > 0) {
            await prisma.plotTypeConfig.createMany({
                data: plotTypes.map((type: any, index: number) => ({
                    projectId: project.id,
                    code: type.code,
                    name: type.name,
                    description: type.description,
                    basePrice: type.basePrice,
                    features: type.features || [],
                    displayOrder: index,
                    active: true,
                })),
            });
        }

        return NextResponse.json(
            {
                success: true,
                project,
                message: 'Projet créé avec succès',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création du projet' },
            { status: 500 }
        );
    }
}
