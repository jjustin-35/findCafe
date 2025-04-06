'use client';

import Link from 'next/link';
import { Button, Stack, Typography } from '@mui/material';
import { Container } from '@/style/styles';
import { BannerContainer } from './styled';

interface CtaBannerProps {
  title: string;
  buttonText: string;
  href: string;
}

const CtaBanner = ({ title, buttonText, href }: CtaBannerProps) => {
  return (
    <Container>
      <BannerContainer>
        <Stack direction="column" alignItems="center" gap={2}>
          <Typography
            component="h2"
            color="white"
            fontWeight="bold"
            fontSize={{ mobile: '22px', tablet: '32px' }}
            textAlign="center"
          >
            {title}
          </Typography>
          <Link href={href}>
            <Button
              size="large"
              variant="contained"
              color="info"
              sx={{
                borderRadius: '8px',
                px: 3,
                py: 1,
                fontWeight: 'bold',
                fontSize: { mobile: '16px', tablet: '18px' },
              }}
            >
              {buttonText}
            </Button>
          </Link>
        </Stack>
      </BannerContainer>
    </Container>
  );
};

export default CtaBanner;
