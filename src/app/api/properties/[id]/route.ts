import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

// GET /api/properties/[id] - Obtenir une propriété
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // TEMPORARY MOCK FOR DEPLOYMENT
    return NextResponse.json({ success: false, error: 'API temporarily unavailable' }, { status: 503 });
}

// PUT /api/properties/[id] - Modifier une propriété
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // TEMPORARY MOCK FOR DEPLOYMENT
    return NextResponse.json({ success: false, error: 'API temporarily unavailable' }, { status: 503 });
}

// DELETE /api/properties/[id] - Supprimer une propriété
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // TEMPORARY MOCK FOR DEPLOYMENT
    return NextResponse.json({ success: false, error: 'API temporarily unavailable' }, { status: 503 });
}
