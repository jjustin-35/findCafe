'use client';

import { Box } from '@mui/material';

const Map = ({ mapRef }: { mapRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <Box
      id="map"
      ref={mapRef}
      component="div"
      sx={{
        width: {
          mobile: '100%',
          laptop: 'calc(100% - 400px)',
        },
        height: 'calc(100vh - 64px)',
        ml: {
          mobile: 0,
          laptop: '400px',
        },
      }}
    />
  );
};

export default Map;
