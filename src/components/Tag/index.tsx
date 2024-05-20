import * as S from "./styles";

export function Tag({ title, ...rest }: { title: string }) {
    return(
        <S.Container {...rest}>
            {title}
        </S.Container>
    )
}