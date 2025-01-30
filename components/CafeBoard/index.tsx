'use client';

import { useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { StyledDrawer, Puller, PullerIcon } from './styled';

const drawerBleeding = 56;

const CafeBoard = ({ title, children }: { title?: string; children: React.ReactNode }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('laptop'));
  const [isOpen, setIsOpen] = useState(true);

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
      <Box overflow="auto" p={3}>{children}</Box>
    </StyledDrawer>
  );
};

export default CafeBoard;
