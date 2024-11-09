import Image from 'next/image';
import data, { IconType } from './data';

interface IconProps {
  type: IconType;
  width?: number;
  height?: number;
}

const Icon = ({ type, width = 24, height = 24 }: IconProps) => {
  const icon = data[type];
  return <Image width={width} height={height} {...icon} />;
};

export default Icon;
