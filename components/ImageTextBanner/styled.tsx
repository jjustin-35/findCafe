import NextImage from 'next/image';
import { styled } from '@mui/material';

export const Image = styled(NextImage)<{ width?: number }>`
  width: ${({ width }) => width ? `${width}px` : '50%'};
  height: 100%;
  object-fit: cover;
`;
