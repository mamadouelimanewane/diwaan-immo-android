export default function LeasesPage() {
    return (
        <div className="container" style={{ padding: '60px 24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>Baux & Contrats</h1>
            <div style={{ textAlign: 'center', padding: '60px', background: '#f8f9fa', borderRadius: '12px' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📝</div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Créez votre premier bail</h2>
                <p style={{ color: '#666', marginBottom: '32px' }}>Utilisez nos modèles de contrats conformes à la loi sénégalaise.</p>
                <button className="btn btn-primary">Créer un bail</button>
            </div>
        </div>
    );
}
