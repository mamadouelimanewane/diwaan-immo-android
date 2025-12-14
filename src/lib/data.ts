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
    type: 'Maison' | 'Appartement' | 'Villa' | 'Terrain';
    imageUrl: string;
    lat: number;
    lng: number;
    description: string;
    agent: {
        name: string;
        phone: string;
        image: string;
    };
}

export const properties: Property[] = [
    {
        id: '1',
        address: 'Corniche Ouest',
        city: 'Dakar',
        state: 'DK',
        zip: '10000',
        price: 125000000,
        beds: 4,
        baths: 3,
        sqft: 350,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-22b4899e60a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        lat: 14.6928,
        lng: -17.4730,
        description: 'Magnifique villa avec vue sur mer sur la Corniche Ouest. Piscine à débordement, jardin luxuriant et finitions haut de gamme.',
        agent: {
            name: 'Moussa Diop',
            phone: '+221 77 123 45 67',
            image: 'https://randomuser.me/api/portraits/men/11.jpg'
        }
    },
    {
        id: '2',
        address: 'Saly Portudal',
        city: 'Mbour',
        state: 'TH',
        zip: '23000',
        price: 42500000,
        beds: 3,
        baths: 2,
        sqft: 200,
        type: 'Maison',
        imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        lat: 14.4436,
        lng: -17.0146,
        description: 'Charmante résidence secondaire à Saly, proche de la plage. Idéal pour les vacances ou investissement locatif.',
        agent: {
            name: 'Fatou Ndiaye',
            phone: '+221 76 890 12 34',
            image: 'https://randomuser.me/api/portraits/women/22.jpg'
        }
    },
    {
        id: '3',
        address: 'Point E',
        city: 'Dakar',
        state: 'DK',
        zip: '10000',
        price: 75000000,
        beds: 3,
        baths: 2,
        sqft: 180,
        type: 'Appartement',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        lat: 14.7087,
        lng: -17.4547,
        description: 'Appartement moderne au cœur du quartier résidentiel de Point E. Sécurité 24/7, parking souterrain.',
        agent: {
            name: 'Amadou Sow',
            phone: '+221 70 555 66 77',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
    },
    {
        id: '4',
        address: 'Ndar Toute',
        city: 'Saint-Louis',
        state: 'SL',
        zip: '32000',
        price: 30000000,
        beds: 5,
        baths: 3,
        sqft: 300,
        type: 'Maison',
        imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        lat: 16.0326,
        lng: -16.5133,
        description: 'Grande maison familiale à Saint-Louis avec architecture coloniale rénovée. Cour intérieure spacieuse.',
        agent: {
            name: 'Aissatou Diallo',
            phone: '+221 77 222 33 44',
            image: 'https://randomuser.me/api/portraits/women/68.jpg'
        }
    },
    {
        id: '5',
        address: 'Almadies',
        city: 'Dakar',
        state: 'DK',
        zip: '12000',
        price: 225000000,
        beds: 6,
        baths: 5,
        sqft: 600,
        type: 'Villa',
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        lat: 14.7456,
        lng: -17.5144,
        description: 'Villa de prestige aux Almadies. Piscine, salle de sport, vue imprenable. Le luxe absolu à Dakar.',
        agent: {
            name: 'Oumar Fall',
            phone: '+221 78 999 00 11',
            image: 'https://randomuser.me/api/portraits/men/45.jpg'
        }
    }
];
