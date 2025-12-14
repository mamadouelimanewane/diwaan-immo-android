export default function InboxPage() {
    return (
        <div className="container" style={{ padding: '60px 24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>Messagerie</h1>
            <div style={{ textAlign: 'center', padding: '60px', background: '#f8f9fa', borderRadius: '12px' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>💬</div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Pas de nouveaux messages</h2>
                <p style={{ color: '#666' }}>Vos conversations avec les candidats locataires apparaîtront ici.</p>
            </div>
        </div>
    );
}
