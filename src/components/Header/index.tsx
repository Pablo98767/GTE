import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeRounded from '@mui/icons-material/HomeRounded';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import logo from '@/assets/images/bus_image.jpeg';

import { Avatar, Button, ClickAwayListener, IconButton, Popper } from '@mui/material';

import * as S from './styles';
import { theme } from '@/styles/theme';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import emptyImage from '../../assets/images/empty-profile.png';
import { useAuth } from '../../hooks/AuthProvider';
import { api } from '../../services/api';

import { Brand } from '../Brand';
import { Menu } from './Menu';
import MenuPopperItem from './MenuPopperItem';
import { Search } from '@/components/Search';
import { ReceiptLong } from '@mui/icons-material';

interface HeaderProps {
  // onInputChange: any;
  // isOpened: boolean;
  hasPermission: boolean;
  isMenuOpened: boolean;
  onClickMenu: () => void;
}

interface openOrderProps {
  dishId?: string;
  quantity?: number;
}

export function Header({
  // onInputChange,
  // isOpened,
  hasPermission,
  isMenuOpened,
  onClickMenu,
}: HeaderProps) {
  // const [search, setSearch] = useState('');
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const openOrder: openOrderProps[] = 
    JSON.parse(
      localStorage.getItem('@food-explorer-backend:openOrder')
    ? (localStorage.getItem('@food-explorer-backend:openOrder') as string)
        : '[]'
    )
  const orderQuantity = Array.isArray(openOrder)
      ? openOrder.length
        : 1;

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

  // const handleKey = async (event: any) => {
  //   if (event.code === 'Enter' || event.code === 'NumpadEnter') {
  //     const response = await api.get(`/notes?title=${search}`);
  //     // onInputChange(response.data);
  //   }
  // };

  const handleSignOut = () => {
    navigate('/');
    signOut();
  };

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : emptyImage;

  const orderList = orderQuantity;

  const company = {
    logoUrl: logo,
    width: 80,
    height: 80,
  };

  const searchProps = {
    placeholder: 'Busque por pratos ou ingredientes',
    style: {
      minWidth: '242px',
      maxWidth: 'calc(416px + 0.5vw)',
      height: '48px',
      padding: '36px 28px',
      marginBottom: '2rem',
    }
  };

  const menuProps = {
    isMenuOpened: isMenuOpened,
    onClickMenu: onClickMenu,
  }

  return (
    <S.Container>
      <S.Content>
        <Menu menuProps={menuProps}/>
          {
            isMenuOpened ? (
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
                  </IconButton>
                </ClickAwayListener>
              </S.Profile>
            ) : (
              <>
                {
                  hasPermission ? (
                    <div className='HeaderItems'>
                      <span className='EmptyElement'></span>
                      
                      <div className="Brand">
                        <Brand
                          style={{ fontSize: 21.163 }}
                          company={ company }
                        />
                      </div>

                      <div className="BrandPermission">
                        <Brand style={{ fontSize: 21.163 }} company={ company }/>
                        <span
                          style={
                            {
                              color: '#fff',
                              fontSize: '0.8rem'
                            }
                          }
                        >
                          admin
                        </span>
                      </div>

                      <div className="SearchBar">
                        <Search
                          searchProps={searchProps}
                        />
                      </div>

                      <Button
                        variant="text"
                        sx={
                            {
                              textTransform: "none",
                              color: theme.gte_platform.light[100],
                              width: 'calc(416px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => navigate(`/favorites`)}
                      >
                          Notificações
                      </Button>

                      <Button
                        variant="text"
                        sx={
                            {
                              textTransform: "none",
                              color: theme.gte_platform.light[100],
                              width: 'calc(316px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => navigate(`/new-dish`)}
                      >
                          Novo prato
                      </Button>
                      
                      <Button
                        variant="contained"
                        sx={
                            {
                              textTransform: "none",
                              backgroundColor: theme.gte_platform.tints.gold[100],
                              color: theme.gte_platform.light[100],
                              width: 'calc(316px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => alert('Funcionalidade em desenvolvimento')}
                      >
                      <div
                        style={
                          {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                          }
                        }
                      >
                        <ReceiptLong />
                        <span>Pedidos ({orderList})</span>
                      </div>
                      </Button>
                      
                      <LogoutIcon
                        className='LogoutIcon'
                        cursor='pointer'
                        onClick={handleSignOut}
                      />  

                      <div className="overlap">
                        <span
                          style={{ color: '#fff', fontSize: '0.8rem' }}
                        >
                          admin
                        </span>
                      </div>
                    </ div>
                  ) : (
                    <div className='HeaderItems'>
                      <Brand style={{ fontSize: 21.163 }} company={ company }/>

                      <div className="SearchBar">
                        <Search
                          searchProps={searchProps}
                        />
                      </div>

                      <Button
                        variant="text"
                        sx={
                            {
                              textTransform: "none",
                              color: theme.gte_platform.light[100],
                              width: 'calc(416px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => navigate(`/favorites`)}
                      >
                          Meus Favoritos
                      </Button>
                      
                      <Button
                        variant="text"
                        sx={
                            {
                              textTransform: "none",
                              color: theme.gte_platform.light[100],
                              width: 'calc(416px + 0.5vw)',
                              margin: '24px auto',
                              padding: '12px 36px',
                              fontSize: '1rem',
                            }
                          }
                          onClick={() => alert('Funcionalidade em desenvolvimento!')}
                      >
                          Histórico de Pedidos
                      </Button>
                      
                      <LogoutIcon
                        className='LogoutIcon'
                        cursor='pointer'
                        onClick={handleSignOut}
                      />  

                    </ div>
                  )
                }
              </>
            )
          }
        </S.Content>
    </S.Container>
  );
}
