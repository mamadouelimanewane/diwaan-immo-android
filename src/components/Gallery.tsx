'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Box } from 'lucide-react';
import styles from './Gallery.module.css';

interface GalleryProps {
    images: string[];
}

export default function Gallery({ images }: GalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [show3DModal, setShow3DModal] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainImageContainer}>
                <img src={images[currentIndex]} alt="Property" className={styles.mainImage} />

                <button onClick={prevImage} className={styles.navBtn} style={{ left: 10 }}>
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextImage} className={styles.navBtn} style={{ right: 10 }}>
                    <ChevronRight size={24} />
                </button>

                <div className={styles.indicators}>
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>

                <button className={styles.virtualTourBtn} onClick={() => setShow3DModal(true)}>
                    <Box size={20} style={{ marginRight: 8 }} />
                    Visite 3D
                </button>
            </div>

            <div className={styles.thumbnails}>
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt="Thumbnail"
                        className={`${styles.thumbnail} ${idx === currentIndex ? styles.activeThumb : ''}`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>

            {show3DModal && (
                <div className={styles.modalOverlay} onClick={() => setShow3DModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: 20 }}>Visite Virtuelle 3D</h2>
                        <div style={{ width: '100%', height: '300px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                            <p style={{ color: '#666' }}>Module de visite 3D en cours de chargement...</p>
                            {/* In a real app, embed Matterport or similar here */}
                        </div>
                        <button className="btn btn-primary" style={{ marginTop: 20, width: '100%' }} onClick={() => setShow3DModal(false)}>
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
