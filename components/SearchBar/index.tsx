'use client';

import { useState } from 'react';
import { IconButton, TextField, Box, InputAdornment } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Search as SearchIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCafes, setIsCafeDetail } from '@/redux/cafes';
import { Status } from '@/constants/types';
import { Form } from './styled';
import AdvancedSearch from '../AdvancedSearch';
import { isEmpty } from '@/helpers/object';
import { TagType } from '@/constants/tags';

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
  const { register, handleSubmit, watch, setValue } = useForm();
  const { status, currentLocation, isSearching, isCafeDetail } = useAppSelector((state) => state.cafes);
  const dispatch = useAppDispatch();
  const [isClearFilter, setIsClearFilter] = useState(false);

  const onReturn = () => {
    if (!currentLocation || !hasReturnBtn) return;
    setIsClearFilter(true);
    if (moveBack) moveBack();
    if (isCafeDetail) {
      dispatch(setIsCafeDetail(false));
      return;
    }
    if (isSearching) dispatch(getCafes({ position: currentLocation, isSearching: false }));
    setValue('keyword', '');
  };

  const onClearFilter = () => {
    setIsClearFilter(false);
  };

  const onSubmit = async (data: { keyword: string; areaKey?: string; tags?: TagType[]; rating?: number }) => {
    if (isEmpty(data)) return;
    const { keyword, areaKey, tags, rating } = data;
    dispatch(getCafes({ keyword, isSearching: true, areaKey, tags, rating }));
  };

  const handleFilterChange = ({ tags, area, minRating }: { tags?: TagType[]; area?: string; minRating?: number }) => {
    const keyword = watch('keyword');
    onSubmit({ keyword, areaKey: area, tags, rating: minRating });
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
                    <AdvancedSearch
                      isClearFilter={isClearFilter}
                      onFilterChange={handleFilterChange}
                      onClearFilter={onClearFilter}
                    />
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
