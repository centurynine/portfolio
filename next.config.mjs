import dotenv from 'dotenv';

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_RESEND_API_KEY: process.env.APP_RESEND_API_KEY,
  }
};

export default nextConfig;