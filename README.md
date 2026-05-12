# 创极鲜官网

火锅食材供应链公司官方网站，主营虾滑产品。面向国内 B 端客户（火锅连锁、餐饮采购），预留电商 C 端扩展。

## 技术栈

React 18 + TypeScript + Vite 6 + Tailwind CSS 3.4 + react-router-dom v6 + framer-motion

## 本地运行

```bash
npm install
npm run dev
```

如需接入询价表单提交接口，复制 `.env.example` 为 `.env.local`，填写：

```bash
VITE_CONTACT_ENDPOINT=https://your-api.example.com/contact
```

未配置接口时，表单会以演示模式在前端显示提交成功。

---

## 今日进度 (2026-05-10)

- [x] 项目方案设计（4 页：首页、产品中心、关于我们、联系我们）
- [x] 技术选型确认（React + Vite + Tailwind）
- [x] 组件架构和路由设计
- [x] 项目初始化与构建配置
- [x] 布局组件、通用 UI 组件、首页模块
- [x] 首页、产品中心、关于我们、联系我们首版内容
- [ ] 构建验证与浏览器走查

## 明日待办

1. **构建验证**：安装依赖并运行 `npm run build`
2. **浏览器走查**：检查桌面端和移动端首页、导航、表单布局
3. **内容替换**：补真实电话、邮箱、资质、工厂图片和产品规格
4. **表单接入**：连接后端、飞书/企业微信 Webhook 或邮件通知
5. **SEO 基础**：标题、描述、Open Graph 图与站点图

## 页面结构

```
/          → 首页（大图 + 公司实力 + 产品亮点 + 合作客户）
/products   → 产品中心（虾滑 SKU 详情 + 规格参数）
/about      → 关于我们（自有工厂 + 工艺 + 资质）
/contact    → 联系我们（B 端询价表单 + 电商入口）
```

## 项目结构

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   ├── ui/              # Button, Section, Card, ScrollReveal, ContactForm
│   └── home/            # HeroSection, StrengthSection, ProductHighlight, PartnerSection
├── pages/               # HomePage, ProductsPage, AboutPage, ContactPage
├── data/                # 产品信息常量（后期迁 CMS）
├── hooks/               # useScrollReveal
├── App.tsx
├── main.tsx
└── index.css
```
