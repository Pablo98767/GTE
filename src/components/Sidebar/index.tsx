import {
  Avatar,
  ClickAwayListener,
  IconButton,
  Popper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeRounded from '@mui/icons-material/HomeRounded';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';

import * as S from './styles';

import { useAuth } from '../../hooks/AuthProvider';

import { api } from '../../services/api';

import emptyImage from '../../assets/images/empty-profile.png';

import { Section } from './Section';
import { Item } from './Item';
import MenuPopperItem from '../Header/MenuPopperItem';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export type SidebarProps = {
  onClickSideBarButton: () => void;
  isOpened: boolean;
  hasPermission: boolean;
};

export type HandleProps = {
  navigateTo: string;
};

export function Sidebar({ onClickSideBarButton, isOpened, hasPermission }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  const [hideLogo, setHideLogo] = useState(isOpened);

  
  const { signOut, user } = useAuth();

  const [anchorFunctionalitiesEl, setAnchorFunctionalitiesEl] =
    useState<null | HTMLElement>(null);
  const [anchorMessagesEl, setAnchorMessagesEl] = useState<null | HTMLElement>(
    null
  );

  const handleFunctionalitiesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorFunctionalitiesEl(
      anchorFunctionalitiesEl ? null : event.currentTarget
    );
  };

  const handleMessagesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMessagesEl(anchorMessagesEl ? null : event.currentTarget);
  };

  const handleFunctionalitiesClickAway = () => {
    setAnchorFunctionalitiesEl(null);
  };

  const handleMessagesClickAway = () => {
    setAnchorMessagesEl(null);
  };

  const openFunctionalities = Boolean(anchorFunctionalitiesEl);
  const idFunctionalities = openFunctionalities ? 'simple-popper' : undefined;

  const openMessages = Boolean(anchorMessagesEl);
  const idMessages = openMessages ? 'simple-popper' : undefined;

  const handleSignOut = () => {
    navigate('/');
    signOut();
  };

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : emptyImage;

  useEffect(() => {
    setActiveItem(location.pathname);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHideLogo(!hideLogo);
    }, 200);
  }, [isOpened]);

  const handleClick = ({ navigateTo }: HandleProps) => {
    setActiveItem(navigateTo);

    if (navigateTo.startsWith('http')) {
      window.open(navigateTo, '_blank');
    } else if (navigateTo === '/signout') {
      handleSignOut();
    } else if (navigateTo === '/orders'){
      alert('Funcionalidade em desenvolvimento!');
    } else {
      navigate(navigateTo);
    }
  };

  const handleChangeSettings = () => {
    navigate('/settings');
  };

  const items = hasPermission
  ? [
      {
        title: 'Home',
        icon: <HomeRounded />,
        navigateTo: '/',
      },
      {
        title: 'Novo Prato',
        icon: <RestaurantIcon />,
        navigateTo: '/new-dish',
      },
      {
        title: 'Meus Favoritos',
        icon: <ThumbUpAltIcon />,
        navigateTo: '/favorites',
      },
      {
        title: 'Calendário',
        icon: <CalendarMonthIcon />,
        navigateTo: '/calendar',
      },
      {
        title: 'Blog',
        icon: <BookIcon />,
        navigateTo: 'https://github.com/jakunzler',
      },
      {
        title: 'Usuários',
        icon: <GroupIcon />,
        navigateTo: '/users',
      },
      {
        title: 'Sair',
        icon: <LogoutIcon />,
        navigateTo: '/signout',
      },
    ]
  : [
      {
        title: 'Home',
        icon: <HomeRounded />,
        navigateTo: '/',
      },
      {
        title: 'Meus Favoritos',
        icon: <ThumbUpAltIcon />,
        navigateTo: '/favorites',
      },
      {
        title: 'Meus Pedidos',
        icon: <ListAltIcon />,
        navigateTo: '/orders',
      },
      {
        title: 'Calendário',
        icon: <CalendarMonthIcon />,
        navigateTo: '/calendar',
      },
      {
        title: 'Blog',
        icon: <BookIcon />,
        navigateTo: 'https://github.com/jakunzler',
      },
      {
        title: 'Sair',
        icon: <LogoutIcon />,
        navigateTo: '/signout',
      },
    ];

  return (
    <S.Container className='SideBar'>
      <S.Nav $opened={isOpened}>
        <S.NavHeader $opened={isOpened}>
            {!hideLogo ? 
              (
                <div className='SideBarButton'>
                  <IconButton
                    aria-label="fechar"
                    onClick={onClickSideBarButton}
                  >
                    <CloseIcon />
                  </IconButton>
                  <S.Profile>
                    <ClickAwayListener onClickAway={handleMessagesClickAway}>
                      <IconButton
                        aria-label="messages"
                        aria-describedby={idMessages}
                        onClick={handleMessagesClick}
                        title="Mensagens"
                      >
                        <NotificationsActiveIcon />

                        <Popper
                          id={idMessages}
                          open={openMessages}
                          anchorEl={anchorMessagesEl}
                        >
                          <S.PopperContent>
                            <S.HeaderPopperContent>Mensagens</S.HeaderPopperContent>
                            <S.BodyPopperContent>
                              <MenuPopperItem
                                title="Nenhuma mensagem ..."
                                callback={() => {
                                  console.log('Nenhuma mensagem');
                                }}
                              />
                            </S.BodyPopperContent>
                          </S.PopperContent>
                        </Popper>
                      </IconButton>
                    </ClickAwayListener>

                    <ClickAwayListener onClickAway={handleFunctionalitiesClickAway}>
                      <IconButton
                        aria-label="functionalities"
                        aria-describedby={idFunctionalities}
                        onClick={handleFunctionalitiesClick}
                        title="Funcionalidades"
                      >
                        <Avatar
                          alt={`Foto do usuário ${user.name}`}
                          sx={{ width: 26, height: 26 }}
                          src={user.avatar ? avatarUrl : undefined} // TODO: colocar url do avatar no lugar de avatarUrl
                        >
                          {user.name?.slice(0, 1)}
                        </Avatar>

                        {hasPermission ? (
                          <Popper
                            id={idFunctionalities}
                            open={openFunctionalities}
                            anchorEl={anchorFunctionalitiesEl}
                          >
                            <S.PopperContent>
                              <S.HeaderPopperContent>{user.name}</S.HeaderPopperContent>
                              <S.BodyPopperContent>
                                <MenuPopperItem
                                  icon={<HomeRounded />}
                                  title="Home"
                                  callback={() => {
                                    navigate('/');
                                  }}
                                />
                                <MenuPopperItem
                                  icon={<AccountBoxIcon />}
                                  title="Perfil"
                                  callback={() => {
                                    navigate('/profile');
                                  }}
                                />
                                <MenuPopperItem
                                  icon={<LogoutIcon />}
                                  title="Sair"
                                  callback={handleSignOut}
                                />
                              </S.BodyPopperContent>
                            </S.PopperContent>
                          </Popper>
                        ) : (
                          <Popper
                            id={idFunctionalities}
                            open={openFunctionalities}
                            anchorEl={anchorFunctionalitiesEl}
                          >
                            <S.PopperContent>
                              <S.HeaderPopperContent>{user.name}</S.HeaderPopperContent>
                              <S.BodyPopperContent>
                                <MenuPopperItem
                                  icon={<HomeRounded />}
                                  title="Home"
                                  callback={() => {
                                    navigate('/');
                                  }}
                                />
                                <MenuPopperItem
                                  icon={<AccountBoxIcon />}
                                  title="Perfil"
                                  callback={() => {
                                    navigate('/profile');
                                  }}
                                />
                                <MenuPopperItem
                                  icon={<LogoutIcon />}
                                  title="Sair"
                                  callback={handleSignOut}
                                />
                              </S.BodyPopperContent>
                            </S.PopperContent>
                          </Popper>
                        )}
                      </IconButton>
                    </ClickAwayListener>
                  </S.Profile>
                </ div> 
              ) : (
                <div className='SideBarButton'>
                  <IconButton
                    aria-label="fechar"
                    onClick={onClickSideBarButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </ div>
              )
            }
        </S.NavHeader>
        <Section />
        <S.ItemsContainer>
          {items.map((item, index) => {
            return (
              <Item
                id={`bar_item_${index}`}
                key={index}
                onClick={() => handleClick(item)}
                content={item.title}
                icon={item.icon}
                isActive={item.navigateTo === activeItem}
                isOpenedSidebar={isOpened}
              />
            );
          })}
        </S.ItemsContainer>
        <Section />
        <S.Footer>
          <Item
            id={`bar_item_settings`}
            onClick={handleChangeSettings}
            content={'Configurações'}
            icon={<SettingsIcon />}
            isActive={'/settings' === activeItem}
            isOpenedSidebar={isOpened}
          />
        </S.Footer>
      </S.Nav>
    </S.Container>
  );
}
