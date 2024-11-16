import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { Box } from '@mui/material';

export const FooterWrapper = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(3),
}));

export const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  paddingLeft: 0,
  '&:hover': {
    color: theme.palette.grey[100],
  },
  [theme.breakpoints.up('tablet')]: {
    paddingLeft: theme.spacing(2),
  },
}));

export const NavAnchor = styled('a')(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  paddingLeft: 0,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.grey[100],
  },
  [theme.breakpoints.up('tablet')]: {
    paddingLeft: theme.spacing(2),
  },
}));

export const BrandContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: theme.typography.h4.fontSize,
  [theme.breakpoints.up('laptop')]: {
    marginRight: theme.spacing(5),
  },
}));
