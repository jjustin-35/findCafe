import { styled } from '@mui/material/styles';

export const HomeBannerImage = styled('div')`
  background-image: url('/images/home-banner.jpg');
`;

export const Title = styled('h1')`
  font-size: 48px;
  font-weight: bold;
  color: white;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: start;
  }
`;

export const SearchWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;
