import * as S from './styles';
import { SxProps } from '@mui/material/styles';

type LogoProps = {
  company: {
    name?: string;
    logoUrl: string;
    width: number;
    height: number;
  },
  style?: React.CSSProperties;
  sx?: SxProps;
};

export function Logo(props: LogoProps) {
    return (
        <S.Container style={{ width: props.company.width}}>
            <img
              className="Logo"
              src={props.company.logoUrl}
              title={props.company.name}
              alt={'Logo da empresa' + props.company.name}
              style={
                {
                  borderRadius: '35%',
                  width: props.company.width,
                  height: props.company.height,
                }
              }
            />
        </S.Container>
    );
  }