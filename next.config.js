/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.0.149:4000',
                port: '4000',
                pathname: '/uploads**',
            },
        ],
    },
}

