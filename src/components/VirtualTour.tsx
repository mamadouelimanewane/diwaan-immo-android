'use client';

import { useRef, useState, useEffect } from 'react';
import { Compass, RotateCw } from 'lucide-react';
import styles from './VirtualTour.module.css';

export default function VirtualTour() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAutoRotating, setIsAutoRotating] = useState(true);

    const [mode, setMode] = useState<'360' | 'VIDEO'>('360');

    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            if (isAutoRotating && containerRef.current && mode === '360') {
                containerRef.current.scrollLeft += 1;
                // Loop back
                if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth / 2) {
                    containerRef.current.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        if (mode === '360') {
            animate();
        }
        return () => cancelAnimationFrame(animationFrameId);
    }, [isAutoRotating, mode]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.topControls}>
                <button
                    className={`${styles.modeBtn} ${mode === '360' ? styles.active : ''}`}
                    onClick={() => setMode('360')}
                >
                    <Compass size={16} /> 360°
                </button>
                <button
                    className={`${styles.modeBtn} ${mode === 'VIDEO' ? styles.active : ''}`}
                    onClick={() => setMode('VIDEO')}
                >
                    <RotateCw size={16} /> Vidéo
                </button>
            </div>

            {mode === '360' ? (
                <>
                    <div className={styles.controls}>
                        <div className={styles.badge}>
                            <Compass size={16} /> 360° View
                        </div>
                        <button
                            onClick={() => setIsAutoRotating(!isAutoRotating)}
                            className={styles.toggleBtn}
                        >
                            {isAutoRotating ? 'Pause' : 'Play'}
                        </button>
                    </div>

                    <div
                        className={styles.viewer}
                        ref={containerRef}
                        onMouseDown={() => setIsAutoRotating(false)}
                        onTouchStart={() => setIsAutoRotating(false)}
                    >
                        {/* Replicated image for infinite scroll effect - using placeholder if local file is missing */}
                        <img src="https://images.unsplash.com/photo-1596178065887-1198b6148b2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="360 View" className={styles.panorama} />
                        <img src="https://images.unsplash.com/photo-1596178065887-1198b6148b2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="360 View" className={styles.panorama} />
                    </div>

                    <div className={styles.overlay}>
                        <p>Glissez pour explorer</p>
                    </div>
                </>
            ) : (
                <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: '12px' }}
                    ></iframe>
                </div>
            )}
        </div>
    );
}
