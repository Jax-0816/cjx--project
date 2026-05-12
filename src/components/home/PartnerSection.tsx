import Section from '@/components/ui/Section';

const partnerTypes = ['火锅连锁', '餐饮集团', '区域批发', '社区零售', '团餐渠道', '电商冷链'];

export default function PartnerSection() {
  return (
    <Section
      eyebrow="合作客户"
      title="服务火锅品牌门店数超 100000+ 家"
      description="从样品试吃、档口上新到长期供货，按门店经营节奏提供稳定补货。"
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {partnerTypes.map((type) => (
          <div key={type} className="rounded-md border border-warm-dark bg-warm-light px-4 py-5 text-center font-semibold text-dark">
            {type}
          </div>
        ))}
      </div>
    </Section>
  );
}
