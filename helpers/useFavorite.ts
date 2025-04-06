import { useEffect, useState } from 'react';
import { CafeData, Status } from '@/constants/types';

const useFavorite = () => {
  const [loadingStatus, setLoadingStatus] = useState<Status>(Status.IDLE);
  const [favoriteCafes, setFavoriteCafes] = useState<CafeData[]>([]);

  useEffect(() => {
    if (!window) return;
    setLoadingStatus(Status.PENDING);
    const savedCafes = localStorage.getItem('favoriteCafes');
    if (savedCafes) {
      setFavoriteCafes(JSON.parse(savedCafes));
    }
    setLoadingStatus(Status.FULFILLED);
  }, []);

  const addFavorite = (cafe: CafeData) => {
    if (favoriteCafes.some((item) => item.id === cafe.id)) return;
    const newCafes = [...favoriteCafes, cafe];
    setFavoriteCafes(newCafes);
    localStorage.setItem('favoriteCafes', JSON.stringify(newCafes));
  };

  const removeFavorite = (cafe: CafeData) => {
    const newCafes = favoriteCafes.filter((item) => item.id !== cafe.id);
    setFavoriteCafes(newCafes);
    localStorage.setItem('favoriteCafes', JSON.stringify(newCafes));
  };

  return { favoriteCafes, addFavorite, removeFavorite, loadingStatus };
};

export default useFavorite;
