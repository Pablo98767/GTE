import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-color:#FFFFF;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 50vw;
    height: 100%;
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
  background-color:#FFFFF;

  @media screen and (min-width: 768px) {
    background: none;
    background-size: cover;

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
    margin-top: 0.5rem;
    padding: 2.4rem;
    background: ${({ theme }) => theme.foodExplorer.dark[700]};
    border-radius: 8px;

    width: 40vw;

    > h1 {
      display: block;
    }
  }
`;
