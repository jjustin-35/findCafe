import { styled } from '@mui/material/styles';

export const Wrapper = styled('span')<{ width?: number; height?: number }>`
  svg {
    display: block;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
  }
`;
