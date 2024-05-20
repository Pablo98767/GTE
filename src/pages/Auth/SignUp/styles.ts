import styled from 'styled-components';
import login from '@/assets/images/bus_image.jpeg';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100vh;
  overflow-y: scroll;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 2rem;
  width: 100%;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 0;
  }
`;

export const BrandCard = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    background: url(${login}) no-repeat center;
    background-size: cover;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 50vw;
    height: 100%;

    > div {
      width: fit-content;
      margin-top: 0.6rem;
      margin-right: 0.5rem;
      padding: 12rem 5.3rem;
      background: ${({ theme }) => theme.foodExplorer.dark[400]};
      border-radius: 16px;
    }
  }
`;

export const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 12vw;
  gap: 1rem;

  width: 100%;
  height: auto;

  @media screen and (min-width: 768px) {
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    flex: 1;

  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  margin-top: 4.5rem;

  > h1 {
    display: none;
  }

  @media screen and (min-width: 768px) {
    background: ${({ theme }) => theme.foodExplorer.dark[700]};
    border-radius: 16px;
    margin-top: 0.5rem;
    padding: 2.4rem;

    width: 40vw;

  > h1 {
    display: block;
  }

  }

`;
