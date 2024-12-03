/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.prismic.io"],
  },
  async redirects() {
    return [
      {
        source: "/flv_members/:path*",
        destination: "/talents/actors",
        permanent: true,
      },
      {
        source: "/clients/:path*",
        destination: "/talents/actors",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/talents/actors",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
