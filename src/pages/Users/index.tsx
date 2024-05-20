import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  OutlinedInput,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR as corePtBR } from '@mui/material/locale';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const theme: any = createTheme(corePtBR);

import * as S from './styles';

import { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/AuthProvider';
import { api } from '@/services/api';

import { Sidebar } from '../../components/Sidebar';
import { Menu } from '../../components/Menu';
import { Header } from '../../components/Header';
import { Footer } from '@/components/Footer';

export function Users() {
  const { user } = useAuth();
  const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);
  const [users, setUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);

  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const getColumnWidth = (value: number | string) => {
    if (typeof value === 'number') return value;
    const maxLength = Math.max(value.length);
    return maxLength * 10;
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      width: getColumnWidth(150),
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: getColumnWidth(150),
    },
    {
      field: 'createdAt',
      headerName: 'Data de Criação',
      width: getColumnWidth(150),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: getColumnWidth(150),
    },
    {
      field: 'birthday',
      headerName: 'Data de Nascimento',
      width: getColumnWidth(150),
    },
  ];

  function handleRegisterUser() {
    navigate('/register-user');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await api.get(`/user`);
        setUsers(users.data);
      } catch (error) {
        setUsers([]);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setRows(
      filteredUsers.length > 0
        ? filteredUsers.map((user: any) => {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              createdAt: user.createdAt.slice(0, 10),
              isActive: user.isActive ? 'Ativo' : 'Inativo',
              birthday: user.birthday ? user.birthday : 'Não informado',
            };
          })
        : [
            {
              id: '',
              name: 'Não foi possível encontrar!',
            },
          ]
    );
  }, [filteredUsers]);

  function handleClickMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  function handleSideBarActions() {
    setIsSideBarOpened(!isSideBarOpened);
  }

  function handleSearchUser(searchInput: React.ChangeEvent<HTMLInputElement>): void {
    if (true) {
      const filteredUsers = users.filter((user: any) => {
        return user.name.toLowerCase().includes(searchInput.target.value.toLowerCase());
      });
      setFilteredUsers(filteredUsers);
    }
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
          <Container fixed>
            <h2>Usuários</h2>
            <S.CardsContainer container>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Box>
                    <Grid
                      item
                      xs={12}
                      justifyContent={'space-around'}
                      container
                    >
                      <Grid item xs={9}>
                        <CardHeader subheader="" title="Buscar" />
                        <OutlinedInput
                          defaultValue=""
                          fullWidth
                          placeholder="Procurar Usuário"
                          onChange={handleSearchUser}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CardHeader
                          subheader=""
                          title="Novo Usuário"
                          style={{ textAlign: 'end' }}
                        />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                          <Button
                            variant="contained"
                            startIcon={ <AddIcon />}
                            onClick={handleRegisterUser}
                          >
                            {isDesktop ? 'Usuário' : ''}
                          </Button>
                        </CardActions>
                      </Grid>
                      <Divider />
                      <CardContent sx={{ width: '100%' }}>
                        <ThemeProvider theme={theme}>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5, 10, 15, 25, 50]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </ThemeProvider>
                      </CardContent>
                    </Grid>
                  </Box>
                </CardContent>
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
