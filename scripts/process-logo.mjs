/**
 * 品牌 Logo 处理脚本
 * 1. 读取「资源/公司品牌Logo.png」（黑底）
 * 2. 以黑色为底反推 alpha（a = max(r,g,b)，通道归一化），得到透明底 Logo
 * 3. 输出 public/logo.png、app/icon.png（48）、app/apple-icon.png（180）
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, '资源', '公司品牌Logo.png')

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

let fullyOpaque = true
for (let i = 3; i < data.length; i += channels) {
  if (data[i] < 255) {
    fullyOpaque = false
    break
  }
}

if (fullyOpaque) {
  // 黑底转透明：alpha = max(r,g,b)，随后各通道按 alpha 归一化（避免暗色晕边）
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = Math.max(r, g, b)
    if (a === 0) {
      data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0
    } else {
      data[i] = Math.min(255, Math.round((r * 255) / a))
      data[i + 1] = Math.min(255, Math.round((g * 255) / a))
      data[i + 2] = Math.min(255, Math.round((b * 255) / a))
      data[i + 3] = a
    }
  }
  console.log('已将黑底转换为透明底')
} else {
  console.log('检测到原有 alpha 通道，保留原始透明度')
}

fs.mkdirSync(path.join(ROOT, 'public'), { recursive: true })
const base = sharp(data, { raw: { width, height, channels } })

await base.clone().png().toFile(path.join(ROOT, 'public', 'logo.png'))
await base.clone().resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(ROOT, 'src', 'app', 'icon.png'))
await base.clone().resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(ROOT, 'src', 'app', 'apple-icon.png'))

console.log(`✅ Logo 处理完成：${width}x${height} → public/logo.png + icon.png + apple-icon.png`)
