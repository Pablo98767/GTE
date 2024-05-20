import { Container as MuiContainer } from '@mui/material';
import styled from "styled-components";

export const Container = styled(MuiContainer).attrs({
    maxWidth: 'xl'
    })`
    padding: 0;
    margin: 0;
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;
