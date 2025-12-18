'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import PropertyCard from '@/components/PropertyCard';
import { api } from '@/lib/api-client';
import { properties as staticProperties, rentalProperties as staticRentals } from '@/lib/data';

// Dynamically import Map with no SSR
const MapWithNoSSR = dynamic(() => import('@/components/map/Map'), {
    ssr: false,
    loading: () => <div style={{ height: '100%', width: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement de la carte...</div>
});

// Pre-convert static data for immediate use
const staticPropsConverted = staticProperties.map(p => ({
    id: p.id,
    title: p.address,
    address: p.address,
    city: p.city,
    price: p.price,
    bedrooms: p.beds,
    bathrooms: p.baths,
    surface: p.sqft,
    images: [p.imageUrl],
    description: p.description,
    latitude: p.lat,
    longitude: p.lng,
    type: p.type
}));

function SearchContent() {
    const searchParams = useSearchParams();
    const filterParam = searchParams.get('filter');

    const [loading, setLoading] = useState(true);
    const [pageTitle, setPageTitle] = useState("Immobilier à vendre au Sénégal");
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    // Initialize with static data immediately
    const [filteredProperties, setFilteredProperties] = useState<any[]>(staticPropsConverted);
    const [filters, setFilters] = useState({
        city: '',
        priceMin: '',
        priceMax: '',
        transactionType: 'SALE' as 'SALE' | 'RENT',
        homeType: [] as string[]
    });

    // Internal state for filter dropdowns
    const [internalPriceMin, setInternalPriceMin] = useState(filters.priceMin);
    const [internalPriceMax, setInternalPriceMax] = useState(filters.priceMax);
    const [internalHomeType, setInternalHomeType] = useState<string[]>(filters.homeType || []);

    useEffect(() => {
        setInternalPriceMin(filters.priceMin);
        setInternalPriceMax(filters.priceMax);
        setInternalHomeType(filters.homeType || []);
    }, [filters.priceMin, filters.priceMax, filters.homeType]);

    // Helper function to convert static data to API format
    const convertStaticData = (props: typeof staticProperties) => props.map(p => ({
        id: p.id,
        title: p.address,
        address: p.address,
        city: p.city,
        price: p.price,
        bedrooms: p.beds,
        bathrooms: p.baths,
        surface: p.sqft,
        images: [p.imageUrl],
        description: p.description,
        latitude: p.lat,
        longitude: p.lng,
        type: p.type
    }));

    const fetchProperties = async () => {
        setLoading(true);
        try {
            // Mapping filters to API params
            const params: any = {
                transactionType: filters.transactionType,
            };
            if (filters.priceMin) params.minPrice = Number(filters.priceMin);
            if (filters.priceMax) params.maxPrice = Number(filters.priceMax);
            if (filters.homeType.length > 0) params.type = filters.homeType.join(',');

            const response = await api.properties.getAll(params);
            if (response.success && response.properties && response.properties.length > 0) {
                setFilteredProperties(response.properties);
            } else {
                // Fallback to static demo data
                const sourceData = filters.transactionType === 'RENT' ? staticRentals : staticProperties;
                setFilteredProperties(convertStaticData(sourceData));
            }
        } catch (error) {
            console.error("Failed to fetch properties, using static data", error);
            // Fallback to static demo data on error
            const sourceData = filters.transactionType === 'RENT' ? staticRentals : staticProperties;
            setFilteredProperties(convertStaticData(sourceData));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let title = "Immobilier à vendre au Sénégal";
        let newFilters = { ...filters };

        switch (filterParam) {
            case 'rent':
                title = "Immobilier à louer";
                newFilters.transactionType = 'RENT';
                break;
            case 'new':
                title = "Programmes neufs";
                newFilters.transactionType = 'SALE';
                // Could add a 'new' property filter here
                break;
            case 'coming_soon':
                title = "Bientôt disponible";
                newFilters.transactionType = 'SALE';
                break;
            case 'open':
                title = "Portes ouvertes";
                newFilters.transactionType = 'SALE';
                break;
            case 'foreclosure':
                title = "Saisies immobilières";
                newFilters.transactionType = 'SALE';
                break;
            case 'fsbo':
                title = "Vente par propriétaire";
                newFilters.transactionType = 'SALE';
                break;
            case 'sold':
                title = "Vendus récemment";
                newFilters.transactionType = 'SALE';
                break;
            default:
                title = "Immobilier à vendre au Sénégal";
                newFilters.transactionType = 'SALE';
        }

        setPageTitle(title);
        setFilters(newFilters);
        fetchProperties();
    }, [filterParam]);

    const toggleFilter = (filterName: string) => {
        setActiveFilter(activeFilter === filterName ? null : filterName);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
        setFilters({ ...filters, [type === 'min' ? 'priceMin' : 'priceMax']: e.target.value });
    };

    const handleTypeSelect = (type: string) => {
        const currentTypes = filters.homeType;
        if (currentTypes.includes(type)) {
            setFilters({ ...filters, homeType: currentTypes.filter(t => t !== type) });
        } else {
            setFilters({ ...filters, homeType: [...currentTypes, type] });
        }
    };

    const applyFilters = () => {
        fetchProperties();
        setActiveFilter(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.mapContainer}>
                <MapWithNoSSR properties={filteredProperties} />
            </div>

            <div className={styles.listContainer}>
                <div className={styles.filterBar}>
                    <input type="text" placeholder="Adresse, Ville, CP" className={styles.searchInput} />

                    <div className={styles.filterTags}>
                        <div className={styles.filterDropdown}>
                            <button
                                className={`${styles.filterButton} ${activeFilter === 'price' ? styles.active : ''}`}
                                onClick={() => toggleFilter('price')}
                            >
                                Prix
                            </button>
                            {activeFilter === 'price' && (
                                <div className={styles.dropdownContent}>
                                    <div style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className={styles.priceInput}
                                            value={filters.priceMin}
                                            onChange={(e) => handlePriceChange(e, 'min')}
                                        />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className={styles.priceInput}
                                            value={filters.priceMax}
                                            onChange={(e) => handlePriceChange(e, 'max')}
                                        />
                                    </div>
                                    <div style={{ padding: '0 16px 16px', textAlign: 'right' }}>
                                        <button className="btn btn-primary" onClick={applyFilters}>Appliquer</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.filterDropdown}>
                            <button
                                className={`${styles.filterButton} ${activeFilter === 'type' ? styles.active : ''}`}
                                onClick={() => toggleFilter('type')}
                            >
                                Type de Bien
                            </button>
                            {activeFilter === 'type' && (
                                <div className={styles.dropdownContent}>
                                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {['Maison', 'Appartement', 'Villa', 'Terrain'].map(type => (
                                            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={filters.homeType.includes(type)}
                                                    onChange={() => handleTypeSelect(type)}
                                                />
                                                {type}
                                            </label>
                                        ))}
                                    </div>
                                    <div style={{ padding: '0 16px 16px', textAlign: 'right' }}>
                                        <button className="btn btn-primary" onClick={applyFilters}>Appliquer</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.filterDropdown}>
                            <button
                                className={`${styles.filterButton} ${activeFilter === 'amenities' ? styles.active : ''}`}
                                onClick={() => toggleFilter('amenities')}
                            >
                                Commodités (Sénégal)
                            </button>
                            {activeFilter === 'amenities' && (
                                <div className={styles.dropdownContent} style={{ minWidth: '250px' }}>
                                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {[
                                            '⚡ Groupe Électrogène',
                                            '💧 Réservoir / Surpresseur',
                                            '🛡️ Gardiennage 24/7',
                                            '🏊 Piscine',
                                            '❄️ Climatisation',
                                            '🚗 Parking',
                                            '🛋️ Meublé'
                                        ].map(amenity => (
                                            <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                                                <input
                                                    type="checkbox"
                                                // Logic would go here
                                                />
                                                {amenity}
                                            </label>
                                        ))}
                                    </div>
                                    <div style={{ padding: '0 16px 16px', textAlign: 'right' }}>
                                        <button className="btn btn-primary" onClick={applyFilters}>Appliquer</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className={styles.filterButton}>Plus Filters</button>
                        <button className={styles.saveSearchBtn}>Sauvegarder</button>
                    </div>
                </div>

                <div className={styles.resultsHeader}>
                    <h1>{pageTitle}</h1>
                    <span className={styles.resultCount}>{filteredProperties.length} résultats</span>
                </div>

                <div className={styles.listingsGrid}>
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '20px' }}>Chargement de la recherche...</div>}>
            <SearchContent />
        </Suspense>
    );
}
