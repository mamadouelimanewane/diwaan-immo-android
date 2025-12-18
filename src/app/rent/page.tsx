'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import { rentalProperties } from '@/lib/data';

// Convert static data to API format once
const staticRentalsConverted = rentalProperties.map(p => ({
    id: p.id,
    title: p.address,
    address: p.address,
    city: p.city,
    price: p.pricePerMonth || p.price,
    bedrooms: p.beds,
    bathrooms: p.baths,
    surface: p.sqft,
    images: [p.imageUrl],
    description: p.description
}));

export default function RentPage() {
    // Initialize with static data immediately
    const [rentals, setRentals] = useState<any[]>(staticRentalsConverted);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Try to fetch from API
                const response = await api.properties.getAll({ transactionType: 'RENT' });
                if (response.success && response.properties && response.properties.length > 0) {
                    setRentals(response.properties);
                }
                // If API returns empty, we keep the static data already set
            } catch (error) {
                console.error("API unavailable, using static data:", error);
                // Keep static data on error
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return (
            <div className="container" style={{ padding: '40px 24px', textAlign: 'center' }}>
                <p>Chargement des locations...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Location</h1>

            {rentals.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>
                    <h3>Aucune location disponible pour le moment.</h3>
                    <p>Revenez plus tard ou publiez votre propre annonce !</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {rentals.map(property => (
                        <Link href={`/homes/${property.id}`} key={property.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ height: '200px', background: '#eee', position: 'relative' }}>
                                {property.images && property.images.length > 0 ? (
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
                                        Pas d'image
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '16px' }}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{property.price?.toLocaleString()} FCFA/mois</div>
                                <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                                    {property.bedrooms} ch | {property.bathrooms} sdb | {property.surface} m²
                                </div>
                                <div style={{ fontWeight: '500' }}>{property.title}</div>
                                <div style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>
                                    {property.address}, {property.city}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

