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

        const myProperties = await prisma.property.findMany({
            where: { ownerId: payload.userId, transactionType: 'RENT' },
            select: { id: true },
        });
        const propertyIds = myProperties.map((p) => p.id);

        const applications = await prisma.propertyInquiry.findMany({
            where: { propertyId: { in: propertyIds } },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ success: true, applications, count: applications.length });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, message, propertyId } = body;
        if (!name || !email || !propertyId) {
            return NextResponse.json({ error: 'name, email et propertyId obligatoires' }, { status: 400 });
        }
        const application = await prisma.propertyInquiry.create({
            data: { name, email, phone: phone || null, message: message || '', propertyId },
        });
        return NextResponse.json({ success: true, application }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
