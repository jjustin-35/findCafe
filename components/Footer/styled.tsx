import { styled, css } from '@mui/material/styles';
import Link from 'next/link';

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.palette.common.white};
  text-decoration: none;
  padding-left: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => css`
    ${theme.breakpoints.down('tablet')} {
      padding-left: 0;
    }
  `}

  &:hover {
    ${({ theme }) => css`
      color: ${theme.palette.grey[100]};
    `}
  }
`;

export const NavAnchor = styled('a')`
  color: ${({ theme }) => theme.palette.common.white};
  text-decoration: none;
  padding-left: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.palette.grey[100]};
  }

  ${({ theme }) => css`
    ${theme.breakpoints.down('tablet')} {
      padding-left: 0;
    }
  `}
`;
