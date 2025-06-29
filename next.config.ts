import withPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.8',
        port: '3000',
      },
    ],
  },
  allowedDevOrigins: ['http://localhost:3000', 'http://192.168.1.8:3000'],
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd,
})(nextConfig);