import { Container as MuiContainer } from '@mui/material';
import styled from "styled-components";

export const Container = styled(MuiContainer).attrs({
    maxWidth: 'xl'
    })`
    margin: 0;
    padding: 0;

    width: 100%;
`;

export const Content = styled.div`
    display: flex;

    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;

    width: 100%;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  padding: 20px 10px 0 10px;
  gap: 5px;
  height: 100%;

  flex: 1;
`;

export const Footer = styled.div`
  padding-top: 20px;
  height: 200px;
  padding-left: -10px;
`;
