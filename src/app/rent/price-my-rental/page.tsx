'use client';

import { useState } from 'react';

export default function PriceMyRentalPage() {
    const [price, setPrice] = useState<number | null>(null);

    const handleEstimate = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock estimate
        setTimeout(() => setPrice(450000), 1000);
    };

    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Estimer mon Loyer</h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                Découvrez combien vous pourriez louer votre bien immobilier au Sénégal.
            </p>

            <form onSubmit={handleEstimate} style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
                <input
                    type="text"
                    placeholder="Adresse de votre bien (ex: Mermoz, Dakar)"
                    style={{ flex: 1, padding: '16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0 32px' }}>Estimer</button>
            </form>

            {price && (
                <div style={{ background: '#e6f0ff', padding: '32px', borderRadius: '12px', border: '1px solid #b3d1ff', textAlign: 'center', animation: 'fadeIn 0.5s' }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Loyer Mensuel Estimé</div>
                    <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#006AFF', marginBottom: '16px' }}>
                        {price.toLocaleString('fr-FR')} FCFA
                    </div>
                    <p>Ce montant est basé sur les locations similaires dans votre quartier.</p>
                </div>
            )}

            <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Pourquoi utiliser Diwaan ?</h3>
                    <ul style={{ lineHeight: 1.8, color: '#444', paddingLeft: '20px' }}>
                        <li>Données basées sur des milliers d'annonces réelles.</li>
                        <li>Ajustement selon les caractéristiques (meublé, piscine...).</li>
                        <li>Outil utilisé par les professionnels de l'immobilier.</li>
                    </ul>
                </div>
                <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Prêt à louer ?</h3>
                    <p style={{ marginBottom: '16px', color: '#444' }}>Une fois votre prix fixé, utilisez nos outils de gestion pour trouver le locataire idéal.</p>
                    <a href="/rent/manager/list" className="btn btn-outline">Publier une annonce gratuite</a>
                </div>
            </div>
        </div>
    );
}
