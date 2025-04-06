import { Typography } from '@mui/material';
import { Container } from '@/style/styles';
import FavoriteList from '@/components/CafeList/favoriteList';

const Favorite = () => {
  return (
    <Container sx={{ py: { mobile: '28px', laptop: '60px' } }}>
      <Typography
        component="h1"
        fontWeight="bold"
        mb={3}
        sx={{ fontSize: { mobile: '36px', laptop: '48px' } }}
      >
        我的收藏
      </Typography>
      <FavoriteList />
    </Container>
  );
};

export default Favorite;
