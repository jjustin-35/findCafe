'use client';

import { styled } from '@mui/material/styles';

export const Container = styled('div')`
  width: 100%;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 16px;

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    max-width: 688px;
    padding: 0;
  }

  ${({ theme }) => theme.breakpoints.up('laptop')} {
    max-width: 960px;
  }

  ${({ theme }) => theme.breakpoints.up('desktop')} {
    max-width: 1080px;
  }
`;
