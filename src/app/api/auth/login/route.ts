import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { authenticateUser } from '@/lib/auth';
import { loginSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
    // TEMPORARY MOCK FOR DEPLOYMENT
    return NextResponse.json({
        success: true,
        user: { id: 'mock-user', name: 'Mamadou', email: 'test@diwaan.sn', role: 'AGENT' },
        token: 'mock-jwt-token',
        message: 'Connexion réussie (Mock)',
    });

    /*
    try {
        const body = await request.json();

        // Validation
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.errors },
                { status: 400 }
            );
        }

        // Authentifier
        const { user, token } = await authenticateUser(
            validation.data.email,
            validation.data.password
        );

        return NextResponse.json({
            success: true,
            user,
            token,
            message: 'Connexion réussie',
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: error.message || 'Identifiants invalides' },
            { status: 401 }
        );
    }
    */
}
