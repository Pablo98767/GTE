import { Container as MuiContainer } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(MuiContainer)`
  width: 100%;
  max-width: 100%;
  height: 114px;
  transition: margin 0.4s;
  background-color: ${({ theme }) => theme.gte_platform.dark[700]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  .HeaderItems {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 12px;

    > .EmptyElement {
      display: auto;
    }

    > .Brand {
      display: auto;
    }

    > .BrandPermission {
      display: none;
    }

    > .SearchBar {
      display: none;
    }

    > button {
      display: none;
    }

    > .LogoutIcon {
      display: none;
    }

    > .overlap {
      position: relative;

      padding-right: 10px;

      > span {
        position: absolute;
        top: -0.5rem;
        right: 10px;
        width: auto;

        font-size: 8px;

        padding: 2px;
        border-radius: 16px;

        border: 2px solid ${({ theme }) => theme.gte_platform.light[500]};

        background-color: ${({ theme }) => theme.gte_platform.tints.gold[100]};
      }
    }

    @media screen and (min-width: 768px) {

      padding: 0 calc(5vw);
      
      > .EmptyElement {
        display: none;
      }
  
      > .Brand {
        display: none;
      }
        
      > .BrandPermission {
        display: flex;
        position: relative;

        padding-right: 10px;

        > span {
          position: absolute;
          bottom: -0.5rem;
          right: 10px;
          width: auto;

          font-size: 8px;

          padding: 2px;
          border-radius: 16px;

          border: 2px solid ${({ theme }) => theme.gte_platform.light[500]};

          background-color: ${({ theme }) => theme.gte_platform.tints.gold[100]};
        }
      }

      > .SearchBar {
        display: inline-block;
        width: inherit;

        .MuiFormControl-root {
          margin: 0;
          padding: 0;

          top: -16px;

        }
      }

      > button {
        display: inline-block;
      }

      > .LogoutIcon {
        display: inline-block;
        margin-left: 24px;
      }

      > .overlap {
        display: none;
      }
    }
  }
`;

export const Search = styled.div`
  width: 100%;
  padding: 0 32px 0;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 0 32px 0;
  gap: 8px;

  > button {
    color: ${({ theme }) => theme.gte_platform.light[300]};
    font-size: large;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }
`;

export const PopperContent = styled.div`
  background-color: ${({ theme }) => theme.gte_platform.dark[1000]};
  padding: 1rem;
  margin: 1rem 2rem 0 0;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;
`;

export const HeaderPopperContent = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px ${({ theme }) => theme.gte_platform.dark[400]} solid;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  font-weight: bold;
`;

export const BodyPopperContent = styled.div`
  display: flex;
  flex-direction: column;

  min-height: fit-content;
  min-width: fit-content;
`;
