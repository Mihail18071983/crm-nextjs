/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/**',
            }
        ]
    },
}

export default nextConfig
