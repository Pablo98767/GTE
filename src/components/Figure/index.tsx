import {
    Box
} from '@mui/material';
import * as S from './styles';

interface FigureProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    title?: string;
    style?: React.CSSProperties;
}

export function Figure(props: FigureProps) {
    return (
        <S.Container>
            <Box
                component="img"
                sx={{
                    ...props.style
                }}
                alt={props.alt}
                src={props.src}
                title={props.title}
            />
        </S.Container>
    );
}