/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Never expose server-only env vars to the client bundle.
  // Only NEXT_PUBLIC_* vars are inlined by Next.js by design — this is
  // just a reminder for anyone adding new env vars later.
};

module.exports = nextConfig;
