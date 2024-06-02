/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.pexels.com'],
    },

    api: {
        bodyParser: {
            sizeLimit: '15mb'
        }
    }
};

export default nextConfig;
