import Card from '@/components/ui/Card';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Section from '@/components/ui/Section';
import { strengths } from '@/data/site';

export default function StrengthSection() {
  return (
    <Section
      eyebrow="供应链能力"
      title="从品牌画册到宣传视频，核心信息统一为稳定供货能力"
      description="围绕火锅门店高频采购场景，强调标准化品项、稳定出品和持续交付。"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {strengths.map((item) => (
          <ScrollReveal key={item.label}>
            <Card className="h-full">
              <div className="text-4xl font-bold text-primary">{item.value}</div>
              <h3 className="mt-5 text-xl font-semibold text-dark">{item.label}</h3>
              <p className="mt-3 text-sm leading-6 text-dark-secondary">{item.detail}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
