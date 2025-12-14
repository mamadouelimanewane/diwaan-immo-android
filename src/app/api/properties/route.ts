import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';
import { propertySchema } from '@/lib/validators';

// GET /api/properties - Liste des propriétés avec filtres
export async function GET(request: NextRequest) {
    // MOCK DATA with contextual real estate images and realistic prices
    const mockProperties = [
        // VENTES (Realistic sale prices)
        {
            id: "1",
            title: "Villa Moderne à Almadies",
            description: "Magnifique villa avec vue sur mer, 4 chambres, piscine, jardin tropical",
            price: 450000000, // 450M FCFA (sale price)
            images: [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80"
            ],
            bedrooms: 4,
            bathrooms: 3,
            surface: 350,
            address: "Route des Almadies",
            city: "Dakar",
            neighborhood: "Almadies",
            type: "HOUSE",
            transactionType: "SALE",
            status: "ACTIVE",
            featured: true,
            latitude: 14.7392,
            longitude: -17.4923,
            owner: { id: "1", name: "Fatou Sarr", phone: "+221 77 123 45 67", email: "fsarr@diwaan.sn" }
        },
        {
            id: "2",
            title: "Appartement Standing Plateau",
            description: "Appartement luxueux en plein centre-ville, 3 chambres, parking sécurisé",
            price: 85000000, // 85M FCFA (sale price)
            images: [
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80"
            ],
            bedrooms: 3,
            bathrooms: 2,
            surface: 120,
            address: "Avenue Lamine Gueye",
            city: "Dakar",
            neighborhood: "Plateau",
            type: "APARTMENT",
            transactionType: "SALE",
            status: "ACTIVE",
            featured: true,
            latitude: 14.6721,
            longitude: -17.4380,
            owner: { id: "2", name: "Moussa Diop", phone: "+221 77 234 56 78", email: "mdiop@diwaan.sn" }
        },
        {
            id: "3",
            title: "Terrain VDN",
            description: "Terrain constructible 500m², Zone résidentielle, Tous réseaux",
            price: 125000000, // 125M FCFA (sale price)
            images: [
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop&q=80"
            ],
            bedrooms: 0,
            bathrooms: 0,
            surface: 500,
            address: "VDN Extension",
            city: "Dakar",
            neighborhood: "VDN",
            type: "LAND",
            transactionType: "SALE",
            status: "ACTIVE",
            featured: false,
            latitude: 14.7167,
            longitude: -17.4677,
            owner: { id: "3", name: "Aminata Ndiaye", phone: "+221 77 345 67 89", email: "andiaye@diwaan.sn" }
        },

        // LOCATIONS (Realistic monthly rent)
        {
            id: "4",
            title: "Appartement F3 Mermoz",
            description: "Appartement familial, proche écoles, 3 chambres, balcon",
            price: 400000, // 400K FCFA/mois (monthly rent)
            images: [
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&q=80"
            ],
            bedrooms: 3,
            bathrooms: 2,
            surface: 95,
            address: "Cité Mermoz",
            city: "Dakar",
            neighborhood: "Mermoz",
            type: "APARTMENT",
            transactionType: "RENT",
            status: "ACTIVE",
            featured: false,
            latitude: 14.7047,
            longitude: -17.4578,
            owner: { id: "4", name: "Cheikh Sy", phone: "+221 77 456 78 90", email: "csy@diwaan.sn" }
        },
        {
            id: "5",
            title: "Villa Piscine Saly",
            description: "Villa de vacances avec piscine, 5 chambres, proche plage",
            price: 1500000, // 1.5M FCFA/mois (monthly rent)
            images: [
                "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop&q=80",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80"
            ],
            bedrooms: 5,
            bathrooms: 4,
            surface: 280,
            address: "Saly Portudal",
            city: "Mbour",
            neighborhood: "Saly",
            type: "HOUSE",
            transactionType: "RENT",
            status: "ACTIVE",
            featured: true,
            latitude: 14.4544,
            longitude: -16.9972,
            owner: { id: "5", name: "Ibrahima Fall", phone: "+221 77 567 89 01", email: "ifall@diwaan.sn" }
        },
        {
            id: "6",
            title: "Studio Yoff",
            description: "Studio meublé, idéal étudiant, proche université",
            price: 200000, // 200K FCFA/mois (monthly rent)
            images: [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&q=80"
            ],
            bedrooms: 1,
            bathrooms: 1,
            surface: 35,
            address: "Yoff Virage",
            city: "Dakar",
            neighborhood: "Yoff",
            type: "APARTMENT",
            transactionType: "RENT",
            status: "ACTIVE",
            featured: false,
            latitude: 14.7500,
            longitude: -17.4833,
            owner: { id: "6", name: "Awa Diallo", phone: "+221 77 678 90 12", email: "adiallo@diwaan.sn" }
        }
    ];

    return NextResponse.json({
        success: true,
        properties: mockProperties,
        pagination: { page: 1, limit: 20, total: mockProperties.length, pages: 1 }
    });
}

// POST /api/properties - Créer une nouvelle propriété
export async function POST(request: NextRequest) {
    // TEMPORARY MOCK FOR DEPLOYMENT
    return NextResponse.json(
        { success: false, error: 'API temporarily unavailable' },
        { status: 503 }
    );
}
