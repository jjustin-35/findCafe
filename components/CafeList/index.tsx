'use client';

import { useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CafeData } from '@/constants/types';
import List from './list';
import SearchBar from '../SearchBar';
import { StyledDrawer, Puller, PullerIcon } from './styled';

const drawerBleeding = 56;

const CafeList = ({ cafes }: { cafes: CafeData[] }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('laptop'));
  const [isOpen, setIsOpen] = useState(true);

  return (
    <StyledDrawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      anchor={isDesktop ? 'left' : 'bottom'}
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

      {isDesktop && (
        <Box py={2}>
          <SearchBar hasButton />
        </Box>
      )}
      <List cafes={cafes} />
    </StyledDrawer>
  );
};

export default CafeList;
