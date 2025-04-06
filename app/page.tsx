import Header from '@/components/Header';
import HomeBanner from '@/components/HomeBanner';
import TextBanner from '@/components/TextBanner';
import HomeIntro from '@/components/HomeIntro';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <TextBanner type="home" />
      <HomeIntro />
      <Footer />
    </>
  );
}
