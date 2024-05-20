import { Grid } from '@mui/material';
import styled from 'styled-components';

interface ContentProps {
  $opened?: boolean;
}

export const Container = styled.div<ContentProps>`
  padding: 0;
  overflow: auto;

  display: flex;
  flex-direction: column;
  width: 100%;

  
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

export const Header = styled.header`
  width: 100%;
  height: 144px;

  display: flex;
  align-items: center;

  padding: 0 30px;

  svg {
    color: ${({ theme }) => theme.palette.primary.dark};
    font-size: 48px;
  }
`;

export const Form = styled.form`
  max-width: 340px;
  margin: 30px auto 60px;

  > div {
    margin-top: 12px;
  }

  > div:nth-child(5) {
    margin-top: 36px;
  }

  > button {
    margin-top: 24px;
  }
`;

export const Avatar = styled.form`
  position: relative;
  max-width: 340px;
  margin: 0 auto;

  width: 186px;
  height: 186px;

  > img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  > label {
    width: 48px;
    height: 48px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 7px;
    right: 7px;

    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 60px;
      height: 60px;
      color: ${({ theme }) => theme.palette.primary.dark};
    }
  }
`;
