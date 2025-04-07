import Image from 'next/image';
import { Search, Favorite, Menu, Feedback } from '@mui/icons-material';
import data, { IconType } from './data';

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

  switch (type) {
    case IconType.search:
      return <Search />;
    case IconType.favorite:
      return <Favorite />;
    case IconType.menu:
      return <Menu />;
    case IconType.feedback:
      return <Feedback />;
    default:
      return null;
  }
};

export default Icon;
