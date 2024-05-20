import styled from 'styled-components';

interface NavProps {
  $opened?: boolean;
}

interface MainProps {
  $opened?: boolean;
}

export const Container = styled.div`
  display: flex;
`;

export const Nav = styled.nav<NavProps>`
  height: 100%;
  width: ${({ $opened = true }) => ($opened ? '280px' : '64px')};
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  background-color: rgb(28, 37, 54);
  color: #fff;
  grid-area: sidebar;
  transition: width 0.4s;

`;

export const NavHeader = styled.div<NavProps>`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;

  .SideBarButton {
    width: 100%;
    display: flex;
    justify-content: ${({ $opened = true}) => ($opened ? 'space-between' : 'center')};
    align-items: center;

    > button {
      > svg {
        margin-top: 6px;
        color: #fff;
      }
    }

    > img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 78%;
      transition: display 0.4s;

      object-fit: -web-kit-responsive;
    }
  
  }
`;

export const Main = styled.main<MainProps>`
  display: flex;
  margin-top: 64px;
  flex-direction: column;
  margin-left: ${({ $opened }) => ($opened ? '280px' : '64px')};
  transition: margin 0.4s;
  margin-bottom: 1rem;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 0 32px 0;
  gap: 8px;

  > button {
    color: ${({ theme }) => theme.foodExplorer.light[300]};
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
  background-color: ${({ theme }) => theme.palette.grey[800]};
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
  border-bottom: 1px ${({ theme }) => theme.palette.grey[900]} solid;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  font-weight: bold;
`;

export const BodyPopperContent = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 250px;
  min-width: 200px;
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
  height: 90px;
  padding-left: -10px;
`;
