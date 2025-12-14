'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';
import styles from './PropertyCard.module.css';

interface PropertyData {
    id: string;
    imageUrl?: string;
    images?: string[];
    price: number;
    beds?: number;
    bedrooms?: number;
    baths?: number;
    bathrooms?: number;
    sqft?: number;
    surface?: number;
    address: string;
    city: string;
    type: string;
}

interface PropertyCardProps {
    property: PropertyData | any; // Allow any to be safe during migration
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(property.id);

    // Compatibilité entre les données statiques (lib/data) et la BD (Prisma)
    const imageUrl = property.imageUrl || (property.images && property.images.length > 0 ? property.images[0] : '/placeholder.jpg'); // Fallback image needed?
    const beds = property.beds || property.bedrooms || 0;
    const baths = property.baths || property.bathrooms || 0;
    const surface = property.sqft || property.surface || 0;

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={property.address} className={styles.image} />
                <button
                    className={`${styles.favoriteBtn} ${favorite ? styles.active : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(property.id);
                    }}
                >
                    <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
                </button>
                <div className={styles.badge}>{property.type?.toUpperCase()}</div>
            </div>
            <Link href={`/homes/${property.id}`}>
                <div className={styles.content}>
                    <div className={styles.price}>{property.price?.toLocaleString()} FCFA</div>
                    <div className={styles.stats}>
                        {beds} ch | {baths} sdb | {surface} m²
                    </div>
                    <div className={styles.address}>
                        {property.address}, {property.city}
                    </div>
                </div>
            </Link>
        </div>
    );
}
