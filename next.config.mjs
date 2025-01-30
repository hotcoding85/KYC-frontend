/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
    async redirects() {
      return [
        {
          source: '/', // The URL to match (root in this case)
          destination: '/dashboard/home', // Where to redirect
          permanent: true, // Set to true for a 301 redirect, false for a 302 redirect
        },
      ];
    },
  };
  
  export default nextConfig;
  