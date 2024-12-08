'use client';

import { useState } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { CafeData } from '@/constants/types';
import List from './list';
import { StyledDrawer, Puller, PullerIcon } from './styled';

const drawerBleeding = 56;

const CafeList = ({ cafes }: { cafes: CafeData[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('laptop'));
  const [isOpen, setIsOpen] = useState(true);

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor={isMobile ? 'bottom' : 'left'}
      open={isOpen}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Puller drawerBleeding={drawerBleeding}>
        <PullerIcon />
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          咖啡廳列表
        </Typography>
      </Puller>
      <List cafes={cafes} />
    </StyledDrawer>
  );
};

export default CafeList;
