'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // Set cookie and redirect
                document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Lax`; // 24h
                // Force full page reload to ensure cookie is set
                window.location.href = '/admin';
            } else {
                setError(data.error || 'Identifiants invalides');
            }
        } catch (err) {
            setError('Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div style={{
                background: 'white',
                padding: '48px',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>
                        🔐 Admin Diwaan
                    </h1>
                    <p style={{ color: '#888' }}>Accès réservé aux administrateurs</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="admin@diwaan.sn"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{
                            background: '#FEE',
                            color: '#C00',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: loading ? '#ccc' : '#006AFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#888' }}>
                    <p>Démo: <strong>admin@diwaan.sn</strong> / <strong>admin123</strong></p>
                </div>
            </div>
        </div>
    );
}
