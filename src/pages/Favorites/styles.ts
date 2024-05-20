import { Grid } from '@mui/material';
import styled from 'styled-components';

interface ContentProps {
  $opened?: boolean;
}

export const ContainerHeader = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 0.5rem;
`;

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
  padding: ${({ $opened }) => ($opened ? '0' : '16px 16px 0')};
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

  width: 100%;
`;

export const ChartsContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 24px;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  padding: 20px 10px 0 10px;
  gap: 5px;
  height: 100%;
`;

export const Footer = styled.div`
  padding-top: 20px;
  height: 200px;
  padding-left: -10px;
`;
