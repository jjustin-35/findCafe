'use client';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const Wrapper = styled('div')`
  background-color: ${grey[50]};
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;
