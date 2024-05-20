import {
  Box,
} from '@mui/material';
import * as S from './styles';

export function AppSection({ title, children }: any) {
  return (
    <S.Container>
      <h2>{title}</h2>
      <Box 
        component={'section'}
        sx=
          {
            {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              alignContent: 'flex-start',
              gap: '1rem',
            }
          }
      >
        {children}
      </Box>
    </S.Container>
  );
}