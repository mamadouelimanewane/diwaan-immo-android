import { Smartphone, CheckCircle } from 'lucide-react';

export default function MobileAppPage() {
    return (
        <div style={{ background: 'linear-gradient(135deg, #006AFF 0%, #004099 100%)', minHeight: '80vh', color: 'white', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', padding: '60px 24px' }}>
                <div>
                    <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>Emportez Diwaan partout avec vous.</h1>
                    <p style={{ fontSize: '20px', opacity: 0.9, lineHeight: 1.6, marginBottom: '40px' }}>
                        Téléchargez l'application immobilière n°1 au Sénégal. Recevez des alertes en temps réel et trouvez votre future maison, où que vous soyez.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <CheckCircle fill="white" color="#006AFF" />
                            <span>Alertes instantanées dès qu'un bien est publié</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <CheckCircle fill="white" color="#006AFF" />
                            <span>Contactez les agents en un clic</span>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <CheckCircle fill="white" color="#006AFF" />
                            <span>Visites virtuelles 3D sur votre mobile</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button style={{ background: 'black', color: 'white', border: '1px solid white', padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                            <Smartphone /> Available on the <br /><strong>App Store</strong>
                        </button>
                        <button style={{ background: 'black', color: 'white', border: '1px solid white', padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                            <Smartphone /> Get it on <br /><strong>Google Play</strong>
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '300px', height: '600px', background: 'white', borderRadius: '40px', border: '8px solid #333', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ background: '#eee', height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '60px', background: '#006AFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>Diwaan App</div>
                            <div style={{ padding: '16px', flex: 1 }}>
                                <div style={{ height: '150px', background: '#ccc', borderRadius: '8px', marginBottom: '16px' }}></div>
                                <div style={{ height: '20px', width: '70%', background: '#ccc', borderRadius: '4px', marginBottom: '8px' }}></div>
                                <div style={{ height: '20px', width: '40%', background: '#ccc', borderRadius: '4px', marginBottom: '24px' }}></div>

                                <div style={{ height: '150px', background: '#ccc', borderRadius: '8px', marginBottom: '16px' }}></div>
                                <div style={{ height: '20px', width: '70%', background: '#ccc', borderRadius: '4px', marginBottom: '8px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
