import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

// GET /api/properties/[id] - Obtenir une propriété
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const property = await prisma.property.findUnique({
            where: { id: params.id },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        avatar: true,
                        role: true,
                    },
                },
            },
        });

        if (!property) {
            return NextResponse.json(
                { success: false, error: 'Propriété non trouvée' },
                { status: 404 }
            );
        }

        // Incrémenter le compteur de vues
        await prisma.property.update({
            where: { id: params.id },
            data: { views: { increment: 1 } },
        });

        return NextResponse.json({ success: true, property });
    } catch (error: any) {
        console.error('GET property error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur serveur', details: error.message },
            { status: 500 }
        );
    }
}

// PUT /api/properties/[id] - Modifier une propriété
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 401 });
        }

        const existing = await prisma.property.findUnique({ where: { id: params.id } });
        if (!existing) {
            return NextResponse.json({ error: 'Propriété non trouvée' }, { status: 404 });
        }

        // Seul le propriétaire ou un admin peut modifier
        if (existing.ownerId !== payload.userId && payload.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
        }

        const body = await request.json();
        // Exclure les champs non modifiables
        const { ownerId, id: _id, createdAt, updatedAt, owner, ...updateData } = body;

        const property = await prisma.property.update({
            where: { id: params.id },
            data: updateData,
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        avatar: true,
                    },
                },
            },
        });

        return NextResponse.json({ success: true, property, message: 'Propriété mise à jour' });
    } catch (error: any) {
        console.error('PUT property error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la mise à jour', details: error.message },
            { status: 500 }
        );
    }
}

// DELETE /api/properties/[id] - Supprimer une propriété
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 401 });
        }

        const existing = await prisma.property.findUnique({ where: { id: params.id } });
        if (!existing) {
            return NextResponse.json({ error: 'Propriété non trouvée' }, { status: 404 });
        }

        // Seul le propriétaire ou un admin peut supprimer
        if (existing.ownerId !== payload.userId && payload.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
        }

        await prisma.property.delete({ where: { id: params.id } });

        return NextResponse.json({ success: true, message: 'Propriété supprimée' });
    } catch (error: any) {
        console.error('DELETE property error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la suppression', details: error.message },
            { status: 500 }
        );
    }
}
