import * as S from './styles'

import { Brand } from '../Brand'

import logo from '@/assets/images/bus_image.jpeg'

import { theme } from '../../styles/theme';

import CopyrightIcon from '@mui/icons-material/Copyright';

export function Footer() {
  const company = {
    name: 'gte_platform',
    logoUrl: logo,
    width: 45,
    height: 45,
  }
  return (
    <S.Container>
      <S.Content>
        <Brand style={{ width: '25vw', color: theme.gte_platform.light[700], fontSize: 15.262}} company={company}/>
        <S.CopyRight>
          <CopyrightIcon style={
            {
              fontSize: "20px",
            }
          }
          />
          <span>2024 - Todos os direitos reservados.</span>
        </S.CopyRight>
      </S.Content >
    </S.Container>
  )
}