import * as S from "./styles";
import { Logo } from "../Logo";

import { SxProps } from '@mui/material/styles';

type BrandProps = {
  company: {
    name: string;
    logoUrl: string;
    width: number;
    height: number;
  },
  style?: React.CSSProperties;
  sx?: SxProps;
};

export function Brand(props: BrandProps) {
  return (
    <S.Container style={props.style}>
      <Logo
        company={ props.company }
      />
      <span>{props.company.name}</span>
    </ S.Container>
  );
}