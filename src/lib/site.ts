/** 站点核心配置：真实联系方式与公司信息（文案部分在 i18n.ts 字典中） */
export const site = {
  url: 'https://jiateng.asia',
  foundedYear: 2009,
  /** 真实联系方式（来源：资源/基本信息.txt） */
  phone: '13822348696',
  phoneDisplay: '+86 138 2234 8696',
  email: '823744500@qq.com',
  certifications: ['ISO 9001:2015', 'IATF 16949', 'RoHS', 'SGS'],
  /** 公司中英文名 */
  nameZh: '江门市嘉腾五金制品有限公司',
  nameEn: 'Jiangmen Jiateng Hardware Products Co., Ltd.',
}

/** 双语取值 */
export function siteName(locale: 'zh' | 'en') {
  return locale === 'en' ? site.nameEn : site.nameZh
}

/** SEO 关键词（中文站） */
export const keywordsZh = ['紧固件', '螺丝', '螺栓', '螺母', '垫圈', '膨胀螺栓', '内六角螺丝', '五金', '嘉腾五金', '江门五金厂']
/** SEO 关键词（英文站） */
export const keywordsEn = ['fasteners', 'screws', 'bolts', 'nuts', 'washers', 'expansion anchors', 'hex socket screws', 'hardware manufacturer', 'Jiateng Fasteners', 'China fastener factory']
