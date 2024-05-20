import * as S from './styles';

import bannerImage from '../../assets/images/bus_image.jpeg';
import { Figure } from '../Figure';

export function Banner() {
    return (
        <S.Container>
            <S.Content>
                <S.Rectangle />
                <Figure
                    src={bannerImage}
                    alt="Banner"
                    style={
                        {
                            paddingTop: '15px',
                            marginLeft: '-15px',
                            width: 'max(53%, 190px)',
                        }
                    }
                />
                <S.TextContainer>
                    <S.Title>
                        Sabores iniguláveis
                    </S.Title>
                    <S.Description>
                        Sinta o cuidado do preparo com ingredientes selecionados.
                    </S.Description>
                </S.TextContainer>
            </S.Content>
        </S.Container>
    );
}