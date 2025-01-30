'use client';

import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { setIsSearching } from '@/redux/search';
import { getCafes } from '@/redux/search';
import { Form } from './styled';

const SearchBar = ({ hasButton }: { hasButton?: boolean }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = ({ keyword }: { keyword: string }) => {
    dispatch(getCafes({ keyword }));
    dispatch(setIsSearching(true));
  };

  return (
    <Box
      py={2}
      position="fixed"
      top={64}
      left={{ mobile: '50%', laptop: 0 }}
      bgcolor={{ mobile: 'transparent', laptop: 'secondary.light' }}
      zIndex={{ mobile: 999, laptop: 9999 }}
      sx={{
        width: {
          mobile: 'fit-content',
          laptop: 400,
        },
        translate: {
          mobile: '-50%',
          laptop: 'unset',
        }
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          size="small"
          type="text"
          {...register('keyword')}
          placeholder="搜尋關鍵字"
          sx={{
            bgcolor: {
              mobile: 'white',
              laptop: 'transparent',
            },
          }}
        />
        {hasButton && (
          <Button variant="contained" color="primary" type="submit">
            搜尋
          </Button>
        )}
      </Form>
    </Box>
  );
};

export default SearchBar;
