// SKU 智能设置生成器
import { Product } from '@/data/pdd/products';

export interface SkuOption {
  name: string; // SKU名称
  price: number; // 售价
  cost: number; // 成本
  profit: number; // 利润
  stock: number; // 库存
  isMain: boolean; // 是否主推SKU
  isLossLeader: boolean; // 是否引流SKU
}

export interface SkuGroup {
  groupName: string; // SKU分组名（如：规格、套餐）
  options: SkuOption[];
}

// 生成组合装的SKU
export function generateComboSkus(
  products: Product[],
  baseCost: number,
  basePrice: number
): SkuGroup[] {
  const groups: SkuGroup[] = [];

  // 基础SKU
  const baseSku: SkuOption = {
    name: '基础套餐',
    price: basePrice,
    cost: baseCost,
    profit: basePrice - baseCost,
    stock: Math.min(...products.map((p) => p.stock)),
    isMain: true,
    isLossLeader: false,
  };

  // 加量SKU（1.5倍量）
  const plusCost = baseCost * 1.5;
  const plusPrice = Math.ceil(basePrice * 1.4 / 10) * 10 - 0.01;
  const plusSku: SkuOption = {
    name: '加量装（1.5倍）',
    price: plusPrice,
    cost: plusCost,
    profit: plusPrice - plusCost,
    stock: Math.min(...products.map((p) => Math.floor(p.stock * 0.7))),
    isMain: false,
    isLossLeader: false,
  };

  // 豪华SKU（2倍量）
  const luxuryCost = baseCost * 2;
  const luxuryPrice = Math.ceil(basePrice * 1.8 / 10) * 10 - 0.01;
  const luxurySku: SkuOption = {
    name: '豪华装（2倍量）',
    price: luxuryPrice,
    cost: luxuryCost,
    profit: luxuryPrice - luxuryCost,
    stock: Math.min(...products.map((p) => Math.floor(p.stock * 0.5))),
    isMain: false,
    isLossLeader: false,
  };

  // 引流SKU（低价引流）
  const lossLeaderCost = baseCost * 0.5;
  const lossLeaderPrice = Math.ceil(lossLeaderCost * 1.3 / 5) * 5 - 0.01;
  const lossLeaderSku: SkuOption = {
    name: '尝鲜装（半量）',
    price: lossLeaderPrice,
    cost: lossLeaderCost,
    profit: lossLeaderPrice - lossLeaderCost,
    stock: Math.min(...products.map((p) => Math.floor(p.stock * 0.3))),
    isMain: false,
    isLossLeader: true,
  };

  groups.push({
    groupName: '规格选择',
    options: [lossLeaderSku, baseSku, plusSku, luxurySku],
  });

  return groups;
}

// 生成单个产品的SKU
export function generateSingleProductSkus(product: Product): SkuGroup[] {
  const groups: SkuGroup[] = [];

  // 按数量分SKU
  const singleCost = product.unitCost;
  const singlePrice = Math.ceil(singleCost * 2.5 / 5) * 5 - 0.01;

  const skus: SkuOption[] = [
    {
      name: '1袋/盒',
      price: singlePrice,
      cost: singleCost,
      profit: singlePrice - singleCost,
      stock: product.stock,
      isMain: true,
      isLossLeader: false,
    },
    {
      name: '3袋/盒（实惠装）',
      price: Math.ceil(singlePrice * 2.5 / 10) * 10 - 0.01,
      cost: singleCost * 3,
      profit: Math.ceil(singlePrice * 2.5 / 10) * 10 - 0.01 - singleCost * 3,
      stock: Math.floor(product.stock * 0.7),
      isMain: false,
      isLossLeader: false,
    },
    {
      name: '5袋/盒（家庭装）',
      price: Math.ceil(singlePrice * 4 / 10) * 10 - 0.01,
      cost: singleCost * 5,
      profit: Math.ceil(singlePrice * 4 / 10) * 10 - 0.01 - singleCost * 5,
      stock: Math.floor(product.stock * 0.5),
      isMain: false,
      isLossLeader: false,
    },
  ];

  // 如果单品成本低，加一个引流SKU
  if (singleCost < 5) {
    skus.unshift({
      name: '1袋尝鲜装',
      price: Math.ceil(singleCost * 1.5 / 1) * 1 - 0.01,
      cost: singleCost,
      profit: Math.ceil(singleCost * 1.5 / 1) * 1 - 0.01 - singleCost,
      stock: Math.floor(product.stock * 0.2),
      isMain: false,
      isLossLeader: true,
    });
  }

  groups.push({
    groupName: '数量选择',
    options: skus,
  });

  return groups;
}

// 防比价SKU布局建议
export function generateAntiComparisonSkus(
  products: Product[],
  baseCost: number,
  basePrice: number
): {
  title: string;
  description: string;
  skus: SkuGroup[];
  tips: string[];
} {
  const skus = generateComboSkus(products, baseCost, basePrice);

  const tips = [
    '💡 防比价技巧1：SKU名称不要直接用"1份/2份"，改用"基础装/超值装/豪华装"等',
    '💡 防比价技巧2：引流SKU价格设置要低，但库存要少，避免亏损',
    '💡 防比价技巧3：主推SKU放在中间位置，价格适中，利润最高',
    '💡 防比价技巧4：不同SKU之间的价格差不要太大，建议在20-50%之间',
    '💡 防比价技巧5：可以在SKU名称中加入"赠品"、"限量"等字样增加吸引力',
    '💡 防比价技巧6：引流SKU和主推SKU的产品内容可以略有差异，避免直接比价',
  ];

  return {
    title: '防比价SKU布局方案',
    description: '基于你的产品组合，推荐以下SKU设置方案，有效避免竞对比价',
    skus,
    tips,
  };
}

// 格式化SKU信息为文本
export function formatSkusForCopy(skuGroups: SkuGroup[]): string {
  return skuGroups
    .map((group) => {
      const options = group.options
        .map(
          (opt) =>
            `${opt.isLossLeader ? '🔥引流 ' : ''}${opt.isMain ? '⭐主推 ' : ''}${opt.name}：¥${opt.price.toFixed(2)}（成本¥${opt.cost.toFixed(2)}，利润¥${opt.profit.toFixed(2)}）`
        )
        .join('\n');
      return `【${group.groupName}】\n${options}`;
    })
    .join('\n\n');
}
