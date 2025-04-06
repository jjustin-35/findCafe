'use client';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const BannerContainer = styled(Box)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.primary.main} 0%,
    ${({ theme }) => theme.palette.secondary.main} 70%,
    ${({ theme }) => theme.palette.secondary.dark} 100%
  );
  padding: ${({ theme }) => theme.spacing(4, 3)};
  text-align: center;
  width: 100%;
  margin: 40px 0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  ${({ theme }) => theme.breakpoints.up('laptop')} {
    padding: ${({ theme }) => theme.spacing(6, 4)};
    margin: 60px 0;
  }
`;
