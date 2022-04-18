/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    PRODUCTION: false,
    API_PRODUCTION: '',
    API_DEVELOPMENT: 'http://localhost:5000',
    APP_NAME: 'App Name'
  },
}

module.exports = nextConfig
