export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '60px 24px', maxWidth: '900px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '24px' }}>Réinventer l'immobilier en Afrique</h1>
            <p style={{ fontSize: '22px', lineHeight: 1.6, color: '#666', marginBottom: '60px' }}>
                Diwaan est la plateforme immobilière leader au Sénégal. Notre mission est de donner à chacun le pouvoir d'ouvrir la porte de son prochain chez-soi, en toute transparence et simplicité.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Notre Histoire</h2>
                    <p style={{ lineHeight: 1.6, color: '#444' }}>
                        Fondée en 2024, Diwaan est née d'un constat simple : le marché immobilier manquait de données fiables et d'outils numériques modernes.
                        En digitalisant le processus, de la recherche au financement, nous créons une expérience fluide pour les acheteurs, vendeurs et locataires.
                    </p>
                </div>
                <div style={{ background: '#eee', borderRadius: '12px', minHeight: '200px' }}></div>
            </div>

            <div style={{ textAlign: 'center', background: '#f0f4f8', padding: '40px', borderRadius: '16px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '32px' }}>Nos Valeurs</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    <div>
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>💡</div>
                        <h3 style={{ fontWeight: 'bold' }}>Innovation</h3>
                    </div>
                    <div>
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🤝</div>
                        <h3 style={{ fontWeight: 'bold' }}>Transparence</h3>
                    </div>
                    <div>
                        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌍</div>
                        <h3 style={{ fontWeight: 'bold' }}>Impact</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
