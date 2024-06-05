import { Container as MuiContainer } from '@mui/material';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { TextField } from '@mui/material';

type InputProps = {
  style?: React.CSSProperties;
  $isInvisible?: boolean;
}

export const Container = styled(MuiContainer).attrs({
  maxWidth: false,
})`
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;

`;

export const StyledLabel = styled.span<InputProps>(({ style, $isInvisible }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: style && style.height,

    border: 'none',
    borderRadius: '0.25rem',
    color: theme.gte_platform.light[700],

    cursor: $isInvisible ? 'pointer' : 'default',
    margin: $isInvisible ? '16px auto 32px' : '0',
    padding: $isInvisible ? '16px' : '0',
    gap: $isInvisible ? '12px' : '0',
    backgroundColor: $isInvisible ? theme.gte_platform.dark[900] : 'transparent',
}));

export const StyledTextField = styled(TextField)<InputProps>(({ style, $isInvisible }) => ({
  'margin': '16px auto 32px',
  'legend': {
    display: 'none',
  },
  'label': {
    display: 'none',
  },
  '&:hover': {
    backgroundColor: theme.gte_platform.dark[100],
  },
  '& label': {
    color: theme.gte_platform.light[100],
    fontWeight: 'bold',
  },
  '& label.Mui-focused': {
    display: 'none',
  },
  '& .MuiInputBase-root ': {
    border: 'none',
    borderRadius: '0.25rem',
    color: theme.gte_platform.light[100],
    backgroundColor: theme.gte_platform.dark[900],
  },
  '& .MuiInputBase-input': {
    color: theme.gte_platform.light[100],
    height: style && style.height,
  },
  '& .MuiInputBase-root.Mui-focused ': {
    borderColor: theme.gte_platform.dark[100],
    boxShadow: `0 0 1.225em ${theme.gte_platform.light[700]}`,
    border: 'none',
    borderRadius: '0.25rem',
    transition:
      'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  '& .MuiInputBase-root.Mui-error ': {
    borderColor: 'rgb(240, 68, 56)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '0.25rem',
    transition:
      'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  '& label.Mui-error': {
    color: 'rgb(240, 68, 56)',
    fontWeight: 'bold',
  },

  'display': $isInvisible ? 'none' : 'flex',
}));
