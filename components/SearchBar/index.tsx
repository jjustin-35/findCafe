'use client';

import Link from 'next/link';
import { IconButton, TextField, Box, InputAdornment } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Search as SearchIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setIsSearching, getCafes } from '@/redux/search';
import { Status } from '@/constants/types';
import { Form } from './styled';
import AdvancedSearch from '../AdvancedSearch';

const StartIconButton = () => (
  <InputAdornment position="start" sx={{ mr: 0 }}>
    <Link href="/cafe">
      <IconButton>
        <ArrowBackIcon />
      </IconButton>
    </Link>
  </InputAdornment>
);

const EndIconButton = () => (
  <InputAdornment position="end" sx={{ ml: 0 }}>
    <IconButton type="submit">
      <SearchIcon />
    </IconButton>
  </InputAdornment>
);

const SearchBar = ({ hasReturnBtn }: { hasReturnBtn?: boolean }) => {
  const { register, handleSubmit, watch } = useForm();
  const { status } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const onSubmit = ({ keyword }: { keyword: string }) => {
    dispatch(getCafes({ keyword }));
    dispatch(setIsSearching(true));
  };

  const handleFilterChange = ({ tags, location, minRating }: { tags: string[], location: string, minRating: number }) => {
    const keyword = watch('keyword');
    dispatch(getCafes({ 
      keyword,
      area: location,
      rank: minRating,
      tags
    }));
    dispatch(setIsSearching(true));
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
                ...(hasReturnBtn && { startAdornment: <StartIconButton /> }),
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
