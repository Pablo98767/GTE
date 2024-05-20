import { Grid } from '@mui/material';
import styled from 'styled-components';

interface ContentProps {
  $opened?: boolean;
}

export const Container = styled(Grid)<ContentProps>`
  display: flex;
  flex-direction: column;
  
  width: 100%;
  height: 100vh;

  > h2 {
    padding: 1.5rem 0 0 2rem;
  }

  @media screen and (min-width: 768px) {
    margin-left: ${({ $opened = true }) => ($opened ? '280px' : '64px')};
    width: ${({ $opened = true }) => ($opened ? 'calc(100% - 280px)' : 'calc(100% - 64px)')};
  }

`;

export const Content = styled(Grid)<ContentProps>`
  padding: ${({ $opened }) => ($opened ? '0' : '16px 56px 0')};
  overflow: auto;
  
  flex: 1;
  
  width: 100%;

`;

export const CardsContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  gap: 1rem;
  flex-wrap: wrap;

  > form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    width: 100%;
  }

  > form div {
    flex: 1;

    width: 100%;
  }
`;
