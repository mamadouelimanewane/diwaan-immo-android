// Script pour écraser les données de la BD avec les prix corrects
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetDatabase() {
    console.log('🔄 Suppression de toutes les anciennes propriétés...');

    // Supprimer TOUTES les propriétés
    await prisma.property.deleteMany({});
    console.log('✅ Toutes les propriétés supprimées');

    console.log('📝 Insertion des nouvelles propriétés avec prix corrects...');

    // LOCATIONS - Prix réalistes (max 800K FCFA)
    const locations = [
        {
            title: "Appartement F3 Mermoz",
            description: "Appartement familial, proche écoles, 3 chambres, balcon",
            type: "APARTMENT",
            transactionType: "RENT",
            status: "ACTIVE",
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
        }
    ];

    // VENTES - Prix en millions
    const ventes = [
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

    // Insérer toutes les propriétés
    const allProperties = [...locations, ...ventes];

    for (const prop of allProperties) {
        await prisma.property.create({
            data: prop
        });
        console.log(`✅ Créé: ${prop.title} - ${prop.price.toLocaleString()} FCFA`);
    }

    console.log('\n🎉 Base de données mise à jour avec succès !');
    console.log(`📊 Total: ${allProperties.length} propriétés`);
    console.log(`   - Locations: ${locations.length} (200K - 750K FCFA)`);
    console.log(`   - Ventes: ${ventes.length}`);
}

resetDatabase()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
