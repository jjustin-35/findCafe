'use client';

import { IconButton, TextField, Box, InputAdornment } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Search as SearchIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCafes } from '@/redux/cafes';
import { SearchCafesData, Status } from '@/constants/types';
import { Form } from './styled';
import AdvancedSearch from '../AdvancedSearch';
import { useState } from 'react';

const StartIconButton = ({ onReturn }: { onReturn?: () => void }) => {
  return (
    <InputAdornment position="start" sx={{ mr: 0 }}>
      <IconButton onClick={onReturn}>
        <ArrowBackIcon />
      </IconButton>
    </InputAdornment>
  );
};

const EndIconButton = () => (
  <InputAdornment position="end" sx={{ ml: 0 }}>
    <IconButton type="submit">
      <SearchIcon />
    </IconButton>
  </InputAdornment>
);

const SearchBar = ({ hasReturnBtn, moveBack }: { hasReturnBtn?: boolean; moveBack?: () => void }) => {
  const { register, handleSubmit, watch } = useForm();
  const [advancedSearch, setAdvancedSearch] = useState<SearchCafesData | null>(null);
  const { status, currentLocation } = useAppSelector((state) => state.cafes);
  const dispatch = useAppDispatch();

  const onReturn = () => {
    if (!currentLocation || !hasReturnBtn) return;
    if (moveBack) moveBack();
    dispatch(getCafes({ position: currentLocation }));
  };

  const onSubmit = async ({ keyword }: { keyword: string }) => {
    if (!keyword) return;

    dispatch(getCafes({ keyword, isSearching: true, ...advancedSearch }));
  };

  const handleFilterChange = ({ tags, area, minRating }: { tags: string[]; area: string; minRating: number }) => {
    const keyword = watch('keyword');
    setAdvancedSearch({
      keyword,
      areaKey: area,
      rank: minRating,
      tags,
    });
  };

  if (status === Status.IDLE) {
    return null;
  }

  return (
    <Box
      py={2}
      position="fixed"
      top={64}
      left={{ mobile: '50%', laptop: 0 }}
      bgcolor={{ mobile: 'transparent', laptop: 'secondary.light' }}
      zIndex={{ mobile: 999, laptop: 1300 }}
      sx={{
        width: {
          mobile: 'fit-content',
          laptop: 400,
        },
        transform: {
          mobile: 'translateX(-50%)',
          laptop: 'unset',
        },
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="center">
          <TextField
            size="small"
            type="text"
            variant="outlined"
            placeholder="找找咖啡廳..."
            {...register('keyword')}
            slotProps={{
              input: {
                ...(hasReturnBtn && { startAdornment: <StartIconButton onReturn={onReturn} /> }),
                endAdornment: (
                  <Box display="flex">
                    <EndIconButton />
                    <AdvancedSearch onFilterChange={handleFilterChange} />
                  </Box>
                ),
                sx: {
                  px: 1,
                  borderRadius: '24px',
                  bgcolor: {
                    mobile: 'white',
                    laptop: 'transparent',
                  },
                  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                },
              },
            }}
            sx={{
              width: {
                mobile: 250,
                laptop: 'unset',
              },
            }}
          />
        </Box>
      </Form>
    </Box>
  );
};

export default SearchBar;
