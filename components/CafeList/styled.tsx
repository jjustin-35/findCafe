import { grey } from '@mui/material/colors';
import { styled, SwipeableDrawer } from '@mui/material';

export const StyledDrawer = styled(SwipeableDrawer)`
  & .MuiDrawer-paper {
    overflow-y: visible;
    ${({ theme }) => theme.breakpoints.up('mobile')} {
      width: 100%;
      height: 50vh;
    }

    ${({ theme }) => theme.breakpoints.up('laptop')} {
      width: 400px;
      height: 100%;
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
  background-color: white;

  ${({ theme }) => theme.breakpoints.up('laptop')} {
    display: none;
  }
`;
