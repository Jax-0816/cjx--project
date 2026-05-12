// 组合装：类型与计算（用户预设数据见 userComboStorage.ts）
import { Product, products } from './products';

export interface ComboItem {
  productId: string;
  quantity: number;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  items: ComboItem[];
  totalCost: number;
  suggestedPrice: number;
  profit: number;
  profitMargin: number;
  category: string;
  tags: string[];
  createdAt: string;
}

function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function calculateCombo(items: ComboItem[]): {
  totalCost: number;
  suggestedPrice: number;
  profit: number;
  profitMargin: number;
} {
  const totalCost = items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.unitCost * item.quantity : 0);
  }, 0);

  const suggestedPrice = Math.ceil((totalCost * 2.5) / 10) * 10 - 0.01;
  const profit = suggestedPrice - totalCost;
  const profitMargin = suggestedPrice > 0 ? (profit / suggestedPrice) * 100 : 0;

  return { totalCost, suggestedPrice, profit, profitMargin };
}

export function getComboProducts(items: ComboItem[]): (Product & { quantity: number })[] {
  return items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { ...product, quantity: item.quantity };
    })
    .filter((p): p is Product & { quantity: number } => p !== null);
}
