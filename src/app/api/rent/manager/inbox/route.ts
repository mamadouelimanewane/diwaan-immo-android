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

        const messages = await prisma.message.findMany({
            where: { toId: payload.userId },
            orderBy: { createdAt: 'desc' },
            include: { from: { select: { name: true, email: true, avatar: true } } },
        });

        const unreadCount = messages.filter((m) => !m.read).length;
        return NextResponse.json({ success: true, messages, unreadCount });
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
        const { toId, subject, content } = body;
        if (!toId || !content) return NextResponse.json({ error: 'toId et content obligatoires' }, { status: 400 });

        const message = await prisma.message.create({
            data: { fromId: payload.userId, toId, subject: subject || 'Sans objet', content },
        });
        return NextResponse.json({ success: true, message }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
