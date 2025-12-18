'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Cloudinary
const CldUploadWidget = dynamic(
    () => import('next-cloudinary').then(mod => mod.CldUploadWidget),
    { ssr: false }
);

interface ImageUploadProps {
    onUpload: (url: string) => void;
    onRemove?: (url: string) => void;
    images?: string[];
    maxImages?: number;
}

export default function ImageUpload({ onUpload, onRemove, images = [], maxImages = 10 }: ImageUploadProps) {
    const [uploadedImages, setUploadedImages] = useState<string[]>(images);
    const [isUploading, setIsUploading] = useState(false);
    const [isCloudinaryReady, setIsCloudinaryReady] = useState(false);

    // Check if Cloudinary is configured (client-side only)
    useEffect(() => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        setIsCloudinaryReady(!!cloudName && cloudName.length > 0);
    }, []);

    const handleSuccess = (result: any) => {
        const url = result.info.secure_url;
        setUploadedImages(prev => [...prev, url]);
        onUpload(url);
        setIsUploading(false);
    };

    const handleRemove = (url: string) => {
        setUploadedImages(prev => prev.filter(img => img !== url));
        if (onRemove) {
            onRemove(url);
        }
    };

    const canUploadMore = uploadedImages.length < maxImages;

    return (
        <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                        Photos de la Propriété
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        {uploadedImages.length}/{maxImages} images téléchargées
                    </p>
                </div>

                {canUploadMore && isCloudinaryReady && (
                    <CldUploadWidget
                        uploadPreset="diwaan_properties"
                        onSuccess={handleSuccess}
                        onQueuesEnd={() => setIsUploading(false)}
                        options={{
                            multiple: true,
                            maxFiles: maxImages - uploadedImages.length,
                            maxFileSize: 5000000, // 5MB
                            sources: ['local', 'camera'],
                            styles: {
                                palette: {
                                    window: '#FFFFFF',
                                    windowBorder: '#006AFF',
                                    tabIcon: '#006AFF',
                                    menuIcons: '#006AFF',
                                    textDark: '#000000',
                                    textLight: '#FFFFFF',
                                    link: '#006AFF',
                                    action: '#006AFF',
                                    inactiveTabIcon: '#999999',
                                    error: '#E31A1A',
                                    inProgress: '#006AFF',
                                    complete: '#05CD99',
                                    sourceBg: '#F9FAFB'
                                }
                            }
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsUploading(true);
                                    open();
                                }}
                                disabled={isUploading}
                                style={{
                                    padding: '12px 24px',
                                    background: isUploading ? '#ccc' : '#006AFF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: isUploading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {isUploading ? '⏳ Upload en cours...' : '📸 Ajouter des Photos'}
                            </button>
                        )}
                    </CldUploadWidget>
                )}

                {/* Fallback when Cloudinary is not configured */}
                {canUploadMore && !isCloudinaryReady && (
                    <button
                        type="button"
                        disabled
                        style={{
                            padding: '12px 24px',
                            background: '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        title="Cloudinary non configuré"
                    >
                        📸 Upload non disponible
                    </button>
                )}
            </div>

            {/* Grid d'images */}
            {uploadedImages.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '16px'
                }}>
                    {uploadedImages.map((url, index) => (
                        <div
                            key={url}
                            style={{
                                position: 'relative',
                                aspectRatio: '4/3',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '2px solid #E5E7EB',
                                background: '#F9FAFB'
                            }}
                        >
                            <Image
                                src={url}
                                alt={`Photo ${index + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                            />

                            {/* Badge principale */}
                            {index === 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    left: '8px',
                                    background: '#006AFF',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    ⭐ Principale
                                </div>
                            )}

                            {/* Bouton supprimer */}
                            <button
                                type="button"
                                onClick={() => handleRemove(url)}
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    background: 'rgba(227, 26, 26, 0.9)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                }}
                                title="Supprimer"
                            >
                                ×
                            </button>

                            {/* Overlay au hover */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                padding: '12px',
                                color: 'white',
                                fontSize: '12px'
                            }}>
                                Photo {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    border: '2px dashed #D1D5DB',
                    borderRadius: '12px',
                    padding: '48px',
                    textAlign: 'center',
                    background: '#F9FAFB'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#1F2937' }}>
                        Aucune photo ajoutée
                    </h4>
                    <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
                        Cliquez sur "Ajouter des Photos" pour commencer
                    </p>
                    <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        Formats acceptés : JPG, PNG, WebP • Max 5MB par image
                    </p>
                </div>
            )}

            {/* Conseils */}
            <div style={{
                marginTop: '16px',
                padding: '16px',
                background: '#EFF6FF',
                borderRadius: '8px',
                borderLeft: '4px solid #006AFF'
            }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#1E40AF' }}>
                    💡 Conseils pour de meilleures photos
                </h4>
                <ul style={{ fontSize: '13px', color: '#1E40AF', margin: 0, paddingLeft: '20px' }}>
                    <li>Utilisez la lumière naturelle</li>
                    <li>Photographiez toutes les pièces importantes</li>
                    <li>Assurez-vous que les images sont nettes</li>
                    <li>La première photo sera utilisée comme image principale</li>
                </ul>
            </div>
        </div>
    );
}
