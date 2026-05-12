import { FormEvent, useState } from 'react';
import Button from './Button';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState('sending');

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

    if (!endpoint) {
      setSubmitState('success');
      event.currentTarget.reset();
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      setSubmitState('success');
      event.currentTarget.reset();
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <form className="grid gap-4 rounded-lg border border-warm-dark bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-dark">
          公司名称
          <input
            className="rounded-md border border-warm-dark px-4 py-3 outline-none focus:border-primary"
            name="company"
            placeholder="请输入公司名称"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-dark">
          联系人
          <input
            className="rounded-md border border-warm-dark px-4 py-3 outline-none focus:border-primary"
            name="contact"
            placeholder="姓名 / 职位"
            required
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-dark">
          联系电话
          <input
            className="rounded-md border border-warm-dark px-4 py-3 outline-none focus:border-primary"
            name="phone"
            placeholder="手机号或座机"
            required
            type="tel"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-dark">
          合作类型
          <select className="rounded-md border border-warm-dark px-4 py-3 outline-none focus:border-primary" name="type">
            <option>连锁供货</option>
            <option>批发采购</option>
            <option>OEM/ODM 定制</option>
            <option>零售渠道合作</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-dark">
        需求说明
        <textarea
          className="min-h-32 rounded-md border border-warm-dark px-4 py-3 outline-none focus:border-primary"
          name="message"
          placeholder="预计月用量、门店城市、期望规格等"
          required
        />
      </label>
      <Button type="submit" className="w-full md:w-auto md:justify-self-start" disabled={submitState === 'sending'}>
        {submitState === 'sending' ? '提交中...' : '提交询价'}
      </Button>
      {submitState === 'success' && (
        <p className="rounded-md bg-warm px-4 py-3 text-sm font-medium text-dark" role="status">
          已记录你的询价信息，我们会尽快联系你。
        </p>
      )}
      {submitState === 'error' && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-primary-dark" role="alert">
          提交失败，请稍后重试，或直接拨打页面中的联系电话。
        </p>
      )}
    </form>
  );
}
