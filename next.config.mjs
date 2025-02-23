// @ts-check
import secureEnv from 'secure-env';
global.env = secureEnv({ secret: process.env.PASSWORD });

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    MONGODB_URL: global.env.MONGODB_URL,
    GCP_MAP_KEY: global.env.GCP_MAP_KEY,
    GCP_MAP_ID: process.env.NODE_ENV === 'production' ? global.env.GCP_MAP_ID : ' DEMO_MAP_ID',
  },
};

export default nextConfig;
