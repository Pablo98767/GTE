import { Container as MuiContainer } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(MuiContainer).attrs({
  maxWidth: 'xl',
})`
  margin: 0;
  padding: 0;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled(MuiContainer).attrs({
  maxWidth: 'lg',
})`
  margin: 0;
  padding: 0;

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
