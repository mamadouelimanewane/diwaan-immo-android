import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Lazy import prisma
let prisma: any;
try {
    prisma = require('@/lib/prisma').prisma;
} catch (e) {
    console.warn('Prisma not available for agencies API');
}

// GET /api/agencies - Liste des agences
export async function GET(request: NextRequest) {
    try {
        if (process.env.NEXT_PHASE === 'phase-production-build' || !prisma) {
            return getMockAgencies();
        }

        const agencies = await prisma.agency.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            agencies,
            count: agencies.length
        });

    } catch (error) {
        console.error('Agencies API error:', error);
        return getMockAgencies();
    }
}

// POST /api/agencies - Créer une agence
export async function POST(request: NextRequest) {
    try {
        if (!prisma) {
            return NextResponse.json({
                error: 'Service indisponible'
            }, { status: 503 });
        }

        const body = await request.json();

        const agency = await prisma.agency.create({
            data: body
        });

        return NextResponse.json({
            success: true,
            agency
        }, { status: 201 });

    } catch (error) {
        console.error('Create agency error:', error);
        return NextResponse.json({
            error: 'Erreur lors de la création'
        }, { status: 500 });
    }
}

// Helper function for mock data
function getMockAgencies() {
    const mockAgencies = [
        {
            id: '1',
            name: 'Immobilier Teranga',
            email: 'contact@immo-teranga.sn',
            phone: '+221 33 865 12 34',
            address: 'Rue Carnot, Dakar',
            logo: null,
            website: 'https://immo-teranga.sn',
            description: 'Agence spécialisée en transactions immobilières',
            licenseNumber: 'AGE2024001',
            commissionRate: 5.0,
            status: 'ACTIVE',
            createdAt: new Date('2024-02-10'),
            updatedAt: new Date('2025-12-05')
        },
        {
            id: '2',
            name: 'Dakar Properties',
            email: 'info@dakar-properties.com',
            phone: '+221 33 865 23 45',
            address: 'Almadies, Dakar',
            logo: null,
            website: 'https://dakar-properties.com',
            description: 'Agence de prestige pour villas et terrains',
            licenseNumber: 'AGE2024002',
            commissionRate: 7.0,
            status: 'ACTIVE',
            createdAt: new Date('2024-04-15'),
            updatedAt: new Date('2025-12-03')
        }
    ];

    return NextResponse.json({
        success: true,
        agencies: mockAgencies,
        count: mockAgencies.length
    });
}
