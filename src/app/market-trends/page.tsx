'use client';

import { TrendingUp, TrendingDown, MapPin, BarChart2 } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Évolution des Prix au m² (FCFA)',
        },
    },
};

const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];

const data = {
    labels,
    datasets: [
        {
            label: 'Almadies',
            data: [1200000, 1250000, 1240000, 1300000, 1350000, 1400000],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Plateau',
            data: [1000000, 1000000, 1050000, 1050000, 1100000, 1150000],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Mermoz',
            data: [800000, 820000, 850000, 880000, 900000, 920000],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
    ],
};

export default function MarketTrendsPage() {
    return (
        <div className="container" style={{ padding: '60px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '16px' }}>Tendances du Marché</h1>
                <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                    Analysez les prix de l'immobilier à Dakar et Saly pour faire les meilleurs investissements.
                </p>
            </div>

            {/* Top Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ color: '#718096', fontWeight: 600 }}>Prix Moyen (Dakar)</span>
                        <TrendingUp color="#38A169" />
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1A202C' }}>950,000 F</div>
                    <div style={{ color: '#718096', fontSize: '14px' }}>par m² • <span style={{ color: '#38A169', fontWeight: 'bold' }}>+5.2%</span> ce mois</div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ color: '#718096', fontWeight: 600 }}>Quartier le plus cher</span>
                        <MapPin color="#D69E2E" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A202C', marginTop: '8px' }}>Almadies</div>
                    <div style={{ color: '#718096', fontSize: '14px' }}>1,400,000 F / m²</div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ color: '#718096', fontWeight: 600 }}>Zone en baisse</span>
                        <TrendingDown color="#E53E3E" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A202C', marginTop: '8px' }}>Yoff Tonghor</div>
                    <div style={{ color: '#718096', fontSize: '14px' }}><span style={{ color: '#E53E3E', fontWeight: 'bold' }}>-2.1%</span> ce trimestre</div>
                </div>
            </div>

            {/* Chart Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <Line options={options} data={data} />
                </div>

                {/* Score Quartier Widget */}
                <div style={{ background: '#F7FAFC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <BarChart2 /> Score Quartier
                    </h3>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Sélectionnez un quartier</label>
                        <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' }}>
                            <option>Mermoz</option>
                            <option>Almadies</option>
                            <option>Plateau</option>
                            <option>Sacré-Cœur</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gap: '16px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
                                <span>Sécurité</span>
                                <span style={{ color: '#38A169' }}>9/10</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px' }}>
                                <div style={{ width: '90%', height: '100%', background: '#38A169', borderRadius: '4px' }} />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
                                <span>Accessibilité</span>
                                <span style={{ color: '#D69E2E' }}>7/10</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px' }}>
                                <div style={{ width: '70%', height: '100%', background: '#D69E2E', borderRadius: '4px' }} />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
                                <span>Commodités (Écoles, Commerces)</span>
                                <span style={{ color: '#006AFF' }}>8.5/10</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px' }}>
                                <div style={{ width: '85%', height: '100%', background: '#006AFF', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', padding: '16px', background: 'white', borderRadius: '12px', fontSize: '14px', fontStyle: 'italic', color: '#718096' }}>
                        "Mermoz est un quartier idéal pour les familles, alliant calme résidentiel et proximité des écoles internationales."
                    </div>
                </div>
            </div>
        </div>
    );
}
