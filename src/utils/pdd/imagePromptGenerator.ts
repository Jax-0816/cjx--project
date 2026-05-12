// ChatGPT 图片生成提示词生成器
// 生成可以直接复制到 ChatGPT 执行的图片生成指令
import { Product } from '@/data/pdd/products';

// 主图风格模板
const mainImageStyles = [
  {
    name: '白底产品图',
    description: '产品居中展示，白底，干净简洁',
    promptTemplate: (productName: string, features: string) =>
      `为"${productName}"生成一张拼多多商品主图。白底，产品居中展示，包装/产品清晰可见，${features}。风格：电商主图风格，简洁干净，高清，产品占画面70%以上。图片比例1:1，适合拼多多平台。`,
  },
  {
    name: '场景图',
    description: '产品在火锅场景中展示',
    promptTemplate: (productName: string, features: string) =>
      `为"${productName}"生成一张拼多多商品主图。场景图风格，热气腾腾的火锅旁边摆放着该产品，温馨家庭聚餐氛围，暖色调，${features}。风格：美食摄影风格，诱人食欲，高清。图片比例1:1，适合拼多多平台。`,
  },
  {
    name: '规格/细节图',
    description: '展示产品规格和细节',
    promptTemplate: (productName: string, features: string) =>
      `为"${productName}"生成一张拼多多商品主图。展示产品规格和细节，产品包装正面展示，旁边标注规格信息，${features}。风格：产品摄影风格，清晰展示产品细节和包装，高清。图片比例1:1，适合拼多多平台。`,
  },
  {
    name: '组合展示图',
    description: '多产品组合展示',
    promptTemplate: (productName: string, features: string) =>
      `为"${productName}"生成一张拼多多商品主图。多产品组合展示，所有产品整齐排列，${features}。风格：电商主图风格，整洁美观，高清。图片比例1:1，适合拼多多平台。`,
  },
  {
    name: '促销/卖点图',
    description: '突出促销信息和卖点',
    promptTemplate: (productName: string, features: string) =>
      `为"${productName}"生成一张拼多多商品主图。促销风格，突出产品卖点和优惠信息，${features}。风格：电商促销主图风格，醒目，吸引点击，高清。图片比例1:1，适合拼多多平台。`,
  },
];

// 详情页风格模板
const detailImageStyles = [
  {
    name: '品牌/店铺形象',
    description: '展示品牌形象和店铺信息',
    promptTemplate: (brand: string, products: string) =>
      `生成一张拼多多商品详情页图片，主题为"${brand}品牌形象展示"。展示品牌logo、品牌理念、品质保证等信息。${products}。风格：品牌展示风格，专业，可信赖，高清。图片比例750x1000，适合拼多多详情页。`,
  },
  {
    name: '产品卖点',
    description: '突出产品核心卖点',
    promptTemplate: (productName: string, features: string) =>
      `生成一张拼多多商品详情页图片，主题为"${productName}产品卖点展示"。用图标+文字的形式展示产品的核心卖点和优势，${features}。风格：卖点展示风格，清晰易懂，视觉冲击力强，高清。图片比例750x1000，适合拼多多详情页。`,
  },
  {
    name: '规格参数',
    description: '展示产品规格和参数',
    promptTemplate: (productName: string, features: string) =>
      `生成一张拼多多商品详情页图片，主题为"${productName}规格参数"。用表格或列表形式清晰展示产品规格、净含量、保质期、储存方法等信息，${features}。风格：规格展示风格，清晰，专业，高清。图片比例750x1000，适合拼多多详情页。`,
  },
  {
    name: '实拍/场景',
    description: '产品实拍或使用场景',
    promptTemplate: (productName: string, features: string) =>
      `生成一张拼多多商品详情页图片，主题为"${productName}实拍展示"。展示产品实物拍摄照片或使用场景，让顾客看到真实产品效果，${features}。风格：实拍风格，真实，自然，高清。图片比例750x1000，适合拼多多详情页。`,
  },
  {
    name: '售后/保障',
    description: '展示售后服务和品质保障',
    promptTemplate: (brand: string, features: string) =>
      `生成一张拼多多商品详情页图片，主题为"${brand}售后服务保障"。展示品质保障、售后政策、退换货说明、联系方式等信息，${features}。风格：保障展示风格，可信赖，专业，高清。图片比例750x1000，适合拼多多详情页。`,
  },
];

// 生成主图提示词
export function generateMainImagePrompts(
  products: Product[],
  comboName: string,
  comboDescription: string
): { name: string; description: string; prompt: string }[] {
  const productNames = products.map((p) => p.name).join('、');
  const features = products.map((p) => `${p.spec}`).join('、');
  const featureText = `产品包含：${productNames}，规格：${features}。${comboDescription}`;

  return mainImageStyles.map((style) => ({
    name: style.name,
    description: style.description,
    prompt: style.promptTemplate(comboName || productNames, featureText),
  }));
}

// 生成详情页提示词
export function generateDetailImagePrompts(
  products: Product[],
  comboName: string,
  comboDescription: string
): { name: string; description: string; prompt: string }[] {
  const brands = [...new Set(products.map((p) => p.brand))].join('/');
  const productNames = products.map((p) => p.name).join('、');
  const featureLines = products.map((p) => `${p.name}：${p.spec}，${p.description}`).join('；');
  const featureText = `产品包含：${productNames}。${featureLines}。${comboDescription}`;

  return detailImageStyles.map((style) => ({
    name: style.name,
    description: style.description,
    prompt: style.promptTemplate(brands || comboName, featureText),
  }));
}

// 批量生成所有图片提示词
export function generateAllImagePrompts(
  products: Product[],
  comboName: string,
  comboDescription: string
): {
  mainImages: { name: string; description: string; prompt: string }[];
  detailImages: { name: string; description: string; prompt: string }[];
} {
  return {
    mainImages: generateMainImagePrompts(products, comboName, comboDescription),
    detailImages: generateDetailImagePrompts(products, comboName, comboDescription),
  };
}

// 生成单个产品的图片提示词
export function generateSingleProductPrompts(product: Product): {
  mainImages: { name: string; description: string; prompt: string }[];
  detailImages: { name: string; description: string; prompt: string }[];
} {
  return generateAllImagePrompts([product], product.name, product.description);
}

// 复制提示词到剪贴板的格式化文本
export function formatPromptsForCopy(prompts: { name: string; description: string; prompt: string }[]): string {
  return prompts
    .map(
      (p, i) =>
        `=== 第${i + 1}张：${p.name} ===\n说明：${p.description}\n提示词：\n${p.prompt}\n`
    )
    .join('\n');
}
