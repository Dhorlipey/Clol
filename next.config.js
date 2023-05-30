/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com", "i.ibb.co"],
  },
  env: {
    stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  }
}

module.exports = nextConfig
