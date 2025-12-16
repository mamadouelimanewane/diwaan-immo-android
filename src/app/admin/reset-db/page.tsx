'use client';

import { useState } from 'react';

export default function ResetDBPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleReset = async () => {
        if (!confirm('⚠️ ATTENTION: Ceci va SUPPRIMER toutes les propriétés et en créer 6 nouvelles avec prix corrects. Continuer ?')) {
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('/api/admin/reset-db', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer diwaan-admin-2024-secure-token-789xyz',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de la réinitialisation');
            }

            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                🔧 Réinitialisation Base de Données
            </h1>

            <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                <h3 style={{ color: '#856404', marginBottom: '10px' }}>⚠️ ATTENTION</h3>
                <p style={{ color: '#856404', marginBottom: '10px' }}>Cette action va :</p>
                <ul style={{ color: '#856404', marginLeft: '20px' }}>
                    <li>SUPPRIMER toutes les propriétés existantes</li>
                    <li>CRÉER 6 nouvelles propriétés avec prix corrects</li>
                    <li>4 locations (200K - 750K FCFA/mois)</li>
                    <li>2 ventes (9M - 425M FCFA)</li>
                </ul>
            </div>

            <button
                onClick={handleReset}
                disabled={loading}
                style={{
                    background: loading ? '#ccc' : '#dc3545',
                    color: 'white',
                    padding: '15px 30px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginBottom: '30px'
                }}
            >
                {loading ? '⏳ Réinitialisation en cours...' : '🔄 RÉINITIALISER LA BASE DE DONNÉES'}
            </button>

            {result && (
                <div style={{ background: '#d4edda', border: '1px solid #28a745', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ color: '#155724', marginBottom: '15px' }}>✅ SUCCÈS !</h3>
                    <div style={{ color: '#155724' }}>
                        <p><strong>Message :</strong> {result.message}</p>
                        <p><strong>Propriétés supprimées :</strong> {result.stats?.deleted || 0}</p>
                        <p><strong>Propriétés créées :</strong> {result.stats?.created || 0}</p>
                        <p><strong>Locations :</strong> {result.stats?.locations || 0} (200K - 750K FCFA)</p>
                        <p><strong>Ventes :</strong> {result.stats?.ventes || 0}</p>
                    </div>
                    <a
                        href="/rent"
                        style={{
                            display: 'inline-block',
                            marginTop: '15px',
                            background: '#28a745',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            textDecoration: 'none'
                        }}
                    >
                        ✓ Voir les locations
                    </a>
                </div>
            )}

            {error && (
                <div style={{ background: '#f8d7da', border: '1px solid #dc3545', padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ color: '#721c24', marginBottom: '10px' }}>❌ ERREUR</h3>
                    <p style={{ color: '#721c24' }}>{error}</p>
                    <div style={{ marginTop: '15px', color: '#721c24' }}>
                        <p><strong>Solutions :</strong></p>
                        <ul style={{ marginLeft: '20px' }}>
                            <li>Vérifiez que JETON_SECRET_ADMIN existe sur Vercel</li>
                            <li>Assurez-vous d'avoir redéployé après avoir ajouté la variable</li>
                            <li>Vérifiez la connexion à la base de données</li>
                        </ul>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '15px' }}>📋 Informations</h3>
                <p style={{ marginBottom: '10px' }}><strong>Route API :</strong> /api/admin/reset-db</p>
                <p style={{ marginBottom: '10px' }}><strong>Token :</strong> diwaan-admin-2024-secure-token-789xyz</p>
                <p><strong>Variable Vercel :</strong> JETON_SECRET_ADMIN</p>
            </div>
        </div>
    );
}
