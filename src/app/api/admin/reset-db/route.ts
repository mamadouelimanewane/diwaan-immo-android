import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Route admin pour réinitialiser la BD avec les prix corrects
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

        console.log('🔄 Début de la réinitialisation de la BD...');

        // Étape 1 : Trouver ou créer un utilisateur admin par défaut
        let adminUser = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        });

        if (!adminUser) {
            // Créer un admin par défaut si n'existe pas
            adminUser = await prisma.user.create({
                data: {
                    email: 'admin@diwaan.sn',
                    password: '$2b$10$dummy', // Hash dummy
                    name: 'Admin Diwaan',
                    role: 'ADMIN',
                    phone: '+221 77 000 00 00'
                }
            });
            console.log('✅ Utilisateur admin créé');
        }

        // Étape 2 : Supprimer TOUTES les anciennes propriétés
        const deleted = await prisma.property.deleteMany({});
        console.log(`✅ ${deleted.count} propriétés supprimées`);

        // Étape 3 : Créer les nouvelles propriétés avec prix corrects
        const nouvelles = [
            // LOCATIONS - Prix réalistes (200K - 750K FCFA)
            {
                title: "Appartement F3 Mermoz",
                description: "Appartement familial, proche écoles, 3 chambres, balcon",
                type: "APARTMENT" as const,
                transactionType: "RENT" as const,
                status: "ACTIVE" as const,
                price: 400000,
                surface: 95,
                bedrooms: 3,
                bathrooms: 2,
                address: "Cité Mermoz",
                city: "Dakar",
                neighborhood: "Mermoz",
                latitude: 14.7047,
                longitude: -17.4578,
                images: [
                    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&q=80"
                ],
                features: ["Balcon", "Proche écoles", "Gardiennage"],
                featured: false,
                verified: true,
                views: 234
            },
            {
                title: "Studio Yoff",
                description: "Studio meublé, idéal étudiant, proche université",
                type: "STUDIO",
                transactionType: "RENT",
                status: "ACTIVE",
                price: 200000,
                surface: 35,
                bedrooms: 1,
                bathrooms: 1,
                address: "Yoff Virage",
                city: "Dakar",
                neighborhood: "Yoff",
                latitude: 14.7500,
                longitude: -17.4833,
                images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&q=80"],
                features: ["Meublé", "Wifi", "Climatisation"],
                featured: false,
                verified: true,
                views: 567
            },
            {
                title: "Villa Piscine Mamelles",
                description: "Belle villa avec piscine, 4 chambres, jardin, calme",
                type: "VILLA",
                transactionType: "RENT",
                status: "ACTIVE",
                price: 750000,
                surface: 280,
                bedrooms: 4,
                bathrooms: 3,
                address: "Cité Cheminots, Mamelles",
                city: "Dakar",
                neighborhood: "Mamelles",
                latitude: 14.7350,
                longitude: -17.5000,
                images: [
                    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80"
                ],
                features: ["Piscine", "Jardin", "Calme", "Garage"],
                featured: true,
                verified: true,
                views: 890
            },
            {
                title: "Appartement F4 Sacré-Cœur",
                description: "Appartement spacieux, 3 chambres, sécurisé, proche VDN",
                type: "APARTMENT",
                transactionType: "RENT",
                status: "ACTIVE",
                price: 550000,
                surface: 140,
                bedrooms: 3,
                bathrooms: 2,
                address: "Sacré-Cœur 3 Extension",
                city: "Dakar",
                neighborhood: "Sacré-Cœur",
                latitude: 14.7167,
                longitude: -17.4667,
                images: [
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80"
                ],
                features: ["Gardiennage 24/7", "Surpresseur", "Balcon"],
                featured: true,
                verified: true,
                views: 456
            },
            // VENTES - Prix en millions
            {
                title: "Villa Moderne Almadies",
                description: "Magnifique villa avec vue sur mer, 5 chambres, piscine, jardin tropical",
                type: "VILLA",
                transactionType: "SALE",
                status: "ACTIVE",
                price: 425000000,
                surface: 650,
                bedrooms: 5,
                bathrooms: 6,
                address: "Route des Almadies",
                city: "Dakar",
                neighborhood: "Almadies",
                latitude: 14.7456,
                longitude: -17.5144,
                images: [
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80"
                ],
                features: ["Piscine", "Groupe Électrogène", "Cuisine Équipée", "Videophone", "Garage Double"],
                featured: true,
                verified: true,
                views: 1540
            },
            {
                title: "Terrain Diamniadio",
                description: "Terrain viabilisé 300m², proche gare TER, idéal investissement",
                type: "LAND",
                transactionType: "SALE",
                status: "ACTIVE",
                price: 9000000,
                surface: 300,
                bedrooms: 0,
                bathrooms: 0,
                address: "Cité des Fonctionnaires",
                city: "Diamniadio",
                neighborhood: "Diamniadio Nord",
                latitude: 14.7250,
                longitude: -17.2100,
                images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop&q=80"],
                features: ["Titre Foncier", "Viabilisé"],
                featured: false,
                verified: true,
                views: 678
            }
        ];

        // Créer toutes les propriétés avec l'admin comme propriétaire
        let created = 0;
        for (const prop of nouvelles) {
            await prisma.property.create({
                data: {
                    ...prop,
                    ownerId: adminUser.id  // Lier à l'utilisateur admin
                } as any  // Type assertion pour contourner l'erreur de type
            });
            created++;
        }

        console.log(`✅ ${created} nouvelles propriétés créées`);

        return NextResponse.json({
            success: true,
            message: 'Base de données réinitialisée avec succès',
            stats: {
                deleted: deleted.count,
                created: created,
                locations: 4,
                ventes: 2
            }
        });

    } catch (error) {
        console.error('Erreur réinitialisation BD:', error);
        return NextResponse.json({
            error: 'Erreur lors de la réinitialisation',
            details: error instanceof Error ? error.message : 'Erreur inconnue'
        }, { status: 500 });
    }
}
