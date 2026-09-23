import { redirect } from 'next/navigation'

/** 根路径重定向到默认语言（中文） */
export default function RootPage() {
  redirect('/zh')
}
