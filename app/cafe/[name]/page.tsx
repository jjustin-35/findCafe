import { Suspense, use } from 'react';
import { getCafes as getCafesApi } from '@/apis/search';
import Header from '@/components/Header';
import CafeInfo from '@/modules/CafeInfo';
import CafeInfoLoader from '@/components/Loaders/cafeInfo';

const Cafe = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name: encodedName } = use(params);
  const name = decodeURIComponent(encodedName);
  const getCafes = getCafesApi({
    keyword: name,
  });

  return (
    <>
      <Header />
      <Suspense fallback={<CafeInfoLoader />}>
        <CafeInfo getCafes={getCafes} />
      </Suspense>
    </>
  );
};

export default Cafe;
