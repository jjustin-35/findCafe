import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <SearchBar />
      {children}
    </>
  );
};

export default Layout;
