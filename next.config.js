const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "seo-heist.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ansubkhan.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3002",
        pathname: "/api/media/file/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "technovationchallenge.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "4wzjkhubdwttxgvf.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "payloadcms-ishinora-production.up.railway.app",
      "i.ibb.co",
      "localhost",
      "4wzjkhubdwttxgvf.public.blob.vercel-storage.com",
      "v0-interior-design-platform-two.vercel.app",
      "fusionhome-media.b-cdn.net",
      "comfy-deploy-output.s3.us-east-2.amazonaws.com",
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // cache optimized variants for 24h to limit re-fetching
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/dashboard",
        destination: "/dashboard/magic-tools",
        permanent: true,
      },
      // {
      //   source: "/",
      //   destination: "/sign-in",
      //   permanent: true,
      // },
      // {
      //   source: "/blog",
      //   destination: "/sign-in",
      //   permanent: true,
      // },
    ];
  },
};
module.exports = nextConfig;
