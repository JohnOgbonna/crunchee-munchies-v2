/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cruncheemunchies.s3.us-west-2.amazonaws.com',
          },
        ],
      },
};

export default nextConfig;
// 'https://cruncheemunchies.s3.us-west-2.amazonaws.com/chin-chin/sellers/sage-meadows1.png'