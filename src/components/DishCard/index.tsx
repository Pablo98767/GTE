import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { EditOutlined } from '@mui/icons-material'
import { theme } from '../../styles/theme'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface DishCardProps {
    props: {
        hasPermission: boolean;
        dishId: string | undefined;
        dishName: string | undefined;
        dishPrice: string | undefined;
        dishImage: string | undefined;
        onClickFavorite: (dishId: string | undefined) => void;
        onClickIncludeOrder: (dishId: string | undefined, quantity: number) => void;
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

export function DishCard({ props }: DishCardProps) {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState<number>(1);

    return(
        <Card
            sx={
                {
                    position: 'relative',
                    paddingTop: '24px',
                    borderRadius: '8px',
                    width: '55vw',
                    maxWidth: '250px',
                    backgroundColor: theme.foodExplorer.dark[200],
                }
            }
        >
            {
                props.hasPermission ? (
                    <Button 
                        variant="text"
                        sx={
                            {
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                color: theme.foodExplorer.light[100],
                            }
                        }
                        onClick={() => navigate(`/edit-dish/${props.dishId}`)}
                    >
                        <EditOutlined
                            sx={
                                {
                                    position: 'absolute',
                                    top: '0',
                                    right: '0',
                                    margin: '16px',
                                    fontSize: '2rem',
                                }
                            }
                        />
                    </Button>
                ) : (
                    <>
                    {
                        props.isFavorite ? (
                            <FavoriteIcon
                                sx={
                                    {
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        margin: '16px',
                                        color: theme.foodExplorer.tints.tomato[100],
                                        fontSize: '2rem',
                                    }
                                }
                                onClick={() => props.onClickFavorite(props.dishId)}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                sx={
                                    {
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        margin: '16px',
                                        color: theme.foodExplorer.light[100],
                                        fontSize: '2rem',
                                    }
                                }
                                onClick={() => props.onClickFavorite(props.dishId)}
                            />
                        )
                    }
                    </>
                )
            }
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
        <CardContent
            sx={
                {
                    padding: '12px 0'
                }
            }
        >
        <Button
            variant="text"
            sx={
                {
                    textTransform: "none",
                    paddingBottom: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    color: theme.foodExplorer.light[300],
                }
            }
            onClick={() => navigate(`/dish/${props.dishId}`)}
        >
            {props.dishName}
        </Button>
        <Typography
            variant="body1"
            component="div"
            color="text.secondary"
            sx={
            {
                display: 'flex',
                justifyContent: 'center',
                color: theme.foodExplorer.tints.cake[200],
            }
            }
        >
            R$ {props.dishPrice?.toString().replace(/\./g, ',')}
        </Typography>
        </CardContent>
        <CardActions
            sx={
                {
                    margin: '0 auto',
                    display: `${props.hasPermission ? 'none' : 'flex'}`,
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }
        >
            <Button
                sx={
                    {
                        color: theme.foodExplorer.light[300],
                        fontSize: '3rem',
                    }
                }
            >
                <RemoveIcon
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                />
            </Button>
            <Typography
                variant="body1"
                component="div"
                sx={
                    {
                        color: theme.foodExplorer.light[300],
                    }
                }
            >
                {quantity.toString().padStart(2, '0')}
            </Typography>
            <Button
                sx={
                    {
                        color: theme.foodExplorer.light[300],
                        fontSize: '3rem',
                    }
                }
            >
                <AddIcon
                    onClick={() => setQuantity(quantity + 1)}
                />
            </Button>
        </CardActions>
        <CardActions>
        <Button
            variant="contained"
            sx={
                {
                    display: `${props.hasPermission ? 'none' : 'flex'}`,
                    textTransform: "none",
                    backgroundColor: theme.foodExplorer.tints.tomato[100],
                    color: theme.foodExplorer.light[100],
                    width: '100%',
                    margin: '16px 24px 24px',
                }
            }
            onClick={() => props.onClickIncludeOrder(props.dishId, quantity)}
        >
            incluir
        </Button>
        </CardActions>
        </Card>
    )
}