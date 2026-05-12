import type { ReactNode } from 'react';

interface SectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  tone?: 'white' | 'warm';
}

export default function Section({ eyebrow, title, description, children, tone = 'white' }: SectionProps) {
  return (
    <section className={tone === 'warm' ? 'bg-warm py-20' : 'bg-white py-20'}>
      <div className="container-custom">
        <div className="mb-10 max-w-3xl">
          {eyebrow && <p className="mb-3 text-sm font-semibold text-primary">{eyebrow}</p>}
          <h2 className="text-3xl font-bold leading-tight text-dark md:text-4xl">{title}</h2>
          {description && <p className="mt-4 text-base leading-7 text-dark-secondary">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
