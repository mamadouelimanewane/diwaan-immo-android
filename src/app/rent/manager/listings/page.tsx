export default function ListingsPage() {
    return (
        <div className="container" style={{ padding: '60px 24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>Mes Annonces</h1>
            <div style={{ textAlign: 'center', padding: '60px', background: '#f8f9fa', borderRadius: '12px' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏠</div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Aucune annonce active</h2>
                <p style={{ color: '#666', marginBottom: '32px' }}>Commencez à louer votre bien dès aujourd'hui.</p>
                <a href="/rent/manager/list" className="btn btn-primary">Publier une annonce</a>
            </div>
        </div>
    );
}
