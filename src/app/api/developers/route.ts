import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Lazy import prisma
let prisma: any;
try {
    prisma = require('@/lib/prisma').prisma;
} catch (e) {
    console.warn('Prisma not available for developers API');
}

// GET /api/developers - Liste des promoteurs
export async function GET(request: NextRequest) {
    try {
        if (process.env.NEXT_PHASE === 'phase-production-build' || !prisma) {
            return getMockDevelopers();
        }

        const developers = await prisma.developer.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            developers,
            count: developers.length
        });

    } catch (error) {
        console.error('Developers API error:', error);
        return getMockDevelopers();
    }
}

// POST /api/developers - Créer un promoteur
export async function POST(request: NextRequest) {
    try {
        if (!prisma) {
            return NextResponse.json({
                error: 'Service indisponible'
            }, { status: 503 });
        }

        const body = await request.json();

        const developer = await prisma.developer.create({
            data: body
        });

        return NextResponse.json({
            success: true,
            developer
        }, { status: 201 });

    } catch (error) {
        console.error('Create developer error:', error);
        return NextResponse.json({
            error: 'Erreur lors de la création'
        }, { status: 500 });
    }
}

// Helper function for mock data
function getMockDevelopers() {
    const mockDevelopers = [
        {
            id: '1',
            name: 'Groupe ABC Promotion',
            email: 'contact@abc-promo.sn',
            phone: '+221 33 123 45 67',
            address: 'Avenue Malick Sy, Dakar',
            logo: null,
            website: 'https://abc-promo.sn',
            description: 'Leader de la promotion immobilière au Sénégal',
            ninea: 'ABC123456',
            status: 'ACTIVE',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2025-12-01')
        },
        {
            id: '2',
            name: 'Teranga Construction',
            email: 'info@teranga-construction.sn',
            phone: '+221 33 234 56 78',
            address: 'VDN, Dakar',
            logo: null,
            website: 'https://teranga-construction.sn',
            description: 'Spécialiste des résidences de standing',
            ninea: 'TER789012',
            status: 'ACTIVE',
            createdAt: new Date('2024-03-20'),
            updatedAt: new Date('2025-11-28')
        }
    ];

    return NextResponse.json({
        success: true,
        developers: mockDevelopers,
        count: mockDevelopers.length
    });
}
