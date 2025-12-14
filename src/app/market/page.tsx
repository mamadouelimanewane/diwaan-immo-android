'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function MarketPage() {
    const data = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'Prix moyen au m² (Dakar)',
                data: [650000, 655000, 660000, 675000, 680000, 695000],
                borderColor: '#006AFF',
                backgroundColor: 'rgba(0, 106, 255, 0.5)',
                tension: 0.3
            },
            {
                label: 'Prix moyen au m² (Saly)',
                data: [450000, 452000, 448000, 455000, 460000, 465000],
                borderColor: '#00D06C',
                backgroundColor: 'rgba(0, 208, 108, 0.5)',
                tension: 0.3
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Évolution des prix de l\'immobilier (2025)',
            },
        },
    };

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Marché Immobilier au Sénégal</h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
                Suivez les tendances du marché, les prix au m² et les indices de confiance pour prendre les bonnes décisions.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <Line options={options} data={data} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Dakar (Plateau)</h3>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#006AFF' }}>+5.2%</div>
                        <p style={{ color: '#666' }}>Hausse annuelle</p>
                    </div>

                    <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Petit Mbao</h3>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#00D06C' }}>+12.8%</div>
                        <p style={{ color: '#666' }}>Quartier en plein essor</p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '60px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Dernières Actualités</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{ border: '1px solid #e0e0e0', borderRadius: '12px', overflow: 'hidden' }}>
                            <div style={{ height: '200px', background: '#eee' }}></div>
                            <div style={{ padding: '20px' }}>
                                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>ANALYSE • {i} JUIN 2025</div>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Pourquoi investir à Diamniadio maintenant ?</h3>
                                <p style={{ color: '#666' }}>La nouvelle ville continue sa croissance avec de nouveaux projets d'infrastructure...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
