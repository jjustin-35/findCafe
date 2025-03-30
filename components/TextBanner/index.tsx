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
        <Icon type="coffee-brown" width={48} height={48} />
        <Typography variant="body1" color="primary.main">
          {description}
        </Typography>
      </Wrapper>
    </Background>
  );
};

export default TextBanner;
