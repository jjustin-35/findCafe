import { styled } from '@mui/material/styles';

export const Container = styled('div')`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    max-width: 960px;
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    max-width: 688px;
  }

  ${({ theme }) => theme.breakpoints.down('mobile')} {
    max-width: 100%;
  }
`;
