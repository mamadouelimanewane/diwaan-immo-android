import Link from 'next/link';

export default function ForeclosureCenterPage() {
    return (
        <div className="container" style={{ padding: '40px 24px', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#d93025' }}>Centre de Saisies Immobilières</h1>

            <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', padding: '24px', borderRadius: '8px', marginBottom: '40px' }}>
                <h3 style={{ color: '#d93025', marginBottom: '8px' }}>⚠️ Opportunités à Saisir</h3>
                <p>Les biens présentés ici sont vendus suite à des saisies bancaires. Ils représentent souvent des opportunités d'achat en dessous du prix du marché.</p>
            </div>

            <h2 style={{ marginBottom: '20px' }}>Dernières Annonces de Saisies</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {/* Mock Data for Foreclosures */}
                <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ height: '200px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ background: '#d93025', color: 'white', padding: '4px 12px', borderRadius: '4px' }}>Saisie</span>
                    </div>
                    <div style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>45 000 000 FCFA</div>
                        <p style={{ color: '#666' }}>Villa inachevée • Keur Massar</p>
                        <Link href="/search?filter=foreclosure" className="btn btn-primary" style={{ marginTop: '12px', width: '100%', display: 'block', textAlign: 'center' }}>Voir Détails</Link>
                    </div>
                </div>

                <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ height: '200px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ background: '#d93025', color: 'white', padding: '4px 12px', borderRadius: '4px' }}>Vente aux Enchères</span>
                    </div>
                    <div style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>85 000 000 FCFA</div>
                        <p style={{ color: '#666' }}>Immeuble R+3 • Rufisque</p>
                        <Link href="/search?filter=foreclosure" className="btn btn-primary" style={{ marginTop: '12px', width: '100%', display: 'block', textAlign: 'center' }}>Voir Détails</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
