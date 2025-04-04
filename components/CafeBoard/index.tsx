'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { CafeData } from '@/constants/types';
import { StyledDrawer, Puller, PullerIcon } from './styled';

const drawerBleeding = 56;

const CafeBoard = ({ cafes, title, children }: { cafes: CafeData[]; title?: string; children: React.ReactNode }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('laptop'));
  const { isSearching, isCafeDetail } = useAppSelector((state) => state.cafes);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!cafes?.length) {
      setIsOpen(false);
      return;
    }

    if ((!isOpen && isSearching) || (!isOpen && isCafeDetail)) setIsOpen(true);
  }, [cafes, isSearching, isCafeDetail]);

  return (
    // passive event listener issue: https://github.com/mui/material-ui/issues/37814
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
        {title && (
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            {title}
          </Typography>
        )}
      </Puller>
      <Box overflow="auto" p={3} marginTop={{ mobile: 0, laptop: '64px' }}>
        {children}
      </Box>
    </StyledDrawer>
  );
};

export default CafeBoard;
