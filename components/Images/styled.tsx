import { styled } from '@mui/material/styles';

export const Image = styled('img')`
  object-fit: cover;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    width: 45%;
  }

  ${({ theme }) => theme.breakpoints.up('laptop')} {
    width: 100%;
  }
`;
