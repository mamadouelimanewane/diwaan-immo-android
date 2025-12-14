'use client';

export default function AdminChart() {
    // Données pour le graphique
    const data = [65, 78, 90, 81, 86, 105, 120, 135, 142, 150, 165, 180];
    const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'];

    const max = Math.max(...data);
    const height = 200;

    return (
        <div style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
            {/* SVG Chart */}
            <svg width="100%" height={height} style={{ display: 'block' }}>
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                    <line
                        key={i}
                        x1="0"
                        y1={i * (height / 4)}
                        x2="100%"
                        y2={i * (height / 4)}
                        stroke="#E5E7EB"
                        strokeWidth="1"
                    />
                ))}

                {/* Area fill */}
                <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#006AFF', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: '#006AFF', stopOpacity: 0 }} />
                    </linearGradient>
                </defs>

                {/* Line path */}
                <polyline
                    fill="url(#areaGradient)"
                    stroke="#006AFF"
                    strokeWidth="3"
                    points={data.map((value, index) => {
                        const x = (index / (data.length - 1)) * 100;
                        const y = height - ((value / max) * (height - 20)) - 10;
                        return `${x}%,${y}`;
                    }).join(' ')}
                />

                {/* Data points */}
                {data.map((value, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = height - ((value / max) * (height - 20)) - 10;
                    return (
                        <circle
                            key={index}
                            cx={`${x}%`}
                            cy={y}
                            r="4"
                            fill="#006AFF"
                            style={{ cursor: 'pointer' }}
                        >
                            <title>{labels[index]}: {value} annonces</title>
                        </circle>
                    );
                })}
            </svg>

            {/* Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#6B7280' }}>
                {labels.map((label, index) => (
                    <span key={index}>{label}</span>
                ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '16px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#006AFF' }}></div>
                    <span style={{ color: '#6B7280' }}>Nouvelles Annonces</span>
                </div>
            </div>
        </div>
    );
}
