'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from '../login/page.module.css'; // Reusing login styles if possible, else I will inline or create new
import Link from 'next/link';

export default function RegisterPage() {
    const { register } = useAuth();
    const [name, setName] = useState('Mamadou Dia');
    const [email, setEmail] = useState('mamadoueliman.dia@gmail.com');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('OWNER');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register({ name, email, password, role });
            // Redirect or show success
            window.location.href = '/dashboard';
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Échec de l\'inscription. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container || 'container'} style={{ padding: '60px 20px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ color: '#006AFF', fontWeight: 'bold', fontSize: '32px', marginBottom: '8px' }}>Diwaan</h1>
                    <p style={{ color: '#666' }}>Créez votre compte en quelques secondes.</p>
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
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Nom complet</label>
                        <input
                            type="text"
                            required
                            placeholder="Mamadou Diallo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Email</label>
                        <input
                            type="email"
                            required
                            placeholder="nom@exemple.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Mot de passe</label>
                        <input
                            type="password"
                            required
                            placeholder="Minimum 6 caractères"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', fontSize: '16px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Je suis...</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none', fontSize: '16px', background: 'white' }}
                        >
                            <option value="USER">À la recherche d'une location/achat</option>
                            <option value="OWNER">Propriétaire (je veux vendre/louer)</option>
                            <option value="AGENT">Agent Immobilier</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: loading ? '#ccc' : '#006AFF',
                            color: 'white',
                            padding: '14px',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s'
                        }}
                    >
                        {loading ? 'Création...' : 'S\'inscrire'}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                    <p>Déjà un compte ? <Link href="/login" style={{ color: '#006AFF', textDecoration: 'none', fontWeight: 'bold' }}>Se connecter</Link></p>
                </div>
            </div>
        </div>
    );
}
