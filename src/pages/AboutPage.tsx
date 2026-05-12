import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import { brandInfo, processSteps } from '@/data/site';

export default function AboutPage() {
  return (
    <>
      <section className="bg-white py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">关于我们</p>
            <h1 className="text-4xl font-bold leading-tight text-dark">{brandInfo.factory}</h1>
            <p className="mt-5 leading-8 text-dark-secondary">
              {brandInfo.name}围绕“打造从源头到餐桌”的理念服务餐饮采购和区域渠道客户，持续强化品控、交付和复购稳定性。
            </p>
          </div>
          <Card>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="text-3xl font-bold text-primary">100000+</div>
                <p className="mt-2 text-sm text-dark-secondary">服务门店规模</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">8</div>
                <p className="mt-2 text-sm text-dark-secondary">品牌画册页数</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">7+</div>
                <p className="mt-2 text-sm text-dark-secondary">主营品类</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">1v1</div>
                <p className="mt-2 text-sm text-dark-secondary">采购对接服务</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Section tone="warm" title="生产流程" description="用清晰流程降低合作沟通成本，样品、批次和出库信息都可追溯。">
        <div className="grid gap-3 md:grid-cols-6">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-md bg-white p-5 shadow-sm">
              <div className="text-sm font-bold text-primary">{String(index + 1).padStart(2, '0')}</div>
              <p className="mt-3 font-semibold text-dark">{step}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
