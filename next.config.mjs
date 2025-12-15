/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // Pour Capacitor
    images: {
        unoptimized: true,  // Requis pour export statique
        domains: [
            'images.unsplash.com',
            'res.cloudinary.com',
            'randomuser.me'  // For agent avatars
        ],
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    // Optimisations pour mobile
    trailingSlash: true,
};

export default nextConfig;
