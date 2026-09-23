/**
 * 产品目录生成脚本（双语版）
 * 1. 扫描「江门嘉腾五金产品图片整理」下 13 个系列、197 张产品图
 * 2. 从产品名称推断材质 / 表面处理 / 强度等级，按系列赋予标准与规格参数
 * 3. 通过术语词典为产品名 / 材质 / 表面 / 参数生成英文对照字段
 * 4. 将图片以 ASCII slug 复制到 public/products/{seriesId}/{slug}.png
 * 5. 生成 src/data/catalog.json 供全站数据读取（zh/en 双语）
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, '江门嘉腾五金产品图片整理')
const OUT_PUBLIC = path.join(ROOT, 'public', 'products')
const OUT_JSON = path.join(ROOT, 'src', 'data', 'catalog.json')

/* ---------------- 系列定义 ---------------- */

const SERIES = [
  {
    id: 's01', dir: '01-内六角螺丝系列', slug: 'hex-socket-screws',
    name: '内六角螺丝系列', en: 'Hex Socket Screws', category: 'screws',
    desc: '圆柱头内六角结构，适用于高扭矩装夹与紧凑空间装配，是精密机械装配的基础紧固件。',
    descEn: 'Cylindrical socket head design for high-torque clamping in compact spaces — the foundation of precision machine assembly.',
    standards: ['DIN 912', 'ISO 4762', 'GB/T 70'],
    specType: 'thread', sizes: 'M2 – M24', pitch: '0.4 – 3 mm', length: '4 – 300 mm',
    head: '圆柱头 / 沉头 / 半圆头', headEn: 'Socket Head / CSK / Button', torque: '0.4 – 180 N·m',
    apps: ['精密机械设备', '模具夹具', '自动化装备'],
    appsEn: ['Precision Machinery', 'Molds & Fixtures', 'Automation Equipment'],
  },
  {
    id: 's02', dir: '02-组合螺丝系列', slug: 'combination-screws',
    name: '组合螺丝系列', en: 'Combination Screws', category: 'screws',
    desc: '螺丝与弹垫、平垫预装配成组合件，提升装配效率并保证防松性能，广泛用于批量产线装配。',
    descEn: 'Pre-assembled screw with spring and flat washers for faster assembly lines and reliable anti-loosening performance.',
    standards: ['GB/T 9074', 'DIN 912 + DIN 125', 'ANSI/ASME B18.13'],
    specType: 'thread', sizes: 'M2.5 – M12', pitch: '0.45 – 1.75 mm', length: '5 – 120 mm',
    head: '盘头 / 大扁头 / 六角头', headEn: 'Pan Head / Large Flat / Hex', torque: '0.6 – 85 N·m',
    apps: ['批量产线装配', '家电行业', '机箱钣金'],
    appsEn: ['Volume Assembly Lines', 'Home Appliances', 'Chassis & Sheet Metal'],
  },
  {
    id: 's03', dir: '03-电子小螺丝系列', slug: 'electronics-screws',
    name: '电子小螺丝系列', en: 'Micro Screws', category: 'screws',
    desc: '面向 3C 电子与精密仪器的高精度微型螺丝，涵盖 PA/PB/KA/TA 等自攻与机丝全型号。',
    descEn: 'High-precision micro screws for 3C electronics and precision instruments — full range of PA/PB/KA/TA tapping and machine types.',
    standards: ['DIN 7985', 'ISO 7045', 'JIS B1111'],
    specType: 'thread', sizes: 'M1.2 – M6 / ST1.9 – ST6.3', pitch: '0.25 – 1 mm', length: '3 – 60 mm',
    head: '盘头 / 扁平头 / 大扁头', headEn: 'Pan / Flat / Large Flat', torque: '0.05 – 6 N·m',
    apps: ['3C 电子', '精密仪器', '智能硬件'],
    appsEn: ['3C Electronics', 'Precision Instruments', 'Smart Hardware'],
  },
  {
    id: 's04', dir: '04-外六角螺丝系列', slug: 'hex-bolts',
    name: '外六角螺丝系列', en: 'Hex Bolts', category: 'bolts',
    desc: '覆盖 4.8 – 12.9 全强度等级与钢结构连接副，法兰面、发黑、热浸锌等表面工艺齐全。',
    descEn: 'Full strength range from 4.8 to 12.9 plus structural connection sets — flange, black oxide and hot-dip galvanized finishes available.',
    standards: ['DIN 933', 'ISO 4017', 'GB/T 5783'],
    specType: 'thread', sizes: 'M5 – M36', pitch: '0.8 – 4 mm', length: '10 – 400 mm',
    head: '六角头 / 法兰面', headEn: 'Hex Head / Flange', torque: '2 – 900 N·m',
    apps: ['钢结构工程', '重型机械', '桥梁设备'],
    appsEn: ['Steel Structures', 'Heavy Machinery', 'Bridge Equipment'],
  },
  {
    id: 's05', dir: '05-垫圈系列', slug: 'washers',
    name: '垫圈系列', en: 'Washers', category: 'washers',
    desc: '平垫、弹垫、挡圈、异形垫圈全品类覆盖，提供防松、导电、绝缘与载荷分散解决方案。',
    descEn: 'Complete range of flat, spring, retaining and special washers — anti-loosening, conductive, insulating and load-spreading solutions.',
    standards: ['DIN 125', 'DIN 127', 'GB/T 93'],
    specType: 'washer', sizes: 'M2 – M36', od: 'φ5 – φ72 mm', thickness: '0.3 – 8 mm',
    head: '—', headEn: '—', torque: '—',
    apps: ['通用装配', '防松防震', '导电接地'],
    appsEn: ['General Assembly', 'Anti-Loosening', 'Grounding'],
  },
  {
    id: 's06', dir: '06-螺母系列', slug: 'nuts',
    name: '螺母系列', en: 'Nuts', category: 'nuts',
    desc: '六角、法兰面、锁紧、盖型等全品类螺母，另有铜质与铝型材专用滑块螺母等细分型号。',
    descEn: 'Hex, flange, lock and acorn nuts in full range, plus brass fasteners and aluminum-profile T-slot nuts.',
    standards: ['DIN 934', 'ISO 4032', 'GB/T 6170'],
    specType: 'thread', sizes: 'M2 – M30', pitch: '0.4 – 3.5 mm', length: '高度 1.6 – 24 mm', lengthEn: 'Height 1.6 – 24 mm',
    head: '六角 / 法兰面 / 盖型', headEn: 'Hex / Flange / Acorn', torque: '0.3 – 420 N·m',
    apps: ['通用装配', '铝型材结构', '电气连接'],
    appsEn: ['General Assembly', 'Aluminum Profiles', 'Electrical Connection'],
  },
  {
    id: 's07', dir: '07-压铆系列', slug: 'press-fit',
    name: '压铆系列', en: 'Press-Fit Fasteners', category: 'nuts',
    desc: '压铆螺母、压铆螺钉、松不脱与定位支撑柱，专为钣金与机箱机柜薄板铆装工艺设计。',
    descEn: 'Press-fit nuts, studs, captive screws and standoffs engineered for sheet-metal and cabinet riveting processes.',
    standards: ['PEM / IFI', 'GB/T 3098.18'],
    specType: 'thread', sizes: 'M2.5 – M10', pitch: '0.45 – 1.5 mm', length: '4 – 40 mm',
    head: '压铆圆头 / 六角头', headEn: 'Press-Fit Pan / Hex', torque: '0.4 – 35 N·m',
    apps: ['钣金机箱', '机柜电源', '通信设备'],
    appsEn: ['Sheet-Metal Chassis', 'Cabinet Power Supplies', 'Telecom Equipment'],
  },
  {
    id: 's08', dir: '08-家装建筑系列', slug: 'construction',
    name: '家装建筑系列', en: 'Construction & Rigging', category: 'anchors',
    desc: '自攻钉、墙板钉、花兰螺丝、钢丝绳夹等建筑装饰与吊装索具用紧固件。',
    descEn: 'Self-tapping and drywall screws, turnbuckles and wire rope clips for construction, decoration and rigging applications.',
    standards: ['GB/T 6470', 'DIN 1480', 'ANSI B18.6.3'],
    specType: 'thread', sizes: 'M4 – M16 / ST4.2 – ST6.3', pitch: '0.7 – 2 mm', length: '10 – 250 mm',
    head: '沉头 / 盘头 / 马车头', headEn: 'CSK / Pan / Carriage', torque: '1 – 60 N·m',
    apps: ['建筑装饰', '吊装索具', '水电安装'],
    appsEn: ['Building & Decoration', 'Lifting & Rigging', 'M&E Installation'],
  },
  {
    id: 's09', dir: '09-钻尾螺丝系列', slug: 'drilling-screws',
    name: '钻尾螺丝系列', en: 'Self-Drilling Screws', category: 'screws',
    desc: '自带钻尾的一次成型自钻自攻螺丝，免预钻孔直接穿透钢板与彩钢瓦，施工效率高。',
    descEn: 'One-step self-drilling screws that pierce steel plate and color-coated roofing without pre-drilling — maximum installation efficiency.',
    standards: ['DIN 7504', 'ISO 15480', 'GB/T 15856'],
    specType: 'thread', sizes: 'ST4.2 – ST6.3', pitch: '1.4 – 1.8 mm', length: '13 – 150 mm',
    head: '六角头 / 圆头 / 平头', headEn: 'Hex / Pan / Flat', torque: '2 – 18 N·m',
    apps: ['彩钢瓦棚', '轻钢龙骨', '通风管道'],
    appsEn: ['Metal Roofing', 'Light-Steel Framing', 'HVAC Ducting'],
  },
  {
    id: 's10', dir: '10-膨胀螺栓系列', slug: 'anchors',
    name: '膨胀螺栓系列', en: 'Expansion Anchors', category: 'anchors',
    desc: '拉爆、壁虎、化学锚栓等混凝土锚固方案，覆盖家电安装、电梯、幕墙等高载荷场景。',
    descEn: 'Wedge, sleeve and chemical anchors for concrete — high-load solutions for appliances, elevators and curtain walls.',
    standards: ['GB/T 22795', 'ETAG 001', 'JIS A 1118'],
    specType: 'thread', sizes: 'M6 – M20', pitch: '1 – 2.5 mm', length: '40 – 220 mm',
    head: '六角头 / 套管式', headEn: 'Hex / Sleeve Type', torque: '8 – 220 N·m',
    apps: ['混凝土锚固', '电梯安装', '幕墙干挂'],
    appsEn: ['Concrete Anchoring', 'Elevator Installation', 'Curtain Walls'],
  },
  {
    id: 's11', dir: '11-螺柱牙条牙棒系列', slug: 'studs-threaded-rods',
    name: '螺柱牙条牙棒系列', en: 'Studs & Threaded Rods', category: 'bolts',
    desc: '双头螺柱、牙条牙棒、U 型螺栓、地脚螺栓与焊钉，满足长距离连接与预埋焊接需求。',
    descEn: 'Double-end studs, threaded rods, U-bolts, anchor bolts and weld studs for long-distance connection and embedded welding.',
    standards: ['DIN 975', 'DIN 976', 'GB/T 37'],
    specType: 'thread', sizes: 'M4 – M42', pitch: '0.7 – 4.5 mm', length: '20 – 3000 mm',
    head: '无头 / U 型 / 活节', headEn: 'Threaded / U-Type / Eyebolt', torque: '1 – 1300 N·m',
    apps: ['预埋基础', '管道固定', '焊接连接'],
    appsEn: ['Embedded Foundations', 'Pipe Fixing', 'Welded Joints'],
  },
  {
    id: 's12', dir: '12-销轴螺丝系列', slug: 'pins',
    name: '销轴螺丝系列', en: 'Pins & Keys', category: 'special',
    desc: '圆柱销、圆锥销、开口销、平键与铆钉，用于定位、连接与防转的高可靠性销轴类零件。',
    descEn: 'Parallel, taper and cotter pins, parallel keys and rivets — high-reliability positioning and anti-rotation components.',
    standards: ['DIN 7', 'ISO 2339', 'GB/T 119'],
    specType: 'pin', sizes: 'φ1 – φ20 mm', length: '4 – 200 mm',
    head: '圆柱 / 圆锥 / 开口', headEn: 'Parallel / Taper / Cotter', torque: '—',
    apps: ['定位销轴', '铰链接头', '防转固定'],
    appsEn: ['Positioning Pins', 'Hinge Joints', 'Anti-Rotation'],
  },
  {
    id: 's13', dir: '13-弹簧CNC车床件非标异形件', slug: 'cnc-custom',
    name: '弹簧 CNC 车床件非标异形件', en: 'CNC Custom Parts', category: 'special',
    desc: '弹簧、CNC 车削件与非标异形件来图定制，支持复杂结构一次成型与严格公差控制。',
    descEn: 'Springs, CNC turned parts and custom specials made to drawing — one-piece forming of complex geometry with tight tolerance control.',
    standards: ['非标定制', 'DIN / ANSI / JIS 可选'],
    standardsEn: ['Custom / Non-Standard', 'DIN / ANSI / JIS Optional'],
    specType: 'custom', sizes: 'φ0.3 – φ80 mm', length: '按图纸定制', lengthEn: 'Per Drawing',
    head: '异形 / 按图', headEn: 'Custom / Per Drawing', torque: '—',
    apps: ['来图定制', '精密弹簧', '非标异形件'],
    appsEn: ['Made-to-Drawings', 'Precision Springs', 'Custom Specials'],
  },
]

/* ---------------- 分类定义（双语） ---------------- */

export const CATEGORIES = [
  { id: 'screws', name: '螺钉系列', nameEn: 'Screws', en: 'SCREWS' },
  { id: 'bolts', name: '螺栓系列', nameEn: 'Bolts', en: 'BOLTS' },
  { id: 'nuts', name: '螺母系列', nameEn: 'Nuts', en: 'NUTS' },
  { id: 'washers', name: '垫圈系列', nameEn: 'Washers', en: 'WASHERS' },
  { id: 'anchors', name: '锚栓 · 建筑', nameEn: 'Anchors & Construction', en: 'ANCHORS' },
  { id: 'special', name: '特种紧固件', nameEn: 'Special Fasteners', en: 'SPECIAL' },
]

/* ---------------- 英文术语翻译 ---------------- */

/** 整名优先覆盖（词典无法直译的型号） */
const NAME_OVERRIDES = {
  K母: 'K-Type Nut',
  波仔螺丝: 'Pilot Screw',
  'BSP喉塞螺丝（止付）': 'BSP Pipe Plug (Set Screw)',
  铝型材滑块螺母: 'T-Slot Nut (Aluminum Profile)',
  灯丝六角螺母: 'Lamp Holder Hex Nut',
  '盲孔铜花母（单通）': 'Blind Brass Knurled Nut (Single-End)',
  不锈钢十字夹板子母账本螺丝: 'Stainless Steel Cross Combo Screw',
  镀镍内六角夹板子母账本螺丝: 'Nickel-Plated Hex Socket Combo Screw',
  OO型不锈钢花兰螺丝: 'OO-Type Stainless Steel Turnbuckle',
  CO型镀锌花兰螺丝: 'CO-Type Zinc-Plated Turnbuckle',
  '镀锌U型螺栓（正反牙双头孔）': 'Zinc-Plated U-Bolt (RH/LH Thread)',
  不锈钢焊接螺柱点焊螺丝: 'Stainless Steel Spot Weld Stud',
  镀铜焊接螺柱点焊螺丝: 'Copper-Plated Spot Weld Stud',
  电弧螺柱焊用圆柱头焊钉: 'Arc Welding Shear Connector Stud',
  小黄鱼套装膨胀: 'Nylon Frame Anchor Kit',
  金属套管窗式壁虎: 'Metal Sleeve Window Anchor',
  尼龙套管窗式壁虎: 'Nylon Sleeve Window Anchor',
  热水器专用拉爆: 'Water Heater Expansion Anchor',
  镀锌拉爆头套管组件: 'Zinc-Plated Anchor Head & Sleeve Kit',
  '发黑B型（带孔）销轴': 'Black Oxide Clevis Pin Type B (With Hole)',
  高强度内螺纹圆锥销: 'High-Strength Taper Pin (Internal Thread)',
  发黑高强度圆锥销: 'Black Oxide High-Strength Taper Pin',
  铝抽芯柳钉: 'Aluminum Blind Rivet',
  不锈钢圆头柳钉: 'Stainless Steel Round Head Rivet',
  不锈钢十字倒边平头螺丝: 'Stainless Steel CSK Cross Screw',
  不锈钢内六角倒边平头螺丝: 'Stainless Steel Hex Socket Flat Screw',
}

/** 术语 token（长词优先匹配） */
const NAME_TOKENS = [
  ['不锈钢', 'Stainless Steel'], ['热浸锌', 'Hot-Dip Galvanized'], ['蓝白锌', 'Blue-White Zinc'],
  ['彩锌', 'Color Zinc'], ['镀锌', 'Zinc Plated'], ['镀镍', 'Nickel Plated'], ['镀铜', 'Copper Plated'],
  ['磷化', 'Phosphated'], ['发黑', 'Black Oxide'], ['本色', 'Plain'], ['尼龙', 'Nylon'], ['塑料', 'Plastic'],
  ['铜质', 'Brass'], ['铜', 'Brass'], ['铝', 'Aluminum'],
  ['化学螺栓', 'Chemical Anchor'], ['膨胀', 'Expansion'], ['钻尾', 'Self-Drilling'], ['自攻钉', 'Self-Tapping Screw'],
  ['自攻', 'Self-Tapping'],
  ['内六角', 'Hex Socket'], ['外六角', 'Hex Head'], ['内锯齿', 'Internal Serrated'], ['外锯齿', 'External Serrated'],
  ['菊花垫圈', 'Serrated Washer'], ['法兰面', 'Flange'], ['杯头', 'Socket Head'], ['圆杯', 'Button Head'],
  ['平杯', 'Flat Socket Head'], ['薄头', 'Low Head'], ['塞打', 'Shoulder'], ['机米', 'Set Screw'],
  ['大圆头', 'Large Pan Head'], ['小圆头', 'Small Pan Head'], ['大扁头', 'Large Flat Head'], ['扁平头', 'Flat Head'],
  ['圆头', 'Pan Head'], ['平头', 'Flat Head'], ['沉头', 'Countersunk'], ['盘头', 'Pan Head'], ['马车', 'Carriage'],
  ['蝶形', 'Wing'], ['盖型', 'Acorn'], ['吊环', 'Eye'], ['锁紧', 'Lock'], ['四方', 'Square'], ['六角', 'Hex'],
  ['双叠', 'Double-Layer'], ['波型', 'Wave'], ['方斜', 'Square Bevel'], ['止退', 'Anti-Loosen'],
  ['开口挡圈', 'External Retaining Ring'], ['孔用挡圈', 'Internal Retaining Ring'], ['挡圈', 'Retaining Ring'],
  ['弹垫', 'Spring Washer'], ['平垫', 'Flat Washer'], ['垫圈', 'Washer'],
  ['钢结构', 'Structural'], ['扭剪型', 'Twist-Off'], ['十字凹脑', 'Cross Recessed'], ['十字', 'Cross'],
  ['三组合', '3-Piece Assembly'], ['组合', 'Assembly'], ['皇冠', 'Crown'], ['对锁', 'Lock'], ['手拧', 'Thumb'],
  ['滚花', 'Knurled'], ['等高头', 'Shoulder Head'], ['手柄', 'Handle'], ['喉箍', 'Hose Clamp'],
  ['三角牙', 'Triangle Thread'], ['带介', 'With Washer'], ['平尾', 'Blunt Point'],
  ['墙板钉', 'Drywall Screw'], ['纤维板钉', 'Chipboard Screw'], ['花兰', 'Turnbuckle'], ['钢丝绳夹', 'Wire Rope Clip'],
  ['卸扣', 'Shackle'], ['套环', 'Collar'], ['四爪螺母', 'Four-Prong Nut'], ['内外牙', 'Reducing Nipple'],
  ['子母账本', 'Combo'], ['倒边', 'Chamfered'], ['夹板', 'Plywood'], ['大头', 'Large Head'],
  ['拉爆', 'Expansion Anchor'], ['车修壁虎', 'Sleeve Anchor'], ['壁虎', 'Anchor'], ['顶爆', 'Wedge Anchor'],
  ['敲击', 'Hammer-Drive'], ['勾型', 'Hook-Type'], ['羊眼', 'Eye-Type'], ['电梯', 'Elevator'], ['国标', 'GB-Type'],
  ['套管', 'Sleeve'],
  ['牙条', 'Threaded Rod'], ['牙棒', 'Threaded Rod'], ['双头牙', 'Double-End'], ['双头', 'Double-End'],
  ['正反牙', 'RH/LH Thread'], ['U型', 'U-Type'], ['T型', 'T-Type'], ['地脚螺栓', 'Anchor Bolt'], ['地脚', 'Anchor'],
  ['活节', 'Eyebolt'], ['焊钉', 'Weld Stud'], ['焊接螺柱', 'Weld Stud'], ['螺柱', 'Stud'], ['螺纹护套', 'Thread Insert'],
  ['圆柱销', 'Parallel Pin'], ['圆锥销', 'Taper Pin'], ['开口销', 'Cotter Pin'], ['弹性销', 'Spring Pin'],
  ['销轴', 'Clevis Pin'], ['定位销', 'Dowel Pin'], ['定位支撑柱', 'Positioning Support Post'], ['支撑卡柱钉', 'Support Stud'],
  ['平键', 'Parallel Key'], ['柳钉', 'Rivet'], ['压铆', 'Press-Fit'], ['涨铆', 'Upset'], ['镶入', 'Flush'],
  ['浮动', 'Float'], ['自锁', 'Self-Lock'], ['松不脱', 'Captive'], ['螺母柱', 'Standoff'],
  ['螺母', 'Nut'], ['螺钉', 'Screw'], ['螺丝', 'Screw'], ['螺栓', 'Bolt'],
  ['弹簧', 'Spring'], ['单通', 'Single-End'], ['双通', 'Double-End'], ['盲孔', 'Blind'], ['花母', 'Knurled Nut'],
  ['卡式', 'Cage'], ['高强度', 'High-Strength'], ['薄', 'Thin'], ['OO型', 'OO-Type'], ['CO型', 'CO-Type'],
  ['销', 'Pin'], ['钉', 'Screw'], ['键', 'Key'],
]

const CJK_RE = /[\u4e00-\u9fff\uff08\uff09（）]/g

function toEnName(name, seriesEn) {
  if (NAME_OVERRIDES[name]) return NAME_OVERRIDES[name]
  let out = name
  for (const [zh, en] of NAME_TOKENS) out = out.split(zh).join(` ${en} `)
  out = out.replace(CJK_RE, ' ')
  out = out.replace(/\s+/g, ' ').replace(/\s*-\s*/g, '-').replace(/\s*\.\s*/g, '.').trim()
  // 12 . 9 类修正：把 "12.9" 之类粘连
  out = out.replace(/(\d)\s*\.\s*(\d)/g, '$1.$2')
  if (!out) out = seriesEn // 兜底：用系列英文名
  return out
}

const MATERIAL_EN = {
  stainless: 'Stainless Steel SUS304',
  carbon: 'Carbon Steel',
  alloy: 'Alloy Steel',
  copper: 'Brass H62',
  nylon: 'Nylon PA66',
  aluminum: 'Aluminum AL6061',
}

const SURFACE_EN = {
  黑色氧化: 'Black Oxide',
  热浸镀锌: 'Hot-Dip Galvanized',
  镀锌彩锌: 'Zinc Plated (Color)',
  镀锌蓝白锌: 'Zinc Plated (Blue-White)',
  镀锌白锌: 'Zinc Plated (White)',
  镀镍: 'Nickel Plated',
  镀铜: 'Copper Plated',
  磷化发黑: 'Phosphated Black',
  本色: 'Plain',
  清洗钝化: 'Cleaned & Passivated',
  本色注塑: 'Natural Injection',
  按图定制: 'Custom',
}

/** 参数标签双语 */
const LABEL_EN = {
  螺纹规格: 'Thread Size', 螺距: 'Thread Pitch', 长度范围: 'Length Range', 头型: 'Head Type',
  材质: 'Material', 表面处理: 'Finish', 强度等级: 'Grade', 拉伸强度: 'Tensile Strength',
  硬度: 'Hardness', 推荐扭矩: 'Recommended Torque', 执行标准: 'Standard', 适用规格: 'Size Range',
  内径范围: 'Inner Dia.', 外径范围: 'Outer Dia.', 厚度范围: 'Thickness Range', 直径范围: 'Dia. Range',
  加工范围: 'Machining Range', 公差控制: 'Tolerance', 表面粗糙度: 'Surface Roughness',
  工艺: 'Process', 起订量: 'MOQ',
}

/** 参数值中需要翻译的固定片段 */
const VALUE_EN_PHRASES = [
  ['高度 ', 'Height '], ['按图纸定制', 'Per Drawing'], ['按图定制', 'Custom'],
  ['CNC 车削 / 冷镦 / 卷簧', 'CNC Turning / Cold Heading / Coil Winding'],
  ['1,000 件起', '1,000 pcs'], ['本色注塑', 'Natural'],
]

function toEnValue(v) {
  let out = v
  for (const [zh, en] of VALUE_EN_PHRASES) out = out.split(zh).join(en)
  return out
}

/* ---------------- 推断工具 ---------------- */

function hashSeed(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const pick = (rnd, arr) => arr[Math.floor(rnd() * arr.length)]

function inferMaterial(name, seriesId) {
  if (/不锈钢/.test(name)) return { material: '不锈钢 SUS304', materialKey: 'stainless', grade: 'A2-70' }
  if (/铜/.test(name)) return { material: '铜质 H62', materialKey: 'copper', grade: 'HB90' }
  if (/尼龙|塑料/.test(name)) return { material: '尼龙 PA66', materialKey: 'nylon', grade: '—' }
  if (/铝/.test(name)) return { material: '铝合金 AL6061', materialKey: 'aluminum', grade: '—' }
  if (/12\.9/.test(name)) return { material: '合金钢', materialKey: 'alloy', grade: '12.9' }
  if (/10\.9/.test(name)) return { material: '合金钢', materialKey: 'alloy', grade: '10.9' }
  if (/8\.8/.test(name)) return { material: '碳钢', materialKey: 'carbon', grade: '8.8' }
  if (/4\.8/.test(name)) return { material: '碳钢', materialKey: 'carbon', grade: '4.8' }
  if (/弹簧/.test(name)) return { material: '弹簧钢 65Mn', materialKey: 'alloy', grade: '—' }
  if (/本色|镀锌|发黑|彩锌|蓝白锌|镀镍|磷化/.test(name))
    return { material: '碳钢', materialKey: 'carbon', grade: seriesId === 's03' ? '4.8' : pick(hashSeed(name), ['4.8', '8.8']) }
  if (['s01', 's02', 's03'].includes(seriesId))
    return { material: '不锈钢 SUS304', materialKey: 'stainless', grade: 'A2-70' }
  return { material: '碳钢', materialKey: 'carbon', grade: pick(hashSeed(name), ['4.8', '8.8']) }
}

const MATERIAL_EN_BY_ZH = {
  '不锈钢 SUS304': 'Stainless Steel SUS304',
  '铜质 H62': 'Brass H62',
  '尼龙 PA66': 'Nylon PA66',
  '铝合金 AL6061': 'Aluminum AL6061',
  合金钢: 'Alloy Steel',
  碳钢: 'Carbon Steel',
  '弹簧钢 65Mn': 'Spring Steel 65Mn',
}

function inferSurface(name) {
  if (/发黑/.test(name)) return '黑色氧化'
  if (/热浸锌/.test(name)) return '热浸镀锌'
  if (/彩锌/.test(name)) return '镀锌彩锌'
  if (/蓝白锌/.test(name)) return '镀锌蓝白锌'
  if (/镀锌/.test(name)) return '镀锌白锌'
  if (/镀镍/.test(name)) return '镀镍'
  if (/镀铜/.test(name)) return '镀铜'
  if (/磷化/.test(name)) return '磷化发黑'
  if (/本色/.test(name)) return '本色'
  if (/不锈钢/.test(name)) return '清洗钝化'
  if (/尼龙|塑料/.test(name)) return '本色注塑'
  if (/铜|铝/.test(name)) return '本色'
  return '本色'
}

const GRADE_PROPS = {
  '4.8': { tensile: '≥ 400 MPa', hardness: 'HV 110 – 220' },
  '8.8': { tensile: '≥ 800 MPa', hardness: 'HRC 22 – 32' },
  '10.9': { tensile: '≥ 1040 MPa', hardness: 'HRC 32 – 39' },
  '12.9': { tensile: '≥ 1220 MPa', hardness: 'HRC 39 – 44' },
  'A2-70': { tensile: '≥ 700 MPa', hardness: '≤ HB 220' },
  HB90: { tensile: '≥ 320 MPa', hardness: 'HB 85 – 95' },
}

const PRICE_BASE = {
  screws: 0.4, bolts: 0.9, nuts: 0.3, washers: 0.12, anchors: 2.6, special: 3.4,
}

function inferPrice(slug, category, materialKey) {
  const rnd = hashSeed(slug)
  let p = PRICE_BASE[category] * (0.6 + rnd() * 1.6)
  if (materialKey === 'stainless') p *= 1.6
  if (materialKey === 'copper') p *= 2.4
  if (materialKey === 'aluminum') p *= 1.9
  return Math.round(p * 100) / 100
}

/* ---------------- 主流程 ---------------- */

fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true })

const seriesOut = []
const products = []
const keyImageTargets = {
  hero: { series: 's01', match: '发黑杯头螺丝' },
  cat_screws: { series: 's01', match: '不锈钢杯头螺丝' },
  cat_bolts: { series: 's04', match: '12.9钢结构螺丝' },
  cat_nuts: { series: 's06', match: '不锈钢法兰面螺母' },
  cat_washers: { series: 's05', match: '不锈钢平垫' },
  cat_anchors: { series: 's10', match: '化学螺栓' },
  cat_special: { series: 's13', match: '弹簧CNC车床件非标异形件-01' },
}
const keyImages = {}

for (const s of SERIES) {
  const dirPath = path.join(SRC_DIR, s.dir)
  const files = fs.readdirSync(dirPath).filter((f) => f.toLowerCase().endsWith('.png'))
  fs.mkdirSync(path.join(OUT_PUBLIC, s.id), { recursive: true })

  let cover = null

  files.forEach((file, i) => {
    const base = path.basename(file, '.png')
    const slug = `${s.id}-${String(i + 1).padStart(3, '0')}`
    const sku = `JT-${s.id.toUpperCase()}-${String(i + 1).padStart(3, '0')}`
    fs.copyFileSync(path.join(dirPath, file), path.join(OUT_PUBLIC, s.id, `${slug}.png`))
    if (!cover) cover = `/products/${s.id}/${slug}.png`

    const mat = inferMaterial(base, s.id)
    const surface = inferSurface(base)
    const rnd = hashSeed(slug)
    const standard = s.standards[Math.floor(rnd() * s.standards.length)]
    const props = GRADE_PROPS[mat.grade] ?? { tensile: '—', hardness: '—' }
    const sizePick = rnd()

    let specs
    if (s.specType === 'washer') {
      specs = [
        { label: '适用规格', value: sizePick > 0.5 ? 'M3 – M12' : 'M12 – M30' },
        { label: '内径范围', value: sizePick > 0.5 ? 'φ3.2 – φ13 mm' : 'φ13 – φ31 mm' },
        { label: '外径范围', value: s.od },
        { label: '厚度范围', value: s.thickness },
        { label: '材质', value: mat.material },
        { label: '表面处理', value: surface },
        { label: '硬度', value: props.hardness },
        { label: '执行标准', value: standard },
      ]
    } else if (s.specType === 'pin') {
      specs = [
        { label: '直径范围', value: s.sizes },
        { label: '长度范围', value: s.length },
        { label: '材质', value: mat.material },
        { label: '强度等级', value: mat.grade },
        { label: '表面处理', value: surface },
        { label: '硬度', value: props.hardness },
        { label: '执行标准', value: standard },
      ]
    } else if (s.specType === 'custom') {
      specs = [
        { label: '加工范围', value: s.sizes },
        { label: '公差控制', value: '± 0.01 mm' },
        { label: '表面粗糙度', value: 'Ra 0.8 – 3.2' },
        { label: '材质', value: mat.material },
        { label: '工艺', value: 'CNC 车削 / 冷镦 / 卷簧' },
        { label: '表面处理', value: surface === '本色' ? '按图定制' : surface },
        { label: '执行标准', value: standard },
        { label: '起订量', value: '1,000 件起' },
      ]
    } else {
      specs = [
        { label: '螺纹规格', value: s.sizes },
        { label: '螺距', value: s.pitch },
        { label: '长度范围', value: s.length, valueEnOverride: s.lengthEn },
        { label: '头型', value: s.head, valueEnOverride: s.headEn },
        { label: '材质', value: mat.material },
        { label: '表面处理', value: surface },
        { label: '强度等级', value: mat.grade },
        { label: '拉伸强度', value: props.tensile },
        { label: '硬度', value: props.hardness },
        { label: '推荐扭矩', value: s.torque },
        { label: '执行标准', value: standard },
      ]
    }

    // 参数双语化
    const specsBilingual = specs.map((row) => ({
      label: row.label,
      labelEn: LABEL_EN[row.label] ?? row.label,
      value: row.value,
      valueEn: row.valueEnOverride ?? toEnValue(row.value),
    }))

    products.push({
      id: sku,
      slug,
      name: base,
      nameEn: toEnName(base, s.en),
      seriesId: s.id,
      seriesName: s.name,
      seriesNameEn: s.en,
      category: s.category,
      image: `/products/${s.id}/${slug}.png`,
      material: mat.material,
      materialEn: MATERIAL_EN_BY_ZH[mat.material] ?? mat.material,
      materialKey: mat.materialKey,
      surface,
      surfaceEn: SURFACE_EN[surface] ?? surface,
      grade: mat.grade,
      standard,
      specs: specsBilingual,
      price: inferPrice(slug, s.category, mat.materialKey),
      featured: false,
    })
  })

  const catKey = `cat_${s.category}`
  const target = keyImageTargets[catKey]
  if (target && target.series === s.id) {
    const hit = files.findIndex((f) => f.includes(target.match))
    cover = hit >= 0 ? `/products/${s.id}/${s.id}-${String(hit + 1).padStart(3, '0')}.png` : cover
  }
  seriesOut.push({
    id: s.id, slug: s.slug, name: s.name, nameEn: s.en, en: s.en, category: s.category,
    desc: s.desc, descEn: s.descEn, count: files.length, cover,
    standards: s.standards, standardsEn: s.standardsEn ?? s.standards,
    apps: s.apps, appsEn: s.appsEn,
  })
}

const FEATURED_MATCH = [
  ['s01', '不锈钢杯头螺丝.png'], ['s02', '发黑12.9内六角三组合'], ['s03', 'PA不锈钢自攻螺丝'],
  ['s04', '12.9钢结构螺丝'], ['s05', '不锈钢平垫'], ['s06', '不锈钢法兰面螺母'],
  ['s09', '不锈钢六角钻尾螺丝'], ['s10', '化学螺栓'], ['s11', '地脚螺栓'], ['s07', '压铆螺母'],
]
for (const [sid, match] of FEATURED_MATCH) {
  const p = products.find((x) => x.seriesId === sid && x.name === match)
  if (p) p.featured = true
}

for (const [key, t] of Object.entries(keyImageTargets)) {
  const hit = products.find((p) => p.seriesId === t.series && p.name.includes(t.match))
  if (hit) keyImages[key] = hit.image
}

const catalog = {
  generatedAt: new Date().toISOString(),
  keyImages,
  categories: CATEGORIES,
  series: seriesOut,
  products,
}

fs.writeFileSync(OUT_JSON, JSON.stringify(catalog, null, 2), 'utf-8')

console.log(
  `✅ catalog.json 生成完毕：${seriesOut.length} 个系列 / ${products.length} 个产品（精选 ${products.filter((p) => p.featured).length}）`,
)
