import Link from 'next/link';

export default function AgentSolutionsPage() {
    return (
        <div style={{ background: '#002B49', color: 'white', padding: '80px 24px', minHeight: '80vh' }}>
            <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>Boostez votre visibilité avec Diwaan Premier Agent</h1>
                <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '40px' }}>
                    Connectez-vous directement avec des acheteurs actifs et sérieux. Les agents Diwaan Premier concluent 2x plus de ventes.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '60px' }}>
                    <Link href="/login">
                        <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>Commencer maintenant</button>
                    </Link>
                    <Link href="/contact">
                        <button style={{ padding: '16px 32px', fontSize: '18px', background: 'transparent', border: '1px solid white', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Parler à un expert</button>
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'left' }}>
                    <div>
                        <div style={{ fontSize: '32px', marginBottom: '16px', color: '#006AFF' }}>🎯</div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Ciblage Précis</h3>
                        <p style={{ opacity: 0.8 }}>Apparaissez sur les annonces vues par les acheteurs dans vos zones de prédilection.</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '32px', marginBottom: '16px', color: '#006AFF' }}>📱</div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>CRM Intégré</h3>
                        <p style={{ opacity: 0.8 }}>Gérez vos leads, planifiez vos relances et suivez vos performances depuis l'app.</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '32px', marginBottom: '16px', color: '#006AFF' }}>⭐</div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Profil Vérifié</h3>
                        <p style={{ opacity: 0.8 }}>Gagnez la confiance des clients avec le badge "Agent Vérifié" et vos avis clients.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
