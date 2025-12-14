export default function ApplicationsPage() {
    return (
        <div className="container" style={{ padding: '60px 24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>Dossiers de Location</h1>
            <div style={{ textAlign: 'center', padding: '60px', background: '#f8f9fa', borderRadius: '12px' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📂</div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Aucun dossier en attente</h2>
                <p style={{ color: '#666' }}>Consultez ici les candidatures complètes (revenus, garanties) de vos futurs locataires.</p>
            </div>
        </div>
    );
}
