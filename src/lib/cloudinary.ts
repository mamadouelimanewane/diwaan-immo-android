import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'df4ukakpy',
    api_key: process.env.CLOUDINARY_API_KEY || '336283114183559',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'H1SRUwQmMBW8vVLlXHDWuXYP8Hc',
});

/**
 * Generate Cloudinary image URL
 * @param publicId - The image public ID in Cloudinary
 * @param options - Transformation options (width, height, crop, etc.)
 */
export function getCloudinaryUrl(
    publicId: string,
    options?: {
        width?: number;
        height?: number;
        crop?: string;
        quality?: string | number;
        format?: string;
    }
) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'df4ukakpy';

    const transformations = [];

    if (options?.width) transformations.push(`w_${options.width}`);
    if (options?.height) transformations.push(`h_${options.height}`);
    if (options?.crop) transformations.push(`c_${options.crop}`);
    if (options?.quality) transformations.push(`q_${options.quality}`);
    if (options?.format) transformations.push(`f_${options.format}`);

    const transformString = transformations.length > 0 ? transformations.join(',') + '/' : '';

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${publicId}`;
}

/**
 * Sample property images on Cloudinary
 * (Using demo images from Cloudinary's sample library)
 */
export const SAMPLE_PROPERTY_IMAGES = {
    modern_apartment: 'samples/ecommerce/accessories-bag',
    luxury_villa: 'samples/food/spices',
    beach_house: 'samples/landscapes/beach-boat',
    city_apartment: 'samples/landscapes/architecture-signs',
    garden_house: 'samples/landscapes/girl-urban-view',
    studio: 'samples/ecommerce/analog-classic',
};

export default cloudinary;
