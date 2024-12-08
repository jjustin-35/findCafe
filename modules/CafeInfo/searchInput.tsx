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
      sx={{
        position: 'absolute',
        top: '40px',
        left: 'calc(50% + 400px)',
        borderRadius: '24px',
      }}
      {...register('keyword')}
      placeholder="搜尋關鍵字"
      onKeyDown={onSearchSubmit}
    />
  );
};

export default SearchInput;
