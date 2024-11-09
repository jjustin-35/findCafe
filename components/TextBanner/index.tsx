import React from 'react';
import { Typography } from '@mui/material';
import Icon from '@/components/Icon';
import { Background, Wrapper } from './styled';
import data from './data';

const TextBanner = ({ type }: { type: 'home' }) => {
  if (!data[type]) return null;
  const { description } = data[type];
  return (
    <Background>
      <Wrapper>
        <Icon type="coffee" />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Wrapper>
    </Background>
  );
};

export default TextBanner;
