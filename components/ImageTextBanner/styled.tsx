import NextImage from 'next/image';
import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  display: flex;
  gap: 24px;
`;

export const Image = styled(NextImage)<{ width?: number }>`
  width: ${({ width }) => width ? `${width}px` : '50%'};
  height: 100%;
  object-fit: cover;
`;

export const Content = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0;
`;
