/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // DB 드라이버는 서버 번들에 그대로 두고 번들링에서 제외한다.
  serverExternalPackages: ['mariadb'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  },
  eslint: { ignoreDuringBuilds: true }
};

export default nextConfig;
