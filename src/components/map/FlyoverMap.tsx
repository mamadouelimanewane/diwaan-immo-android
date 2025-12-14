'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

interface FlyoverMapProps {
    zoom: number;
    center: [number, number];
}

// Component to handle the flying animation
function FlyoverController() {
    const map = useMap();

    useEffect(() => {
        // Start animation sequence
        map.flyTo([14.7300, -17.4800], 16, { // Almadies View
            duration: 3
        });

        const timer1 = setTimeout(() => {
            map.flyTo([14.6937, -17.4441], 15, { // Plateau View
                duration: 4
            });
        }, 4000);

        const timer2 = setTimeout(() => {
            map.flyTo([14.7167, -17.4677], 14, { // Reset Center
                duration: 3
            });
        }, 9000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [map]);

    return null;
}

export default function FlyoverMap({ center, zoom }: FlyoverMapProps) {
    const [isFlying, setIsFlying] = useState(false);

    return (
        <div style={{ position: 'relative', height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer
                    // Using Satellite style tiles (ESRI World Imagery) for "Flyover" feel
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='Tiles &copy; Esri'
                />
                {isFlying && <FlyoverController />}

                <Marker position={center} icon={L.divIcon({ className: 'custom-pin', html: '<div style="background:red;width:10px;height:10px;border-radius:50%"></div>' })}>
                    <Popup>Votre future maison</Popup>
                </Marker>
            </MapContainer>

            <button
                onClick={() => setIsFlying(true)}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                    background: 'white',
                    color: '#006AFF',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                }}
            >
                <Plane size={20} />
                {isFlying ? 'Survol en cours...' : 'Lancer le Survol'}
            </button>
        </div>
    );
}
