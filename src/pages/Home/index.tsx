import {
  Box,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import TourIcon from '@mui/icons-material/EmojiObjects';

import { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { AppSection } from '../../components/AppSection';
import { DishCard } from '../../components/DishCard';
import { Banner } from '../../components/Banner';
import { Menu } from '../../components/Menu';

import { api } from '@/services/api';

import * as S from './styles';
import * as Utils from '../../utils/interfaces';

import { useAuth } from '../../hooks/AuthProvider';

import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';

import logo from '../../assets/images/bus_image.jpeg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation, Keyboard, Autoplay } from 'swiper/modules';

export function Home() {
  const { user } = useAuth();
  const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);
  const [isStartTour, setIsStartTour] = useState<boolean>(false);
  const [categories, setCategories] = useState<Utils.categoryProps[]>(
    JSON.parse(
      localStorage.getItem('@food-explorer-backend:categories')
        ? (localStorage.getItem('@food-explorer-backend:categories') as string)
        : '[]'
    )
  );
  const dishes = (
    JSON.parse(
      localStorage.getItem('@food-explorer-backend:dishes')
      ? (localStorage.getItem('@food-explorer-backend:dishes') as string)
        : '[]'
    )
  );
  
  const [openOrder, setOpenOrder] = useState<Utils.openOrderProps[]>(
    JSON.parse(
      localStorage.getItem('@food-explorer-backend:openOrder')
    ? (localStorage.getItem('@food-explorer-backend:openOrder') as string)
        : '[]'
    )
  );
  const [favorites, setFavorites] = useState<Utils.dishProps[]>([]);
  // const [isShowHints, setIsShowHints] = useState<boolean>(false);

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

  const isDesktop = useMediaQuery({ minWidth: 768 });

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
          localStorage.setItem('@food-explorer-backend:favorites', JSON.stringify(remainingFavorites))
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
          localStorage.setItem('@food-explorer-backend:favorites', JSON.stringify([...favorites, addFavorite]))
        }).catch((error) => {
          console.error(error)
          alert("Não foi possível realizar operação")
        });
      }
    }
  }

  function handleClickIncludeOrder(dishId: string | undefined, quantity: number) {
    const isOpenOrderArray = Array.isArray(openOrder);

    if (isOpenOrderArray) {
      setOpenOrder([
        ...openOrder,
        {
          dishId,
          quantity
        }
      ]);

      JSON.stringify(
        localStorage.setItem('@food-explorer-backend:openOrder',
        JSON.stringify([
          ...openOrder,
          {
            dishId,
            quantity
          }
        ]))
        );
    } else {
      setOpenOrder([
        openOrder,
        {
          dishId,
          quantity
        }
      ]);

      JSON.stringify(
        localStorage.setItem('@food-explorer-backend:openOrder',
        JSON.stringify([
          openOrder,
          {
            dishId,
            quantity
          }
        ]))
      );
    }
  }

  useEffect(() => {
    const userFavorites = JSON.parse(
      localStorage.getItem('@food-explorer-backend:favorites')
        ? (localStorage.getItem('@food-explorer-backend:favorites') as string)
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
    api.get('category/')
   .then((response) => {
        setCategories(response.data);
        localStorage.setItem('@food-explorer-backend:categories', JSON.stringify(response.data));
      })
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
            bottom: '40px',
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
              <TourIcon id="help_tour" style={{ fontSize: '64px' }} />
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
                  }}
                >
                  <Banner />
                  <span style={{ height:'40px'}}></span>
                  {
                    !hasPermission &&
                      <AppSection title="Favoritos">
                        
    <div className='swiper-container'>
      <Swiper
        slidesPerView={isDesktop ? 3 : 2}
        spaceBetween={10}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Keyboard, Navigation]}
        className="mySwiper"
      >
          {
              favorites && favorites.length === 0 ? (
                <h1 style={{ color: '#fff' }}>Nenhum favorito encontrado</h1>
              ) : (
                favorites.map((item: Utils.dishProps, index: number) => (
                  <SwiperSlide
                    key={index}
                  >
                    <DishCard
                      key={index}
                      props={{
                        hasPermission: hasPermission,
                        dishId: item?.id,
                        dishName: item?.name,
                        dishPrice: item?.price,
                        dishImage: item?.image ? `${api.defaults.baseURL}/files/${item.image}` : logo,
                        onClickFavorite: handleClickFavorite,
                        onClickIncludeOrder: handleClickIncludeOrder,
                        isFavorite: true,
                      }}
                    />
                  </SwiperSlide>
                ))
              )
            }
      </Swiper>
    </ div>
                      </AppSection>
                    }
                    {
                      categories.map((category: Utils.categoryProps, index: number) => {
                        return (
                        <AppSection key={index} title={category.name} >
                        <div className='swiper-container'>
                          <Swiper
                            slidesPerView={isDesktop ? 3 : 2}
                            spaceBetween={10}
                            loop={true}
                            keyboard={{
                              enabled: true,
                            }}
                            pagination={{
                              clickable: true,
                            }}
                            navigation={true}
                            modules={[Keyboard, Navigation]}
                            className="mySwiper"
                          >
                      {
                        category.dishes.map((item, index: number) => {
                          if (!item.dish.isActive) return;
                          const isFavorite = favorites.find((dish) => dish.id === item.dishId) ? true : false;
                          return (
                            <SwiperSlide
                              key={index}
                            >
                              <DishCard
                                key={index}
                                props={{
                                  hasPermission: hasPermission,
                                  dishId: item?.dish.id,
                                  dishName: item?.dish.name,
                                  dishPrice: item?.dish.price,
                                  dishImage: item?.dish.image ? `${api.defaults.baseURL}/files/${item.dish.image}` : logo,
                                  onClickFavorite: handleClickFavorite,
                                  onClickIncludeOrder: handleClickIncludeOrder,
                                  isFavorite: isFavorite,
                                }}
                              />
                            </SwiperSlide>
                          )
                        })
                      }
                      </Swiper>
                    </div>
                        </AppSection>
                        )
                      })
                    }
                </Container>
              )
            }

          </Box>
        </S.Content>
        <Footer/>
      </S.Container>
  );
}
