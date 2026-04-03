import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// POST /api/admin/update-prices - Mise à jour dynamique des prix
export async function POST(request: NextRequest) {
    try {
        // Vérification : token JWT admin OU ADMIN_SECRET_TOKEN
        const authHeader = request.headers.get('authorization');
        const adminSecret = process.env.ADMIN_SECRET_TOKEN;

        let isAuthorized = false;

        if (adminSecret && authHeader === `Bearer ${adminSecret}`) {
            isAuthorized = true;
        } else if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const payload = verifyToken(token);
            if (payload && payload.role === 'ADMIN') isAuthorized = true;
        }

        if (!isAuthorized) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
        }

        const body = await request.json();
        const {
            // Filtres optionnels
            propertyId,       // ID précis (maj d'un seul bien)
            ids,              // Tableau d'IDs
            type,             // Ex: 'APARTMENT'
            city,             // Ex: 'Dakar'
            neighborhood,     // Ex: 'Almadies'
            transactionType,  // 'SALE' | 'RENT'
            status,           // Ex: 'ACTIVE'
            // Modification
            newPrice,         // Nouveau prix fixe
            adjustPercent,    // Ajustement en % (ex: 5 = +5%, -10 = -10%)
            newStatus,        // Changer le statut
            featured,         // Mettre en vedette
        } = body;

        // Construire le filtre WHERE
        const where: any = {};
        if (propertyId) where.id = propertyId;
        if (ids && Array.isArray(ids)) where.id = { in: ids };
        if (type) where.type = type;
        if (city) where.city = { contains: city, mode: 'insensitive' };
        if (neighborhood) where.neighborhood = { contains: neighborhood, mode: 'insensitive' };
        if (transactionType) where.transactionType = transactionType;
        if (status) where.status = status;

        if (Object.keys(where).length === 0) {
            return NextResponse.json(
                { error: 'Aucun filtre fourni. Précisez propertyId, ids, type, city, transactionType ou status.' },
                { status: 400 }
            );
        }

        // Construire les données de mise à jour
        const updateData: any = {};

        if (newPrice !== undefined) {
            updateData.price = parseFloat(newPrice);
        }

        if (newStatus) updateData.status = newStatus;
        if (featured !== undefined) updateData.featured = Boolean(featured);

        // Ajustement en pourcentage : opération par lot avec findMany + updateMany
        if (adjustPercent !== undefined && newPrice === undefined) {
            const properties = await prisma.property.findMany({
                where,
                select: { id: true, price: true },
            });

            const factor = 1 + parseFloat(adjustPercent) / 100;
            let updatedCount = 0;

            for (const prop of properties) {
                const newP = Math.round(prop.price * factor);
                await prisma.property.update({
                    where: { id: prop.id },
                    data: { price: newP, ...updateData },
                });
                updatedCount++;
            }

            return NextResponse.json({
                success: true,
                message: `Prix ajustés de ${adjustPercent}% sur ${updatedCount} bien(s)`,
                updatedCount,
                factor,
            });
        }

        // Mise à jour directe (prix fixe ou changement statut)
        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: 'Aucune modification fournie (newPrice, adjustPercent, newStatus, featured)' },
                { status: 400 }
            );
        }

        const result = await prisma.property.updateMany({ where, data: updateData });

        return NextResponse.json({
            success: true,
            message: `${result.count} bien(s) mis à jour avec les nouveaux paramètres`,
            updatedCount: result.count,
            changes: updateData,
            filters: where,
        });
    } catch (error: any) {
        console.error('update-prices error:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour', details: error.message },
            { status: 500 }
        );
    }
}

// GET /api/admin/update-prices - Prévisualisation sans appliquer
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const city = searchParams.get('city');
        const transactionType = searchParams.get('transactionType');
        const status = searchParams.get('status') || 'ACTIVE';

        const where: any = { status };
        if (type) where.type = type;
        if (city) where.city = { contains: city, mode: 'insensitive' };
        if (transactionType) where.transactionType = transactionType;

        const properties = await prisma.property.findMany({
            where,
            select: {
                id: true, title: true, type: true, city: true,
                neighborhood: true, price: true, transactionType: true, status: true,
            },
            orderBy: { price: 'asc' },
        });

        const stats = {
            count: properties.length,
            minPrice: properties.length ? Math.min(...properties.map(p => p.price)) : 0,
            maxPrice: properties.length ? Math.max(...properties.map(p => p.price)) : 0,
            avgPrice: properties.length ? Math.round(properties.reduce((a, p) => a + p.price, 0) / properties.length) : 0,
        };

        return NextResponse.json({ success: true, properties, stats });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
