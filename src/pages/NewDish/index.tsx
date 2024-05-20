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
import { useMediaQuery } from 'react-responsive';

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

export function NewDish() {
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
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);
  const [dishImageFile, setDishImageFile] = useState<File | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<Utils.restaurantsProps[]>([]);
console.log(selectedCategory, selectedStatus)

  const ingredient = ('');

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const validationSchema = yup.object({
    name: yup
      .string()
      .required('O nome do prato é obrigatório.'),
    status: yup
      .string(),
    category: yup
      .string()
      .required('A categoria do prato é obrigatória.'),
    price: yup
      .string()
      .required('O preço do prato é obrigatório.'),
    summary_description: yup
      .string(),
    full_description: yup
      .string(),
  });

  const formik = useFormik({
    initialValues: {
      name: dishes.find((d: Utils.dishProps) => d.id === id)?.name || (''),
      status: 'Selecione um status',
      category: 'Selecione uma categoria',
      ingredient: (''),
      ingredients: [],
      price: dishes.find((d: Utils.dishProps) => d.id === id)?.price || (''),
      summary_description: dishes.find((d: Utils.dishProps) => d.id === id)?.summary_description || (''),
      full_description: dishes.find((d: Utils.dishProps) => d.id === id)?.full_description || (''),
      restaurantId: (''),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values, ingredients.join(';'));

        await api.post(`/dish`, {
          name: values.name,
          status: values.status,
          category: values.category,
          ingredients: ingredients.join(';'),
          price: values.price,
          summary_description: values.summary_description,
          full_description: values.full_description,
          restaurantId: restaurants,
        }).
        then(async(response) => {
          if (dishImageFile && response.data) {
            const fileUploadForm = new FormData();
            fileUploadForm.append('image', dishImageFile);
  
            await api.patch(
              `/dish/dish_image/${response.data.id}`,
              fileUploadForm
            );
            
          localStorage.setItem(
            '@food-explorer-backend:dishes',
            JSON.stringify([...dishes, response.data])
          );

          navigate('/');

          }
  
        }).catch((error) => {
          console.log(error);
          if (error.response.data.message){
            alert(error.response.data.message);
          } else {
            alert("Não foi possível criar o prato.");
          }
        });

      } catch (error) {
        console.log(error);
      }
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

  function handleStatusSelection(selectedStatus: (EventTarget & { target: {value: string; name: string; }}) | SelectChangeEvent) {
    setSelectedStatus(selectedStatus?.target?.value);
    formik.values.status = selectedStatus?.target?.value;
  }

  function handleCategorySelection(selectedCategory: (EventTarget & { target: {value: string; name: string; }}) | SelectChangeEvent) {
    setSelectedCategory(selectedCategory?.target?.value);
    formik.values.category = selectedCategory?.target?.value;
  }

  function handleClickAddIngredient(newIngredient: string) {
    if (newIngredient === '') return;
    const currentIngredients = ingredients.filter((ingredient: string) => ingredient !== newIngredient)
    setIngredients([...currentIngredients, newIngredient]);
    formik.values.ingredient = '';
  }

  function handleClickRemoveIngredient(value: string) {
    setIngredients(ingredients.filter((ingredient) => ingredient !== value));
  }

  function handleSubmit() {
    formik.handleSubmit();
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
    const userRestaurant = 
    JSON.parse(
      localStorage.getItem('@food-explorer-backend:restaurants')
    ? (localStorage.getItem('@food-explorer-backend:restaurants') as string)
      : '[]'
    );

    setRestaurants(
      userRestaurant[0].id
    );

    formik.values.restaurantId = userRestaurant[0].id;
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
              <Menu isOpened={isSideBarOpened} />
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
                  Novo Prato
                </Typography>
                
                <form className="form-dish-image">
                  <label htmlFor="dish_image">
                    <span>Imagem do prato</span>
                    <Input
                      onChange={handleChangeDishImage}
                      value={''}
                      type='file'
                      id="dish_image"
                      label="Selecione imagem"
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
                    required
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
                      value={formik.values.status || ''}
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
                    <span>Categoria*</span>
                    <InputLabel id="category-label">Categoria</InputLabel>
                    <Select
                      className='selectCategory'
                      onChange={(event: (EventTarget & { target: { value: string; name: string; }}) | SelectChangeEvent) =>
                        handleCategorySelection(event)
                      }
                      value={formik.values.category || ''}
                      labelId="category-label"
                      required
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
                          //   a.name && a.name.localeCompare(b.name)
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
                          autoFocus
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
                      <span>{ingredient}</span>
                    </Box>
                  </Box>
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    fullWidth
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price?.toString()}
                    required
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
                    helperText={formik.touched.summary_description && formik.errors.summary_description?.toString()}
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
                    onClick={handleSubmit}
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
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
