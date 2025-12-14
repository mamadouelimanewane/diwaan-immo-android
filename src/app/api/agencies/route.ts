import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/agencies - Liste toutes les agences
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const agencies = await prisma.realEstateAgency.findMany({
            where: status ? { status: status as any } : {},
            orderBy: { createdAt: 'desc' },
            include: {
                agents: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        status: true,
                        totalSales: true,
                    },
                },
                partnerships: {
                    select: {
                        id: true,
                        contractNumber: true,
                        status: true,
                        developer: {
                            select: {
                                legalName: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        agents: true,
                        partnerships: true,
                        plots: true,
                        reservations: true,
                        sales: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            agencies,
            count: agencies.length,
        });
    } catch (error) {
        console.error('Error fetching agencies:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des agences' },
            { status: 500 }
        );
    }
}

// POST /api/agencies - Créer une nouvelle agence
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            legalName,
            tradeName,
            rccm,
            ninea,
            address,
            city,
            floor,
            phone,
            email,
            website,
            directorName,
            directorTitle,
            directorPhone,
            directorEmail,
            bankName,
            iban,
            accountNumber,
        } = body;

        // Validation
        if (!legalName || !rccm || !ninea || !email) {
            return NextResponse.json(
                { success: false, error: 'Champs obligatoires manquants' },
                { status: 400 }
            );
        }

        // Vérifier unicité
        const existing = await prisma.realEstateAgency.findFirst({
            where: {
                OR: [
                    { rccm },
                    { ninea },
                    { email },
                ],
            },
        });

        if (existing) {
            return NextResponse.json(
                { success: false, error: 'Une agence avec ce RCCM, NINEA ou email existe déjà' },
                { status: 409 }
            );
        }

        const agency = await prisma.realEstateAgency.create({
            data: {
                legalName,
                tradeName,
                rccm,
                ninea,
                address,
                city,
                floor,
                phone,
                email,
                website,
                directorName,
                directorTitle,
                directorPhone,
                directorEmail,
                bankName,
                iban,
                accountNumber,
                status: 'ACTIVE',
                verifiedAt: new Date(),
            },
        });

        return NextResponse.json(
            {
                success: true,
                agency,
                message: 'Agence créée avec succès',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating agency:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création de l\'agence' },
            { status: 500 }
        );
    }
}
