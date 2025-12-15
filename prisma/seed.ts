const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Démarrage du peuplement de la base de données (Senegal Context)...');

    try {
        await prisma.favorite.deleteMany();
        await prisma.message.deleteMany();
        await prisma.transaction.deleteMany();
        await prisma.property.deleteMany();
        await prisma.user.deleteMany();
        console.log('Anciennes données supprimées.');
    } catch (e) {
        console.log('Note: Premier lancement ou base vide.');
    }

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Création des Utilisateurs (Profils locaux)
    const agent1 = await prisma.user.create({
        data: {
            email: 'moussa.diop@diwaan.sn',
            name: 'Moussa Diop',
            password: hashedPassword,
            role: 'AGENT',
            phone: '77 555 01 01',
            avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
        },
    });

    const agent2 = await prisma.user.create({
        data: {
            email: 'aissatou.fall@immo-dakar.sn',
            name: 'Aïssatou Fall',
            password: hashedPassword,
            role: 'AGENT',
            phone: '76 222 02 02',
            avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
        },
    });

    const owner1 = await prisma.user.create({
        data: {
            email: 'ibrahima.sow@gmail.com',
            name: 'Ibrahima Sow',
            password: hashedPassword,
            role: 'OWNER',
            phone: '70 333 03 03',
        },
    });

    // --- Nouveaux Propriétaires ---
    const owner2 = await prisma.user.create({
        data: {
            email: 'sokhna.dieng@gmail.com',
            name: 'Sokhna Dieng',
            password: hashedPassword,
            role: 'OWNER',
            phone: '77 444 04 04',
            avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
        },
    });

    const owner3 = await prisma.user.create({
        data: {
            email: 'cheikh.ndiaye@outlook.com',
            name: 'Cheikh Ndiaye',
            password: hashedPassword,
            role: 'OWNER',
            phone: '78 555 05 05',
        },
    });

    const user1 = await prisma.user.create({
        data: {
            email: 'fatou.konate@yahoo.fr',
            name: 'Fatou Konaté',
            password: hashedPassword,
            role: 'USER',
        },
    });

    const admin = await prisma.user.create({
        data: {
            email: 'admin@diwaan.sn',
            name: 'Super Admin',
            password: hashedPassword,
            role: 'ADMIN',
            phone: '77 000 00 00',
        },
    });

    console.log('Utilisateurs créés (dont Admin).');

    // 2. Création des Propriétés (Offres diversifiées)
    const propertiesData = [
        // --- VENTE (Haut de gamme) ---
        {
            title: 'Villa R+2 de Prestige aux Almadies',
            description: 'Exceptionnelle villa contemporaine située dans la zone la plus prisée des Almadies. 5 chambres avec salles de bain attenantes, piscine à débordement, groupe électrogène, finitions marbre. Titre Foncier individuel.',
            type: 'VILLA',
            transactionType: 'SALE',
            status: 'ACTIVE',
            price: 425000000,
            surface: 650,
            bedrooms: 5,
            bathrooms: 6,
            floor: 0,
            yearBuilt: 2022,
            address: 'Route des Almadies, Derrière Philip Morris',
            city: 'Dakar',
            neighborhood: 'Almadies',
            postalCode: '12000',
            latitude: 14.7456,
            longitude: -17.5144,
            images: [
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Piscine', 'Groupe Électrogène', 'Cuisine Équipée', 'Videophone', 'Garage Double'],
            featured: true,
            verified: true,
            ownerId: agent1.id, // Agent listing
            views: 1540
        },
        // --- LOCATION (Moyenne gamme / Familial) ---
        {
            title: 'Appartement F4 Standing à Sacré-Cœur 3',
            description: 'Bel appartement spacieux au 2ème étage d\'un immeuble calme et sécurisé. 3 chambres, grand salon, cuisine placardée, chauffe-eau. Proche de la VDN et des écoles.',
            type: 'APARTMENT',
            transactionType: 'RENT',
            status: 'ACTIVE',
            price: 225000,
            surface: 140,
            bedrooms: 3,
            bathrooms: 2,
            floor: 2,
            yearBuilt: 2018,
            address: 'Sacré-Cœur 3 Extension',
            city: 'Dakar',
            neighborhood: 'Sacré-Cœur',
            postalCode: '11500',
            latitude: 14.7167,
            longitude: -17.4667,
            images: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Gardiennage 24/7', 'Surpresseur', 'Balcon'],
            featured: true,
            verified: true,
            ownerId: agent2.id,
            views: 890
        },
        // --- VENTE (Investissement / Terrain) ---
        {
            title: 'Terrains Viabilisés à Diamniadio (Pôle Urbain)',
            description: 'Opportunité à saisir. Terrains de 300m² viabilisés (eau, électricité) situés au cœur du Pôle Urbain de Diamniadio, à 5min de la gare TER. Idéal pour premier investissement.',
            type: 'LAND',
            transactionType: 'SALE',
            status: 'ACTIVE',
            price: 9000000,
            surface: 300,
            bedrooms: 0,
            bathrooms: 0,
            address: 'Cité des Fonctionnaires',
            city: 'Diamniadio',
            neighborhood: 'Diamniadio Nord',
            postalCode: '20000',
            latitude: 14.7250,
            longitude: -17.2100,
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Titre Foncier', 'Viabilisé'],
            featured: false,
            verified: true,
            ownerId: owner1.id,
            views: 2100
        },
        // --- LOCATION (Étudiant / Jeune Cadre) ---
        {
            title: 'Studio Meublé Ouest Foire',
            description: 'Joli studio américain meublé : lit double, frigo bar, TV, Wifi, climatisation. Quartier calme et accessible, proche de l\'aéroport LSS.',
            type: 'STUDIO',
            transactionType: 'RENT',
            status: 'ACTIVE',
            price: 100000,
            surface: 35,
            bedrooms: 1,
            bathrooms: 1,
            floor: 1,
            address: 'Ouest Foire, derrière la brioche dorée',
            city: 'Dakar',
            neighborhood: 'Ouest Foire',
            postalCode: '11000',
            latitude: 14.7300,
            longitude: -17.4800,
            images: [
                'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Meublé', 'Wifi', 'Climatisation'],
            featured: false,
            verified: false,
            ownerId: owner1.id,
            views: 1200
        },
        // --- VENTE (Maison Familiale) ---
        {
            title: 'Maison R+1 à rénover Sicap Liberté 6',
            description: 'Maison d\'angle R+1 sur 200m². Gros potentiel après rénovation. Proche du Terminus Liberté 5. Bail emphytéotique en cours de transformation.',
            type: 'HOUSE',
            transactionType: 'SALE',
            status: 'ACTIVE',
            price: 42500000,
            surface: 200,
            bedrooms: 4,
            bathrooms: 2,
            address: 'Liberté 6 Extension',
            city: 'Dakar',
            neighborhood: 'Sicap Liberté',
            postalCode: '11000',
            latitude: 14.7200,
            longitude: -17.4500,
            images: [
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Cour', 'Angle de rue', 'Proche Transport'],
            featured: false,
            verified: true,
            ownerId: agent2.id,
            views: 650
        },
        // --- LOCATION (Appartement Standing Plateau) ---
        {
            title: 'Appartement Vue Mer Plateau',
            description: 'Magnifique F5 au Plateau, étage élevé avec ascenseur. Vue imprenable sur Gorée. Sécurité 24h, parking sous-sol. Cuisine entièrement équipée.',
            type: 'APARTMENT',
            transactionType: 'RENT',
            status: 'ACTIVE',
            price: 650000,
            surface: 220,
            bedrooms: 3,
            bathrooms: 3,
            floor: 8,
            address: 'Avenue Pasteur',
            city: 'Dakar',
            neighborhood: 'Dakar Plateau',
            postalCode: '10000',
            latitude: 14.6650,
            longitude: -17.4300,
            images: [
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Vue Mer', 'Ascenseur', 'Parking Sous-sol', 'Groupe'],
            featured: true,
            verified: true,
            ownerId: agent1.id,
            views: 2200
        },
        // --- VENTE (Saly) ---
        {
            title: 'Villa de Vacances à Saly Niakhniakhal',
            description: 'Charmante villa pied dans l\'eau à Saly. Piscine privative, jardin tropical. Vendue meublée. Excellent rendement locatif saisonnier.',
            type: 'VILLA',
            transactionType: 'SALE',
            status: 'ACTIVE',
            price: 110000000,
            surface: 800,
            bedrooms: 4,
            bathrooms: 4,
            address: 'Route des Hôtels',
            city: 'Saly',
            neighborhood: 'Saly Niakhniakhal',
            postalCode: '23000',
            latitude: 14.4400,
            longitude: -16.9900,
            images: [
                'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Pied dans l\'eau', 'Piscine', 'Meublé'],
            featured: false,
            verified: true,
            ownerId: owner1.id,
            views: 1800
        },
        // --- LOCATION (Maristes) ---
        {
            title: 'Appartement F3 Hann Maristes',
            description: 'Appartement propre et accessible. 2 chambres, salon, balcon. Immeuble sécurisé proche du Cours Sainte Marie de Hann.',
            type: 'APARTMENT',
            transactionType: 'RENT',
            status: 'ACTIVE',
            price: 150000,
            surface: 90,
            bedrooms: 2,
            bathrooms: 1,
            floor: 3,
            address: 'Maristes 2',
            city: 'Dakar',
            neighborhood: 'Hann Maristes',
            postalCode: '11000',
            latitude: 14.7300,
            longitude: -17.4300,
            images: [
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Gardiennage', 'Accessibilité'],
            featured: false,
            verified: false,
            ownerId: agent2.id,
            views: 750
        },
        // --- VENTE (Appartement VDN) ---
        {
            title: 'Appartement Neuf VDN Mermoz',
            description: 'Programme neuf sur la VDN. Appartement F4 de standing avec domotique. Livraison fin 2026. Paiement échelonné possible.',
            type: 'APARTMENT',
            transactionType: 'SALE',
            status: 'ACTIVE',
            price: 82500000,
            surface: 180,
            bedrooms: 3,
            bathrooms: 3,
            floor: 5,
            yearBuilt: 2024,
            address: 'VDN Mermoz',
            city: 'Dakar',
            neighborhood: 'Mermoz',
            postalCode: '11000',
            latitude: 14.7100,
            longitude: -17.4700,
            images: [
                'https://images.unsplash.com/photo-1502005229766-93976a171f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Domotique', 'Ascenseur', 'Salle de Sport'],
            featured: true,
            verified: true,
            ownerId: agent1.id,
            views: 3100
        },
        // --- VENTE (Thies) ---
        {
            title: 'Verger à Thiès (Pout)',
            description: 'Verger de 2 hectares à Pout avec manguiers (variété Kent) en production. Forage fonctionnel, clôturé. Idéal agrobusiness.',
            type: 'LAND',
            transactionType: 'SALE',
            status: 'ACTIVE',
            price: 22500000,
            surface: 20000,
            bedrooms: 0,
            bathrooms: 0,
            address: 'Sortie Pout',
            city: 'Thies',
            neighborhood: 'Pout',
            postalCode: '21000',
            latitude: 14.7600,
            longitude: -17.0500,
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Agricole', 'Forage', 'Clôturé'],
            featured: false,
            verified: true,
            ownerId: owner1.id,
            views: 400
        },
        // --- NOUVEAUTÉ : LOCATION (Mamelles) ---
        {
            title: 'Villa avec Piscine aux Mamelles',
            description: 'Superbe villa moderne 4 chambres, jardin arboré et piscine, proche du Phare. Quartier résidentiel très calme.',
            type: 'VILLA',
            transactionType: 'RENT',
            status: 'ACTIVE',
            price: 750000,
            surface: 300,
            bedrooms: 4,
            bathrooms: 4,
            address: 'Cité Cheminots, Mamelles',
            city: 'Dakar',
            neighborhood: 'Mamelles',
            postalCode: '12000',
            latitude: 14.7350,
            longitude: -17.5000,
            images: [
                'https://images.unsplash.com/photo-1600596542815-e325098d8521?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Piscine', 'Jardin', 'Calme'],
            featured: true,
            verified: true,
            ownerId: owner2.id,
            views: 1100
        },
        // --- NOUVEAUTÉ : VENTE (Point E) ---
        {
            title: 'Penthouse de Luxe Point E',
            description: 'Penthouse unique au dernier étage. Vue panoramique sur Dakar. Jacuzzi, terrasse de 100m². Prestations haut de gamme.',
            type: 'APARTMENT',
            transactionType: 'SALE',
            status: 'ACTIVE',
            price: 225000000,
            surface: 350,
            bedrooms: 3,
            bathrooms: 3,
            floor: 10,
            address: 'Rue de Kaolack',
            city: 'Dakar',
            neighborhood: 'Point E',
            postalCode: '11000',
            latitude: 14.6950,
            longitude: -17.4600,
            images: [
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Penthouse', 'Jacuzzi', 'Terrasse'],
            featured: true,
            verified: true,
            ownerId: agent1.id,
            views: 2900
        },
        // --- NOUVEAUTÉ : VENTE (Lac Rose) ---
        {
            title: 'Terrain Bambilor - Lac Rose',
            description: 'Parcelle de 500m2 titrée à Bambilor, à proximité du Lac Rose. Zone en plein développement, idéal construction future.',
            type: 'LAND',
            transactionType: 'SALE',
            status: 'ACTIVE',
            price: 3750000,
            surface: 500,
            bedrooms: 0,
            bathrooms: 0,
            address: 'Bambilor Centre',
            city: 'Rufisque',
            neighborhood: 'Lac Rose',
            postalCode: '20000',
            latitude: 14.7800,
            longitude: -17.2500,
            images: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Titre Foncier', 'Avenir'],
            featured: false,
            verified: true,
            ownerId: owner3.id,
            views: 560
        },
        // --- NOUVEAUTÉ : LOCATION (Bureau Sandaga) ---
        {
            title: 'Bureaux Open Space Plateau',
            description: 'Surface de bureau 200m2 aménageable en plein centre ville. Fibre optique, sécurité, groupe électrogène. Parfait pour PME.',
            type: 'COMMERCIAL',
            transactionType: 'RENT',
            status: 'ACTIVE',
            price: 500000,
            surface: 200,
            bedrooms: 0,
            bathrooms: 2,
            floor: 4,
            address: 'Avenue Pompidou',
            city: 'Dakar',
            neighborhood: 'Dakar Plateau',
            postalCode: '10000',
            latitude: 14.6700,
            longitude: -17.4350,
            images: [
                'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ],
            features: ['Bureaux', 'Centre Ville', 'Fibre'],
            featured: false,
            verified: true,
            ownerId: agent2.id,
            views: 800
        }
    ];

    for (const prop of propertiesData) {
        await prisma.property.create({
            data: prop
        });
    }

    console.log(`${propertiesData.length} propriétés créées.`);
    console.log('Peuplement terminé avec succès.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
