/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'images.unsplash.com',
            'res.cloudinary.com',
            'randomuser.me'  // For agent avatars
        ],
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
