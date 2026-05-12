import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Section from '@/components/ui/Section';
import { products } from '@/data/site';

export default function ProductHighlight() {
  return (
    <Section
      tone="warm"
      eyebrow="核心产品"
      title="主营品类覆盖门店主销档口和组合出品场景"
      description="创极鲜主打鲜虾滑、黑虎虾滑、青虾滑，并支持牛肉滑、牛肉片、大刀腰片、鱼籽福袋等组合供货。"
    >
      <div className="grid gap-5 lg:grid-cols-5">
        {products.map((product) => (
          <ScrollReveal key={product.name}>
            <Card className="h-full">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-2xl">鲜</div>
              <h3 className="text-xl font-semibold text-dark">{product.name}</h3>
              <dl className="mt-5 grid gap-3 text-sm">
                <div>
                  <dt className="text-gray-500">虾肉含量</dt>
                  <dd className="mt-1 font-semibold text-dark">{product.shrimpContent}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">常规规格</dt>
                  <dd className="mt-1 font-semibold text-dark">{product.spec}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">适用场景</dt>
                  <dd className="mt-1 font-semibold text-dark">{product.scene}</dd>
                </div>
              </dl>
            </Card>
          </ScrollReveal>
        ))}
      </div>
      <div className="mt-8">
        <Button to="/products" variant="secondary">
          查看完整规格
        </Button>
      </div>
    </Section>
  );
}
