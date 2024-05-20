import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material'
import { theme } from '../../styles/theme'
import { useNavigate } from 'react-router-dom'

interface DishCardProps {
  props: {
      hasPermission: boolean;
      dishId: string | undefined;
      dishName: string | undefined;
      dishPrice: string | undefined;
      dishImage: string | undefined;
      onClickFavorite: (dishId: string | undefined) => void;
      isFavorite: boolean | undefined;
  }
}

interface FigureProps {
  style?: React.CSSProperties;
}

const figureProps: FigureProps = {
  style: {
      margin: '0 auto',
      display: 'block',
      maxWidth: '200px',
      width: '88px',
      height: '88px',
  }
};

export function FavoriteCard({ props }: DishCardProps) {
  const navigate = useNavigate();

  return(
      <Card
          sx={
              {
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative',
                paddingTop: '24px',
                borderRadius: '8px',
                width: '55vw',
                maxWidth: '300px',
                backgroundColor: theme.foodExplorer.dark[200],

                margin: '24px auto 0',
                padding: '0 12px',

                gap: '10px',
              }
          }
      >
      <CardMedia
      component={'img'}
      image={props.dishImage}
      title={`Imagem do prato selecionado ${props.dishName}`}
      alt={`Prato selecionado ${props.dishName}`}
      {...figureProps}
      sx={
          {
              borderRadius: '50%',
          }
      }
      />
      <Box
            sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                    height: '100%',
                }
            }
      >
      <CardContent
            sx={
                {
                    width: '100%',

                    margin: '0',
                    padding: '0',
                }
            }
      >
      <Button
          variant="text"
          sx={
              {
                  textTransform: "none",
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '100%',
                  color: theme.foodExplorer.light[300],

                  fontSize: '24px',

                  margin: '0',
                  padding: '0',
              }
          }
          onClick={() => navigate(`/dish/${props.dishId}`)}
      >
          {props.dishName}
      </Button>
      </CardContent>
      <CardActions
          sx={
              {
                width: '100%',
                margin: '0',
                padding: '0',
              }
          }>
      <Button
          variant="text"
          sx={
              {
                  textTransform: "none",
                    display: 'flex',
                    justifyContent: 'flex-start',
                    
                  color: theme.foodExplorer.tints.tomato[100],
                  width: '100%',

                  fontSize: '12px',

                    margin: '0',
                    padding: '0',
              }
          }
          onClick={() => props.onClickFavorite(props.dishId)}
      >
          Remover dos favoritos
      </Button>
      </CardActions>

      </Box>
      </Card>
  )
}