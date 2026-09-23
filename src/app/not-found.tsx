import Link from 'next/link'

/** 根级 404（无法确定语言时的兜底页面，双语提示） */
export default function RootNotFound() {
  return (
    <div className="container-main flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-sm tracking-widest text-accent">404 · NOT FOUND</p>
      <h1 className="mt-4 text-3xl font-semibold text-metal-bright md:text-4xl">
        页面不存在 / Page Not Found
      </h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3 font-mono text-sm">
        <Link href="/zh" className="text-accent hover:text-accent-hover">
          中文版首页 →
        </Link>
        <Link href="/en" className="text-accent hover:text-accent-hover">
          English Home →
        </Link>
      </div>
    </div>
  )
}
