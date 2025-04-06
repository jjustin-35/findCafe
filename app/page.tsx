import HomeBanner from '@/components/HomeBanner';
import TextBanner from '@/components/TextBanner';
import HomeIntro from '@/components/HomeIntro';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <TextBanner type="home" />
      <HomeIntro />
      <CtaBanner title="準備好探索更多咖啡廳了嗎？" buttonText="立即搜尋" href="/cafe" />
      <Footer />
    </>
  );
}
