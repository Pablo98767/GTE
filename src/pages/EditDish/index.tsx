import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
} from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';

import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Input } from '@/components/Input';
import { Menu } from '@/components/Menu';

import { api } from '@/services/api';

import * as S from './styles';
import * as Utils from '@/utils/interfaces';

import { useAuth } from '../../hooks/AuthProvider';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { theme } from '@/styles/theme';
import { CloseSharp } from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive';

export function EditDish() {
  const dishes = (
    JSON.parse(
      localStorage.getItem('@food-explorer-backend:dishes')
      ? (localStorage.getItem('@food-explorer-backend:dishes') as string)
        : '[]'
    )
  );
  const categories = (
    JSON.parse(
      localStorage.getItem('@food-explorer-backend:categories')
        ? (localStorage.getItem('@food-explorer-backend:categories') as string)
        : '[]'
    )
  );  
  const { user } = useAuth();
  const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
  const navigate = useNavigate();
  const { id } = useParams();
  const currentDish = dishes.find((d: Utils.dishProps) => d.id === id);
  let category: string | undefined = ('')
  categories.forEach((c: Utils.categoryProps) => {
    c.dishes.forEach((d: Utils.dishCategoryProps) => {
      if (d.dishId === id) {
        category = c.id;
      }
    })
  });
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);
  const [dishImageFile, setDishImageFile] = useState<File | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(currentDish?.status || '');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(category);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const isDesktop = useMediaQuery({ minWidth: 768 });
  
  const validationSchema = yup.object({
    name: yup
      .string(),
    category: yup
      .string(),
    status: yup
      .string(),
    price: yup
      .string(),
    summary_description: yup
      .string(),
    full_description: yup
      .string(),
  });

  const formik = useFormik({
    initialValues: {
      name: currentDish?.name || (''),
      status: currentDish?.status || (''),
      category: category || (''),
      ingredient: (''),
      ingredients: [],
      price: dishes.find((d: Utils.dishProps) => d.id === id)?.price || (''),
      summary_description: currentDish?.summary_description || (''),
      full_description: currentDish?.full_description || (''),
    },
    validationSchema: validationSchema,
    onSubmit: async (values: Utils.editDishProps & {ingredient: string}) => {
      try {
        console.log(values, ingredients.join(';'));

        if (dishImageFile) {
          const fileUploadForm = new FormData();
          fileUploadForm.append('image', dishImageFile);

          const response = await api.patch(
            `/dish/dish_image/${id}`,
            fileUploadForm
          );
          console.log(response.data)
        }

        await api.put(`/dish/${id}`, {
          name: values.name,
          status: values.status,
          category: values.category,
          ingredients: ingredients.join(';'),
          price: values.price && values.price.replace(/\D/g, '.'),
          summary_description: values.summary_description,
          full_description: values.full_description,
        }).then((response) => {
          console.log(response.data);

          const remainingDishes = dishes.filter((d: Utils.dishProps) => d.id !== id);
          console.log(remainingDishes);
          localStorage.setItem(
            '@food-explorer-backend:dishes',
            JSON.stringify([...remainingDishes, response.data])
          );

        });

      } catch (error) {
        console.log(error);
      }
      navigate('/');
    },
  });

  function handleClickMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  function handleSideBarActions() {
    setIsSideBarOpened(!isSideBarOpened);
  }

  function handleChangeDishImage(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      setDishImageFile(file);
    }
  }

  function handleStatusSelection(newStatus: (EventTarget & { target: {value: string; name: string; }}) | SelectChangeEvent) {
    setSelectedStatus(newStatus?.target?.value);
  }

  function handleCategorySelection(newCategory: (EventTarget & { target: {value: string; name: string; }}) | SelectChangeEvent) {
    setSelectedCategory(newCategory?.target?.value);
  }

  function handleClickAddIngredient(newIngredient: string) {
    if (newIngredient === '') return;
    const currentIngredients = ingredients.filter((ingredient: string) => ingredient !== newIngredient.trim())
    setIngredients([...currentIngredients, newIngredient.trim()]);
    formik.values.ingredient = '';
  }

  function handleClickRemoveIngredient(value: string) {
    setIngredients(ingredients.filter((ingredient) => ingredient !== value));
  }

  function handleSubmit() {
    formik.handleSubmit();
  }

  function handleDeleteDish() {
    api
      .put(`dish/${id}`, { isActive: false })
      .then(() => {
        
        const remainingDishes = dishes.filter((d: Utils.dishProps) => d.id !== id);
        localStorage.setItem(
          '@food-explorer-backend:dishes',
          JSON.stringify(remainingDishes)
        );

        navigate('/')
      });
  }

  useEffect(() => {
    const currentDish: Utils.dishProps | undefined = dishes.find((dish: Utils.dishProps) => dish.id === id);
    if (currentDish) {
      const currentDishIngredients = currentDish.ingredients && currentDish.ingredients.split(';').map((item: string) => item.trim());
      // currentDishIngredients && currentDishIngredients.pop();
      setIngredients(
        currentDishIngredients && currentDishIngredients.length > 0 ? currentDishIngredients : []
        // currentDish && currentDish.ingredients ? (
        //   currentDish
        //     .ingredients
        //     .map((ingredient: string) => ingredient.ingredient.name)
        // ) : (
        //   []
        // )
      );
    }
  }, []);

  useEffect(() => {
    formik.values.status = selectedStatus;
  }, [selectedStatus]);

  useEffect(() => {
    formik.values.category = selectedCategory;
  }, [selectedCategory]);

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
              <Box>
                <Button
                    variant="outlined"
                    sx={
                        {
                            textTransform: "none",
                            color: theme.foodExplorer.light[100],
                            width: 'fit-content',
                            margin: '0',
                            padding: '8px 16px 8px 8px',

                            borderColor: theme.foodExplorer.light[100],
                        }
                    }
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon />
                    voltar
                </Button>

                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        color: theme.foodExplorer.light[100],
                        mt: '32px',
                        mb: '48px',
                    }}
                >
                  Editar Prato
                </Typography>

                <form className="form-dish-image">
                  <label htmlFor="dish_image">
                    <span>Imagem do prato</span>
                    <Input
                      onChange={handleChangeDishImage}
                      value={''}
                      type='file'
                      id="dish_image"
                      label="Selecione a imagem para alterá-la"
                      icon={<UploadFileIcon />}
                    />
                  </label>
                </form>
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    fullWidth
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name?.toString()}
                    id="name"
                    label="Nome"
                    placeholder='Ex.: Salada Ceasar'
                  />
                  <FormControl fullWidth>
                    <span>Status</span>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      className='selectStatus'
                      onChange={(event: (EventTarget & { target: { value: string; name: string; }}) | SelectChangeEvent) =>
                        handleStatusSelection(event)
                      }
                      value={selectedStatus || ''}
                      labelId="status-label"
                      id="status"
                      title="Status de disponibilidade de prato."
                      name="status"
                      label="Status"
                    >
                      <MenuItem value="Selecione um status">
                        <em>Selecione um status</em>
                      </MenuItem>
                      <MenuItem value="UNAVAILABLE">
                        Indisponível
                      </MenuItem>
                      <MenuItem value="AVAILABLE">
                        Disponível
                      </MenuItem>
                      
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <span>Categoria</span>
                    <InputLabel id="category-label">Categoria</InputLabel>
                    <Select
                      className='selectCategory'
                      onChange={(event: (EventTarget & { target: { value: string; name: string; }}) | SelectChangeEvent) =>
                        handleCategorySelection(event)
                      }
                      value={selectedCategory || ''}
                      labelId="category-label"
                      id="category"
                      title="Classificação dos tipos de prato."
                      name="category"
                      label="Categoria"
                    >
                      <MenuItem value="Selecione uma categoria">
                        <em>Selecione uma categoria</em>
                      </MenuItem>
                      {categories && categories.length > 0 &&
                        categories
                          // .sort((a: Utils.categoryProps, b: Utils.categoryProps) =>
                          //   a.name && a.name.localeCompare(b && b.name)
                          // )
                          .map((category: Utils.categoryProps, index: number) => (
                            <MenuItem key={index} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                  <Box>
                    <span>Ingredientes</span>
                    <Box
                      sx={
                        {
                          display: 'flex',
                          flexDirection: 'inline-flex',
                          flexWrap: 'wrap',
                          gap: '16px',

                          width: '100%',
                          margin: '16px auto 32px',
                          padding: '6px 8px',
                          borderRadius: '0.25rem',
                          backgroundColor: theme.foodExplorer.dark[900],
                          color: theme.foodExplorer.light[100],
                        }
                      }
                    >
                      {
                        ingredients && ingredients.map((ingredient: string, index: number) => (
                          <Box
                            key={index}
                            sx={
                              {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '8px',

                                width: 'fit-content',
                                height: '100%',

                                padding: '10px 16px',
                                borderRadius: '8px',
                                backgroundColor: theme.foodExplorer.light[600],
                                color: theme.foodExplorer.light[100],
                              }
                            }
                          >
                            <span
                              key={index}
                            >
                              {ingredient}
                            </span>
                              <CloseSharp
                                sx={
                                  {
                                    cursor: 'pointer',
                                    color: theme.foodExplorer.light[100],
                                    height: '100%',
                                    '&:hover': {
                                      color: theme.foodExplorer.tints.carrot[100],
                                    },
                                  }
                                }
                                onClick={() => handleClickRemoveIngredient(ingredient)}
                              />
                            </Box>
                        ))
                      }
                      <div
                        style={
                          {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '8px',

                            width: 'fit-content',
                            maxWidth: '175px',
                            minHeight: '45px',
                            margin: '0',
                            padding: '0 16px',

                            border: `1px dashed ${theme.foodExplorer.light[100]}`,
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            
                          }
                        }
                      >
                        <S.InputTagsContainer
                          onChange={formik.handleChange}
                          value={formik.values.ingredient}
                          type="text"
                          placeholder='Adicionar'
                          id="ingredient"
                        />
                        <AddIcon
                          sx={
                            {
                              cursor: 'pointer',
                              color: theme.foodExplorer.light[100],
                              height: '100%',
                              '&:hover': {
                                color: theme.foodExplorer.tints.mint[100],
                              },
                            }
                          }
                          onClick={() => handleClickAddIngredient(formik.values.ingredient)}
                        />
                      </div>
                    </Box>
                  </Box>
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    fullWidth
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    id="price"
                    label="Preço"
                    title='Preço do prato'
                    icon={<AttachMoneyIcon />}
                  />
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.summary_description}
                    fullWidth
                    error={formik.touched.summary_description && Boolean(formik.errors.summary_description)}
                    helperText={formik.touched.summary_description && formik.errors.summary_description}
                    id="summary_description"
                    label="Descrição resumida"
                    title='Fale brevemente sobre o prato, seus ingredientes e composição'
                    placeholder='Fale brevemente sobre o prato, seus ingredientes e composição'
                  />
                  <FormControl
                    sx={
                      {
                        width: '100%',
                      }
                    }
                  >
                    <span>Descrição completa</span>
                    <InputLabel id="full_description-label">Descrição completa</InputLabel>
                    <TextareaAutosize
                      onChange={formik.handleChange}
                      value={formik.values.full_description}
                      id="full_description"
                      title='Descreva o prato com riquesa de detalhes, seus ingredientes e composição. Fale sobre o modo de preparo e como ele é servido. Fale sobre sua história.'
                      placeholder='Descreva o prato com riquesa de detalhes, seus ingredientes e composição. Fale sobre o modo de preparo e como ele é servido. Fale sobre sua história.'
                      style={
                        {
                          fontFamily: 'sans-serif',
                        }
                      }
                    />
                  </FormControl>
                  <div
                    style={
                      {
                        display: 'flex',
                        gap: '32px',
                        width: '100%',
                        margin: '0 auto 64px',
                      }
                    }
                  >
                  <Button
                    onClick={handleDeleteDish}
                    fullWidth
                    size="large"
                    variant="contained"
                    type="button"
                    style={
                      { 
                        backgroundColor: theme.foodExplorer.dark[900], 
                        textTransform: 'none',
                      }
                    }
                  >
                    Excluir prato
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    size="large"
                    variant="contained"
                    type="button"
                    style={
                      { 
                        backgroundColor: theme.foodExplorer.tints.tomato[400], 
                        textTransform: 'none',
                      }
                    }
                  >
                    Salvar alterações
                  </Button>

                  </div>
                </form>
              </ Box>
            )
          }
        </Box>
      </S.Content>
      <Footer />
    </S.Container>
  );
}
