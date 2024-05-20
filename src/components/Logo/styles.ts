import { Container as MuiContainer } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(MuiContainer).attrs({
  maxWidth: 'xl',
})`
  margin: 0;
  padding: 0;

  width: 100%;
  
  display: flex;
  justify-content: end;
  align-items: center;

  > img {
    width: 43.315px;
    height: 43.315px;
  }
`;
