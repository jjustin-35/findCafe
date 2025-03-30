import { Metadata } from 'next';
import MuiProvider from '@/lib/MuiProvider';
import ReduxProvider from '@/lib/reduxProvider';

export const metadata: Metadata = {
  title: '找找咖啡',
  description: '發現您理想中的咖啡廳：搜尋、探索並找到最適合您的咖啡空間。',
  icons: '/images/coffee.svg',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="zh-tw">
      <body>
        <MuiProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </MuiProvider>
      </body>
    </html>
  );
};

export default Layout;
