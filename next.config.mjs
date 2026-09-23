/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 本地 public 图片为主，预留远程图片扩展能力
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
}

export default nextConfig
