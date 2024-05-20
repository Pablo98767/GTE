import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import * as S from './styles';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { useAuth } from '@/hooks/AuthProvider';

import { Sidebar } from '../../components/Sidebar';
import { Menu } from '../../components/Menu';
import { Header } from '../../components/Header';
import { Footer } from '@/components/Footer';

export function Settings() {
  const { user } = useAuth();
  const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);

  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 768 });

  function handleChangeProfile() {
    navigate('/profile');
  }

  function handleRegisterUser() {
    navigate('/register-user');
  }

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
          <Container maxWidth="lg">
            <h2>Configurações</h2>
            <S.CardsContainer container>
              <form>
                <Grid container>
                  <Card>
                    <CardHeader
                      subheader="Gerenciar notificações"
                      title="Notificações"
                    />
                    <Divider />
                    <CardContent>
                      <Grid container wrap="wrap">
                        <Grid item xs={12} sm={6} md={4}>
                          <Stack spacing={1}>
                            <Typography variant="h6">Notificações</Typography>
                            <Stack>
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Email"
                              />
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Notificações Push "
                              />
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Mensagens de texto"
                              />
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Chamadas telefônicas"
                              />
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                          <Stack spacing={1}>
                            <Typography variant="h6">Mensagens</Typography>
                            <Stack>
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Email"
                              />
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Notificações Push"
                              />
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Chamadas telefônicas"
                              />
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button variant="contained">Salvar</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </form>

              {user && user.permissionGroup?.role === 'IS_CLIENT' ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        subheader="Atualizar perfil"
                        title="Usuário"
                      />
                      <Divider />
                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          onClick={handleChangeProfile}
                        >
                          Ir para perfil
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card>
                      <CardHeader
                        subheader="Atualizar perfil"
                        title="Usuário"
                      />
                      <Divider />
                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          onClick={handleChangeProfile}
                        >
                          Ir para perfil
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardHeader
                        subheader="Cadastrar Usuário"
                        title="Novo Usuário"
                      />
                      <Divider />
                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={handleRegisterUser}
                        >
                          Usuário
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              )}
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
