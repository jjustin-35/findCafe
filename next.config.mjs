// @ts-check
import secureEnv from 'secure-env';
global.env = secureEnv({ secret: process.env.PASSWORD });

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
  },
};

export default nextConfig;
