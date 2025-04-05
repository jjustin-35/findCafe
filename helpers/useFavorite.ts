import { useEffect, useState } from 'react';
import { CafeData } from '@/constants/types';

const useFavorite = () => {
  const [favoriteCafes, setFavoriteCafes] = useState<CafeData[]>([]);

  useEffect(() => {
    if (!window) return;
    const savedCafes = localStorage.getItem('favoriteCafes');
    if (savedCafes) {
      setFavoriteCafes(JSON.parse(savedCafes));
    }
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

  return { favoriteCafes, addFavorite, removeFavorite };
};

export default useFavorite;
