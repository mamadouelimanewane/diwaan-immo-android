import Link from 'next/link';
import { CreditCard, FileText, CheckSquare, Users } from 'lucide-react';

export default function RentManagerPage() {
    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Gestion Locative</h1>
                    <p style={{ color: '#666', marginTop: 8 }}>Gérez vos locations facilement et gratuitement.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-outline">Se connecter</button>
                    <button className="btn btn-primary">Ajouter une propriété</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 24, marginBottom: 40 }}>
                <div style={{ background: 'var(--card)', padding: 24, borderRadius: 12, border: '1px solid var(--border)', textAlign: 'center' }}>
                    <CheckSquare size={32} style={{ marginBottom: 12, color: 'var(--primary)' }} />
                    <div style={{ fontWeight: 'bold' }}>Applications</div>
                    <div style={{ fontSize: 14, color: '#666' }}>0 en attente</div>
                </div>
                <div style={{ background: 'var(--card)', padding: 24, borderRadius: 12, border: '1px solid var(--border)', textAlign: 'center' }}>
                    <Users size={32} style={{ marginBottom: 12, color: 'var(--primary)' }} />
                    <div style={{ fontWeight: 'bold' }}>Locataires</div>
                    <div style={{ fontSize: 14, color: '#666' }}>0 actifs</div>
                </div>
                <div style={{ background: 'var(--card)', padding: 24, borderRadius: 12, border: '1px solid var(--border)', textAlign: 'center' }}>
                    <FileText size={32} style={{ marginBottom: 12, color: 'var(--primary)' }} />
                    <div style={{ fontWeight: 'bold' }}>Baux</div>
                    <div style={{ fontSize: 14, color: '#666' }}>0 signés</div>
                </div>
                <Link href="/rent/manager/payments" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: 'var(--card)', padding: 24, borderRadius: 12, border: '1px solid var(--border)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}>
                        <CreditCard size={32} style={{ marginBottom: 12, color: 'var(--primary)' }} />
                        <div style={{ fontWeight: 'bold' }}>Paiements</div>
                        <div style={{ fontSize: 14, color: '#666' }}>Gérer les loyers</div>
                    </div>
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }}>
                <div>
                    <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Outils de Gestion</h2>
                    <div style={{ display: 'grid', gap: 16 }}>
                        <Link href="#" style={{ display: 'flex', justifyContent: 'space-between', padding: 20, background: 'var(--muted)', borderRadius: 8, textDecoration: 'none', color: 'inherit' }}>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>Évaluez ma location</div>
                                <div style={{ fontSize: 14, color: '#666' }}>Estimez le loyer idéal pour votre bien</div>
                            </div>
                            <span>&rarr;</span>
                        </Link>
                        <Link href="#" style={{ display: 'flex', justifyContent: 'space-between', padding: 20, background: 'var(--muted)', borderRadius: 8, textDecoration: 'none', color: 'inherit' }}>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>Créer un bail numérique</div>
                                <div style={{ fontSize: 14, color: '#666' }}>Modèles conformes à la loi sénégalaise</div>
                            </div>
                            <span>&rarr;</span>
                        </Link>
                        <Link href="#" style={{ display: 'flex', justifyContent: 'space-between', padding: 20, background: 'var(--muted)', borderRadius: 8, textDecoration: 'none', color: 'inherit' }}>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>Recouvrement de loyer</div>
                                <div style={{ fontSize: 14, color: '#666' }}>Configurez les paiements automatiques</div>
                            </div>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>

                <div>
                    <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Commercialisation</h2>
                    <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                        <div style={{ padding: 20, borderBottom: '1px solid var(--border)' }}>
                            <div style={{ fontWeight: 'bold' }}>Annonces Premium</div>
                            <div style={{ fontSize: 14, color: '#666' }}>Boostez la visibilité de vos biens</div>
                        </div>
                        <div style={{ padding: 20, borderBottom: '1px solid var(--border)' }}>
                            <div style={{ fontWeight: 'bold' }}>Syndication</div>
                            <div style={{ fontSize: 14, color: '#666' }}>Publiez sur 10+ sites partenaires</div>
                        </div>
                        <div style={{ padding: 20, background: 'var(--muted)', textAlign: 'center' }}>
                            <Link href="/pros" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Voir les offres Pro</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
