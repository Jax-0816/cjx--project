import Button from '@/components/ui/Button';
import { brandInfo } from '@/data/site';

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-dark">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={brandInfo.videoPath}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/55 to-dark/25" />
      <div className="container-custom relative flex min-h-[calc(100vh-4rem)] items-center py-16 text-white">
        <div className="max-w-2xl text-white">
          <p className="mb-4 text-sm font-semibold text-accent">北海创极鲜虾滑工厂 · 源头直供 · 冷链交付</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">{brandInfo.name}</h1>
          <p className="mt-6 text-lg leading-8 text-white/86">
            打造从源头到餐桌的供应链能力，面向火锅连锁、餐饮集团与区域批发客户提供稳定供货方案。
          </p>
          <p className="mt-3 text-base font-semibold text-white/95">{brandInfo.slogan}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact">获取报价</Button>
            <Button to="/products" variant="secondary">
              查看产品
            </Button>
            <a
              href={brandInfo.brochurePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              下载画册
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
