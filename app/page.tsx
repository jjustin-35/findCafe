import Header from '@/components/Header';
import HomeBanner from '@/components/HomeBanner';
import TextBanner from '@/components/TextBanner';
import HomeIntro from '@/components/HomeIntro';

export default function Home() {
  return (
    <>
      <Header />
      <HomeBanner />
      <TextBanner type="home" />
      <HomeIntro />
    </>
  );
}
