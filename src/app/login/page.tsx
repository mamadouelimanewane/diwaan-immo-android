'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import Link from 'next/link';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            // Redirection après connexion réussie
            window.location.href = '/dashboard';
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ color: '#006AFF', fontWeight: 'bold', fontSize: '32px', marginBottom: '8px' }}>Diwaan</h1>
                    <p style={{ color: '#666' }}>Connectez-vous pour accéder à votre espace.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{
                            background: '#ffebee',
                            color: '#c62828',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Email professionnel</label>
                        <input
                            type="email"
                            required
                            placeholder="nom@entreprise.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                outline: 'none',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Mot de passe</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                outline: 'none',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            background: '#006AFF',
                            color: 'white',
                            padding: '14px',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                    >
                        Se connecter
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                    <p style={{ marginBottom: '8px' }}>Mot de passe oublié ? <a href="#" style={{ color: '#006AFF', textDecoration: 'none' }}>Réinitialiser</a></p>
                    <p>Pas encore de compte ? <Link href="/register" style={{ color: '#006AFF', textDecoration: 'none', fontWeight: 'bold' }}>S'inscrire</Link></p>
                </div>
            </div>
        </div>
    );
}
