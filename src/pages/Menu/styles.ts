import { Container as MuiContainer } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(MuiContainer).attrs({
  maxWidth: 'xl',
})`
  margin: 0;
  padding: 0;

  width: fit-content;
`;

export const Content = styled(MuiContainer).attrs({
    maxWidth: 'xl',
})`
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    width: fit-content;

    > .MenuImage {
        width: 40px;
        height: 40px;
    }

    > span {
        font-size: 1.5rem;
        font-weight: 600;
    }
`;
