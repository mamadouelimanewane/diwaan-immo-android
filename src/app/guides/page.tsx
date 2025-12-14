'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function GuidesPage() {
    const guides = [
        {
            id: 'acheteur',
            icon: '🏠',
            title: 'Guide de l\'Acheteur',
            description: 'Découvrez les étapes clés pour devenir propriétaire : du financement à la remise des clés.',
            link: '/guides/acheteur',
            color: '#006AFF'
        },
        {
            id: 'vendeur',
            icon: '🏷️',
            title: 'Guide du Vendeur',
            description: 'Estimez votre bien, préparez les visites et négociez la meilleure offre de vente.',
            link: '/guides/vendeur',
            color: '#05CD99'
        },
        {
            id: 'financement',
            icon: '💰',
            title: 'Financement & Prêts',
            description: 'Comprendre les taux d\'intérêt, l\'apport personnel et comment négocier avec les banques.',
            link: '/guides/financement',
            color: '#FFB547'
        },
        {
            id: 'juridique',
            icon: '📝',
            title: 'Juridique & Notaires',
            description: 'Les documents obligatoires, les frais de notaire et la sécurisation de votre transaction.',
            link: '/guides/juridique',
            color: '#E63946'
        },
        {
            id: 'construction',
            icon: '🏗️',
            title: 'Construire sa Maison',
            description: 'Choisir son terrain, trouver un architecte et suivre le chantier sans stress.',
            link: '/guides/construction',
            color: '#4318FF'
        }
    ];

    return (
        <div className="container" style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 className={styles.title}>📚 Guides de l'Immobilier au Sénégal</h1>
                <p className={styles.subtitle}>
                    Tout ce que vous devez savoir pour acheter, vendre ou louer en toute sérénité.
                </p>
                <p style={{ fontSize: '16px', color: '#666', marginTop: '16px' }}>
                    Conformes à la législation sénégalaise • OHADA • UEMOA • Code Civil
                </p>
            </div>

            <div className={styles.grid}>
                {guides.map(guide => (
                    <Link
                        key={guide.id}
                        href={guide.link}
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            className={styles.card}
                            style={{
                                borderTop: `4px solid ${guide.color}`,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                            }}
                        >
                            <div className={styles.icon} style={{ fontSize: '64px', marginBottom: '20px' }}>
                                {guide.icon}
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#1B254B' }}>
                                {guide.title}
                            </h2>
                            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                                {guide.description}
                            </p>
                            <button
                                className="btn btn-text"
                                style={{
                                    color: guide.color,
                                    fontWeight: 'bold',
                                    padding: '10px 20px',
                                    border: `2px solid ${guide.color}`,
                                    borderRadius: '8px',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                Lire le guide →
                            </button>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Statistiques */}
            <div style={{
                marginTop: '80px',
                padding: '40px',
                background: 'linear-gradient(135deg, #006AFF 0%, #0052CC 100%)',
                borderRadius: '16px',
                color: 'white',
                textAlign: 'center'
            }}>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
                    📊 Pourquoi utiliser nos guides ?
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                    <div>
                        <div style={{ fontSize: '42px', fontWeight: 'bold' }}>100%</div>
                        <div style={{ fontSize: '16px', opacity: 0.9 }}>Conforme légalement</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '42px', fontWeight: 'bold' }}>50+</div>
                        <div style={{ fontSize: '16px', opacity: 0.9 }}>Pages de contenu</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '42px', fontWeight: 'bold' }}>15</div>
                        <div style={{ fontSize: '16px', opacity: 0.9 }}>Experts consultés</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '42px', fontWeight: 'bold' }}>2025</div>
                        <div style={{ fontSize: '16px', opacity: 0.9 }}>Mis à jour</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
