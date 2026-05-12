// 常温火锅食材产品数据（从常温货.xlsx 导入）
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  spec: string;
  unit: string;
  packageSpec: string; // 箱规
  costPrice: number; // 成本价（元/件）
  unitCost: number; // 单个成本
  freight: number; // 运费
  stock: number; // 库存（件）
  image: string; // 产品图片
  tags: string[]; // 标签：爆款/利润款/引流款
  description: string;
}

export type ProductCategory = {
  name: string;
  subCategories: string[];
};

/** 产品管理主分类（固定四项） */
export const PRODUCT_MAIN_CATEGORIES = ['常温食材', '冷链食材', '底料蘸料', '创极酱虾滑'] as const;

export const productCategories: ProductCategory[] = [
  { name: '常温食材', subCategories: ['脆铃卷/响铃卷', '粉条/粉丝', '豆制品', '笋类', '腊肠', '饮品/辅料', '其他'] },
  { name: '冷链食材', subCategories: ['鸭血', '午餐肉', '火腿'] },
  { name: '底料蘸料', subCategories: ['芝麻酱', '韭菜花', '沙茶酱', '香辣酱', '牛肉酱', '菌菇酱', '蒜蓉辣酱', '其他酱料', '番茄底料', '菌汤', '骨汤', '牛油底料', '酸辣金汤', '花胶金汤', '其他底料', '调味辅料'] },
  { name: '创极酱虾滑', subCategories: ['虾滑'] },
];

// 图片文件名映射（根据实际产品名匹配图片）
const productImages: Record<string, string> = {
  '鑫钰隆 脆铃卷彩袋 125g/盒': '0b520974eda1a5de4f522f989465d352.jpg',
  '鑫钰隆 脆铃卷 125g/袋': '0cb452f0cf794aa448e3a02986533641.jpg',
  '鑫钰隆 火锅川粉 228g/袋': '52e59f68db56eb823797dc10ca5ede1a.jpg',
  '鑫钰隆 粉丝 120g/袋': '88ad3d7ab2ecbb31b69d6d15ca2b350d.jpg',
  '鑫钰隆 豆皮条 150g/袋': '281c8b51cac13d9dbb4666ff3d582200.png',
  '鑫钰隆 水晶粉丝 80g/袋': '434fb8e39c07b336a59f05036875ac65.jpg',
  '煮仆 油炸豆皮 80g/盒': '646b0f85aefe5de76d68899da775b7e0.jpg',
  '煮仆 火锅豆皮 120g/袋': '1348de519eeab2095f722ca6c2e073f6.png',
  '三脚田 川粉 228g/袋': '9500508ab5adebf99255d68f99de7e46.jpg',
  '煮仆 响铃卷 120g/盒': 'a520fc29aae6d7efb0db7e809375d250.jpg',
  '鑫钰隆 火腿午餐肉 340g/盒': 'c3aade15f197bd5eebd91bbb30744fc3.jpg',
  '鑫钰隆 迷你中式腊肠 350g/袋(新)': 'c8ef8d31c3c309b4df82e98568289a55.jpg',
  '鑫钰隆 迷你中式腊肠 90g/袋(新)': 'c8fea21d39019be20553c34ab7cad340.jpg',
  '煮仆 云腿午餐肉 340g/盒': 'd30a30308a30402855509d5013034813.jpg',
  '鑫钰隆 鸭血 400g/袋': 'da1ca024c6ad9a7e28c5e9de7cd04b8c.jpg',
  '鑫钰隆 鸭血（盒）330g/盒': 'e4c2116e3ae35d3f724e536ffb306731.jpg',
  '鑫钰隆 卤味鸭血 400g/袋': 'ed6f13162faa107eb304b9acec9865b5.jpg',
};

function getProductImage(name: string): string {
  const img = productImages[name];
  return img ? `/images/products/${img}` : '';
}

function getCategory(name: string): { category: string; subCategory: string } {
  if (name.includes('虾滑')) return { category: '创极酱虾滑', subCategory: '虾滑' };

  if (name.includes('鸭血')) return { category: '冷链食材', subCategory: '鸭血' };
  if (name.includes('午餐肉') || name.includes('云腿') || name.includes('火腿')) return { category: '冷链食材', subCategory: '午餐肉' };

  if (name.includes('芝麻酱') || name.includes('麻酱') || name.includes('芝麻蘸料') || name.includes('芝麻调和油')) {
    return { category: '底料蘸料', subCategory: '芝麻酱' };
  }
  if (name.includes('韭菜花')) return { category: '底料蘸料', subCategory: '韭菜花' };
  if (name.includes('沙茶酱')) return { category: '底料蘸料', subCategory: '沙茶酱' };
  if (name.includes('香辣酱')) return { category: '底料蘸料', subCategory: '香辣酱' };
  if (name.includes('牛肉酱') || name.includes('风味牛肉酱') || name.includes('香菇牛肉酱')) {
    return { category: '底料蘸料', subCategory: '牛肉酱' };
  }
  if (name.includes('菌菇酱')) return { category: '底料蘸料', subCategory: '菌菇酱' };
  if (name.includes('蒜蓉辣酱')) return { category: '底料蘸料', subCategory: '蒜蓉辣酱' };
  if (
    name.includes('XO酱') ||
    name.includes('孜然酱') ||
    name.includes('青椒酱') ||
    name.includes('果仁酱') ||
    name.includes('海鲜汁') ||
    name.includes('火锅油碟')
  ) {
    return { category: '底料蘸料', subCategory: '其他酱料' };
  }
  if (name.includes('番茄底料') || (name.includes('番茄') && (name.includes('底料') || name.includes('醇香番茄')))) {
    return { category: '底料蘸料', subCategory: '番茄底料' };
  }
  if (name.includes('菌汤')) return { category: '底料蘸料', subCategory: '菌汤' };
  if (name.includes('骨汤') || name.includes('棒骨')) return { category: '底料蘸料', subCategory: '骨汤' };
  if (name.includes('牛油') || name.includes('火锅底料') || name.includes('红油底料') || name.includes('重庆')) {
    return { category: '底料蘸料', subCategory: '牛油底料' };
  }
  if (name.includes('酸辣金汤')) return { category: '底料蘸料', subCategory: '酸辣金汤' };
  if (name.includes('花胶金汤')) return { category: '底料蘸料', subCategory: '花胶金汤' };
  if (
    name.includes('绿麻锅') ||
    name.includes('清油') ||
    name.includes('过把瘾') ||
    name.includes('藤椒') ||
    name.includes('黄番茄') ||
    name.includes('调味粉')
  ) {
    return { category: '底料蘸料', subCategory: '其他底料' };
  }
  if (name.includes('火锅红油')) return { category: '底料蘸料', subCategory: '其他底料' };
  if (name.includes('特级香辣') && name.includes('蘸料')) return { category: '底料蘸料', subCategory: '其他酱料' };
  if (name.includes('鸡精')) return { category: '底料蘸料', subCategory: '调味辅料' };

  if (name.includes('脆铃') || name.includes('响铃')) return { category: '常温食材', subCategory: '脆铃卷/响铃卷' };
  if (name.includes('川粉') || name.includes('粉丝') || name.includes('水晶粉丝')) return { category: '常温食材', subCategory: '粉条/粉丝' };
  if (name.includes('豆皮')) return { category: '常温食材', subCategory: '豆制品' };
  if (name.includes('笋')) return { category: '常温食材', subCategory: '笋类' };
  if (name.includes('腊肠')) return { category: '常温食材', subCategory: '腊肠' };
  if (name.includes('酸梅') || name.includes('果溶') || name.includes('山楂') || name.includes('酸黄瓜')) {
    return { category: '常温食材', subCategory: '饮品/辅料' };
  }
  if (name.includes('调和油')) return { category: '常温食材', subCategory: '其他' };

  return { category: '常温食材', subCategory: '其他' };
}

// 原始数据
const rawProducts = [
  { name: '鑫钰隆 脆铃卷彩袋 125g/盒', spec: '125g/盒', unit: '盒', packageSpec: '40盒/件', costPrice: 180, unitCost: 4.5, freight: 0, stock: 14 },
  { name: '鑫钰隆 脆铃卷 125g/袋', spec: '125g/袋', unit: '袋', packageSpec: '36袋/件', costPrice: 172, unitCost: 4.78, freight: 1, stock: 24 },
  { name: '鑫钰隆 火锅川粉 228g/袋', spec: '228g/袋', unit: '袋', packageSpec: '50袋/件', costPrice: 82, unitCost: 1.64, freight: 0.79, stock: 29 },
  { name: '鑫钰隆 粉丝 120g/袋', spec: '120g/袋', unit: '袋', packageSpec: '50袋/件', costPrice: 96, unitCost: 1.92, freight: 9.75, stock: 3 },
  { name: '鑫钰隆 豆皮条 150g/袋', spec: '150g/袋', unit: '袋', packageSpec: '56袋/件', costPrice: 196, unitCost: 3.5, freight: 8.38, stock: 26 },
  { name: '鑫钰隆 水晶粉丝 80g/袋', spec: '80g/袋', unit: '袋', packageSpec: '50袋/件', costPrice: 50, unitCost: 1.0, freight: 9.75, stock: 19 },
  { name: '煮仆 油炸豆皮 80g/盒', spec: '80g/盒', unit: '盒', packageSpec: '20盒/件', costPrice: 68, unitCost: 3.4, freight: 8.38, stock: 39 },
  { name: '煮仆 火锅豆皮 120g/袋', spec: '120g/袋', unit: '袋', packageSpec: '30盒/件', costPrice: 62, unitCost: 2.07, freight: 9.33, stock: 6 },
  { name: '三脚田 川粉 228g/袋', spec: '228g/袋', unit: '袋', packageSpec: '50袋/件', costPrice: 78, unitCost: 1.56, freight: 1.23, stock: 11 },
  { name: '煮仆 响铃卷 120g/盒', spec: '120g/盒', unit: '盒', packageSpec: '32盒/件', costPrice: 85, unitCost: 2.66, freight: 6.03, stock: 23 },
  { name: '鑫钰隆 火腿午餐肉 340g/盒', spec: '340g/盒', unit: '盒', packageSpec: '24盒/件', costPrice: 210, unitCost: 8.75, freight: 0, stock: 185 },
  { name: '鑫钰隆 迷你中式腊肠 350g/袋(新)', spec: '350g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 342, unitCost: 17.1, freight: 0.79, stock: 5 },
  { name: '鑫钰隆 迷你中式腊肠 90g/袋(新)', spec: '90g/袋', unit: '袋', packageSpec: '50袋/件', costPrice: 238, unitCost: 4.76, freight: 0.79, stock: 5 },
  { name: '煮仆 云腿午餐肉 340g/盒', spec: '340g/盒', unit: '盒', packageSpec: '24盒/件', costPrice: 165, unitCost: 6.88, freight: 0, stock: 39 },
  { name: '汇泉糯米火腿午餐肉340g/盒', spec: '340g/盒', unit: '盒', packageSpec: '24盒/件', costPrice: 180, unitCost: 7.5, freight: 0, stock: 3 },
  { name: '鑫钰隆 腊肠（慧心之选) 85g/袋', spec: '85g/袋', unit: '袋', packageSpec: '50袋/件', costPrice: 165, unitCost: 3.3, freight: 4.01, stock: 4 },
  { name: '鑫钰隆 嘎嘎脆笋尖 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 103, unitCost: 5.15, freight: 0.8, stock: 33 },
  { name: '鑫钰隆 嘎嘎脆笋片 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 101, unitCost: 5.05, freight: 0.63, stock: 97 },
  { name: '鑫钰隆 嘎嘎脆笋花 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 103, unitCost: 5.15, freight: 0.63, stock: 29 },
  { name: '鑫钰隆 先割春笋 200g/袋', spec: '200g/袋', unit: '袋', packageSpec: '30袋/件', costPrice: 145, unitCost: 4.83, freight: 0, stock: 2 },
  { name: '巴蜀符号 绿笋 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 143, unitCost: 7.15, freight: 0.8, stock: 65 },
  { name: '特级香辣 蘸料 2500g/袋', spec: '2500g/袋', unit: '袋', packageSpec: '6袋/件', costPrice: 390, unitCost: 65, freight: 11.5, stock: 2 },
  { name: '芝麻蘸料【原味】5斤/袋', spec: '5斤/袋', unit: '袋', packageSpec: '6袋/件', costPrice: 270, unitCost: 45, freight: 8.13, stock: 4 },
  { name: '匠手 麻酱 70g/瓶', spec: '70g/瓶', unit: '瓶', packageSpec: '120瓶/件', costPrice: 260, unitCost: 2.17, freight: 6.76, stock: 3 },
  { name: '匠手 韭菜花 70g/瓶', spec: '70g/瓶', unit: '瓶', packageSpec: '120瓶/件', costPrice: 180, unitCost: 1.5, freight: 6.76, stock: 10 },
  { name: '匠手 沙茶酱 10斤/桶', spec: '10斤/桶', unit: '桶', packageSpec: '2桶/件', costPrice: 168, unitCost: 84, freight: 8.2, stock: 2 },
  { name: '匠手 韭菜花 10斤/桶', spec: '10斤/桶', unit: '桶', packageSpec: '2桶/件', costPrice: 84, unitCost: 42, freight: 6.67, stock: 10 },
  { name: '匠手 芝麻酱 5斤/桶', spec: '5斤/桶', unit: '桶', packageSpec: '4桶/件', costPrice: 140, unitCost: 35, freight: 6.05, stock: 12 },
  { name: '匠手 芝麻酱伴侣 1.5斤/袋', spec: '1.5斤/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 195, unitCost: 9.75, freight: 10, stock: 9 },
  { name: '鑫钰隆 海鲜汁 5升/桶', spec: '5升/桶', unit: '桶', packageSpec: '2桶/件', costPrice: 64, unitCost: 32, freight: 11, stock: 59 },
  { name: '鑫钰隆 火锅红油(油) 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '40袋/件', costPrice: 500, unitCost: 12.5, freight: 0.47, stock: 6 },
  { name: '鑫钰隆 牛油底料(渣) 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '40袋/件', costPrice: 500, unitCost: 12.5, freight: 0.47, stock: 3 },
  { name: '鑫钰隆 过把瘾底料 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '24袋/件', costPrice: 300, unitCost: 12.5, freight: 1.8, stock: 15 },
  { name: '鑫钰隆 菌汤 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 380, unitCost: 19, freight: 0, stock: 6 },
  { name: '鑫钰隆 绿麻锅底 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 240, unitCost: 12, freight: 2.06, stock: 10 },
  { name: '鑫钰隆 骨汤 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 360, unitCost: 18, freight: 13.5, stock: 12 },
  { name: '鑫钰隆 鸡精 454g/袋', spec: '454g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 135, unitCost: 6.75, freight: 5.06, stock: 8 },
  { name: '鑫钰隆 番茄底料 375g/袋', spec: '375g/袋', unit: '袋', packageSpec: '48袋/件', costPrice: 432.96, unitCost: 9.02, freight: 0, stock: 14 },
  { name: '鑫钰隆 牛油底料 200g/袋', spec: '200g/袋', unit: '袋', packageSpec: '40袋/件', costPrice: 200, unitCost: 5, freight: 1.15, stock: 2 },
  { name: '鑫钰隆 番茄底料 150g/袋', spec: '150g/袋', unit: '袋', packageSpec: '40袋/件', costPrice: 184, unitCost: 4.6, freight: 0, stock: 14 },
  { name: '鑫钰隆 花胶金汤 127g/袋', spec: '127g/袋', unit: '袋', packageSpec: '35袋/件', costPrice: 283.85, unitCost: 8.11, freight: 20.12, stock: 3 },
  { name: '鑫钰隆 菌汤底料 93g/袋', spec: '93g/袋', unit: '袋', packageSpec: '35袋/件', costPrice: 253.75, unitCost: 7.25, freight: 6.76, stock: 4 },
  { name: '鑫钰隆 棒骨靓汤 79g/袋', spec: '79g/袋', unit: '袋', packageSpec: '35袋/件', costPrice: 175, unitCost: 5, freight: 6.76, stock: 2 },
  { name: '鑫钰隆 芝麻调和油 60g/瓶', spec: '60g/瓶', unit: '瓶', packageSpec: '150瓶/件', costPrice: 205, unitCost: 1.37, freight: 6.3, stock: 17 },
  { name: '食用植物调和油 5L/桶', spec: '5L/桶', unit: '桶', packageSpec: '4桶/件', costPrice: 230, unitCost: 57.5, freight: 15.63, stock: 5 },
  { name: '鑫钰隆 酸辣金汤 250g/袋', spec: '250g/袋', unit: '袋', packageSpec: '40袋/件', costPrice: 229.66, unitCost: 5.74, freight: 0, stock: 13 },
  { name: '鑫钰隆 藤椒牛油火锅底料 250g/袋', spec: '250g/袋', unit: '袋', packageSpec: '40袋/件', costPrice: 290, unitCost: 7.25, freight: 1.02, stock: 2 },
  { name: '鑫钰隆 火锅底料256号 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '24袋/件', costPrice: 288, unitCost: 12, freight: 0, stock: 24 },
  { name: '芝麻蘸料【香辣】5斤/袋', spec: '5斤/袋', unit: '袋', packageSpec: '6袋/件', costPrice: 270, unitCost: 45, freight: 8.13, stock: 28 },
  { name: '鑫钰隆 菌菇酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/桶', costPrice: 180, unitCost: 9, freight: 5.43, stock: 25 },
  { name: '鑫钰隆 果仁酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/桶', costPrice: 194, unitCost: 9.7, freight: 8.28, stock: 2 },
  { name: '鑫钰隆 蒜蓉辣酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/桶', costPrice: 174, unitCost: 8.7, freight: 5.14, stock: 26 },
  { name: '鑫钰隆 沙茶酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/桶', costPrice: 170, unitCost: 8.5, freight: 7.4, stock: 38 },
  { name: '鑫钰隆 香辣酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/桶', costPrice: 170, unitCost: 8.5, freight: 8.28, stock: 7 },
  { name: '鑫钰隆 香辣牛肉酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/桶', costPrice: 204, unitCost: 10.2, freight: 5.14, stock: 20 },
  { name: '煮仆 XO酱 50g/盒', spec: '50g/盒', unit: '盒', packageSpec: '60盒/件', costPrice: 96, unitCost: 1.6, freight: 5.14, stock: 1 },
  { name: '煮仆 菌菇酱 50g/盒', spec: '50g/盒', unit: '盒', packageSpec: '60盒/件', costPrice: 96, unitCost: 1.6, freight: 5.14, stock: 4 },
  { name: '煮仆 香辣牛肉酱 50g/盒', spec: '50g/盒', unit: '盒', packageSpec: '60盒/件', costPrice: 96, unitCost: 1.6, freight: 5.14, stock: 1 },
  { name: '煮仆 蒜蓉辣酱 50g/盒', spec: '50g/盒', unit: '盒', packageSpec: '60盒/件', costPrice: 96, unitCost: 1.6, freight: 5.14, stock: 1 },
  { name: '煮仆 沙茶酱 50g/盒', spec: '50g/盒', unit: '盒', packageSpec: '60盒/件', costPrice: 96, unitCost: 1.6, freight: 5.14, stock: 1 },
  { name: '煮仆 香菇牛肉酱 50g/盒', spec: '50g/盒', unit: '盒', packageSpec: '60盒/件', costPrice: 96, unitCost: 1.6, freight: 5.14, stock: 2 },
  { name: '煮仆 香辣酱 50g/盒', spec: '50g/盒', unit: '盒', packageSpec: '60盒/件', costPrice: 96, unitCost: 1.6, freight: 5.14, stock: 4 },
  { name: '煮仆 孜然酱 50g/盒', spec: '50g/盒', unit: '盒', packageSpec: '60盒/件', costPrice: 96, unitCost: 1.6, freight: 5.14, stock: 1 },
  { name: '鑫钰隆 火锅油碟 60ml/瓶', spec: '60ml/瓶', unit: '瓶', packageSpec: '150瓶/件', costPrice: 160, unitCost: 1.07, freight: 6.3, stock: 34 },
  { name: '鑫钰隆 青椒酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/桶', costPrice: 190, unitCost: 9.5, freight: 5.14, stock: 14 },
  { name: '鑫钰隆 清油底料 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '30袋/件', costPrice: 315, unitCost: 10.5, freight: 0, stock: 7 },
  { name: '鑫钰隆 清油红油 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '30袋/件', costPrice: 345, unitCost: 11.5, freight: 0, stock: 9 },
  { name: '蜀韵川调味粉 50g/袋', spec: '50g/袋', unit: '袋', packageSpec: '200袋/件', costPrice: 180, unitCost: 0.9, freight: 0, stock: 3 },
  { name: '蜀韵川清油底料 150g/袋', spec: '150g/袋', unit: '袋', packageSpec: '100袋/件', costPrice: 320, unitCost: 3.2, freight: 0, stock: 1 },
  { name: '鑫钰隆 黄番茄底料（原味）300g/袋', spec: '300g/袋', unit: '袋', packageSpec: '30袋/件', costPrice: 162, unitCost: 5.4, freight: 0, stock: 1 },
  { name: '鑫钰隆 重庆红油底料 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '24袋/件', costPrice: 244.8, unitCost: 10.2, freight: 0, stock: 2 },
  { name: '鑫钰隆 重庆火锅底料 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '24袋/件', costPrice: 244.8, unitCost: 10.2, freight: 0, stock: 25 },
  { name: '煮仆 菌菇酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 126, unitCost: 6.3, freight: 5.14, stock: 17 },
  { name: '煮仆 风味牛肉酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 140, unitCost: 7, freight: 5.14, stock: 11 },
  { name: '三脚田 醇香番茄底料 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '32袋/件', costPrice: 176, unitCost: 5.5, freight: 0, stock: 14 },
  { name: '煮仆 香辣酱 500g/袋', spec: '500g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 126, unitCost: 6.3, freight: 8.28, stock: 1 },
  { name: '鑫钰隆 酸黄瓜罐头 330g/袋', spec: '330g/袋', unit: '瓶', packageSpec: '20瓶/件', costPrice: 60, unitCost: 3, freight: 7.92, stock: 36 },
  { name: '冠典 百香果果溶 1.2kg/瓶', spec: '1.2kg/瓶', unit: '瓶', packageSpec: '12瓶/件', costPrice: 276, unitCost: 23, freight: 5.85, stock: 2 },
  { name: '冠典 金桔柠檬果溶 1.2kg/瓶', spec: '1.2kg/瓶', unit: '瓶', packageSpec: '12瓶/件', costPrice: 276, unitCost: 23, freight: 5.85, stock: 1 },
  { name: '冠典 山楂膏风味饮料浓浆 1.3kg/瓶', spec: '1.3kg/瓶', unit: '瓶', packageSpec: '12瓶/件', costPrice: 165.6, unitCost: 13.8, freight: 5.85, stock: 4 },
  { name: '鑫钰隆 鸭血 400g/袋', spec: '400g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 22, unitCost: 1.1, freight: 3.57, stock: 148 },
  { name: '鑫钰隆 鸭血（盒）330g/盒', spec: '330g/盒', unit: '盒', packageSpec: '20盒/件', costPrice: 13, unitCost: 0.65, freight: 3.59, stock: 44 },
  { name: '鑫钰隆 卤味鸭血 400g/袋', spec: '400g/袋', unit: '袋', packageSpec: '20袋/件', costPrice: 24, unitCost: 1.2, freight: 2.26, stock: 33 },
  { name: '鑫钰隆 酸梅膏 1.3L/瓶', spec: '1.3L/瓶', unit: '瓶', packageSpec: '12瓶/件', costPrice: 114, unitCost: 9.5, freight: 5.33, stock: 43 },
];

// 生成产品数据
export const products: Product[] = rawProducts.map((item, index) => {
  const { category, subCategory } = getCategory(item.name);
  return {
    id: `P${String(index + 1).padStart(3, '0')}`,
    name: item.name,
    brand: item.name.includes('鑫钰隆') ? '鑫钰隆' : item.name.includes('煮仆') || item.name.includes('煮朴') ? '煮仆' : item.name.includes('匠手') ? '匠手' : item.name.includes('三脚田') ? '三脚田' : item.name.includes('巴蜀符号') ? '巴蜀符号' : item.name.includes('冠典') ? '冠典' : item.name.includes('蜀韵川') ? '蜀韵川' : '其他',
    category,
    subCategory,
    spec: item.spec,
    unit: item.unit,
    packageSpec: item.packageSpec,
    costPrice: item.costPrice,
    unitCost: item.unitCost,
    freight: item.freight,
    stock: item.stock,
    image: getProductImage(item.name),
    tags: item.stock > 50 ? ['爆款'] : item.unitCost < 5 ? ['引流款'] : ['利润款'],
    description: `${item.name}，规格${item.spec}，${item.packageSpec}，适合火锅餐饮场景。`,
  };
});

// 获取产品管理主分类（固定顺序，与筛选按钮一致）
export function getAllCategories(): string[] {
  return [...PRODUCT_MAIN_CATEGORIES];
}

// 根据分类获取产品
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

// 根据标签获取产品
export function getProductsByTag(tag: string): Product[] {
  return products.filter((p) => p.tags.includes(tag));
}

// 搜索产品
export function searchProducts(keyword: string): Product[] {
  const kw = keyword.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(kw) ||
      p.brand.toLowerCase().includes(kw) ||
      p.category.toLowerCase().includes(kw) ||
      p.subCategory.toLowerCase().includes(kw)
  );
}
