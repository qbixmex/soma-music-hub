/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      // Example
      // {
      //   protocol: 'https',
      //   hostname: 's3.amazonaws.com',
      //   port: '',
      //   pathname: '/my-bucket/**',
      // },
    ],
  },
};

export default nextConfig;
