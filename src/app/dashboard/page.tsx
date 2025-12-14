'use client';

import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';
import PropertyCard from '@/components/PropertyCard';
import { api } from '@/lib/api-client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const { favorites } = useFavorites();
    const [savedProperties, setSavedProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (favorites.length === 0) {
                setSavedProperties([]);
                return;
            }

            setLoading(true);
            try {
                // Cast to any because api-client typing excludes 'ids' but backend supports it now
                const response = await api.properties.getAll({ ids: favorites.join(',') } as any);
                if (response.success) {
                    setSavedProperties(response.properties);
                }
            } catch (error) {
                console.error("Failed to load favorites", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [favorites]);

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>Mon Tableau de Bord</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
                <div style={{ borderRight: '1px solid #eee', paddingRight: '20px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '16px', color: '#006AFF' }}>Vue d'ensemble</div>
                    <div style={{ marginBottom: '16px', cursor: 'pointer', fontWeight: 'bold' }}>Maisons Sauvegardées ({savedProperties.length})</div>
                    <div style={{ marginBottom: '16px', cursor: 'pointer' }}>Recherches Sauvegardées</div>
                    <div style={{ marginBottom: '16px', cursor: 'pointer' }}>Ma Maison</div>
                    <div style={{ marginBottom: '16px', cursor: 'pointer' }}>Paramètres du Compte</div>
                </div>

                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Maisons Sauvegardées</h2>

                    {savedProperties.length === 0 ? (
                        <div style={{ padding: '40px', background: 'var(--muted)', borderRadius: 'var(--radius)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            Vous n'avez pas encore sauvegardé de maisons.
                            <br />
                            <Link href="/search" className="btn btn-primary" style={{ marginTop: '20px' }}>Commencer à chercher</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {savedProperties.map(property => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
