/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'randomuser.me', 'lottie.host', 'see.fontimg.com'],
    },
    experimental: {
        reachRoot: true,
        suppressHydrationWarning: true,
    }
};

export default nextConfig;
