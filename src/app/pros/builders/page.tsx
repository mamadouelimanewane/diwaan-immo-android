export default function BuildersPage() {
    return (
        <div className="container" style={{ padding: '60px 24px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Constructeurs de Maisons au Sénégal</h1>
            <p style={{ marginBottom: '40px', color: '#666' }}>Trouvez le partenaire idéal pour bâtir la maison de vos rêves.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                        <div style={{ height: '200px', background: '#ccc', position: 'relative' }}>
                            <span style={{ position: 'absolute', top: 12, left: 12, background: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 'bold' }}>TOP CONSTRUCTEUR</span>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <h3 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>Batimat Sénégal {i}</h3>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>Spécialiste Villas & Immeubles • Dakar, Saly</p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn btn-primary" style={{ flex: 1 }}>Demander devis</button>
                                <button className="btn btn-outline" style={{ flex: 1 }}>Projets</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
