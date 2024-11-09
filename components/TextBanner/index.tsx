import React from 'react';
import { Typography } from '@mui/material';
import Icon from '@/components/Icon';
import { Background, Wrapper } from './styled';
import data from './data';

const TextBanner = () => (
  <Background>
    <Wrapper>
      <Icon type="coffee" />
      <Typography variant="body2" color="text.secondary">
        {data.description}
      </Typography>
    </Wrapper>
  </Background>
);

export default TextBanner;
