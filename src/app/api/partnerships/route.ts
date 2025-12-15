import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Lazy import prisma
let prisma: any;
try {
    prisma = require('@/lib/prisma').prisma;
} catch (e) {
    console.warn('Prisma not available for partnerships API');
}

// GET /api/partnerships - Liste des partenariats
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        if (process.env.NEXT_PHASE === 'phase-production-build' || !prisma) {
            return getMockPartnerships(status);
        }

        const where: any = {};
        if (status) where.status = status;

        const partnerships = await prisma.partnership.findMany({
            where,
            include: {
                developer: true,
                agency: true
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            partnerships,
            count: partnerships.length
        });

    } catch (error) {
        console.error('Partnerships API error:', error);
        return getMockPartnerships(null);
    }
}

// POST /api/partnerships - Créer un partenariat
export async function POST(request: NextRequest) {
    try {
        if (!prisma) {
            return NextResponse.json({
                error: 'Service indisponible'
            }, { status: 503 });
        }

        const body = await request.json();

        const partnership = await prisma.partnership.create({
            data: body,
            include: {
                developer: true,
                agency: true
            }
        });

        return NextResponse.json({
            success: true,
            partnership
        }, { status: 201 });

    } catch (error) {
        console.error('Create partnership error:', error);
        return NextResponse.json({
            error: 'Erreur lors de la création'
        }, { status: 500 });
    }
}

// Helper function for mock data
function getMockPartnerships(statusFilter: string | null) {
    const mockPartnerships = [
        {
            id: '1',
            developerId: '1',
            agencyId: '1',
            projectName: 'Les Jardins de VDN',
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-12-31'),
            commissionRate: 5.0,
            exclusivity: true,
            status: 'ACTIVE',
            createdAt: new Date('2024-12-15'),
            updatedAt: new Date('2025-01-01'),
            developer: {
                name: 'Groupe ABC Promotion'
            },
            agency: {
                name: 'Immobilier Teranga'
            }
        },
        {
            id: '2',
            developerId: '2',
            agencyId: '2',
            projectName: 'Résidence Almadies Bay',
            startDate: new Date('2025-03-01'),
            endDate: new Date('2026-02-28'),
            commissionRate: 7.0,
            exclusivity: false,
            status: 'ACTIVE',
            createdAt: new Date('2025-02-10'),
            updatedAt: new Date('2025-03-01'),
            developer: {
                name: 'Teranga Construction'
            },
            agency: {
                name: 'Dakar Properties'
            }
        }
    ];

    let filtered = mockPartnerships;
    if (statusFilter) {
        filtered = mockPartnerships.filter(p => p.status === statusFilter);
    }

    return NextResponse.json({
        success: true,
        partnerships: filtered,
        count: filtered.length
    });
}
