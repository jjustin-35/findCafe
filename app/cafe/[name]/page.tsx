import { Suspense, use } from 'react';
import { getCafes as getCafesApi } from '@/apis/search';
import { Position } from '@/constants/types';
import Header from '@/components/Header';
import CafeInfo from '@/modules/CafeInfo';
import CafeInfoLoader from '@/components/Loaders/cafeInfo';

const Cafe = ({ params, searchParams }: { params: Promise<{ name: string }>; searchParams?: Promise<Position> }) => {
  const { name: encodedName } = use(params);
  const name = decodeURIComponent(encodedName);
  const { lat, lng } = use(searchParams);
  const getCafes = getCafesApi({
    keyword: name,
    ...(lat && lng && { position: { lat, lng } }),
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
