// 拼多多高流量标题生成器
import { Product } from '@/data/pdd/products';

// 拼多多热搜关键词库（火锅食材类目）
const hotKeywords: Record<string, string[]> = {
  '火锅食材': [
    '火锅食材', '火锅食材套餐', '火锅食材大全', '火锅食材批发', '火锅食材超市',
    '家庭火锅', '在家吃火锅', '火锅食材一站式', '火锅食材组合', '火锅食材包邮',
  ],
  '脆铃卷/响铃卷': [
    '脆铃卷', '响铃卷', '火锅脆铃卷', '炸响铃', '火锅必点', '火锅配菜',
    '脆铃卷火锅', '响铃卷火锅', '火锅食材脆铃卷', '脆铃卷包邮',
  ],
  '粉条/粉丝': [
    '火锅川粉', '火锅粉条', '川粉', '火锅粉丝', '宽粉', '红薯粉',
    '火锅宽粉', '火锅川粉包邮', '川粉火锅食材', '火锅粉条套餐',
  ],
  '豆制品': [
    '火锅豆皮', '油炸豆皮', '豆皮', '火锅豆制品', '豆皮火锅',
    '火锅豆皮包邮', '豆皮火锅食材', '火锅豆制品套餐',
  ],
  '鸭血': [
    '鸭血', '火锅鸭血', '鸭血火锅', '鲜鸭血', '鸭血食材',
    '鸭血包邮', '火锅鸭血食材', '鸭血火锅套餐', '卤味鸭血',
  ],
  '午餐肉': [
    '午餐肉', '火锅午餐肉', '午餐肉火锅', '火腿午餐肉', '午餐肉罐头',
    '午餐肉包邮', '火锅午餐肉食材', '午餐肉套餐',
  ],
  '腊肠': [
    '腊肠', '火锅腊肠', '迷你腊肠', '中式腊肠', '腊肠火锅',
    '腊肠包邮', '火锅腊肠食材', '迷你腊肠火锅',
  ],
  '笋类': [
    '火锅笋', '笋片', '笋尖', '火锅笋片', '脆笋', '绿笋',
    '火锅笋食材', '笋片火锅', '脆笋火锅',
  ],
  '酱料/蘸料': [
    '火锅蘸料', '芝麻酱', '火锅酱料', '蘸料', '火锅蘸料套餐',
    '芝麻酱火锅', '火锅蘸料包邮', '火锅酱料套餐',
  ],
  '底料': [
    '火锅底料', '番茄底料', '菌汤底料', '骨汤底料', '牛油底料',
    '火锅底料套餐', '火锅底料包邮', '番茄火锅底料', '菌汤火锅',
  ],
};

// 营销词库
const marketingWords = [
  '爆款', '热销', '超值', '实惠', '精选', '品质', '正宗', '美味',
  '新鲜', '优质', '特惠', '限时', '活动', '促销', '划算', '超值',
  '必买', '推荐', '人气', '销量王', '好评', '回头客', '复购率高',
];

// 场景词库
const sceneWords = [
  '家庭火锅', '朋友聚餐', '年夜饭', '火锅派对', '在家吃火锅',
  '宿舍火锅', '办公室火锅', '周末火锅', '冬季火锅', '聚会必备',
  '火锅食材一站式', '在家做火锅', '火锅食材大全',
];

// 规格词库
const specWords = [
  '组合装', '套餐', '套装', '大礼包', '混合装', '多口味', '量贩装',
  '家庭装', '实惠装', '超值装', '精选组合', '搭配套餐',
];

// 生成标题
export function generateTitles(
  products: Product[],
  comboName: string,
  options: {
    count?: number;
    includePrice?: boolean;
    includeSpec?: boolean;
  } = {}
): string[] {
  const { count = 5 } = options;
  const titles: string[] = [];

  // 提取产品信息
  const productNames = products.map((p) => p.name.split(' ').slice(1).join(' ').split(' ')[0]);
  const categories = [...new Set(products.map((p) => p.subCategory))];
  const brands = [...new Set(products.map((p) => p.brand))];

  // 获取相关热搜词
  const relatedKeywords = new Set<string>();
  categories.forEach((cat) => {
    const keywords = hotKeywords[cat] || [];
    keywords.forEach((kw) => relatedKeywords.add(kw));
  });
  // 也根据组合名匹配
  Object.entries(hotKeywords).forEach(([key, kws]) => {
    if (comboName.includes(key) || key.includes(comboName)) {
      kws.forEach((kw) => relatedKeywords.add(kw));
    }
  });

  const keywordList = [...relatedKeywords];
  const brandStr = brands.join('/');

  // 标题模板组合
  const templates = [
    // 模板1: 品牌+核心词+场景+规格
    () => {
      const kw = pickRandom(keywordList, 2);
      const scene = pickRandom(sceneWords, 1);
      const spec = pickRandom(specWords, 1);
      const mw = pickRandom(marketingWords, 1);
      return `${brandStr}${kw[0]}${kw[1]}${scene[0]}${spec[0]}${mw[0]}`;
    },
    // 模板2: 场景+产品+规格+营销
    () => {
      const scene = pickRandom(sceneWords, 1);
      const pn = productNames.slice(0, 3).join('');
      const spec = pickRandom(specWords, 1);
      const mw = pickRandom(marketingWords, 1);
      return `${scene[0]}${pn}${spec[0]}${mw[0]}`;
    },
    // 模板3: 热搜词+产品+规格
    () => {
      const kw = pickRandom(keywordList, 3);
      const spec = pickRandom(specWords, 1);
      return `${kw[0]}${kw[1]}${kw[2]}${spec[0]}`;
    },
    // 模板4: 品牌+场景+规格+营销
    () => {
      const scene = pickRandom(sceneWords, 1);
      const spec = pickRandom(specWords, 1);
      const mw = pickRandom(marketingWords, 2);
      return `${brandStr}${scene[0]}${spec[0]}${mw[0]}${mw[1]}`;
    },
    // 模板5: 产品+热搜+场景+规格
    () => {
      const pn = productNames.slice(0, 2).join('');
      const kw = pickRandom(keywordList, 2);
      const scene = pickRandom(sceneWords, 1);
      return `${pn}${kw[0]}${kw[1]}${scene[0]}`;
    },
    // 模板6: 组合名+场景+规格+营销
    () => {
      const scene = pickRandom(sceneWords, 1);
      const spec = pickRandom(specWords, 1);
      const mw = pickRandom(marketingWords, 1);
      return `${comboName}${scene[0]}${spec[0]}${mw[0]}`;
    },
    // 模板7: 品牌+产品+热搜+规格
    () => {
      const pn = productNames.slice(0, 2).join('');
      const kw = pickRandom(keywordList, 2);
      const spec = pickRandom(specWords, 1);
      return `${brandStr}${pn}${kw[0]}${kw[1]}${spec[0]}`;
    },
    // 模板8: 场景+品牌+产品+营销
    () => {
      const scene = pickRandom(sceneWords, 1);
      const pn = productNames.slice(0, 2).join('');
      const mw = pickRandom(marketingWords, 2);
      return `${scene[0]}${brandStr}${pn}${mw[0]}${mw[1]}`;
    },
  ];

  // 生成多个标题
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    let title = template();

    // 确保标题不超过60个字符（拼多多限制）
    if (title.length > 60) {
      title = title.slice(0, 57) + '...';
    }

    // 如果标题太短，补充关键词
    if (title.length < 20 && keywordList.length > 0) {
      const extra = pickRandom(keywordList, 1);
      title = title + extra[0];
    }

    titles.push(title);
  }

  return titles;
}

// 工具函数：随机选取数组中的元素
function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 生成单个产品的标题
export function generateSingleProductTitle(product: Product): string[] {
  return generateTitles([product], product.name.split(' ').slice(1).join(' '), { count: 5 });
}

// 获取热搜词推荐
export function getHotKeywords(category?: string): string[] {
  if (category && hotKeywords[category]) {
    return hotKeywords[category];
  }
  return Object.values(hotKeywords).flat();
}
