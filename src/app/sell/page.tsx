import styles from '../page.module.css';
import Link from 'next/link';

export default function SellPage() {
    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Vendez votre bien en toute confiance</h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                Diwaan facilite la vente de votre maison. Que vous souhaitiez vendre par vous-même ou travailler avec un agent, nous avons les outils qu'il vous faut.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                <div style={{ padding: '30px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Vendre avec un Agent</h2>
                    <p style={{ marginBottom: '20px' }}>Travaillez avec un expert local pour obtenir le meilleur prix pour votre bien.</p>
                    <Link href="/agents">
                        <button className="btn btn-primary">Trouver un Agent</button>
                    </Link>
                    <div style={{ marginTop: 16 }}>
                        <Link href="#" style={{ color: '#006AFF', fontSize: 14 }}>Guide du Vendeur &rarr;</Link>
                    </div>
                </div>

                <div style={{ padding: '30px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Vendre par vous-même</h2>
                    <p style={{ marginBottom: '20px' }}>Publiez votre annonce gratuitement et touchez des millions d'acheteurs.</p>
                    <Link href="/sell/fsbo">
                        <button className="btn btn-outline">Créer une annonce</button>
                    </Link>
                    <div style={{ marginTop: 16 }}>
                        <Link href="#" style={{ color: '#006AFF', fontSize: 14 }}>Publier une annonce (Propriétaire) &rarr;</Link>
                    </div>
                </div>
            </div>

            <div style={{ background: 'var(--muted)', padding: '40px', borderRadius: '12px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>Ressources pour les Vendeurs</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <Link href="/sell/valuation" style={{ padding: 16, background: 'var(--card)', borderRadius: 8, textAlign: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>📊</div>
                        <div style={{ fontWeight: 'bold' }}>Estimer mon bien (Diwaan)</div>
                    </Link>
                    <Link href="/market" style={{ padding: 16, background: 'var(--card)', borderRadius: 8, textAlign: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>📈</div>
                        <div style={{ fontWeight: 'bold' }}>Marché immobilier Sénégal</div>
                    </Link>
                    <Link href="#" style={{ padding: 16, background: 'var(--card)', borderRadius: 8, textAlign: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>📋</div>
                        <div style={{ fontWeight: 'bold' }}>Options de vente</div>
                    </Link>
                    <Link href="/agents" style={{ padding: 16, background: 'var(--card)', borderRadius: 8, textAlign: 'center', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>🔍</div>
                        <div style={{ fontWeight: 'bold' }}>Trouver un agent vendeur</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
