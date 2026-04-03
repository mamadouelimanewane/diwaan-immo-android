import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split(' ')[1];
        if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        const payload = verifyToken(token);
        if (!payload) return NextResponse.json({ error: 'Token invalide' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const where: any = { ownerId: payload.userId, transactionType: 'RENT' };
        if (status) where.status = status;

        const listings = await prisma.property.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { owner: { select: { name: true, email: true, phone: true } } },
        });
        return NextResponse.json({ success: true, listings, count: listings.length });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
