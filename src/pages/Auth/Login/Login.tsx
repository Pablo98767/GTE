import * as S from './styles';
import { useAuth } from '../../../hooks/AuthProvider';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '@mui/material';
import { Brand } from '../../../components/Brand';
import { Input } from '../../../components/Input';
import * as Utils from '../../../utils/interfaces';
import { theme } from '../../../styles/theme';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/images/bus_image.jpeg';




export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const company = {
    name: 'GTE',
    logoUrl: logo,
    width: 50,
    height: 50,
  };



  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Insira um email válido')
      .required('É necessário inserir o seu email'),
    password: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .required('É necessário inserir a sua senha'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: Utils.userProps) => {
      try {
        signIn(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <S.Container>
      <S.Content>
        <S.BrandCard>
          <Brand
               

            style={{
              fontSize: 37.243,
              marginTop: -500,
              marginLeft: -100,
            }}
            company={company}
           

             />
        </S.BrandCard>
        <h1 style={{marginLeft:-450}}> O melhor App para gestão de transporte escolar.</h1>
        <S.FormCard>
          <S.Form
            onSubmit={formik.handleSubmit}
          >
            <h1
              style={{
                color: theme.foodExplorer.light[100],
                fontSize: 32,
                fontWeight: 500,
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Seja bem vindo!
            </h1>
            <Input
              onChange={formik.handleChange}
              value={formik.values.email}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email?.toString()}
              autoFocus
              required
              id="email"
              label="Email"
              placeholder='Exemplo: exemplo@exemplo.com.br' />
            <Input
              onChange={formik.handleChange}
              value={formik.values.password}
              fullWidth
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
              id="password"
              label="Senha"
              type="password"
              placeholder='No mínimo 6 caracteres' />
            <Button
              fullWidth
              size="large"
              variant="contained"
              type="submit"
              style={{
                backgroundColor: theme.foodExplorer.tints.tomato[300],
                textTransform: 'none',
              }}
            >
              Entrar
            </Button>
            <Button
              fullWidth
              size="small"
              variant="text"
              onClick={() => navigate('/signup')}
              style={{
                color: theme.foodExplorer.light[100],
                textTransform: 'none',
              }}
            >
              Criar uma conta
            </Button>
          </S.Form>
        </S.FormCard>
      </S.Content>
    </S.Container>
  );
}
