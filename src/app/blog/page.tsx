export default function BlogPage() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1A202C', marginBottom: '16px' }}>Actualités Immobilières</h1>
                <p style={{ fontSize: '18px', color: '#4A5568' }}>Les dernières nouvelles, tendances et analyses du marché immobilier au Sénégal.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
                {[
                    {
                        title: "Top 5 des quartiers où investir à Dakar en 2025",
                        desc: "Découvrez les zones à fort potentiel de valorisation pour vos investissements locatifs.",
                        date: "12 Déc 2024",
                        image: "🏙️"
                    },
                    {
                        title: "Comprendre le nouveau code de l'urbanisme",
                        desc: "Analyse des changements récents et impact sur les permis de construire.",
                        date: "08 Déc 2024",
                        image: "📜"
                    },
                    {
                        title: "Acheter ou Louer : Le grand dilemme",
                        desc: "Avantages et inconvénients de chaque option dans le contexte économique actuel.",
                        date: "01 Déc 2024",
                        image: "🏠"
                    },
                    {
                        title: "La construction écologique au Sénégal",
                        desc: "Comment les briques de terre cuite révolutionnent l'habitat durable.",
                        date: "24 Nov 2024",
                        image: "🌿"
                    },
                    {
                        title: "Financer son logement avec la diaspora",
                        desc: "Guide complet des produits bancaires dédiés aux Sénégalais de l'extérieur.",
                        date: "15 Nov 2024",
                        image: "✈️"
                    },
                    {
                        title: "Décoration : Les tendances 2025",
                        desc: "Mettre en valeur son bien pour vendre plus vite et plus cher.",
                        date: "10 Nov 2024",
                        image: "🎨"
                    }
                ].map((post, i) => (
                    <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' }}>
                        <div style={{ height: '200px', background: '#F7FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>
                            {post.image}
                        </div>
                        <div style={{ padding: '24px' }}>
                            <div style={{ fontSize: '12px', color: '#718096', marginBottom: '8px', fontWeight: 'bold' }}>{post.date} - ACTUALITÉ</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#2D3748', lineHeight: '1.4' }}>{post.title}</h3>
                            <p style={{ color: '#4A5568', lineHeight: '1.6', fontSize: '15px' }}>{post.desc}</p>
                            <button style={{ marginTop: '16px', color: '#006AFF', background: 'none', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Lire la suite →</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
