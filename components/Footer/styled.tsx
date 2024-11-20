import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const FooterWrapper = styled('div')`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};
  padding-top: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.palette.common.white};
  text-decoration: none;
  padding-left: 0;
  &:hover {
    color: ${({ theme }) => theme.palette.grey[100]};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.up('tablet')}) {
    padding-left: ${({ theme }) => theme.spacing(2)};
  }
`;

export const NavAnchor = styled('a')`
  color: ${({ theme }) => theme.palette.common.white};
  text-decoration: none;
  padding-left: 0;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.palette.grey[100]};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.up('tablet')}) {
    padding-left: ${({ theme }) => theme.spacing(2)};
  }
`;

export const BrandContainer = styled('div')`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.h4.fontSize};
  @media (min-width: ${({ theme }) => theme.breakpoints.up('laptop')}) {
    margin-right: ${({ theme }) => theme.spacing(5)};
  }
`;
