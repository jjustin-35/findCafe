'use client';

import { TextField } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const SearchInput = ({ onSubmit }: { onSubmit: SubmitHandler<{ keyword: string }> }) => {
  const { register, handleSubmit } = useForm();

  const onSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <TextField
      size="small"
      type='text'
      sx={{
        position: 'absolute',
        top: '80px',
        left: {
          mobile: '50%',
          laptop: 'calc((100% + 400px) / 2)',
        },
        transform: 'translateX(-50%)',
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: '4px',
        boxShadow: 2,
      }}
      {...register('keyword')}
      placeholder="搜尋關鍵字"
      onKeyDown={onSearchSubmit}
    />
  );
};

export default SearchInput;
