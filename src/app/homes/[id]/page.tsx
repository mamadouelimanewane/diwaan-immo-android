// import { prisma } from '@/lib/prisma'; // COMMENTED FOR DEPLOYMENT
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import { Bed, Bath, Maximize, Home, Calendar, Thermometer } from 'lucide-react';
import dynamic from 'next/dynamic';

const VirtualTour = dynamic(() => import('@/components/VirtualTour'), { ssr: false });
const FlyoverMap = dynamic(() => import('@/components/map/FlyoverMap'), { ssr: false });

// Force dynamic rendering
export const dynamicParams = true;
export const revalidate = 0;

// COMMENTED FOR DEPLOYMENT - was causing build failures
/*
export async function generateStaticParams() {
    try {
        // Only generate params for a few recent properties to speed up build
        // Wrap in timeout or try/catch to ensure build doesn't fail if DB is unreachable (e.g. Vercel build)
        const properties = await prisma.property.findMany({ select: { id: true }, take: 10 });
        return properties.map((property) => ({
            id: property.id,
        }));
    } catch (error) {
        console.warn("Could not fetch properties for static generation (Database might be unreachable during build). Skipping static generation for individual pages.");
        return [];
    }
}
*/

export default async function PropertyPage({ params }: { params: { id: string } }) {
    // TEMPORARY MOCK FOR DEPLOYMENT - Real data will be restored after successful deployment
    const mockProperty = {
        id: params.id,
        title: "Appartement F3 Mermoz",
        description: "Appartement familial idéalement situé proche des écoles et commerces. 3 chambres spacieuses avec balcon, cuisine équipée, parking sécurisé. Parfait pour une famille.",
        price: 400000, // 400K FCFA/mois
        images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&q=80"
        ],
        bedrooms: 3,
        bathrooms: 2,
        surface: 95,
        address: "Cité Mermoz",
        city: "Dakar",
        type: "APARTMENT",
        transactionType: "RENT",
        latitude: 14.7047,
        longitude: -17.4578,
        postalCode: "10000",
        yearBuilt: 2018,
        owner: {
            name: "Cheikh Sy",
            phone: "+221 77 456 78 90",
            avatar: "/default-avatar.png"
        }
    };

    const property = mockProperty;
    const similarPropertiesData: any[] = [];

    // Mapping helper
    const mapProperty = (p: any) => ({
        ...p,
        imageUrl: p.images && p.images.length > 0 ? p.images[0] : '/placeholder.jpg',
        beds: p.bedrooms || 0,
        baths: p.bathrooms || 0,
        sqft: p.surface || 0,
        lat: p.latitude || 14.6928, // Default Dakar
        lng: p.longitude || -17.4730,
        state: 'DK', // Default
        zip: p.postalCode || '10000',
        agent: {
            name: p.owner?.name || 'Agent',
            phone: p.owner?.phone || 'N/A',
            image: p.owner?.avatar || '/default-avatar.png'
        }
    });

    const displayProperty = mapProperty(property);
    const similarProperties = similarPropertiesData.map(mapProperty);

    return (
        <div className={styles.container}>
            <Gallery images={property.images.length > 0 ? property.images : [
                "/placeholder.jpg",
                "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            ]} />

            <div className={styles.contentGrid}>
                <div className={styles.mainContent}>
                    <div className={styles.header}>
                        <div className={styles.price}>{displayProperty.price.toLocaleString()} FCFA</div>
                        <div className={styles.stats}>
                            {displayProperty.beds} ch | {displayProperty.baths} sdb | {displayProperty.sqft} m²
                        </div>
                        <div className={styles.address}>
                            {displayProperty.address}, {displayProperty.city}, {displayProperty.state} {displayProperty.zip}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Description</h2>
                        <p className={styles.description}>{displayProperty.description}</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Caractéristiques</h2>
                        <div className={styles.factGrid}>
                            <div className={styles.factItem}>
                                <Home size={20} />
                                <span>{displayProperty.type}</span>
                            </div>
                            <div className={styles.factItem}>
                                <Calendar size={20} />
                                <span>Construit en {displayProperty.yearBuilt || 2020}</span>
                            </div>
                            <div className={styles.factItem}>
                                <Thermometer size={20} />
                                <span>Climatisation</span>
                            </div>
                            <div className={styles.factItem}>
                                <Maximize size={20} />
                                <span>{displayProperty.sqft > 0 ? Math.round(displayProperty.price / displayProperty.sqft).toLocaleString() : 'N/A'} FCFA/m²</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Visite Virtuelle 3D</h2>
                        <p style={{ marginBottom: '16px', color: '#666' }}>Explorez l'intérieur comme si vous y étiez.</p>
                        <VirtualTour />
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Localisation et Survol Aérien</h2>
                        <p style={{ marginBottom: '16px', color: '#666' }}>Découvrez le quartier avec notre vue immersive.</p>
                        <FlyoverMap center={[displayProperty.lat, displayProperty.lng]} zoom={15} />
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Biens Similaires</h2>
                        <b style={{ display: 'block', marginBottom: '16px' }}>Vous aimerez aussi :</b>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                            {similarProperties.map(sim => (
                                <div key={sim.id} style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                                    <a href={`/homes/${sim.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img src={sim.imageUrl} alt={sim.address} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                        <div style={{ padding: '12px' }}>
                                            <div style={{ fontWeight: 'bold' }}>{sim.price.toLocaleString()} FCFA</div>
                                            <div style={{ fontSize: '14px', color: '#666' }}>{sim.beds} ch | {sim.city}</div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <ContactForm
                        agentName={displayProperty.agent.name}
                        agentPhone={displayProperty.agent.phone}
                        agentImage={displayProperty.agent.image}
                        propertyAddress={displayProperty.address}
                        propertyId={displayProperty.id}
                    />
                </div>
            </div>
        </div>
    );
}
