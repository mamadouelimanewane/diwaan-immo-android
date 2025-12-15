import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Lazy import prisma
let prisma: any;
try {
    prisma = require('@/lib/prisma').prisma;
} catch (e) {
    console.warn('Prisma not available for reservations API');
}

// GET /api/reservations - Liste des réservations
export async function GET(request: NextRequest) {
    try {
        if (process.env.NEXT_PHASE === 'phase-production-build' || !prisma) {
            return getMockReservations();
        }

        const reservations = await prisma.reservation.findMany({
            include: {
                property: {
                    select: {
                        title: true,
                        price: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true
                    }
                },
                agency: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            reservations,
            count: reservations.length
        });

    } catch (error) {
        console.error('Reservations API error:', error);
        return getMockReservations();
    }
}

// POST /api/reservations - Créer une réservation
export async function POST(request: NextRequest) {
    try {
        if (!prisma) {
            return NextResponse.json({
                error: 'Service indisponible'
            }, { status: 503 });
        }

        const body = await request.json();

        const reservation = await prisma.reservation.create({
            data: body,
            include: {
                property: true,
                user: true,
                agency: true
            }
        });

        return NextResponse.json({
            success: true,
            reservation
        }, { status: 201 });

    } catch (error) {
        console.error('Create reservation error:', error);
        return NextResponse.json({
            error: 'Erreur lors de la création'
        }, { status: 500 });
    }
}

// Helper function for mock data
function getMockReservations() {
    const mockReservations = [
        {
            id: '1',
            propertyId: '1',
            userId: '2',
            agencyId: '1',
            amount: 5000000,
            agencyMargin: 250000,
            status: 'CONFIRMED',
            visitDate: new Date('2025-12-20'),
            notes: 'Visite programmée pour le samedi matin',
            createdAt: new Date('2025-12-10'),
            updatedAt: new Date('2025-12-10'),
            property: {
                title: 'Villa Moderne à Almadies',
                price: 450000000
            },
            user: {
                name: 'Sophie Diop',
                email: 'sophie.diop@gmail.com',
                phone: '+221 77 234 56 78'
            },
            agency: {
                name: 'Immobilier Teranga'
            }
        },
        {
            id: '2',
            propertyId: '5',
            userId: '4',
            agencyId: '2',
            amount: 3000000,
            agencyMargin: 210000,
            status: 'PENDING',
            visitDate: new Date('2025-12-22'),
            notes: 'Client intéressé par location longue durée',
            createdAt: new Date('2025-12-12'),
            updatedAt: new Date('2025-12-12'),
            property: {
                title: 'Villa Piscine Saly',
                price: 280000000
            },
            user: {
                name: 'Fatou Cissé',
                email: 'fatou.c@yahoo.fr',
                phone: '+221 77 456 78 90'
            },
            agency: {
                name: 'Dakar Properties'
            }
        }
    ];

    return NextResponse.json({
        success: true,
        reservations: mockReservations,
        count: mockReservations.length
    });
}
