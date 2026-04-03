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
        const where: any = {};
        if (status) where.status = status;

        const payments = await prisma.reservationPayment.findMany({
            where,
            orderBy: { dueDate: 'asc' },
            include: {
                reservation: {
                    select: {
                        reservationNumber: true,
                        clientFirstName: true,
                        clientLastName: true,
                        clientPhone: true,
                        plot: { select: { plotNumber: true, project: { select: { name: true } } } },
                    },
                },
            },
        });

        const stats = {
            total: payments.length,
            pending: payments.filter((p) => p.status === 'PENDING').length,
            completed: payments.filter((p) => p.status === 'COMPLETED').length,
            late: payments.filter((p) => p.status === 'LATE').length,
            totalAmount: payments.filter((p) => p.status === 'COMPLETED').reduce((a, p) => a + p.amount, 0),
        };

        return NextResponse.json({ success: true, payments, stats });
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
        const { reservationId, amount, paymentDate, dueDate, method, reference, proofUrl } = body;

        if (!reservationId || !amount || !method) {
            return NextResponse.json({ error: 'reservationId, amount et method obligatoires' }, { status: 400 });
        }

        const payment = await prisma.reservationPayment.create({
            data: {
                reservationId,
                amount: parseFloat(amount),
                paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
                dueDate: dueDate ? new Date(dueDate) : new Date(),
                method,
                reference: reference || null,
                proofUrl: proofUrl || null,
                status: 'COMPLETED',
            },
        });

        const allPayments = await prisma.reservationPayment.findMany({
            where: { reservationId, status: 'COMPLETED' },
            select: { amount: true },
        });
        const totalPaid = allPayments.reduce((a, p) => a + p.amount, 0);
        const reservation = await prisma.plotReservation.update({
            where: { id: reservationId },
            data: { totalPaid, balance: { decrement: parseFloat(amount) } },
        });

        return NextResponse.json({ success: true, payment, totalPaid, balance: reservation.balance }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
