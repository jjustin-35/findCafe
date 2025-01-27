'use client';

import React from 'react';
import { TextField, Button } from '@mui/material';
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField size="small" type="text" {...register('keyword')} placeholder="搜尋關鍵字" />
      {hasButton && <Button variant='contained' color='primary' type='submit'>搜尋</Button>}
    </Form>
  );
};

export default SearchBar;
