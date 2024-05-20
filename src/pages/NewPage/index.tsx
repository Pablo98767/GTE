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

import * as S from './styles';

import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { useAuth } from '@/hooks/AuthProvider';

import { Sidebar } from '../../components/Sidebar';
import { Menu } from '../../components/Menu';
import { Header } from '../../components/Header';
import { Footer } from '@/components/Footer';

export function NewPage() {
  const { user } = useAuth();
  const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);

  // const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 768 });

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
            <h2>Nova Página</h2>
            <S.CardsContainer container>
              <Card sx={{ p: 2 }}>
                
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
