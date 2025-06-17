import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: ['picsum.photos', 'placehold.co', 'dummyimage.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                pathname: '/',
                port: '',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                pathname: '/',
                port: '',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'dummyimage.com',
                pathname: '/',
                port: '',
                search: '',
            },
        ],
    },
    experimental: {
        reactCompiler: true,
    },
};

export default nextConfig;