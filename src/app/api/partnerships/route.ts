import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/partnerships - Liste tous les partenariats
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const developerId = searchParams.get('developerId');
        const agencyId = searchParams.get('agencyId');

        const partnerships = await prisma.partnership.findMany({
            where: {
                ...(status && { status: status as any }),
                ...(developerId && { developerId }),
                ...(agencyId && { agencyId }),
            },
            orderBy: { createdAt: 'desc' },
            include: {
                developer: {
                    select: {
                        legalName: true,
                        email: true,
                        phone: true,
                    },
                },
                agency: {
                    select: {
                        legalName: true,
                        email: true,
                        phone: true,
                    },
                },
                clauses: {
                    orderBy: { order: 'asc' },
                },
                plots: {
                    select: {
                        status: true,
                    },
                },
                _count: {
                    select: {
                        clauses: true,
                        plots: true,
                    },
                },
            },
        });

        // Calculer statistiques pour chaque partenariat
        const partnershipsWithStats = partnerships.map(p => ({
            ...p,
            stats: {
                availablePlots: p.plots.filter(plot => plot.status === 'AVAILABLE').length,
                reservedPlots: p.plots.filter(plot => plot.status === 'RESERVED').length,
                soldPlots: p.plots.filter(plot => plot.status === 'SOLD').length,
            },
        }));

        return NextResponse.json({
            success: true,
            partnerships: partnershipsWithStats,
            count: partnerships.length,
        });
    } catch (error) {
        console.error('Error fetching partnerships:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des partenariats' },
            { status: 500 }
        );
    }
}

// POST /api/partnerships - Créer un nouveau partenariat
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            developerId,
            agencyId,
            startDate,
            endDate,
            initialDuration,
            autoRenewal = true,
            renewalPeriod = 12,
            exclusive = false,
            cashDiscountRate = 5,
            priceRevisionPeriod = 3,
            minDownPaymentRate = 50,
            notificationDelay = 24,
            documentDelay = 72,
            refundDelay = 90,
            defaultPaymentThreshold = 3,
            cancellationNoticePeriod = 60,
            clauses = [],
        } = body;

        // Validation
        if (!developerId || !agencyId || !startDate || !endDate) {
            return NextResponse.json(
                { success: false, error: 'Champs obligatoires manquants' },
                { status: 400 }
            );
        }

        // Générer numéro de contrat
        const developer = await prisma.developer.findUnique({
            where: { id: developerId },
            select: { legalName: true },
        });

        const agency = await prisma.realEstateAgency.findUnique({
            where: { id: agencyId },
            select: { legalName: true },
        });

        const year = new Date().getFullYear();
        const contractNumber = `${developer?.legalName.substring(0, 3).toUpperCase()}-${agency?.legalName.substring(0, 3).toUpperCase()}-${year}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

        // Créer le partenariat
        const partnership = await prisma.partnership.create({
            data: {
                developerId,
                agencyId,
                contractNumber,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                initialDuration,
                autoRenewal,
                renewalPeriod,
                exclusive,
                cashDiscountRate,
                priceRevisionPeriod,
                minDownPaymentRate,
                notificationDelay,
                documentDelay,
                refundDelay,
                defaultPaymentThreshold,
                cancellationNoticePeriod,
                status: 'DRAFT',
            },
        });

        // Créer les clauses si fournies
        if (clauses.length > 0) {
            await prisma.contractClause.createMany({
                data: clauses.map((clause: any, index: number) => ({
                    partnershipId: partnership.id,
                    articleNumber: clause.articleNumber || `Article ${index + 1}`,
                    title: clause.title,
                    content: clause.content,
                    order: clause.order || index + 1,
                    category: clause.category || 'GENERAL',
                    mandatory: clause.mandatory !== false,
                })),
            });
        }

        return NextResponse.json(
            {
                success: true,
                partnership,
                message: 'Partenariat créé avec succès',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating partnership:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création du partenariat' },
            { status: 500 }
        );
    }
}
