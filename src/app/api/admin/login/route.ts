import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// Lazy import prisma
let prisma: any;
try {
    prisma = require('@/lib/prisma').prisma;
} catch (e) {
    console.warn('Prisma not available for admin login');
}

let bcrypt: any;
try {
    bcrypt = require('bcrypt');
} catch (e) {
    console.warn('bcrypt not available');
}

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Demo credentials (for testing)
        if (email === 'admin@diwaan.sn' && password === 'admin123') {
            const token = signToken({
                userId: 'admin-demo',
                email: 'admin@diwaan.sn',
                role: 'ADMIN'
            });

            return NextResponse.json({
                success: true,
                token,
                user: {
                    id: 'admin-demo',
                    email: 'admin@diwaan.sn',
                    name: 'Admin Diwaan',
                    role: 'ADMIN'
                }
            });
        }

        // Real authentication with database
        if (!prisma || !bcrypt) {
            return NextResponse.json({
                error: 'Service temporairement indisponible'
            }, { status: 503 });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                role: true
            }
        });

        if (!user) {
            return NextResponse.json({
                error: 'Identifiants invalides'
            }, { status: 401 });
        }

        // Check if user is admin
        if (user.role !== 'ADMIN') {
            return NextResponse.json({
                error: 'Accès réservé aux administrateurs'
            }, { status: 403 });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return NextResponse.json({
                error: 'Identifiants invalides'
            }, { status: 401 });
        }

        // Generate token
        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role
        });

        return NextResponse.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json({
            error: 'Erreur serveur'
        }, { status: 500 });
    }
}
