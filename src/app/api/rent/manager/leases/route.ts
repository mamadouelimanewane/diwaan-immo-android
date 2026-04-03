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

        const leases = await prisma.transaction.findMany({
            where: { userId: payload.userId, type: 'RENT' },
            orderBy: { createdAt: 'desc' },
            include: {
                property: { select: { title: true, address: true, city: true, price: true, images: true } },
                user: { select: { name: true, email: true, phone: true } },
            },
        });

        return NextResponse.json({ success: true, leases, count: leases.length });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split(' ')[1];
        if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        const payload = verifyToken(token);
        if (!payload) return NextResponse.json({ error: 'Token invalide' }, { status: 401 });

        const body = await request.json();
        const { propertyId, amount } = body;
        if (!propertyId || !amount) return NextResponse.json({ error: 'propertyId et amount obligatoires' }, { status: 400 });

        const lease = await prisma.transaction.create({
            data: { userId: payload.userId, propertyId, amount: parseFloat(amount), type: 'RENT', status: 'COMPLETED' },
        });

        await prisma.property.update({ where: { id: propertyId }, data: { status: 'RENTED' } });

        return NextResponse.json({ success: true, lease }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
