import { Metadata } from 'next';
import MuiProvider from '@/lib/MuiProvider';
import ReduxProvider from '@/lib/reduxProvider';

export const metadata: Metadata = {
  title: '找找咖啡',
  description: '發現您理想中的咖啡廳：搜尋、探索並找到最適合您的咖啡空間。',
  icons: '/images/coffee.svg',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FindCafe',
  },
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="zh-tw">
      <head>
        <link rel="apple-touch-icon" href="/logo192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#68472b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <MuiProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </MuiProvider>
      </body>
    </html>
  );
};

export default Layout;
