/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_URL: "http://localhost:3000",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
