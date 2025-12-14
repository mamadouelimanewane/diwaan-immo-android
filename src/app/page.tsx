import Link from 'next/link';
import styles from './page.module.css';
import { Search, Home, Key, DollarSign } from 'lucide-react';

export default function HomePage() {
    return (
        <div>
            <section className={styles.hero}>
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Agents. Visites. Prêts. Maisons.</h1>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Entrez une adresse, un quartier, une ville (ex: Dakar, Saly)"
                            className={styles.searchInput}
                        />
                        <Link href="/search">
                            <button className="btn btn-primary searchButton">
                                <Search size={24} />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <Home size={48} color="#006AFF" />
                        <h3 className={styles.featureTitle}>Acheter</h3>
                        <p className={styles.featureText}>
                            Trouvez votre maison idéale avec une expérience photo immersive et le plus grand nombre de listings au Sénégal.
                        </p>
                        <Link href="/search">
                            <button className="btn btn-outline">Voir les maisons</button>
                        </Link>
                    </div>

                    <div className={styles.featureCard}>
                        <Key size={48} color="#006AFF" />
                        <h3 className={styles.featureTitle}>Louer</h3>
                        <p className={styles.featureText}>
                            Nous créons une expérience en ligne fluide - de la recherche sur le plus grand réseau de location au paiement du loyer.
                        </p>
                        <Link href="/rent">
                            <button className="btn btn-outline">Trouver une location</button>
                        </Link>
                    </div>

                    <div className={styles.featureCard}>
                        <DollarSign size={48} color="#006AFF" />
                        <h3 className={styles.featureTitle}>Vendre</h3>
                        <p className={styles.featureText}>
                            Peu importe le chemin que vous choisissez pour vendre votre maison, nous pouvons vous aider à réussir votre vente.
                        </p>
                        <Link href="/sell">
                            <button className="btn btn-outline">Voir les options</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
