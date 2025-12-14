import styles from './Footer.module.css';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Home } from 'lucide-react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <Home className={styles.icon} />
                            <span>Diwaan</span>
                        </div>
                        <p className={styles.tagline}>
                            La référence de l'immobilier au Sénégal. Achetez, louez et vendez en toute confiance.
                        </p>
                        <div className={styles.socials}>
                            <Facebook size={20} />
                            <Twitter size={20} />
                            <Instagram size={20} />
                            <Linkedin size={20} />
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3>Immobilier</h3>
                        <Link href="/search">Acheter une Maison</Link>
                        <Link href="/rent">Louer un Appartement</Link>
                        <Link href="/sell">Vendre mon Bien</Link>
                        <Link href="/search">Terrains à Vendre</Link>
                    </div>

                    <div className={styles.column}>
                        <h3>Ressources</h3>
                        <Link href="/loans">Simulateur de Prêt</Link>
                        <Link href="/agents">Trouver un Agent</Link>
                        <Link href="/blog">Actualités Immo</Link>
                        <Link href="/guides">Guide d'achat</Link>
                    </div>

                    <div className={styles.column}>
                        <h3>Entreprise</h3>
                        <Link href="/about">À propos</Link>
                        <Link href="/careers">Carrières</Link>
                        <a href="mailto:contact@diwaan.com">Contact: contact@diwaan.com</a>
                        <a href="tel:+221777529288">Tel: +221 77 752 92 88</a>
                        <Link href="/privacy">Confidentialité</Link>
                        <Link href="/admin" style={{ color: '#006AFF', fontWeight: 'bold' }}>Admin</Link>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Diwaan Group. Tous droits réservés.</p>
                    <div className={styles.flags}>
                        <span>🇸🇳 Sénégal</span>
                        <span>🇫🇷 Français</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
