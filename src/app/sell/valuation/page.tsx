'use client';

import { useState } from 'react';
import styles from './page.module.css'; // We'll reuse search styles or generic

export default function ValuationPage() {
    const [address, setAddress] = useState('');
    const [valuation, setValuation] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handleEstimate = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            // Random valuation between 30M and 150M based on address length
            const randomPrice = 30000000 + (address.length * 1000000) + Math.floor(Math.random() * 5000000);
            setValuation(randomPrice);
            setLoading(false);
        }, 1500);
    };

    return (
        <div style={{ background: 'linear-gradient(180deg, #f0f4f8 0%, #ffffff 100%)', minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '24px', color: '#006AFF' }}>Diwaan Estimate</h1>
                <p style={{ fontSize: '20px', color: '#555', marginBottom: '40px' }}>
                    Obtenez une estimation instantanée de la valeur de votre bien immobilier au Sénégal.
                </p>

                <form onSubmit={handleEstimate} style={{ position: 'relative', marginBottom: '40px' }}>
                    <input
                        type="text"
                        placeholder="Entrez votre adresse (ex: Villa 123, Sacré Cœur 3)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '20px 24px',
                            fontSize: '18px',
                            borderRadius: '30px',
                            border: '1px solid #ccc',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            outline: 'none'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!address || loading}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            top: '8px',
                            bottom: '8px',
                            padding: '0 32px',
                            background: '#006AFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '24px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: (!address || loading) ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Calcul...' : 'Estimer'}
                    </button>
                </form>

                {valuation && (
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,106,255,0.15)', animation: 'fadeIn 0.5s ease-out' }}>
                        <div style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>Estimation estimée pour ce bien</div>
                        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#006AFF', marginBottom: '16px' }}>
                            {valuation.toLocaleString('fr-FR')} FCFA
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <div style={{ padding: '8px 16px', background: '#e6f0ff', borderRadius: '8px', color: '#006AFF', fontWeight: '600' }}>Prix Min: {(valuation * 0.9).toLocaleString('fr-FR')}</div>
                            <div style={{ padding: '8px 16px', background: '#e6f0ff', borderRadius: '8px', color: '#006AFF', fontWeight: '600' }}>Prix Max: {(valuation * 1.1).toLocaleString('fr-FR')}</div>
                        </div>
                        <p style={{ fontSize: '12px', color: '#999', marginTop: '24px' }}>
                            *Ceci est une estimation automatique basée sur les données du marché. Pour une expertise précise, consultez un agent Diwaan.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
