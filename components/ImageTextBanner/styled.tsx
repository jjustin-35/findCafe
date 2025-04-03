import NextImage from 'next/image';
import { styled } from '@mui/material';

export const Image = styled(NextImage)`
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: cover;

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    max-width: 60%;
  }

  ${({ theme }) => theme.breakpoints.up('laptop')} {
    max-width: 50%;
  }
`;
