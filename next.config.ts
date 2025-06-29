import withPWA from 'next-pwa';

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
    },
};

export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
})(nextConfig);
