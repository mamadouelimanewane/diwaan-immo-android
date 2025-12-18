export interface Property {
    id: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    type: 'Maison' | 'Appartement' | 'Villa' | 'Terrain' | 'Bureau' | 'Local Commercial';
    imageUrl: string;
    lat: number;
    lng: number;
    description: string;
    features?: string[];
    agent: {
        name: string;
        phone: string;
        image: string;
    };
    listingType?: 'sale' | 'rent';
    pricePerMonth?: number;
}

export interface Agent {
    id: string;
    name: string;
    phone: string;
    email: string;
    image: string;
    agency: string;
    specialties: string[];
    languages: string[];
    bio: string;
    rating: number;
    reviewCount: number;
    propertiesSold: number;
    yearsExperience: number;
    location: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'USER' | 'AGENT' | 'ADMIN' | 'SELLER';
    avatar: string;
    location: string;
    nationality: string;
    createdAt: string;
}

// ============================================
// PROPRIÉTÉS À VENDRE - DAKAR
// ============================================
export const properties: Property[] = [
    // DAKAR - ALMADIES
    {
        id: '1',
        address: 'Route des Almadies, près du Radisson Blu',
        city: 'Dakar',
        state: 'DK',
        zip: '12000',
        price: 350000000,
        beds: 6,
        baths: 5,
        sqft: 650,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        lat: 14.7456,
        lng: -17.5144,
        description: 'Somptueuse villa de prestige aux Almadies avec vue panoramique sur l\'océan Atlantique. Piscine à débordement, jardin tropical de 500m², suite parentale avec dressing et jacuzzi privatif. Finitions exceptionnelles, domotique intégrée.',
        features: ['Piscine', 'Jardin', 'Garage 3 voitures', 'Domotique', 'Gardien 24/7', 'Vue mer'],
        agent: {
            name: 'Oumar Fall',
            phone: '+221 78 999 00 11',
            image: 'https://randomuser.me/api/portraits/men/45.jpg'
        }
    },
    {
        id: '2',
        address: 'Ngor Almadies, face à l\'île de Ngor',
        city: 'Dakar',
        state: 'DK',
        zip: '12000',
        price: 185000000,
        beds: 4,
        baths: 3,
        sqft: 320,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        lat: 14.7512,
        lng: -17.5089,
        description: 'Belle villa contemporaine à Ngor avec accès direct à la plage. Architecture moderne, grandes baies vitrées, terrasse panoramique. Quartier calme et sécurisé.',
        features: ['Accès plage', 'Terrasse', 'Climatisation centrale', 'Parking'],
        agent: {
            name: 'Mariama Sarr',
            phone: '+221 77 456 78 90',
            image: 'https://randomuser.me/api/portraits/women/33.jpg'
        }
    },
    // DAKAR - POINT E
    {
        id: '3',
        address: 'Avenue Cheikh Anta Diop, Point E',
        city: 'Dakar',
        state: 'DK',
        zip: '10000',
        price: 95000000,
        beds: 4,
        baths: 2,
        sqft: 220,
        type: 'Appartement',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        lat: 14.7087,
        lng: -17.4547,
        description: 'Superbe appartement haut standing au Point E, à proximité de l\'Université. Grand salon lumineux, cuisine équipée moderne, balcon avec vue sur la ville. Résidence sécurisée avec gardien.',
        features: ['Ascenseur', 'Parking souterrain', 'Gardien 24/7', 'Climatisation'],
        agent: {
            name: 'Amadou Sow',
            phone: '+221 70 555 66 77',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
    },
    // DAKAR - MERMOZ
    {
        id: '4',
        address: 'Rue MZ-45, Mermoz Pyrotechnie',
        city: 'Dakar',
        state: 'DK',
        zip: '10500',
        price: 145000000,
        beds: 5,
        baths: 4,
        sqft: 380,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        lat: 14.7156,
        lng: -17.4678,
        description: 'Villa familiale spacieuse à Mermoz, quartier résidentiel prisé. Jardin arboré, piscine privée, dépendances pour personnel de maison. Proche écoles internationales.',
        features: ['Piscine', 'Jardin 400m²', 'Dépendances', 'Groupe électrogène'],
        agent: {
            name: 'Cheikh Mbaye',
            phone: '+221 76 234 56 78',
            image: 'https://randomuser.me/api/portraits/men/55.jpg'
        }
    },
    // DAKAR - PLATEAU
    {
        id: '5',
        address: 'Avenue Léopold Sédar Senghor, Plateau',
        city: 'Dakar',
        state: 'DK',
        zip: '11000',
        price: 280000000,
        beds: 0,
        baths: 4,
        sqft: 500,
        type: 'Bureau',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        lat: 14.6697,
        lng: -17.4379,
        description: 'Immeuble de bureaux de prestige au cœur du Plateau, quartier des affaires de Dakar. Espace modulable, salle de conférence, parking privé. Idéal siège social.',
        features: ['Climatisation centrale', 'Ascenseur', 'Parking 20 places', 'Fibre optique'],
        agent: {
            name: 'Ibrahima Diallo',
            phone: '+221 77 888 99 00',
            image: 'https://randomuser.me/api/portraits/men/28.jpg'
        }
    },
    // DAKAR - SACRÉ-CŒUR
    {
        id: '6',
        address: 'Sacré-Cœur 3 VDN, près du Monument',
        city: 'Dakar',
        state: 'DK',
        zip: '10700',
        price: 68000000,
        beds: 3,
        baths: 2,
        sqft: 145,
        type: 'Appartement',
        imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        lat: 14.7234,
        lng: -17.4712,
        description: 'Appartement F4 moderne à Sacré-Cœur, proche VDN et centres commerciaux. Cuisine américaine, salon double, deux balcons. Parfait pour jeune famille.',
        features: ['Balcon', 'Cuisine équipée', 'Interphone', 'Cave'],
        agent: {
            name: 'Fatou Ndiaye',
            phone: '+221 76 890 12 34',
            image: 'https://randomuser.me/api/portraits/women/22.jpg'
        }
    },
    // DAKAR - OUAKAM
    {
        id: '7',
        address: 'Cité Avion, Ouakam',
        city: 'Dakar',
        state: 'DK',
        zip: '12100',
        price: 55000000,
        beds: 3,
        baths: 2,
        sqft: 130,
        type: 'Maison',
        imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        lat: 14.7289,
        lng: -17.4856,
        description: 'Maison traditionnelle rénovée à Ouakam, quartier authentique et vivant. Proche de la plage de Ouakam et du village Lébou. Idéal pour amateurs de vie locale.',
        features: ['Terrasse', 'Cour intérieure', 'Proche plage'],
        agent: {
            name: 'Moussa Diop',
            phone: '+221 77 123 45 67',
            image: 'https://randomuser.me/api/portraits/men/11.jpg'
        }
    },

    // ============================================
    // PROPRIÉTÉS À VENDRE - MBOUR / SALY
    // ============================================
    {
        id: '8',
        address: 'Saly Portudal, Zone Résidentielle Nord',
        city: 'Mbour',
        state: 'TH',
        zip: '23000',
        price: 125000000,
        beds: 4,
        baths: 3,
        sqft: 280,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=800',
        lat: 14.4436,
        lng: -17.0146,
        description: 'Magnifique villa à Saly, station balnéaire prisée. À 200m de la plage, piscine privée, jardin tropical. Parfait pour résidence secondaire ou investissement locatif touristique.',
        features: ['Piscine', 'Jardin tropical', 'Proche plage', 'Gardien'],
        agent: {
            name: 'Jean-Pierre Dubois',
            phone: '+221 77 567 89 01',
            image: 'https://randomuser.me/api/portraits/men/62.jpg'
        }
    },
    {
        id: '9',
        address: 'Saly Niakhniakhal, en front de mer',
        city: 'Mbour',
        state: 'TH',
        zip: '23000',
        price: 220000000,
        beds: 5,
        baths: 4,
        sqft: 420,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-22b4899e60a6?w=800',
        lat: 14.4512,
        lng: -17.0089,
        description: 'Villa de luxe en bord de mer à Saly Niakhniakhal. Accès direct plage privée, piscine infinity, vue exceptionnelle sur l\'océan. Construction récente, matériaux nobles.',
        features: ['Front de mer', 'Plage privée', 'Piscine infinity', 'Personnel de maison'],
        agent: {
            name: 'Sophie Martin',
            phone: '+221 76 345 67 89',
            image: 'https://randomuser.me/api/portraits/women/45.jpg'
        }
    },
    {
        id: '10',
        address: 'Saly Tapé, près du Golf',
        city: 'Mbour',
        state: 'TH',
        zip: '23000',
        price: 85000000,
        beds: 3,
        baths: 2,
        sqft: 180,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        lat: 14.4389,
        lng: -17.0234,
        description: 'Charmante villa à Saly Tapé, à proximité du golf. Cadre verdoyant et calme, idéal pour retraités ou télétravail. Proche commerces et restaurants.',
        features: ['Proche golf', 'Jardin', 'Quartier calme', 'Wifi fibre'],
        agent: {
            name: 'Patrick Lefebvre',
            phone: '+221 78 234 56 78',
            image: 'https://randomuser.me/api/portraits/men/52.jpg'
        }
    },
    {
        id: '11',
        address: 'Mbour Centre, Quartier Escale',
        city: 'Mbour',
        state: 'TH',
        zip: '23000',
        price: 35000000,
        beds: 4,
        baths: 2,
        sqft: 200,
        type: 'Maison',
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
        lat: 14.4167,
        lng: -16.9667,
        description: 'Grande maison au centre de Mbour, proche du marché aux poissons et de la gare routière. Idéal pour commerce ou famille nombreuse. Possibilité d\'extension.',
        features: ['Grand terrain', 'Proche marché', 'Potentiel commercial'],
        agent: {
            name: 'Abdoulaye Dieng',
            phone: '+221 77 678 90 12',
            image: 'https://randomuser.me/api/portraits/men/38.jpg'
        }
    },
    {
        id: '12',
        address: 'Ngaparou, route de Somone',
        city: 'Mbour',
        state: 'TH',
        zip: '23100',
        price: 45000000,
        beds: 2,
        baths: 1,
        sqft: 120,
        type: 'Maison',
        imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800',
        lat: 14.4234,
        lng: -16.9934,
        description: 'Petite maison cosy à Ngaparou, village de pêcheurs préservé à côté de Saly. Ambiance authentique, plage sauvage à 5 min. Idéal pour artistes ou retraités.',
        features: ['Village authentique', 'Proche plage', 'Calme absolu'],
        agent: {
            name: 'Marie-Claire Diop',
            phone: '+221 76 789 01 23',
            image: 'https://randomuser.me/api/portraits/women/55.jpg'
        }
    },
    {
        id: '13',
        address: 'La Somone, résidence Les Cocotiers',
        city: 'Mbour',
        state: 'TH',
        zip: '23100',
        price: 72000000,
        beds: 3,
        baths: 2,
        sqft: 160,
        type: 'Appartement',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        lat: 14.4789,
        lng: -17.0678,
        description: 'Bel appartement dans résidence sécurisée à La Somone. Vue sur la lagune, piscine commune, tennis. Environnement préservé, réserve naturelle à proximité.',
        features: ['Vue lagune', 'Piscine commune', 'Tennis', 'Résidence sécurisée'],
        agent: {
            name: 'Alain Rousseau',
            phone: '+221 77 890 12 34',
            image: 'https://randomuser.me/api/portraits/men/67.jpg'
        }
    },

    // ============================================
    // PROPRIÉTÉS À VENDRE - THIÈS
    // ============================================
    {
        id: '14',
        address: 'Cité Lamy, Thiès',
        city: 'Thiès',
        state: 'TH',
        zip: '21000',
        price: 45000000,
        beds: 4,
        baths: 2,
        sqft: 220,
        type: 'Maison',
        imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
        lat: 14.7886,
        lng: -16.9356,
        description: 'Belle maison familiale à Cité Lamy, quartier résidentiel de Thiès. Grand terrain, arbres fruitiers, dépendances. Proche gare TER et centre-ville.',
        features: ['Grand terrain 600m²', 'Arbres fruitiers', 'Dépendances', 'Proche TER'],
        agent: {
            name: 'Mamadou Sy',
            phone: '+221 77 345 67 89',
            image: 'https://randomuser.me/api/portraits/men/42.jpg'
        }
    },
    {
        id: '15',
        address: 'Thiès Nord, Zone des Niayes',
        city: 'Thiès',
        state: 'TH',
        zip: '21000',
        price: 18000000,
        beds: 0,
        baths: 0,
        sqft: 2500,
        type: 'Terrain',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
        lat: 14.8234,
        lng: -16.9123,
        description: 'Terrain agricole de 2500m² dans la zone des Niayes, réputée pour le maraîchage. Accès eau, proche route nationale. Idéal projet agricole ou éco-construction.',
        features: ['Terrain viabilisé', 'Accès eau', 'Zone agricole'],
        agent: {
            name: 'Ousmane Ba',
            phone: '+221 76 456 78 90',
            image: 'https://randomuser.me/api/portraits/men/25.jpg'
        }
    },
    {
        id: '16',
        address: 'Diamaguène, Thiès',
        city: 'Thiès',
        state: 'TH',
        zip: '21000',
        price: 28000000,
        beds: 3,
        baths: 1,
        sqft: 140,
        type: 'Maison',
        imageUrl: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800',
        lat: 14.7956,
        lng: -16.9267,
        description: 'Maison traditionnelle sénégalaise à Diamaguène. Cour intérieure ombragée, cuisine extérieure, puits. Authentique et charmante.',
        features: ['Cour intérieure', 'Cuisine extérieure', 'Puits'],
        agent: {
            name: 'Awa Gueye',
            phone: '+221 77 567 89 01',
            image: 'https://randomuser.me/api/portraits/women/35.jpg'
        }
    },
    {
        id: '17',
        address: 'Route de Dakar, entrée Thiès',
        city: 'Thiès',
        state: 'TH',
        zip: '21000',
        price: 120000000,
        beds: 0,
        baths: 2,
        sqft: 800,
        type: 'Local Commercial',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
        lat: 14.7734,
        lng: -16.9789,
        description: 'Grand local commercial en bordure de route nationale, forte visibilité. Idéal showroom automobile, supermarché ou entrepôt. Parking 30 places.',
        features: ['Visibilité route nationale', 'Parking 30 places', 'Grande surface'],
        agent: {
            name: 'Ibrahima Diallo',
            phone: '+221 77 888 99 00',
            image: 'https://randomuser.me/api/portraits/men/28.jpg'
        }
    },

    // ============================================
    // PROPRIÉTÉS SUPPLÉMENTAIRES - DAKAR
    // ============================================
    {
        id: '18',
        address: 'Fann Hock, près des Ambassades',
        city: 'Dakar',
        state: 'DK',
        zip: '10200',
        price: 175000000,
        beds: 5,
        baths: 4,
        sqft: 350,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        lat: 14.6856,
        lng: -17.4534,
        description: 'Élégante villa dans le quartier diplomatique de Fann Hock. Jardin clos, piscine, cuisine équipée haut de gamme. Sécurité renforcée, quartier très prisé des expatriés.',
        features: ['Quartier diplomatique', 'Piscine', 'Jardin clos', 'Sécurité renforcée'],
        agent: {
            name: 'Catherine Leroy',
            phone: '+221 78 123 45 67',
            image: 'https://randomuser.me/api/portraits/women/48.jpg'
        }
    },
    {
        id: '19',
        address: 'Liberté 6 Extension, VDN',
        city: 'Dakar',
        state: 'DK',
        zip: '10600',
        price: 52000000,
        beds: 2,
        baths: 1,
        sqft: 95,
        type: 'Appartement',
        imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        lat: 14.7189,
        lng: -17.4623,
        description: 'Appartement F3 idéal premier achat ou investissement locatif. Proche VDN et Sea Plaza. Résidence récente avec ascenseur et parking.',
        features: ['Résidence récente', 'Ascenseur', 'Parking', 'Proche centres commerciaux'],
        agent: {
            name: 'Modou Faye',
            phone: '+221 76 234 56 78',
            image: 'https://randomuser.me/api/portraits/men/36.jpg'
        }
    },
    {
        id: '20',
        address: 'Corniche des Almadies',
        city: 'Dakar',
        state: 'DK',
        zip: '12000',
        price: 450000000,
        beds: 7,
        baths: 6,
        sqft: 850,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        lat: 14.7523,
        lng: -17.5167,
        description: 'Exceptionnelle propriété sur la Corniche des Almadies. Vue à 180° sur l\'océan, accès plage privée, piscine, pool house, maison de gardien. Le summum du luxe à Dakar.',
        features: ['Vue 180° océan', 'Plage privée', 'Pool house', 'Maison gardien', 'Ascenseur privé'],
        agent: {
            name: 'Oumar Fall',
            phone: '+221 78 999 00 11',
            image: 'https://randomuser.me/api/portraits/men/45.jpg'
        }
    }
];

// ============================================
// AGENTS IMMOBILIERS
// ============================================
export const agents: Agent[] = [
    // AGENTS SÉNÉGALAIS - DAKAR
    {
        id: 'agent-1',
        name: 'Oumar Fall',
        phone: '+221 78 999 00 11',
        email: 'oumar.fall@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/men/45.jpg',
        agency: 'Diwaan Prestige',
        specialties: ['Villas de luxe', 'Biens de prestige', 'Investissement'],
        languages: ['Français', 'Wolof', 'Anglais'],
        bio: 'Expert en immobilier de luxe depuis 15 ans, Oumar accompagne une clientèle exigeante dans l\'acquisition de propriétés d\'exception à Dakar.',
        rating: 4.9,
        reviewCount: 127,
        propertiesSold: 89,
        yearsExperience: 15,
        location: 'Almadies, Dakar'
    },
    {
        id: 'agent-2',
        name: 'Fatou Ndiaye',
        phone: '+221 76 890 12 34',
        email: 'fatou.ndiaye@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/women/22.jpg',
        agency: 'Diwaan Immobilier',
        specialties: ['Appartements', 'Résidentiel', 'Location'],
        languages: ['Français', 'Wolof', 'Anglais'],
        bio: 'Spécialiste du marché résidentiel dakarois, Fatou aide les familles à trouver leur logement idéal depuis 8 ans.',
        rating: 4.8,
        reviewCount: 94,
        propertiesSold: 156,
        yearsExperience: 8,
        location: 'Sacré-Cœur, Dakar'
    },
    {
        id: 'agent-3',
        name: 'Amadou Sow',
        phone: '+221 70 555 66 77',
        email: 'amadou.sow@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        agency: 'Diwaan Business',
        specialties: ['Bureaux', 'Locaux commerciaux', 'Investissement'],
        languages: ['Français', 'Wolof', 'Anglais', 'Arabe'],
        bio: 'Ancien banquier reconverti dans l\'immobilier d\'entreprise, Amadou conseille entreprises et investisseurs depuis 12 ans.',
        rating: 4.7,
        reviewCount: 68,
        propertiesSold: 45,
        yearsExperience: 12,
        location: 'Plateau, Dakar'
    },
    {
        id: 'agent-4',
        name: 'Mariama Sarr',
        phone: '+221 77 456 78 90',
        email: 'mariama.sarr@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/women/33.jpg',
        agency: 'Diwaan Prestige',
        specialties: ['Villas', 'Résidences secondaires', 'Expatriés'],
        languages: ['Français', 'Wolof', 'Anglais', 'Espagnol'],
        bio: 'Mariama accompagne particulièrement les expatriés et la diaspora dans leurs projets immobiliers au Sénégal.',
        rating: 4.9,
        reviewCount: 112,
        propertiesSold: 78,
        yearsExperience: 10,
        location: 'Ngor, Dakar'
    },
    // AGENTS EXPATRIÉS - SALY/MBOUR
    {
        id: 'agent-5',
        name: 'Jean-Pierre Dubois',
        phone: '+221 77 567 89 01',
        email: 'jp.dubois@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/men/62.jpg',
        agency: 'Diwaan Petite Côte',
        specialties: ['Résidences secondaires', 'Investissement locatif', 'Retraités'],
        languages: ['Français', 'Anglais'],
        bio: 'Installé à Saly depuis 20 ans, Jean-Pierre connaît parfaitement le marché de la Petite Côte et accompagne les Européens dans leur installation.',
        rating: 4.8,
        reviewCount: 89,
        propertiesSold: 134,
        yearsExperience: 20,
        location: 'Saly, Mbour'
    },
    {
        id: 'agent-6',
        name: 'Sophie Martin',
        phone: '+221 76 345 67 89',
        email: 'sophie.martin@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
        agency: 'Diwaan Petite Côte',
        specialties: ['Villas bord de mer', 'Luxe', 'Programmes neufs'],
        languages: ['Français', 'Anglais', 'Allemand'],
        bio: 'Ancienne architecte d\'intérieur, Sophie conseille ses clients sur le potentiel des biens et les aide à réaliser leur rêve de maison au soleil.',
        rating: 4.9,
        reviewCount: 76,
        propertiesSold: 67,
        yearsExperience: 12,
        location: 'Saly Niakhniakhal, Mbour'
    },
    {
        id: 'agent-7',
        name: 'Patrick Lefebvre',
        phone: '+221 78 234 56 78',
        email: 'patrick.lefebvre@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/men/52.jpg',
        agency: 'Diwaan Golf & Résidences',
        specialties: ['Golfs', 'Résidences haut de gamme', 'Gestion locative'],
        languages: ['Français', 'Anglais'],
        bio: 'Passionné de golf, Patrick s\'est spécialisé dans les résidences autour des golfs de Saly et gère un portefeuille de biens en location saisonnière.',
        rating: 4.6,
        reviewCount: 54,
        propertiesSold: 45,
        yearsExperience: 8,
        location: 'Saly Tapé, Mbour'
    },
    // AGENTS SÉNÉGALAIS - MBOUR/THIÈS
    {
        id: 'agent-8',
        name: 'Abdoulaye Dieng',
        phone: '+221 77 678 90 12',
        email: 'abdoulaye.dieng@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/men/38.jpg',
        agency: 'Diwaan Mbour',
        specialties: ['Maisons traditionnelles', 'Terrains', 'Commercial'],
        languages: ['Français', 'Wolof', 'Sérère'],
        bio: 'Natif de Mbour, Abdoulaye connaît chaque quartier de la ville et aide ses clients à trouver des opportunités locales.',
        rating: 4.5,
        reviewCount: 42,
        propertiesSold: 87,
        yearsExperience: 15,
        location: 'Mbour Centre'
    },
    {
        id: 'agent-9',
        name: 'Mamadou Sy',
        phone: '+221 77 345 67 89',
        email: 'mamadou.sy@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/men/42.jpg',
        agency: 'Diwaan Thiès',
        specialties: ['Résidentiel', 'Terrains', 'Agriculture'],
        languages: ['Français', 'Wolof'],
        bio: 'Agent principal de Diwaan à Thiès, Mamadou accompagne le développement immobilier de la deuxième ville du Sénégal.',
        rating: 4.7,
        reviewCount: 38,
        propertiesSold: 92,
        yearsExperience: 11,
        location: 'Thiès Centre'
    },
    {
        id: 'agent-10',
        name: 'Awa Gueye',
        phone: '+221 77 567 89 01',
        email: 'awa.gueye@diwaan.sn',
        image: 'https://randomuser.me/api/portraits/women/35.jpg',
        agency: 'Diwaan Thiès',
        specialties: ['Maisons familiales', 'Premier achat', 'Location'],
        languages: ['Français', 'Wolof'],
        bio: 'Awa aide les jeunes familles thiéssoises à accéder à la propriété avec des solutions adaptées à leur budget.',
        rating: 4.8,
        reviewCount: 56,
        propertiesSold: 78,
        yearsExperience: 7,
        location: 'Thiès'
    }
];

// ============================================
// UTILISATEURS (Démo)
// ============================================
export const users: User[] = [
    // ADMINISTRATEURS
    {
        id: 'admin-1',
        name: 'Mamadou Dia',
        email: 'admin@diwaan.sn',
        phone: '+221 77 752 92 88',
        role: 'ADMIN',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        location: 'Dakar, Sénégal',
        nationality: 'Sénégalaise',
        createdAt: '2024-01-15'
    },
    {
        id: 'admin-2',
        name: 'Aissatou Diallo',
        email: 'aissatou.diallo@diwaan.sn',
        phone: '+221 76 123 45 67',
        role: 'ADMIN',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        location: 'Dakar, Sénégal',
        nationality: 'Sénégalaise',
        createdAt: '2024-02-01'
    },
    // VENDEURS SÉNÉGALAIS
    {
        id: 'seller-1',
        name: 'Cheikh Mbacké Diop',
        email: 'cheikh.diop@gmail.com',
        phone: '+221 77 234 56 78',
        role: 'SELLER',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
        location: 'Almadies, Dakar',
        nationality: 'Sénégalaise',
        createdAt: '2024-03-10'
    },
    {
        id: 'seller-2',
        name: 'Ndèye Fatou Mbaye',
        email: 'ndeye.mbaye@yahoo.fr',
        phone: '+221 76 345 67 89',
        role: 'SELLER',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        location: 'Mermoz, Dakar',
        nationality: 'Sénégalaise',
        createdAt: '2024-04-22'
    },
    // VENDEURS EXPATRIÉS
    {
        id: 'seller-3',
        name: 'Michel Durand',
        email: 'michel.durand@orange.fr',
        phone: '+221 77 456 78 90',
        role: 'SELLER',
        avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
        location: 'Saly, Mbour',
        nationality: 'Française',
        createdAt: '2024-02-28'
    },
    {
        id: 'seller-4',
        name: 'Helga Schmidt',
        email: 'helga.schmidt@web.de',
        phone: '+221 78 567 89 01',
        role: 'SELLER',
        avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
        location: 'Ngaparou, Mbour',
        nationality: 'Allemande',
        createdAt: '2024-05-15'
    },
    // UTILISATEURS/ACHETEURS
    {
        id: 'user-1',
        name: 'Ibrahima Seck',
        email: 'ibrahima.seck@gmail.com',
        phone: '+221 70 678 90 12',
        role: 'USER',
        avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
        location: 'Thiès, Sénégal',
        nationality: 'Sénégalaise',
        createdAt: '2024-06-01'
    },
    {
        id: 'user-2',
        name: 'Aminata Touré',
        email: 'aminata.toure@hotmail.com',
        phone: '+221 76 789 01 23',
        role: 'USER',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        location: 'Point E, Dakar',
        nationality: 'Sénégalaise',
        createdAt: '2024-05-20'
    },
    {
        id: 'user-3',
        name: 'Pierre Moreau',
        email: 'pierre.moreau@gmail.com',
        phone: '+33 6 12 34 56 78',
        role: 'USER',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        location: 'Lyon, France',
        nationality: 'Française',
        createdAt: '2024-04-10'
    },
    {
        id: 'user-4',
        name: 'Ousmane Ndiaye',
        email: 'ousmane.ndiaye@senelec.sn',
        phone: '+221 77 890 12 34',
        role: 'USER',
        avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
        location: 'Sacré-Cœur, Dakar',
        nationality: 'Sénégalaise',
        createdAt: '2024-03-25'
    },
    {
        id: 'user-5',
        name: 'Marie-Louise Diatta',
        email: 'ml.diatta@gmail.com',
        phone: '+221 76 901 23 45',
        role: 'USER',
        avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
        location: 'Ziguinchor, Sénégal',
        nationality: 'Sénégalaise',
        createdAt: '2024-06-10'
    }
];

// ============================================
// PROPRIÉTÉS EN LOCATION
// ============================================
export const rentalProperties: Property[] = [
    {
        id: 'rent-1',
        address: 'Résidence Le Phare, Almadies',
        city: 'Dakar',
        state: 'DK',
        zip: '12000',
        price: 1500000,
        pricePerMonth: 1500000,
        beds: 3,
        baths: 2,
        sqft: 180,
        type: 'Appartement',
        listingType: 'rent',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        lat: 14.7445,
        lng: -17.5123,
        description: 'Superbe appartement meublé aux Almadies avec vue sur mer. Résidence avec piscine et salle de sport. Idéal expatriés.',
        features: ['Meublé', 'Vue mer', 'Piscine', 'Salle de sport', 'Gardien 24/7'],
        agent: {
            name: 'Mariama Sarr',
            phone: '+221 77 456 78 90',
            image: 'https://randomuser.me/api/portraits/women/33.jpg'
        }
    },
    {
        id: 'rent-2',
        address: 'Villa Les Palmiers, Saly',
        city: 'Mbour',
        state: 'TH',
        zip: '23000',
        price: 850000,
        pricePerMonth: 850000,
        beds: 4,
        baths: 3,
        sqft: 280,
        type: 'Villa',
        listingType: 'rent',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-22b4899e60a6?w=800',
        lat: 14.4456,
        lng: -17.0189,
        description: 'Villa avec piscine privée à Saly, location à l\'année ou saisonnière. Jardin tropical, proche plage et commerces.',
        features: ['Piscine privée', 'Jardin', 'Proche plage', 'Climatisation'],
        agent: {
            name: 'Jean-Pierre Dubois',
            phone: '+221 77 567 89 01',
            image: 'https://randomuser.me/api/portraits/men/62.jpg'
        }
    },
    {
        id: 'rent-3',
        address: 'Plateau, près Indépendance',
        city: 'Dakar',
        state: 'DK',
        zip: '11000',
        price: 2500000,
        pricePerMonth: 2500000,
        beds: 0,
        baths: 2,
        sqft: 300,
        type: 'Bureau',
        listingType: 'rent',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        lat: 14.6712,
        lng: -17.4389,
        description: 'Bureaux modernes au cœur du Plateau, quartier des affaires. Open space ou cloisonné selon besoins. Parking inclus.',
        features: ['Open space', 'Climatisation centrale', 'Parking 5 places', 'Fibre optique'],
        agent: {
            name: 'Amadou Sow',
            phone: '+221 70 555 66 77',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
    },
    {
        id: 'rent-4',
        address: 'Mermoz Pyrotechnie',
        city: 'Dakar',
        state: 'DK',
        zip: '10500',
        price: 950000,
        pricePerMonth: 950000,
        beds: 4,
        baths: 3,
        sqft: 250,
        type: 'Villa',
        listingType: 'rent',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        lat: 14.7189,
        lng: -17.4698,
        description: 'Belle villa familiale à Mermoz, quartier calme et sécurisé. Jardin, garage, dépendances. Proche écoles internationales.',
        features: ['Jardin', 'Garage 2 voitures', 'Dépendances', 'Quartier résidentiel'],
        agent: {
            name: 'Fatou Ndiaye',
            phone: '+221 76 890 12 34',
            image: 'https://randomuser.me/api/portraits/women/22.jpg'
        }
    },
    {
        id: 'rent-5',
        address: 'Sacré-Cœur 3',
        city: 'Dakar',
        state: 'DK',
        zip: '10700',
        price: 450000,
        pricePerMonth: 450000,
        beds: 2,
        baths: 1,
        sqft: 85,
        type: 'Appartement',
        listingType: 'rent',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        lat: 14.7256,
        lng: -17.4734,
        description: 'Appartement F3 fonctionnel à Sacré-Cœur, proche VDN. Résidence sécurisée, parking. Idéal jeune couple ou étudiant.',
        features: ['Résidence sécurisée', 'Parking', 'Proche transports'],
        agent: {
            name: 'Modou Faye',
            phone: '+221 76 234 56 78',
            image: 'https://randomuser.me/api/portraits/men/36.jpg'
        }
    },
    {
        id: 'rent-6',
        address: 'Somone, face lagune',
        city: 'Mbour',
        state: 'TH',
        zip: '23100',
        price: 600000,
        pricePerMonth: 600000,
        beds: 2,
        baths: 1,
        sqft: 100,
        type: 'Appartement',
        listingType: 'rent',
        imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        lat: 14.4812,
        lng: -17.0712,
        description: 'Appartement avec vue imprenable sur la lagune de Somone. Cadre exceptionnel, calme absolu. Location longue durée.',
        features: ['Vue lagune', 'Terrasse', 'Résidence calme'],
        agent: {
            name: 'Alain Rousseau',
            phone: '+221 77 890 12 34',
            image: 'https://randomuser.me/api/portraits/men/67.jpg'
        }
    }
];

// Fonction utilitaire pour formater les prix en FCFA
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-SN', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price).replace('XOF', 'FCFA');
}

// Fonction pour obtenir toutes les propriétés (vente + location)
export function getAllProperties(): Property[] {
    return [...properties, ...rentalProperties];
}
