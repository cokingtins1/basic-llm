/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },

    async rewrites() {
        return [
          {
            source: '/api/hello',
            destination: 'http://127.0.0.1:8080/api/hello', // Proxy to Backend
          },
        ]
      },
};

export default nextConfig;
