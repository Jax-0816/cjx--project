import HeroSection from '@/components/home/HeroSection';
import PartnerSection from '@/components/home/PartnerSection';
import ProductHighlight from '@/components/home/ProductHighlight';
import StrengthSection from '@/components/home/StrengthSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StrengthSection />
      <ProductHighlight />
      <PartnerSection />
    </>
  );
}
