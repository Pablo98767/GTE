import * as S from './styles';
import { SxProps } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu';

import { theme } from '../../../styles/theme'

type MenuProps = {
  menuProps: {
    isMenuOpened: boolean;
    onClickMenu: () => void;

  },
  style?: React.CSSProperties;
  sx?: SxProps;
};

export function Menu(props: MenuProps) {

  return (
    <S.Container>
      {
        props.menuProps.isMenuOpened ? (
          <S.Content>
            <CancelIcon
              className='MenuImage'
              onClick={props.menuProps.onClickMenu}
              cursor='pointer'
            />
            <span>Menu</span>
          </S.Content>
        ) : (
          <S.Content>
            <MenuIcon 
              className='MenuImage'
              onClick={props.menuProps.onClickMenu}
              cursor='pointer'
              style={{ border: `2px solid ${theme.gte_platform.light[700]}`}}
            />
          </S.Content>
        )
      }
    </S.Container>
  );
}
