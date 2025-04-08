'use client';

import Image from 'next/image';
import { Search, Favorite, Menu, Feedback, Home, GitHub } from '@mui/icons-material';
import data, { IconType } from './data';
import { Wrapper } from './styled';

interface IconProps {
  type: IconType;
  width?: number;
  height?: number;
}

const Icon = ({ type, width = 24, height = 24 }: IconProps) => {
  const icon = data[type as keyof typeof data];
  if (icon) {
    return <Image width={width} height={height} {...icon} />;
  }

  const content = (() => {
    switch (type) {
      case IconType.search:
        return <Search />;
      case IconType.favorite:
        return <Favorite />;
      case IconType.menu:
        return <Menu />;
      case IconType.feedback:
        return <Feedback />;
      case IconType.home:
        return <Home />;
      case IconType.github:
        return <GitHub />;
      default:
        return <></>;
    }
  })();

  return (
    <Wrapper width={width} height={height}>
      {content}
    </Wrapper>
  );
};

export default Icon;
