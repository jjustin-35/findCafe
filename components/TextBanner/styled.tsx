import { styled } from '@mui/material';

export const Background = styled('section')`
  padding: 40px 0;
  background-color: ${({ theme }) => theme.palette.info.main};

  ${({ theme }) => theme.breakpoints.down('mobile')} {
    padding: 20px 16px;
  }
`;

export const Wrapper = styled('div')`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 558px;

  ${({ theme }) => theme.breakpoints.down('mobile')} {
    max-width: 100%;
  }
`;
