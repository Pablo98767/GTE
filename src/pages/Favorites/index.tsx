import {
  Box,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import TourIcon from '@mui/icons-material/EmojiObjects';

import { useEffect, useState } from 'react';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { FavoriteCard } from '@/components/FavoriteCard';
import { Menu } from '../../components/Menu';

import { api } from '@/services/api';

import * as S from './styles';
import * as Utils from '../../utils/interfaces';

import { useAuth } from '../../hooks/AuthProvider';

import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';

import logo from '@/assets/images/bus_image.jpeg';
import { useMediaQuery } from 'react-responsive';

export function Favorites() {
  const { user } = useAuth();
  const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);
  const [isStartTour, setIsStartTour] = useState<boolean>(false);
  // const [categories, setCategories] = useState<Utils.categoryProps[]>(
  //   JSON.parse(
  //     localStorage.getItem('@gte-platform-backend:categories')
  //       ? (localStorage.getItem('@gte-platform-backend:categories') as string)
  //       : '[]'
  //   )
  // );
  const dishes = (
    JSON.parse(
      localStorage.getItem('@gte-platform-backend:dishes')
      ? (localStorage.getItem('@gte-platform-backend:dishes') as string)
        : '[]'
    )
  );
  // const [openOrder, setOpenOrder] = useState<Utils.openOrderProps[]>(
  //   JSON.parse(
  //     localStorage.getItem('@gte-platform-backend:openOrder')
  //   ? (localStorage.getItem('@gte-platform-backend:openOrder') as string)
  //       : '[]'
  //   )
  // );
  const [favorites, setFavorites] = useState<Utils.dishProps[]>([]);
  // const [isShowHints, setIsShowHints] = useState<boolean>(false);

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const state = {
    stepsEnabled: isStartTour,
    initialStep: 0,
    steps: [
      {
        title: 'Bem vindo!',
        intro:
          'Seja bem vindo ao<br><br>Sistema Digital de Gerenciamento de Restaurantes desenvolvido por Jonas Augusto Kunzler. 👋',
      },
      {
        intro:
        '<iframe width="260" height="315" src="https://www.youtube.com/embed/qhNjQDkY6Kg" title="OMG! Onde Está Minha Dama? GAMEPLAY DE XADREZ - GTI/FPM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
      },
      {
        element: 'header',
        intro: 'Diversas funcionalidades para você aumentar a produtividade.',
      },
      {
        title: 'Desembarque',
        intro:
          'Chegamos ao ponto final desta estapa.<br><br>Obrigado por me acompanhar até aqui!',
      },
    ],
    // hintsEnabled: isShowHints,
    hintsEnabled: false,
    hints: [
      {
        element: '#help_tour',
        hint: 'Dica valiosa',
      },
    ],
  };

  function onExit() {
    setIsStartTour(false);
  }

  function handleClickMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  function handleSideBarActions() {
    setIsSideBarOpened(!isSideBarOpened);
  }

  function handleClickFavorite(dishId: string | undefined) {
    const isFavorite = favorites && favorites.find((dish) => dish.id === dishId); console.log(isFavorite)
    if (isFavorite) {
      const removeFavorite = isFavorite
      const remainingFavorites = favorites.filter((dish) => dish.id !== dishId)

      if (removeFavorite) {
        const values = {
          userId: user.id,
          dishId: removeFavorite.id,
        }
        api.patch(`favorite/`, values).then(() => {
          setFavorites(remainingFavorites)
          localStorage.setItem('@gte-platform-backend:favorites', JSON.stringify(remainingFavorites))
        }).catch((error) => {
          console.error(error)
          alert("Não foi possível realizar operação")
        });
      }
    } else {
      const addFavorite = dishes.find((dish: Utils.dishProps) => dish.id === dishId)
      if (addFavorite) {
        const values = {
          userId: user.id,
          dishId: addFavorite.id,
        }
        api.patch(`favorite/`, values).then(() => {
          setFavorites([...favorites, addFavorite])
          localStorage.setItem('@gte-platform-backend:favorites', JSON.stringify([...favorites, addFavorite]))
        }).catch((error) => {
          console.error(error)
          alert("Não foi possível realizar operação")
        });
      }
    }
  }

  useEffect(() => {
    const userFavorites = JSON.parse(
      localStorage.getItem('@gte-platform-backend:favorites')
        ? (localStorage.getItem('@gte-platform-backend:favorites') as string)
        : '[]'
    );
    if (userFavorites) {
      setFavorites(
        userFavorites
      );
    } else {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setIsMenuOpened(false);
    }
  }, [isDesktop]);

  return (
      <S.Container 
        $opened={isSideBarOpened}
      >
        <Header
          // onInputChange
          hasPermission={hasPermission}
          isMenuOpened={isMenuOpened}
          onClickMenu={handleClickMenu}
        />
        <Sidebar
          onClickSideBarButton={handleSideBarActions}
          isOpened={isSideBarOpened}
          hasPermission={hasPermission}
        />
        <style>{`
          .customTooltip {
            color: #4a4a4a;
            font-size: 18px;
          }

          .customTooltip .introjs-tooltiptext {
            max-width: fit-content;
          }

          .customTooltip .introjs-tooltip-title {
            color: #0a41c9;
          }
        `}</style>
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
          }}
        >
          <Tooltip title="Iniciar Tour" placement="left">
            <IconButton
              onClick={() => {
                setIsStartTour(true);
                // setIsShowHints(true);
              }}
              color="primary"
            >
              <TourIcon
                id="help_tour"
                style={
                  {
                    display: 'none',
                    fontSize: '64px'
                  }
                }
              />
            </IconButton>
          </Tooltip>
        </div>

        <Steps
          enabled={state.stepsEnabled}
          steps={state.steps}
          initialStep={state.initialStep}
          onExit={() => onExit()}
          options={{
            showProgress: false,
            showBullets: true,
            exitOnOverlayClick: false,
            exitOnEsc: true,
            nextLabel: 'seguir',
            prevLabel: 'voltar',
            // skipLabel: 'Skip',
            hidePrev: true,
            doneLabel: 'pronto',
            overlayOpacity: 0.5,
            overlayColor: '#000',
            showStepNumbers: true,
            keyboardNavigation: true,
            scrollToElement: true,
            helperElementPadding: 10,
            showButtons: true,
            tooltipClass: 'customTooltip',
          }}
        />

        <Hints enabled={state.hintsEnabled} hints={state.hints} />

        <S.Content $opened={isMenuOpened}>
          <Box
            id="content-box"
            component="main"
            sx={{
              flexGrow: 1,
              py: 0,
            }}
          >
            {
              isMenuOpened ? (
                <Menu isOpened={isMenuOpened} />
              ) : (
                <Container
                  fixed
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',

                    width: '100%',
                  }}
                >
                <h2
                  style={{
                    color: '#fff',
                    marginBottom: '20px',
                  }}
                >Favoritos</h2>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      gap: '20px',
                    }}
                  >
                      {
                        favorites && favorites.length === 0 ? (
                          <h1 style={{ color: '#fff' }}>Nenhum favorito encontrado</h1>
                        ) : (
                          favorites.map((item: Utils.dishProps, index: number) => (
                              <FavoriteCard
                                key={index}
                                props={{
                                  hasPermission: false,
                                  dishId: item?.id,
                                  dishName: item?.name,
                                  dishPrice: item?.price,
                                  dishImage: item?.image ? `${api.defaults.baseURL}/files/${item.image}` : logo,
                                  onClickFavorite: handleClickFavorite,
                                  isFavorite: true,
                                }}
                              />
                            )
                          )
                        )
                      }
                    </div>
                </Container>
              )
            }

          </Box>
        </S.Content>
        <Footer />
      </S.Container>
  );
}
