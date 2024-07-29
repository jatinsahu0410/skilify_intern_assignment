/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'codehelp-apis.vercel.app',
                port: '',
            },
        ],
    }
};

export default nextConfig;
