/** 支持的语言 */
export const locales = ['zh', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'zh'

import { site } from '@/lib/site'

/** 是否合法语言 */
export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v)
}

/**
 * UI 文案字典（仅字符串，保证可安全通过 RSC 序列化传给客户端组件）
 * 占位符使用 {n} {a} {b}，由组件侧替换
 */
export interface Dict {
  htmlLang: string
  /** 全站默认 SEO 描述 */
  seoDescription: string
  brand: { title: string; sub: string }
  nav: {
    products: string
    about: string
    contact: string
    inquiry: string
    openMenu: string
    navAria: string
    mobileNavAria: string
    modelsUnit: string
    allStandards: string
    viewAll: string
    langSwitchLabel: string
    langSwitchTo: string
  }
  footer: {
    aria: string
    contactTitle: string
    seriesTitle: string
    certTitle: string
    qualityNote: string
    copyright: string
    slogan: string
    company: string
    address: string
    hours: string
  }
  home: {
    hero: {
      kicker: string
      titleA: string
      titleB: string
      desc: string
      ctaProducts: string
      ctaQuote: string
      chips: string[]
      badge1: { label: string; value: string; sub: string }
      badge2: { label: string; value: string }
      heroAlt: string
    }
    categories: { aria: string; kicker: string; title: string; desc: string; viewAll: string; modelsUnit: string }
    statsAria: string
    featured: { kicker: string; title: string; desc: string; viewAll: string; viewAllMobile: string }
    stats: { value: number; suffix: string; decimals?: number; label: string; en: string }[]
    why: { kicker: string; title: string; desc: string; items: { title: string; en: string; desc: string }[] }
    industries: { kicker: string; title: string; desc: string; items: { icon: string; name: string; desc: string }[] }
    cta: { kicker: string; titleA: string; titleB: string; desc: string; btn: string }
  }
  productsPage: {
    kicker: string
    title: string
    desc: string
    metaTitle: string
    metaDesc: string
    aria: string
    filter: {
      title: string
      category: string
      material: string
      grade: string
      standard: string
      price: string
      reset: string
    }
    sort: { aria: string; default: string; asc: string; desc: string }
    resultsCount: string
    filterBtn: string
    loadMore: string
    emptyTitle: string
    emptyDesc: string
    emptyReset: string
    priceUnitLabel: string
  }
  detail: {
    homeCrumb: string
    productsCrumb: string
    skuLabel: string
    referencePrice: string
    priceSuffix: string
    material: string
    finish: string
    grade: string
    standard: string
    ctaQuote: string
    ctaSeries: string
    guarantees: string[]
    specs: { kicker: string; title: string }
    apps: { kicker: string; title: string }
    downloads: {
      kicker: string
      title: string
      cad: string
      cadSub: string
      spec: string
      specSub: string
      toast: string
      goInquiry: string
    }
    inquiry: {
      kicker: string
      title: string
      desc: string
      hotlineLabel: string
      emailLabel: string
      qty: string
      name: string
      contact: string
      message: string
      qtyPlaceholder: string
      namePlaceholder: string
      contactPlaceholder: string
      messagePlaceholder: string
      submit: string
      submitting: string
      privacy: string
      successTitle: string
      successDesc: string
      successAgain: string
    }
    related: { kicker: string; title: string }
    galleryHint: string
    thumbnailsAria: string
  }
  about: {
    kicker: string
    titleA: string
    titleB: string
    intro: string
    milestonesTitle: string
    milestones: { year: string; text: string }[]
    quality: { kicker: string; title: string; desc: string }
    yearsUnit: string
  }
  contact: {
    title: string
    desc: string
    channels: {
      icon: 'phone' | 'mail' | 'mapPin' | 'clock'
      label: string
      value: string
      sub: string
      href?: string
    }[]
    formKicker: string
    formTitle: string
  }
  error: {
    code: string
    title: string
    desc: string
    retry: string
  }
  notFound: {
    code: string
    titleA: string
    titleB: string
    desc: string
    browse: string
    backHome: string
  }
  materials: Record<string, string>
}

export const dictionaries: Record<Locale, Dict> = {
  zh: {
    htmlLang: 'zh-CN',
    seoDescription:
      '江门嘉腾五金——197 种工业级紧固件产品，覆盖内六角、外六角、螺母、垫圈、钻尾、膨胀锚栓等 13 大系列，通过 ISO 9001 质量体系认证，为装备制造、电子电器、建筑工程提供精密紧固解决方案。',
    brand: { title: '嘉腾五金', sub: 'JIATENG FASTENERS' },
    nav: {
      products: '产品分类',
      about: '关于我们',
      contact: '联系我们',
      inquiry: '在线询价',
      openMenu: '打开菜单',
      navAria: '主导航',
      mobileNavAria: '移动端导航',
      modelsUnit: '型号',
      allStandards: 'DIN / ISO / ANSI / JIS / GB 全标准覆盖',
      viewAll: '查看全部产品 →',
      langSwitchLabel: '切换到英文',
      langSwitchTo: 'EN',
    },
    footer: {
      aria: '页脚',
      contactTitle: '联系方式',
      seriesTitle: '产品系列',
      certTitle: '行业认证',
      qualityNote: '全流程质量管理体系，从原材料入库到成品出货，每批次独立检测报告，支持第三方验货。',
      copyright: '版权所有',
      slogan: 'PRECISION FASTENING SOLUTIONS',
      company: '江门市嘉腾五金制品有限公司',
      address: '江门市西区工业路36号自编二栋C1区首层',
      hours: '周一至周六 8:30 – 18:00',
    },
    home: {
      hero: {
        kicker: 'PRECISION FASTENING SOLUTIONS',
        titleA: '精密紧固件',
        titleB: '工业级品质',
        desc: '13 大产品系列、197 种型号，覆盖 DIN / ISO / ANSI / JIS / GB 全标准体系。从一枚微型电子螺丝到高载荷膨胀锚栓，嘉腾为装备制造、电子电器与建筑工程提供可靠连接。',
        ctaProducts: '查看产品系列',
        ctaQuote: '获取报价',
        chips: ['M2 – M42', '4.8 / 8.8 / 10.9 / 12.9', 'A2-70 不锈钢', 'ISO · DIN · ANSI · GB'],
        badge1: { label: 'DIN 912', value: 'M6 × 40', sub: '12.9 级合金钢' },
        badge2: { label: '盐雾测试', value: '≥ 500 h' },
        heroAlt: '发黑杯头螺丝产品图',
      },
      categories: {
        aria: '产品分类',
        kicker: 'PRODUCT CATEGORIES',
        title: '六大品类 · 全场景覆盖',
        desc: '从微型电子螺丝到大载荷锚栓，13 个系列 197 种型号，按品类快速定位您需要的紧固方案。',
        viewAll: 'ALL PRODUCTS →',
        modelsUnit: '型号',
      },
      statsAria: '公司数据',
      featured: {
        kicker: 'FEATURED PRODUCTS',
        title: '精选产品',
        desc: '工厂直供高复购型号，全部现货常备，支持 24 小时急速发货。',
        viewAll: 'VIEW ALL →',
        viewAllMobile: '查看全部产品',
      },
      stats: [
        { value: 197, suffix: '+', label: '在售产品型号', en: 'SKU MODELS' },
        { value: 13, suffix: '', label: '产品系列', en: 'SERIES' },
        { value: 2.4, suffix: ' 亿', decimals: 1, label: '年产能（件）', en: 'ANNUAL OUTPUT' },
        { value: 16, suffix: ' 年', label: '行业深耕', en: 'YEARS' },
      ],
      why: {
        kicker: 'WHY JIATENG',
        title: '为什么选择我们',
        desc: '源头工厂 16 年制造沉淀，把材质、标准、品控与交期做成可以写进合同承诺的硬指标。',
        items: [
          { title: '源头材质', en: 'MATERIAL', desc: 'SUS304/316、12.9 级合金钢等原厂直采，每批次附材质证明书，盐雾测试达 72–500 小时。' },
          { title: '标准齐全', en: 'STANDARDS', desc: '覆盖 DIN / ISO / ANSI / JIS / GB 五大标准体系，非标件支持来图来样定制。' },
          { title: '全检出货', en: 'INSPECTION', desc: '光谱仪、投影仪、拉力试验机三重检测，螺纹通止规全检，批次可追溯。' },
          { title: '极速交期', en: 'DELIVERY', desc: '常备库存 8000 万件，现货 24 小时发货，定制件 7–15 天交付，珠三角当日达。' },
        ],
      },
      industries: {
        kicker: 'INDUSTRIES',
        title: '服务于要求最严苛的行业',
        desc: '每一枚紧固件背后，都是一条不能停摆的产线、一座不能松动的结构。',
        items: [
          { icon: 'Factory', name: '装备制造', desc: '自动化设备、机器人、精密机床的结构连接' },
          { icon: 'Cpu', name: '电子电器', desc: '3C 数码、家电控制板、通信设备的微型装配' },
          { icon: 'Building2', name: '建筑工程', desc: '钢结构、幕墙干挂、机电安装的锚固方案' },
          { icon: 'Car', name: '汽车工业', desc: '整车装配与零部件的高强度紧固需求' },
          { icon: 'TrainFront', name: '轨道交通', desc: '减振防松、耐候抗疲劳的关键连接' },
          { icon: 'Wind', name: '新能源', desc: '光伏支架、储能柜体的长效防腐蚀紧固' },
        ],
      },
      cta: {
        kicker: 'GET A QUOTE',
        titleA: '非标定制 · 批量采购，',
        titleB: '24 小时内给你报价',
        desc: '提供图纸或样品即可定制，常规现货当日发出。拨打电话或提交需求，工程师一对一对接。',
        btn: '立即询价',
      },
    },
    productsPage: {
      kicker: 'PRODUCT CENTER',
      title: '产品中心',
      desc: '按分类、材质、强度等级、执行标准与参考价格筛选 197 种工业紧固件，所有型号均附材质证明与检测报告。',
      metaTitle: '产品中心',
      metaDesc: '嘉腾五金产品中心：13 大系列 197 种工业紧固件，覆盖螺栓、螺钉、螺母、垫圈、锚栓与特种紧固件。',
      aria: '产品中心页头',
      filter: {
        title: '筛选条件',
        category: '产品分类',
        material: '材质',
        grade: '强度等级',
        standard: '执行标准',
        price: '参考单价',
        reset: 'RESET / 重置筛选',
      },
      sort: { aria: '排序方式', default: '默认排序', asc: '价格 ↑', desc: '价格 ↓' },
      resultsCount: '共 {n} 个型号',
      filterBtn: '筛选',
      loadMore: '加载更多（{a} / {b}）',
      emptyTitle: '没有符合条件的产品',
      emptyDesc: '试试放宽筛选条件，或联系我们定制',
      emptyReset: '重置全部筛选',
      priceUnitLabel: '参考单价',
    },
    detail: {
      homeCrumb: '首页',
      productsCrumb: '产品中心',
      skuLabel: 'SKU',
      referencePrice: '参考单价',
      priceSuffix: '/ 件（批量另议）',
      material: '材质',
      finish: '表面处理',
      grade: '强度等级',
      standard: '执行标准',
      ctaQuote: '立即询价',
      ctaSeries: '查看同系列',
      guarantees: ['原厂直供', '出货全检', '24H 发货'],
      specs: { kicker: 'TECHNICAL SPECS', title: '技术参数' },
      apps: { kicker: 'APPLICATIONS', title: '应用场景' },
      downloads: {
        kicker: 'DOWNLOADS',
        title: '资源下载',
        cad: 'CAD 图纸',
        cadSub: 'DWG / DXF · 2D 三视图',
        spec: '产品规格书',
        specSub: 'PDF · 含公差与扭矩表',
        toast: '资料整理中：完整技术资料请联系销售获取，或提交询价后由工程师发送。',
        goInquiry: '去询价',
      },
      inquiry: {
        kicker: 'REQUEST A QUOTE',
        title: '产品询价',
        desc: '告诉我们采购数量与要求，24 小时内获得 {name} 的正式报价。支持来图来样定制。',
        hotlineLabel: 'HOTLINE',
        emailLabel: 'EMAIL',
        qty: '采购数量（件）',
        name: '您的称呼',
        contact: '电话 / 微信 / 邮箱',
        message: '特殊要求',
        qtyPlaceholder: '如 1000',
        namePlaceholder: '如：王工',
        contactPlaceholder: '方便联系到您的任意方式',
        messagePlaceholder: '询价产品：{name}\n可补充规格（如 M6×40）、材质要求、表面处理、交期、目的港等',
        submit: '提交询价',
        submitting: '提交中…',
        privacy: '提交即视为同意我们仅将信息用于本次报价沟通，不向第三方披露。',
        successTitle: '询价已提交',
        successDesc: '销售工程师将在 24 小时内与您联系（工作日 8:30 – 18:00）。紧急需求请直接拨打热线。',
        successAgain: '再提交一单',
      },
      related: { kicker: 'RELATED PRODUCTS', title: '相关产品推荐' },
      galleryHint: '移动鼠标查看',
      thumbnailsAria: '产品图片切换',
    },
    about: {
      kicker: 'ABOUT JIATENG',
      titleA: '一枚螺丝的',
      titleB: '确定性',
      intro:
        '江门市嘉腾五金制品有限公司成立于 2009 年，扎根珠三角制造业腹地。16 年来我们只做一件事：把每一枚紧固件的材质、公差与强度做到稳定可依赖。从 3C 电子的微型螺丝到大载荷膨胀锚栓，197 种在售型号背后是同一条标准化的产线与同一套严苛的出厂检验。',
      milestonesTitle: '制造之路',
      milestones: [
        { year: '2009', text: '工厂创立，聚焦内六角与组合螺丝制造' },
        { year: '2014', text: '引入冷镦多工位产线，月产能突破 5000 万件' },
        { year: '2018', text: '通过 ISO 9001 质量管理体系认证' },
        { year: '2021', text: '设立 CNC 非标定制车间，支持来图加工' },
        { year: '2024', text: '通过 IATF 16949 认证，进入汽车供应链' },
      ],
      quality: {
        kicker: 'QUALITY & CERTIFICATIONS',
        title: '写进合同的质量承诺',
        desc: '每批次产品附材质证明书与检测报告，支持第三方验货与驻厂监造。',
      },
      yearsUnit: ' 年',
    },
    contact: {
      title: '联系我们',
      desc: '提交下方表单或直接来电，销售工程师一对一对接；非标定制请备好图纸或样品信息。',
      channels: [
        { icon: 'phone', label: '销售热线', value: site.phoneDisplay, sub: '微信同号，支持紧急订单', href: `tel:${site.phone}` },
        { icon: 'mail', label: '商务邮箱', value: '823744500@qq.com', sub: '支持图纸与 3D 文件附件', href: 'mailto:823744500@qq.com' },
        { icon: 'mapPin', label: '工厂地址', value: '江门市西区工业路36号自编二栋C1区首层', sub: '来访请提前预约，可安排产线参观' },
        { icon: 'clock', label: '服务时间', value: '周一至周六 8:30 – 18:00', sub: '紧急订单 7×24 小时响应' },
      ],
      formKicker: 'REQUEST A QUOTE',
      formTitle: '在线询价',
    },
    error: {
      code: 'SYSTEM FAULT · 500',
      title: '页面出现异常',
      desc: '工匠精神也难免偶发瑕疵。请重试，若问题持续请联系我们处理。',
      retry: '重新加载',
    },
    notFound: {
      code: '404 · NOT FOUND',
      titleA: '页面未被',
      titleB: '紧固',
      desc: '您访问的页面不存在或已下线。回到产品目录，继续寻找合适的紧固方案。',
      browse: '浏览产品中心',
      backHome: '返回首页',
    },
    materials: {
      stainless: '不锈钢',
      carbon: '碳钢',
      alloy: '合金钢',
      copper: '铜',
      nylon: '尼龙',
      aluminum: '铝',
    },
  },

  en: {
    htmlLang: 'en',
    seoDescription:
      'Jiateng Hardware — 197 industrial fasteners across 13 series: hex socket screws, hex bolts, nuts, washers, self-drilling screws and expansion anchors. ISO 9001 & IATF 16949 certified factory supplying equipment manufacturing, electronics and construction worldwide.',
    brand: { title: 'JIATENG FASTENERS', sub: 'PRECISION FASTENING' },
    nav: {
      products: 'Products',
      about: 'About Us',
      contact: 'Contact',
      inquiry: 'Get a Quote',
      openMenu: 'Open menu',
      navAria: 'Main navigation',
      mobileNavAria: 'Mobile navigation',
      modelsUnit: 'models',
      allStandards: 'Full coverage of DIN / ISO / ANSI / JIS / GB',
      viewAll: 'View all products →',
      langSwitchLabel: 'Switch to Chinese',
      langSwitchTo: '中文',
    },
    footer: {
      aria: 'Footer',
      contactTitle: 'Contact',
      seriesTitle: 'Product Series',
      certTitle: 'Certifications',
      qualityNote:
        'Full-process quality management from incoming material to shipment — independent inspection report for every batch, third-party verification welcome.',
      copyright: 'All rights reserved.',
      slogan: 'PRECISION FASTENING SOLUTIONS',
      company: 'Jiangmen Jiateng Hardware Products Co., Ltd.',
      address: '1F, Block C1, No.36 Xiqu Industrial Road, Jiangmen, Guangdong, China',
      hours: 'Mon – Sat, 8:30 – 18:00 (GMT+8)',
    },
    home: {
      hero: {
        kicker: 'PRECISION FASTENING SOLUTIONS',
        titleA: 'Precision Fasteners',
        titleB: 'Industrial Grade',
        desc: '13 series and 197 models covering DIN / ISO / ANSI / JIS / GB standards. From micro electronics screws to heavy-duty expansion anchors, Jiateng delivers reliable connections for equipment manufacturing, electronics and construction.',
        ctaProducts: 'View Products',
        ctaQuote: 'Get a Quote',
        chips: ['M2 – M42', '4.8 / 8.8 / 10.9 / 12.9', 'A2-70 Stainless', 'ISO · DIN · ANSI · GB'],
        badge1: { label: 'DIN 912', value: 'M6 × 40', sub: 'Grade 12.9 Alloy Steel' },
        badge2: { label: 'Salt Spray Test', value: '≥ 500 h' },
        heroAlt: 'Black oxide socket head cap screws',
      },
      categories: {
        aria: 'Product categories',
        kicker: 'PRODUCT CATEGORIES',
        title: 'Six Categories · Every Application',
        desc: 'From micro electronics screws to heavy-duty anchors — 13 series, 197 models. Find the right fastening solution by category.',
        viewAll: 'ALL PRODUCTS →',
        modelsUnit: 'models',
      },
      statsAria: 'Company stats',
      featured: {
        kicker: 'FEATURED PRODUCTS',
        title: 'Featured Products',
        desc: 'Best-selling models straight from the factory — all in stock with 24-hour dispatch.',
        viewAll: 'VIEW ALL →',
        viewAllMobile: 'View all products',
      },
      stats: [
        { value: 197, suffix: '+', label: 'Active models', en: 'SKU MODELS' },
        { value: 13, suffix: '', label: 'Product series', en: 'SERIES' },
        { value: 240, suffix: ' M', label: 'Annual capacity (pcs)', en: 'ANNUAL OUTPUT' },
        { value: 16, suffix: ' yrs', label: 'Manufacturing experience', en: 'YEARS' },
      ],
      why: {
        kicker: 'WHY JIATENG',
        title: 'Why Choose Us',
        desc: '16 years of in-house manufacturing — material, standards, quality control and lead time as contract-level commitments.',
        items: [
          { title: 'Source Materials', en: 'MATERIAL', desc: 'Mill-direct SUS304/316 and grade 12.9 alloy steel. Mill certificates with every batch; salt spray tested 72–500 hours.' },
          { title: 'Full Standards', en: 'STANDARDS', desc: 'DIN / ISO / ANSI / JIS / GB coverage. Custom parts made to drawing or sample.' },
          { title: '100% Inspection', en: 'INSPECTION', desc: 'Triple inspection with spectrometer, projector and tensile tester. Every thread gauge-checked, fully traceable.' },
          { title: 'Fast Delivery', en: 'DELIVERY', desc: '80 million pieces in stock. Stocked items ship in 24h, custom parts in 7–15 days, same-day across the Pearl River Delta.' },
        ],
      },
      industries: {
        kicker: 'INDUSTRIES',
        title: 'Serving the Most Demanding Industries',
        desc: 'Behind every fastener is a production line that cannot stop and a structure that must not loosen.',
        items: [
          { icon: 'Factory', name: 'Equipment Mfg.', desc: 'Structural connections for automation, robotics and precision machine tools' },
          { icon: 'Cpu', name: 'Electronics', desc: 'Micro assembly for consumer devices, appliance boards and telecom' },
          { icon: 'Building2', name: 'Construction', desc: 'Anchoring for steel structures, curtain walls and M&E installation' },
          { icon: 'Car', name: 'Automotive', desc: 'High-strength fastening for vehicle assembly and components' },
          { icon: 'TrainFront', name: 'Rail Transit', desc: 'Vibration-proof, weather-resistant and fatigue-critical joints' },
          { icon: 'Wind', name: 'New Energy', desc: 'Long-term anti-corrosion fastening for PV mounting and ESS cabinets' },
        ],
      },
      cta: {
        kicker: 'GET A QUOTE',
        titleA: 'Custom Parts & Bulk Orders —',
        titleB: 'Quotation Within 24 Hours',
        desc: 'Send drawings or samples to start customization; stocked items ship same day. Call or submit your request for one-on-one engineer support.',
        btn: 'Get a Quote',
      },
    },
    productsPage: {
      kicker: 'PRODUCT CENTER',
      title: 'Product Center',
      desc: 'Filter 197 industrial fasteners by category, material, grade, standard and reference price. Material certificates and inspection reports for every model.',
      metaTitle: 'Products',
      metaDesc: 'Jiateng product center: 13 series, 197 industrial fasteners covering bolts, screws, nuts, washers, anchors and special fasteners.',
      aria: 'Product center header',
      filter: {
        title: 'Filters',
        category: 'Category',
        material: 'Material',
        grade: 'Grade',
        standard: 'Standard',
        price: 'Unit Price',
        reset: 'RESET / Clear Filters',
      },
      sort: { aria: 'Sort by', default: 'Default', asc: 'Price ↑', desc: 'Price ↓' },
      resultsCount: '{n} models',
      filterBtn: 'Filter',
      loadMore: 'Load more ({a} / {b})',
      emptyTitle: 'No matching products',
      emptyDesc: 'Try relaxing the filters, or contact us for custom parts',
      emptyReset: 'Reset all filters',
      priceUnitLabel: 'Unit Price',
    },
    detail: {
      homeCrumb: 'Home',
      productsCrumb: 'Products',
      skuLabel: 'SKU',
      referencePrice: 'Reference price',
      priceSuffix: '/ pc · CNY (bulk negotiable)',
      material: 'Material',
      finish: 'Finish',
      grade: 'Grade',
      standard: 'Standard',
      ctaQuote: 'Request a Quote',
      ctaSeries: 'Same Series',
      guarantees: ['Factory Direct', '100% Inspected', '24H Dispatch'],
      specs: { kicker: 'TECHNICAL SPECS', title: 'Technical Specifications' },
      apps: { kicker: 'APPLICATIONS', title: 'Applications' },
      downloads: {
        kicker: 'DOWNLOADS',
        title: 'Downloads',
        cad: 'CAD Drawing',
        cadSub: 'DWG / DXF · 2D views',
        spec: 'Spec Sheet',
        specSub: 'PDF · with tolerance & torque',
        toast: 'Documents in preparation: contact sales for full technical data, or submit an inquiry and our engineer will send them over.',
        goInquiry: 'Inquire now',
      },
      inquiry: {
        kicker: 'REQUEST A QUOTE',
        title: 'Product Inquiry',
        desc: 'Tell us the quantity and requirements — formal quotation for {name} within 24 hours. Custom-made to drawing or sample.',
        hotlineLabel: 'HOTLINE',
        emailLabel: 'EMAIL',
        qty: 'Quantity (pcs)',
        name: 'Your Name',
        contact: 'Phone / WeChat / Email',
        message: 'Requirements',
        qtyPlaceholder: 'e.g. 1000',
        namePlaceholder: 'e.g. Mr. Wang',
        contactPlaceholder: 'Any way we can reach you',
        messagePlaceholder: 'Product: {name}\nAdd size (e.g. M6×40), material, finish, lead time, destination port, etc.',
        submit: 'Submit Inquiry',
        submitting: 'Submitting…',
        privacy: 'By submitting, you agree that your information is used solely for this quotation and never shared with third parties.',
        successTitle: 'Inquiry Submitted',
        successDesc: 'Our sales engineer will contact you within 24 hours (Mon – Sat, 8:30 – 18:00 GMT+8). For urgent needs, call the hotline directly.',
        successAgain: 'Submit Another',
      },
      related: { kicker: 'RELATED PRODUCTS', title: 'Related Products' },
      galleryHint: 'Move to rotate',
      thumbnailsAria: 'Product image switcher',
    },
    about: {
      kicker: 'ABOUT JIATENG',
      titleA: 'Certainty in',
      titleB: 'Every Screw',
      intro:
        'Founded in 2009 in the Pearl River Delta manufacturing heartland, Jiangmen Jiateng Hardware Products Co., Ltd. has spent 16 years doing one thing: making the material, tolerance and strength of every fastener dependably consistent. From micro screws for 3C electronics to heavy-duty expansion anchors, all 197 models share the same standardized production line and the same rigorous factory inspection.',
      milestonesTitle: 'Milestones',
      milestones: [
        { year: '2009', text: 'Factory founded, focused on hex socket and combination screws' },
        { year: '2014', text: 'Multi-station cold heading lines added — monthly output over 50 million pcs' },
        { year: '2018', text: 'ISO 9001 quality management system certified' },
        { year: '2021', text: 'CNC custom workshop established for made-to-drawing parts' },
        { year: '2024', text: 'IATF 16949 certified, entering the automotive supply chain' },
      ],
      quality: {
        kicker: 'QUALITY & CERTIFICATIONS',
        title: 'Quality Promises in the Contract',
        desc: 'Mill certificates and inspection reports with every batch; third-party inspection and resident supervision welcome.',
      },
      yearsUnit: ' yrs',
    },
    contact: {
      title: 'Contact Us',
      desc: 'Submit the form below or call directly for one-on-one engineer support. For custom parts, please prepare drawings or sample details.',
      channels: [
        { icon: 'phone', label: 'Sales Hotline', value: site.phoneDisplay, sub: 'WeChat available · urgent orders welcome', href: `tel:${site.phone}` },
        { icon: 'mail', label: 'Email', value: '823744500@qq.com', sub: 'Drawings & 3D files accepted', href: 'mailto:823744500@qq.com' },
        { icon: 'mapPin', label: 'Factory Address', value: '1F, Block C1, No.36 Xiqu Industrial Road, Jiangmen, Guangdong, China', sub: 'Factory tours by appointment' },
        { icon: 'clock', label: 'Business Hours', value: 'Mon – Sat, 8:30 – 18:00 (GMT+8)', sub: 'Urgent orders answered 7×24' },
      ],
      formKicker: 'REQUEST A QUOTE',
      formTitle: 'Online Inquiry',
    },
    error: {
      code: 'SYSTEM FAULT · 500',
      title: 'Something Went Wrong',
      desc: 'Even the best craftsmanship has occasional flaws. Please retry, or contact us if the problem persists.',
      retry: 'Reload',
    },
    notFound: {
      code: '404 · NOT FOUND',
      titleA: 'This Page Came',
      titleB: 'Unfastened',
      desc: 'The page you are looking for does not exist or has been moved. Head back to the catalog to find the right fastening solution.',
      browse: 'Browse Products',
      backHome: 'Back Home',
    },
    materials: {
      stainless: 'Stainless Steel',
      carbon: 'Carbon Steel',
      alloy: 'Alloy Steel',
      copper: 'Brass',
      nylon: 'Nylon',
      aluminum: 'Aluminum',
    },
  },
}

/** 获取指定语言的字典 */
export function getDict(locale: Locale): Dict {
  return dictionaries[locale]
}

/** 双语字段取值 */
export function pick(locale: Locale, zh: string, en: string): string {
  return locale === 'en' ? en : zh
}

/** 替换模板占位符 */
export function format(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce((acc, [k, v]) => acc.split(`{${k}}`).join(String(v)), template)
}
