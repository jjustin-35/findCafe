'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/config/configureStore';
import { getAreas } from '@/redux/search';
import HomeBanner from '@/components/HomeBanner';

export default function Home() {
  return <HomeBanner />;
}
