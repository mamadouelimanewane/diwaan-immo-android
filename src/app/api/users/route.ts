import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Lazy import prisma
let prisma: any;
try {
    prisma = require('@/lib/prisma').prisma;
} catch (e) {
    console.warn('Prisma not available for users API');
}

let bcrypt: any;
try {
    bcrypt = require('bcrypt');
} catch (e) {
    console.warn('bcrypt not available');
}

// GET /api/users - Liste des utilisateurs
export async function GET(request: NextRequest) {
    try {
        // Check if we're in build phase
        if (process.env.NEXT_PHASE === 'phase-production-build') {
            return getMockUsers();
        }

        if (!prisma) {
            return getMockUsers();
        }

        // Get query parameters
        const { searchParams } = new URL(request.url);
        const role = searchParams.get('role');
        const status = searchParams.get('status');

        // Build where clause
        const where: any = {};
        if (role) where.role = role;
        // Note: status would need to be added to User model in Prisma schema

        // Fetch users from database
        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                avatar: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        });

        return NextResponse.json({
            success: true,
            users,
            count: users.length
        });

    } catch (error) {
        console.error('Users API error:', error);
        return getMockUsers();
    }
}

// POST /api/users - Créer un utilisateur
export async function POST(request: NextRequest) {
    try {
        if (!prisma || !bcrypt) {
            return NextResponse.json({
                error: 'Service indisponible'
            }, { status: 503 });
        }

        const body = await request.json();
        const { email, name, password, role, phone } = body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({
                error: 'Cet email est déjà utilisé'
            }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password || 'changeme123', 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: role || 'USER',
                phone: phone || null
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                createdAt: true
            }
        });

        return NextResponse.json({
            success: true,
            user
        }, { status: 201 });

    } catch (error) {
        console.error('Create user error:', error);
        return NextResponse.json({
            error: 'Erreur lors de la création'
        }, { status: 500 });
    }
}

// Helper function for mock data
function getMockUsers() {
    const mockUsers = [
        {
            id: '1',
            name: 'Amadou Fall',
            email: 'amadou.fall@example.com',
            phone: '+221 77 123 45 67',
            role: 'AGENT',
            avatar: null,
            emailVerified: true,
            createdAt: new Date('2025-11-01'),
            updatedAt: new Date('2025-12-07')
        },
        {
            id: '2',
            name: 'Sophie Diop',
            email: 'sophie.diop@gmail.com',
            phone: '+221 77 234 56 78',
            role: 'USER',
            avatar: null,
            emailVerified: true,
            createdAt: new Date('2025-11-15'),
            updatedAt: new Date('2025-12-06')
        },
        {
            id: '3',
            name: 'Jean Mendy',
            email: 'j.mendy@immopro.sn',
            phone: '+221 77 345 67 89',
            role: 'ADMIN',
            avatar: null,
            emailVerified: true,
            createdAt: new Date('2025-10-20'),
            updatedAt: new Date('2025-12-07')
        },
        {
            id: '4',
            name: 'Fatou Cissé',
            email: 'fatou.c@yahoo.fr',
            phone: '+221 77 456 78 90',
            role: 'USER',
            avatar: null,
            emailVerified: false,
            createdAt: new Date('2025-11-20'),
            updatedAt: new Date('2025-11-20')
        },
        {
            id: '5',
            name: 'Agence Teranga',
            email: 'contact@teranga-immo.sn',
            phone: '+221 77 567 89 01',
            role: 'AGENT',
            avatar: null,
            emailVerified: true,
            createdAt: new Date('2025-10-01'),
            updatedAt: new Date('2025-12-05')
        }
    ];

    return NextResponse.json({
        success: true,
        users: mockUsers,
        count: mockUsers.length
    });
}
