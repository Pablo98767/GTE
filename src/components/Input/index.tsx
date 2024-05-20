import { InputAdornment, StandardTextFieldProps } from '@mui/material';
import * as React from 'react';

import * as S from './styles';
import { theme } from '@/styles/theme';

interface CustomInputProps extends StandardTextFieldProps {
  icon?: React.ReactElement;
}

export function Input({ icon, ...rest }: CustomInputProps) {
  const isInvisible = rest.type === 'file' ? true : false;

  return (
    <S.Container>
      <S.StyledLabel
        $isInvisible={isInvisible}
      >
        {isInvisible && icon}
        {rest.label}
        {rest.required && !isInvisible && <span> *</span>}
        
      </S.StyledLabel>
      <S.StyledTextField
        $isInvisible={isInvisible}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={
                {
                  color: `${theme.foodExplorer.light[100]}`,
                  margin: '0 8px',
                }
              }
            >
              {icon}
            </InputAdornment>
          ),
        }}
        fullWidth
        {...rest}
      />
    </S.Container>
  );
}
