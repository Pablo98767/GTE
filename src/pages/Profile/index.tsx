/* eslint-disable @typescript-eslint/ban-ts-comment */
//disable ts error verification for the entire file
//@ts-nocheck

import {
  Box,
  Button,
} from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import * as S from './styles';
import { theme } from '@/styles/theme';
import { useAuth } from '@/hooks/AuthProvider';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Input } from '@/components/Input';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button as CustomButton } from '@/components/Button';
import { Sidebar } from '@/components/Sidebar';
import { Menu } from '@/components/Menu';

import * as Utils from '@/utils/interfaces';

import emptyImage from '@/assets/images/empty-profile.png';

import { api } from '@/services/api';

export function Profile() {
  const { user, updateProfile, signOut } = useAuth();
  const hasPermission = user.permissionGroup?.role === 'IS_ADMIN';
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(true);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : emptyImage;
  const [avatar, setAvatar] = useState<string | undefined>(avatarUrl);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const validationSchema = yup.object({
    name: yup.string().min(6, 'O nome deve conter pelo menos 6 caracteres'),
    email: yup.string().email('Insira um email válido'),
    oldPassword: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres'),
    newPassword: yup
      .string()
      .min(6, 'A nova senha deve conter no mínimo 6 caracteres'),
    birthday: yup
      .date()
      .max(new Date(), 'A data de nascimento não pode ser no futuro')
      .test('is-adult', 'O usuário deve ser maior de idade', function (value) {
        if (!value) return true;
        const today = new Date();
        const minAdultDate = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
        return value <= minAdultDate;
      })
      .test(
        'is-valid-birthday',
        'Data de nascimento inválida',
        function (value) {
          if (!value) return true;
          const day = value.getDate();
          const month = value.getMonth() + 1;
          const year = value.getFullYear();
          const compulsoryRetirementAge = 75;
          const minBirthYear =
            new Date().getFullYear() - compulsoryRetirementAge;

          if (day > 31 || month > 12 || year < minBirthYear) {
            return false;
          }

          return true;
        }
      ),
    homePhone: yup
      .string()
      .matches(
        /\+\d{2} \d{2} \d{5}-\d{4}$/,
        'Formato inválido. Use +XX XX XXXXX-XXXX'
      ),
    workPhone: yup
      .string()
      .matches(
        /\+\d{2} \d{2} \d{5}-\d{4}$/,
        'Formato inválido. Use + XX XX XXXXX-XXXX'
      ),
    mobilePhone: yup
      .string()
      .matches(
        /\+\d{2} \d{2} \d{5}-\d{4}$/,
        'Formato inválido. Use + XX XX XXXXX-XXXX'
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      oldPassword: '',
      newPassword: '',
      birthday: '',
      homePhone: '',
      workPhone: '',
      mobilePhone: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: Utils.updateUserProps["userProfile"]) => {
      try {
        const user = localStorage.getItem('@gte-platform-backend:user');
        if (user) {
          const userInfo = JSON.parse(user);
          const newUserInfo: Utils.updateUserProps["userProfile"] = {};

          const keysValues: string[] = Object.keys(values)
          keysValues.forEach((value) => {
            if (
              values[value] !== undefined &&
              values[value] !== '' &&
              userInfo[value] !== values[value]
            ) {
              if (value == 'birthday') {
                values[value] = new Date(values[value] + 'T00:00:00.000Z');
              }
              newUserInfo[value] = values[value];
            }
          });

          updateProfile({
            userProfile: newUserInfo,
            avatarFile,
          });
        }
      } catch (error) {
        console.log(error);
      }

      alert('Perfil atualizado com sucesso!');

      navigate('/profile');
    },
  });

  function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);

      const imagePreview = URL.createObjectURL(file);
      setAvatar(imagePreview);
    }
  }

  function handleClickMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  function handleSideBarActions() {
    setIsSideBarOpened(!isSideBarOpened);
  }

  function handleDeleteUser() {
    const deleteConfirmation = confirm(
      'Tem certeza de que quer deletar o usuário?\n Esta ação não poderá ser desfeita.'
    );

    if (deleteConfirmation) {
      updateProfile({
        userProfile: {
          isActive: false,
          deletedBy: user.id,
        },
      });
    }

    alert('Usuário excluído com sucesso!');
    handleSignOut();
  }

  const handleSignOut = () => {
    navigate('/');
    signOut();
    window.location.reload();
  };

  function handleBack() {
    navigate(-1);
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
              <Menu isOpened={isSideBarOpened} />
            ) : (
              <Box>
                <Button
                    variant="outlined"
                    sx={
                        {
                            textTransform: "none",
                            color: theme.gte_platform.light[100],
                            width: 'fit-content',
                            margin: '0',
                            padding: '8px 16px 8px 8px',

                            borderColor: theme.gte_platform.light[100],
                        }
                    }
                    onClick={handleBack}
                >
                    <ArrowLeftIcon />
                    voltar
                </Button>

                <S.Avatar>
                  <img src={avatar} alt="Foto do usuário" />

                  <label htmlFor="avatar">
                    <CameraAltIcon />

                    <input type="file" id="avatar" onChange={handleChangeAvatar} />
                  </label>
                </S.Avatar>

                <S.Form onSubmit={formik.handleSubmit}>
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    fullWidth
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    type="text"
                    id="name"
                    placeholder="Nome"
                    icon={<PersonIcon />}
                  />

                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    fullWidth
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    type="text"
                    id="email"
                    placeholder="Email"
                    icon={<EmailIcon />}
                  />

                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.oldPassword}
                    fullWidth
                    error={
                      formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
                    }
                    helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                    type="password"
                    id="oldPassword"
                    placeholder="Senha atual"
                    icon={<LockIcon />}
                  />

                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                    fullWidth
                    error={
                      formik.touched.newPassword && Boolean(formik.errors.newPassword)
                    }
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    type="password"
                    id="newPassword"
                    placeholder="Senha nova"
                    icon={<LockIcon />}
                  />

                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.birthday}
                    fullWidth
                    error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                    helperText={formik.touched.birthday && formik.errors.birthday}
                    type="date"
                    id="birthday"
                    icon={<CalendarMonthIcon />}
                  />

                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.homePhone}
                    fullWidth
                    error={formik.touched.homePhone && Boolean(formik.errors.homePhone)}
                    helperText={formik.touched.homePhone && formik.errors.homePhone}
                    type="text"
                    id="homePhone"
                    placeholder="+55 62 99999-9999"
                    icon={<HomeIcon />}
                  />

                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.workPhone}
                    fullWidth
                    error={formik.touched.workPhone && Boolean(formik.errors.workPhone)}
                    helperText={formik.touched.workPhone && formik.errors.workPhone}
                    type="text"
                    id="workPhone"
                    placeholder="+55 62 99999-9999"
                    icon={<PhoneIcon />}
                  />

                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.mobilePhone}
                    fullWidth
                    error={
                      formik.touched.mobilePhone && Boolean(formik.errors.mobilePhone)
                    }
                    helperText={formik.touched.mobilePhone && formik.errors.mobilePhone}
                    type="text"
                    id="mobilePhone"
                    placeholder="+55 62 99999-9999"
                    icon={<PhoneAndroidIcon />}
                  />

                  <CustomButton fullWidth size="large" variant="contained" type="submit">
                    Salvar
                  </CustomButton>

                  <CustomButton
                    style={{ backgroundColor: '#640b0b', color: 'white' }}
                    fullWidth
                    size="large"
                    variant="contained"
                    type="button"
                    onClick={() => handleDeleteUser()}
                  >
                    Deletar conta
                  </CustomButton>
                </S.Form>
              </Box>
            )
          }
        </Box>
        </S.Content>
        <Footer />
    </S.Container>
  );
}
