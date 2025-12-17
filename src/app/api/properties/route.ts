import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { propertySchema } from '@/lib/validators';

export const dynamic = 'force-dynamic';

// GET /api/properties - Liste des propriétés avec filtres
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        // Filtres
        const type = searchParams.get('type');
        const city = searchParams.get('city');
        const neighborhood = searchParams.get('neighborhood');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const minSurface = searchParams.get('minSurface');
        const maxSurface = searchParams.get('maxSurface');
        const bedrooms = searchParams.get('bedrooms');
        const transactionType = searchParams.get('transactionType');
        const status = searchParams.get('status');
        const featured = searchParams.get('featured');
        const search = searchParams.get('search');
        const ids = searchParams.get('ids');
        const ownerId = searchParams.get('ownerId');

        // Construire le where
        const where: any = {};

        // Filtrer par IDs (pour les favoris par exemple)
        if (ids) {
            where.id = { in: ids.split(',') };
        }

        // Statut (par défaut ACTIVE pour le public)
        if (status && status !== 'ANY') {
            where.status = status;
        } else if (!status) {
            where.status = 'ACTIVE';
        }

        if (type) where.type = type;
        if (city) where.city = { contains: city, mode: 'insensitive' };
        if (neighborhood) where.neighborhood = { contains: neighborhood, mode: 'insensitive' };
        if (transactionType) where.transactionType = transactionType;
        if (featured) where.featured = featured === 'true';
        if (ownerId) where.ownerId = ownerId;

        // Prix
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
        }

        // Surface
        if (minSurface || maxSurface) {
            where.surface = {};
            if (minSurface) where.surface.gte = parseFloat(minSurface);
            if (maxSurface) where.surface.lte = parseFloat(maxSurface);
        }

        // Chambres
        if (bedrooms) {
            where.bedrooms = { gte: parseInt(bedrooms) };
        }

        // Recherche textuelle
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Récupérer les propriétés
        const [properties, total] = await Promise.all([
            prisma.property.findMany({
                where,
                take: limit,
                skip: (page - 1) * limit,
                orderBy: [
                    { featured: 'desc' },
                    { createdAt: 'desc' },
                ],
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
            }),
            prisma.property.count({ where }),
        ]);

        return NextResponse.json({
            success: true,
            properties,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error('GET properties error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la récupération des propriétés',
                details: error.message
            },
            { status: 500 }
        );
    }
}

// POST /api/properties - Créer une nouvelle propriété
export async function POST(request: NextRequest) {
    try {
        // Vérifier authentification
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return NextResponse.json(
                { error: 'Non authentifié. Veuillez vous connecter.' },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: 'Token invalide ou expiré' },
                { status: 401 }
            );
        }

        // Récupérer et valider les données
        const body = await request.json();

        const validation = propertySchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.errors },
                { status: 400 }
            );
        }

        // Créer la propriété
        const property = await prisma.property.create({
            data: {
                ...validation.data,
                ownerId: payload.userId,
                status: 'PENDING', // Doit être vérifiée par un admin
            },
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

        return NextResponse.json(
            {
                success: true,
                property,
                message: 'Propriété créée avec succès. En attente de vérification.',
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('POST property error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création de la propriété' },
            { status: 500 }
        );
    }
}
