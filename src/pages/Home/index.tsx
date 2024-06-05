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

import { Navigation, Keyboard } from 'swiper/modules';

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

  const state = {
    stepsEnabled: isStartTour,
    initialStep: 0,
    steps: [
      {
        title: 'Bem vindo!',
        intro:
          'Seja bem vindo ao<br><br>Sistema Digital de Gestão de Transporte Escolar. 👋',
      },
      {
        element: 'header',
        intro: 'Diversas funcionalidades para você acompanhar as atividades do seu filho.',
      },
      {
        title: 'Desembarque',
        intro:
          'Chegamos ao ponto final desta etapa.<br><br>Obrigado por me acompanhar até aqui!',
      },
    ],
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
                                  onClickIncludeOrder: handleClickIncludeOrder,
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
