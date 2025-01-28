import { grey } from '@mui/material/colors';
import { styled, SwipeableDrawer } from '@mui/material';

export const StyledDrawer = styled(SwipeableDrawer)`
  & .MuiDrawer-paper {
    background-color: ${({ theme }) => theme.palette.secondary.light};
    margin-top: 64px;
    overflow-y: visible;
    ${({ theme }) => theme.breakpoints.up('mobile')} {
      width: 100%;
      height: calc(100% - (64px + 56px));
    }

    ${({ theme }) => theme.breakpoints.up('laptop')} {
      width: 400px;
      height: calc(100% - 64px);
    }
  }
`;

export const PullerIcon = styled('div')`
  width: 30px;
  height: 6px;
  background-color: ${grey[300]};
  border-radius: 3px;
  margin: 8px auto 4px;
`;

export const Puller = styled('div')<{ drawerBleeding: number }>`
  position: absolute;
  top: ${({ drawerBleeding }) => `-${drawerBleeding}px`};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  visibility: visible;
  right: 0;
  left: 0;
  height: ${({ drawerBleeding }) => `${drawerBleeding}px`};
  background-color: ${({ theme }) => theme.palette.secondary.light};

  ${({ theme }) => theme.breakpoints.up('laptop')} {
    display: none;
  }
`;
