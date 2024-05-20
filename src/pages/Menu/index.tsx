import {
  Box,
} from '@mui/material';
import * as S from './styles';
// import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Search } from '../../components/Search';

export function Menu() {

  const searchProps = {
    placeholder: 'Busque por pratos ou ingredientes',
  };

  return (
    <S.Container>
      {/* <Header hasPermission={false} /> */}
      <S.Content>
          <Box
            id="content-box"
            component="main"
            sx={{
              flexGrow: 1,
              py: 0,
            }}
          >
            <Search searchProps={searchProps} />
          </Box>
        </S.Content>
        <Footer />
      </S.Container>
  );
}
