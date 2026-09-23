/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 纯静态导出：全站 410 页均为 SSG，无 SSR/ISR/API 依赖。
  // 好处：EdgeOne Pages / 任意静态托管可直接部署（避开 Node 函数包 128MiB 限制），加载更快
  output: 'export',
  // 静态托管兼容性：生成 /zh/index.html 目录结构
  trailingSlash: true,
  images: {
    // export 模式不支持 Next 图片优化服务，产品图本身较小（平均 ~92KB）直接原图加载
    unoptimized: true,
  },
}

export default nextConfig
