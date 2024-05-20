import { Container as MuiContainer } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(MuiContainer).attrs({
  maxWidth: false,
})`
  margin: 0;
  padding: 0;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding-left: 40px;

  width: 100%;
  height: 77px;

  @media screen and (min-width: 768px) {
    gap: 20px;
  }
`;

export const CopyRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;

  > span {
    font-size: 14px;
    font-weight: 400;
  };

  @media screen and (min-width: 768px) {
    gap: 20px;
  }
`;