import { Metadata } from 'next';
import Provider from '@/lib/provider';

export const metadata: Metadata = {
  title: '找找咖啡',
  description: '發現您理想中的咖啡廳：搜尋、探索並找到最適合您的咖啡空間。',
  icons: '/images/coffee.svg',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="zh-tw">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default Layout;
