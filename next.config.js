/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    }, images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.0.149',
                port: '4000',
                pathname: '/uploads**',
            },
        ],
    },
}

module.exports = nextConfig