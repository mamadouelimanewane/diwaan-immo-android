import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/developers - Liste tous les promoteurs
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const developers = await prisma.developer.findMany({
            where: status ? { status: status as any } : {},
            orderBy: { createdAt: 'desc' },
            include: {
                projects: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
                partnerships: {
                    select: {
                        id: true,
                        contractNumber: true,
                        status: true,
                        agency: {
                            select: {
                                legalName: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        projects: true,
                        partnerships: true,
                        plots: true,
                        sales: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            developers,
            count: developers.length,
        });
    } catch (error) {
        console.error('Error fetching developers:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des promoteurs' },
            { status: 500 }
        );
    }
}

// POST /api/developers - Créer un nouveau promoteur
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
            phone,
            email,
            website,
            representativeName,
            representativeTitle,
            representativePhone,
            representativeEmail,
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

        // Vérifier unicité RCCM et NINEA
        const existing = await prisma.developer.findFirst({
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
                { success: false, error: 'Un promoteur avec ce RCCM, NINEA ou email existe déjà' },
                { status: 409 }
            );
        }

        const developer = await prisma.developer.create({
            data: {
                legalName,
                tradeName,
                rccm,
                ninea,
                address,
                city,
                phone,
                email,
                website,
                representativeName,
                representativeTitle,
                representativePhone,
                representativeEmail,
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
                developer,
                message: 'Promoteur créé avec succès',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating developer:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création du promoteur' },
            { status: 500 }
        );
    }
}
