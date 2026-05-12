import ContactForm from '@/components/ui/ContactForm';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import { brandInfo, contactChannels } from '@/data/site';

export default function ContactPage() {
  return (
    <>
      <section className="bg-warm py-16">
        <div className="container-custom">
          <p className="mb-3 text-sm font-semibold text-primary">联系我们</p>
          <h1 className="text-4xl font-bold text-dark">告诉我们你的采购需求，我们快速对接</h1>
          <p className="mt-4 max-w-3xl leading-7 text-dark-secondary">
            留下门店类型、预计用量和目标规格，创极鲜会按试样、报价和补货节奏给出合作建议。
          </p>
        </div>
      </section>

      <Section title="B 端询价">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr]">
          <ContactForm />
          <div className="space-y-5">
            <Card>
              <h2 className="text-xl font-semibold text-dark">合作方向</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {contactChannels.map((channel) => (
                  <span key={channel} className="rounded-md bg-warm px-3 py-2 text-sm font-medium text-dark">
                    {channel}
                  </span>
                ))}
              </div>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-dark">联系方式</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-dark-secondary">
                <p>电话：{brandInfo.phone}</p>
                <p>工厂：{brandInfo.factory}</p>
                <p>地址：{brandInfo.address}</p>
              </div>
              <a
                href={brandInfo.brochurePath}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-md border border-primary/20 bg-warm px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-warm-dark"
              >
                打开产品画册（PDF）
              </a>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-dark">宣传视频</h2>
              <video
                className="mt-4 aspect-video w-full rounded-md border border-warm-dark bg-dark/90 object-cover"
                src={brandInfo.videoPath}
                controls
                preload="metadata"
              />
              <div className="mt-3 text-sm text-dark-secondary">
                视频核心表达：打造从源头到餐桌。
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
