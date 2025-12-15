import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Route protégée pour réinitialiser la base de données en production
export async function POST(request: NextRequest) {
    try {
        // Vérification de sécurité - token admin requis
        const authHeader = request.headers.get('authorization');
        const adminToken = process.env.ADMIN_SECRET_TOKEN;

        if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
            return NextResponse.json({
                error: 'Non autorisé'
            }, { status: 401 });
        }

        // Mise à jour du prix de l'appartement Vue Mer Plateau
        const updated = await prisma.property.updateMany({
            where: {
                title: 'Appartement Vue Mer Plateau',
                transactionType: 'RENT'
            },
            data: {
                price: 650000
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Prix des loyers mis à jour en production',
            updated: updated.count
        });

    } catch (error) {
        console.error('Erreur mise à jour loyers:', error);
        return NextResponse.json({
            error: 'Erreur lors de la mise à jour'
        }, { status: 500 });
    }
}
