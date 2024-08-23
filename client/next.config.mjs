/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // images: {
    //    domains: ['res.cloudinary.com', 'randomuser.me', 'lottie.host', 'see.fontimg.com'],
    //}, 
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'see.fontimg.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
