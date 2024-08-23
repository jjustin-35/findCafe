import Provider from '@/lib/provider';

export const metadata = {
 title: '找找咖啡',
 description: '發現您理想中的咖啡廳：搜尋、探索並找到最適合您的咖啡空間。',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      {children}
    </Provider>
  );
};

export default Layout;
