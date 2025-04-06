'use client';

import { styled } from '@mui/material/styles';

export const HomeBannerImage = styled('div')`
  background-image: url('/images/home-banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 500px;
  align-content: center;
  position: relative;
`;

export const Title = styled('h1')`
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin: 0 0 24px;
`;

export const SearchWrapper = styled('div')`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;
