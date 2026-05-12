import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import { products } from '@/data/site';

export default function ProductsPage() {
  return (
    <>
      <section className="bg-warm py-16">
        <div className="container-custom">
          <p className="mb-3 text-sm font-semibold text-primary">产品中心</p>
          <h1 className="text-4xl font-bold text-dark">创极鲜主营产品与规格</h1>
          <p className="mt-4 max-w-3xl leading-7 text-dark-secondary">
            面向火锅门店与餐饮渠道，提供虾滑主品类与配套食材组合，提升档口上新和高峰出品效率。
          </p>
        </div>
      </section>

      <Section title="主力产品参数" description="以下为常规供货口径，实际采购可按门店菜单、后厨流程和箱规做批次调整。">
        <div className="hidden overflow-hidden rounded-lg border border-warm-dark bg-white md:block">
          <div className="grid grid-cols-5 bg-dark px-5 py-4 text-sm font-semibold text-white">
            <div>产品</div>
            <div>虾肉含量</div>
            <div>规格</div>
            <div>口感</div>
            <div>场景</div>
          </div>
          {products.map((product) => (
            <div key={product.name} className="grid grid-cols-1 gap-2 border-t border-warm-dark px-5 py-5 text-sm md:grid-cols-5">
              <div className="font-semibold text-dark">{product.name}</div>
              <div>{product.shrimpContent}</div>
              <div>{product.spec}</div>
              <div>{product.texture}</div>
              <div>{product.scene}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:hidden">
          {products.map((product) => (
            <Card key={product.name}>
              <h3 className="text-xl font-semibold text-dark">{product.name}</h3>
              <dl className="mt-4 grid gap-3 text-sm">
                <div className="grid grid-cols-[5rem_1fr] gap-3">
                  <dt className="text-gray-500">虾肉含量</dt>
                  <dd className="font-semibold text-dark">{product.shrimpContent}</dd>
                </div>
                <div className="grid grid-cols-[5rem_1fr] gap-3">
                  <dt className="text-gray-500">规格</dt>
                  <dd>{product.spec}</dd>
                </div>
                <div className="grid grid-cols-[5rem_1fr] gap-3">
                  <dt className="text-gray-500">口感</dt>
                  <dd>{product.texture}</dd>
                </div>
                <div className="grid grid-cols-[5rem_1fr] gap-3">
                  <dt className="text-gray-500">场景</dt>
                  <dd>{product.scene}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="warm" title="包装与交付" description="面向 B 端采购，重点处理规格统一、库存周转、冷链稳定和补货时效。">
        <div className="grid gap-5 md:grid-cols-3">
          {['餐饮装', '零售装', '定制装'].map((item) => (
            <Card key={item}>
              <h3 className="text-xl font-semibold text-dark">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-dark-secondary">
                支持克重、箱规、标签信息与出库节奏配置，便于采购、仓储和门店后厨协同。
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
