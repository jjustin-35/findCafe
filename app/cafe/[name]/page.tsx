import { Suspense, use } from 'react';
import Header from '@/components/Header';
import CafeInfo from '@/modules/CafeInfo';

const Cafe = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name: encodedName } = use(params);
  const name = decodeURIComponent(encodedName);

  return (
    <>
      <Header />
      <CafeInfo cafeName={name} />
    </>
  );
};

export default Cafe;
