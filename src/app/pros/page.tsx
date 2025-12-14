import Link from 'next/link';
import { BadgeCheck, Users, Camera, Briefcase } from 'lucide-react';

export default function ProsPage() {
    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Solutions pour les Professionnels</h1>
                <p style={{ fontSize: '18px', color: '#666' }}>
                    Développez votre activité immobilière avec les outils marketing et de gestion n°1 au Sénégal.
                </p>
                <div style={{ marginTop: 24, display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <button className="btn btn-primary">Créer un compte Pro Gratuit</button>
                    <button className="btn btn-outline">Se connecter</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: 60 }}>
                <div style={{ padding: 24, border: '1px solid var(--border)', borderRadius: 12 }}>
                    <Users size={32} color="var(--primary)" style={{ marginBottom: 16 }} />
                    <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Agents Immobiliers</h3>
                    <p style={{ color: '#666', marginBottom: 16 }}>
                        Générez plus de leads qualifiés et gérez votre pipeline de vente avec notre CRM intégré.
                    </p>
                    <Link href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Solutions Agents &rarr;</Link>
                </div>

                <div style={{ padding: 24, border: '1px solid var(--border)', borderRadius: 12 }}>
                    <Briefcase size={32} color="var(--primary)" style={{ marginBottom: 16 }} />
                    <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Gestionnaires de Biens</h3>
                    <p style={{ color: '#666', marginBottom: 16 }}>
                        Simplifiez la gestion locative : encaissement des loyers, quittances et maintenance.
                    </p>
                    <Link href="/rent/manager" style={{ color: 'var(--primary)', fontWeight: 600 }}>Outils de Gestion &rarr;</Link>
                </div>

                <div style={{ padding: 24, border: '1px solid var(--border)', borderRadius: 12 }}>
                    <Camera size={32} color="var(--primary)" style={{ marginBottom: 16 }} />
                    <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Photographes</h3>
                    <p style={{ color: '#666', marginBottom: 16 }}>
                        Rejoignez notre réseau de photographes certifiés et recevez des missions près de chez vous.
                    </p>
                    <Link href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Devenir Partenaire &rarr;</Link>
                </div>
            </div>

            <div style={{ background: 'var(--muted)', padding: 40, borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Ressources Utiles</h2>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li><Link href="#" style={{ color: 'var(--foreground)' }}>📄 Modèles de flyers et brochures</Link></li>
                        <li><Link href="#" style={{ color: 'var(--foreground)' }}>📜 Scripts de vente pour agents</Link></li>
                        <li><Link href="#" style={{ color: 'var(--foreground)' }}>📊 Business Plan Immobilier</Link></li>
                        <li><Link href="#" style={{ color: 'var(--foreground)' }}>🎓 Centre de formation (Webinaires)</Link></li>
                    </ul>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48, fontWeight: 'bold', color: 'var(--primary)' }}>+500</div>
                    <div style={{ fontSize: 18 }}>Agences partenaires au Sénégal</div>
                </div>
            </div>
        </div>
    );
}
