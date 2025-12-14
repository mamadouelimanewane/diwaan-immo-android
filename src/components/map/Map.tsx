'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Property } from '@/lib/data';
import Link from 'next/link';
import './MapMarker.css'; // We need global styles for divIcon

interface MapProps {
    properties: Property[];
}

export default function Map({ properties }: { properties: any[] }) {
    // Center on Dakar
    const center: [number, number] = [14.7167, -17.4677];

    const createPriceIcon = (price: number) => {
        // Format: 125 M
        const formatted = (price / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' M';

        return L.divIcon({
            className: 'custom-price-marker',
            html: `<div class="price-tag">${formatted}</div>`,
            iconSize: [60, 30],
            iconAnchor: [30, 15]
        });
    };

    return (
        <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties.map((property) => {
                // Adapter: Handle both Prisma (latitude/longitude) and Mock (lat/lng)
                const lat = property.latitude || property.lat;
                const lng = property.longitude || property.lng;

                // Skip invalid coordinates
                if (!lat || !lng) return null;

                // Handle images: Prisma array vs Mock string
                const imageUrl = Array.isArray(property.images) && property.images.length > 0
                    ? property.images[0]
                    : (property.imageUrl || '/placeholder-house.jpg');

                const beds = property.bedrooms || property.beds || 0;
                const surface = property.surface || property.sqft || 0;

                return (
                    <Marker
                        key={property.id}
                        position={[lat, lng]}
                        icon={createPriceIcon(property.price)}
                    >
                        <Popup>
                            <div style={{ width: '220px' }}>
                                <img
                                    src={imageUrl}
                                    alt={property.address || property.title}
                                    style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                                <div style={{ marginTop: '8px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#006AFF' }}>
                                        {property.price.toLocaleString()} FCFA
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#666', margin: '4px 0' }}>
                                        {property.type} • {beds} ch • {surface} m²
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: 500 }}>
                                        {property.address}
                                    </div>
                                    <Link href={`/homes/${property.id}`} style={{
                                        display: 'block',
                                        marginTop: '8px',
                                        backgroundColor: '#006AFF',
                                        color: 'white',
                                        textAlign: 'center',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        fontWeight: 600,
                                        textDecoration: 'none'
                                    }}>
                                        Voir Détails
                                    </Link>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
