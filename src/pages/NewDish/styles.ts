import styled from 'styled-components';
import { Grid } from '@mui/material';
import { theme } from '../../styles/theme';

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

  #category-label, #status-label {
    display: none;

    &.Mui-focused {
      display: none;
    }
  }

  .selectStatus {
    width: 100%;
    background-color: ${theme.foodExplorer.dark[900]};
    color: ${theme.foodExplorer.light[100]};
    border-radius: 0.25rem;
    border: none;

    margin: 16px auto 32px;

    &:focus {
      display: none;
    }

    > fieldset {
      display: none;
    }
  }

  .selectCategory {
    width: 100%;
    background-color: ${theme.foodExplorer.dark[900]};
    color: ${theme.foodExplorer.light[100]};
    border-radius: 0.25rem;
    border: none;

    margin: 16px auto 32px;

    &:focus {
      display: none;
    }

    > fieldset {
      display: none;
    }
  }

  #full_description {
    width: 100%;
    min-height: 250px;
    margin: 16px auto 32px;
    padding: 16px 32px;
    border-radius: 0.25rem;
    border: none;
    background-color: ${theme.foodExplorer.dark[900]};
    color: ${theme.foodExplorer.light[100]};

    &:focus {
      outline: none;
    }
  }
`;

export const InputTagsContainer = styled.input`

  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  border: none;
  background-color: transparent;
  color: ${theme.foodExplorer.light[100]};

  font-size: 18px;
  
  &:focus {
    outline: none;
  }

`;