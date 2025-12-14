'use client';

import { useState } from 'react';

export default function IntelligencePage() {
    const [activeTab, setActiveTab] = useState('insights');

    return (
        <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '24px' }}>Intelligence & Analytics IA</h1>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #eee' }}>
                <button
                    onClick={() => setActiveTab('insights')}
                    style={{ padding: '12px 24px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', color: activeTab === 'insights' ? '#006AFF' : '#666', borderBottom: activeTab === 'insights' ? '2px solid #006AFF' : 'none' }}
                >
                    📊 Insights
                </button>
                <button
                    onClick={() => setActiveTab('predictions')}
                    style={{ padding: '12px 24px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', color: activeTab === 'predictions' ? '#006AFF' : '#666', borderBottom: activeTab === 'predictions' ? '2px solid #006AFF' : 'none' }}
                >
                    🔮 Prédictions
                </button>
                <button
                    onClick={() => setActiveTab('recommendations')}
                    style={{ padding: '12px 24px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', color: activeTab === 'recommendations' ? '#006AFF' : '#666', borderBottom: activeTab === 'recommendations' ? '2px solid #006AFF' : 'none' }}
                >
                    💡 Recommandations
                </button>
            </div>

            {activeTab === 'insights' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                    <InsightCard
                        icon="📈"
                        title="Tendance des Prix"
                        value="+8.5%"
                        description="Les prix à Dakar ont augmenté de 8.5% ce trimestre"
                        color="#05CD99"
                    />
                    <InsightCard
                        icon="🏘️"
                        title="Quartier en Croissance"
                        value="Mermoz"
                        description="Le quartier Mermoz montre le plus fort taux de demande"
                        color="#006AFF"
                    />
                    <InsightCard
                        icon="👥"
                        title="Profil Acheteur Principal"
                        value="30-45 ans"
                        description="La majorité des acheteurs ont entre 30 et 45 ans"
                        color="#FFB547"
                    />
                    <InsightCard
                        icon="⏱️"
                        title="Temps Moyen de Vente"
                        value="45 jours"
                        description="Les propriétés se vendent en moyenne en 45 jours"
                        color="#4318FF"
                    />
                </div>
            )}

            {activeTab === 'predictions' && (
                <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#1B254B' }}>Prédictions pour Q1 2026</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <PredictionItem title="Prix médian à Dakar" prediction="+12%" confidence="85%" />
                        <PredictionItem title="Volume de transactions" prediction="+5%" confidence="72%" />
                        <PredictionItem title="Demande locations meublées" prediction="+18%" confidence="91%" />
                        <PredictionItem title="Nouveaux programmes neufs" prediction="+8%" confidence="68%" />
                    </div>
                </div>
            )}

            {activeTab === 'recommendations' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <RecommendationCard
                        title="Optimiser le référencement"
                        description="Vos annonces à Almadies reçoivent peu de vues. Ajoutez plus de photos HD et une visite virtuelle."
                        action="Voir les annonces concernées"
                        priority="Haute"
                    />
                    <RecommendationCard
                        title="Cibler le segment luxe"
                        description="L'IA détecte une forte demande pour des villas de luxe à Saly. Contactez plus d'agents locaux."
                        action="Voir opportunités"
                        priority="Moyenne"
                    />
                    <RecommendationCard
                        title="Ajuster les prix"
                        description="3 propriétés sont surévaluées par rapport au marché actuel. Réduire de 5-8% augmenterait les conversions."
                        action="Analyser les prix"
                        priority="Basse"
                    />
                </div>
            )}
        </div>
    );
}

function InsightCard({ icon, title, value, description, color }: any) {
    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', borderLeft: `4px solid ${color}` }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
            <h4 style={{ fontSize: '14px', color: '#A3AED0', marginBottom: '4px' }}>{title}</h4>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>{value}</h2>
            <p style={{ fontSize: '13px', color: '#666' }}>{description}</p>
        </div>
    );
}

function PredictionItem({ title, prediction, confidence }: any) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#F4F7FE', borderRadius: '8px' }}>
            <span style={{ fontWeight: '500', color: '#1B254B' }}>{title}</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#05CD99', fontSize: '18px' }}>{prediction}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>Confiance: {confidence}</span>
            </div>
        </div>
    );
}

function RecommendationCard({ title, description, action, priority }: any) {
    const priorityColor = priority === 'Haute' ? '#E31A1A' : priority === 'Moyenne' ? '#FFB547' : '#05CD99';

    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h4 style={{ fontWeight: 'bold', color: '#1B254B', fontSize: '16px' }}>{title}</h4>
                <span style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', background: `${priorityColor}20`, color: priorityColor }}>
                    {priority}
                </span>
            </div>
            <p style={{ color: '#666', marginBottom: '16px', fontSize: '14px' }}>{description}</p>
            <button style={{ background: '#006AFF', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}>
                {action} →
            </button>
        </div>
    );
}
