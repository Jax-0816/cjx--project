import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

// 拼多多运营工具页面
const PddDashboard = lazy(() => import('@/pages/pdd/PddDashboard'));
const ProductManage = lazy(() => import('@/pages/pdd/ProductManage'));
const ComboBuilder = lazy(() => import('@/pages/pdd/ComboBuilder'));
const ImagePromptGen = lazy(() => import('@/pages/pdd/ImagePromptGen'));
const TitleGenerator = lazy(() => import('@/pages/pdd/TitleGenerator'));
const SkuSetting = lazy(() => import('@/pages/pdd/SkuSetting'));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 拼多多运营工具路由 */}
          <Route path="/pdd" element={<PddDashboard />} />
          <Route path="/pdd/products" element={<ProductManage />} />
          <Route path="/pdd/combos" element={<ComboBuilder />} />
          <Route path="/pdd/image-prompts" element={<ImagePromptGen />} />
          <Route path="/pdd/titles" element={<TitleGenerator />} />
          <Route path="/pdd/skus" element={<SkuSetting />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
