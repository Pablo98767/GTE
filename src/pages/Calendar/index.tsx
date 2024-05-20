import {
  Box,
  // Button,
  Card,
  // CardActions,
  // CardContent,
  // CardHeader,
  Container,
  // Divider,
  // Grid,
  // OutlinedInput,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import * as S from './styles';

import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { useAuth } from '@/hooks/AuthProvider';

import { Sidebar } from '../../components/Sidebar';
import { Menu } from '../../components/Menu';
import { Header } from '../../components/Header';
import { Footer } from '@/components/Footer';


export function Calendar() {
  const { user } = useAuth();
  const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);

  const isDesktop = useMediaQuery({ minWidth: 768 });
  // const navigate = useNavigate();

  function handleClickMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  function handleSideBarActions() {
    setIsSideBarOpened(!isSideBarOpened);
  }

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
    <S.Content $opened={isMenuOpened}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
        {
          isMenuOpened ? (
            <Menu isOpened={isMenuOpened} />
          ) : (
          <Container fixed>
            <h2>Calendário</h2>
            <S.CardsContainer container>
              <Card sx={{ p: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                    <DemoItem label="Calendário de eventos">
                      <DateCalendar defaultValue={dayjs('2022-04-17')} />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Card>
            </S.CardsContainer>
          </Container>
          )
        }

        </Box>
      </S.Content>
      <Footer />
    </S.Container>
  );
}
