import * as S from './styles'
import SearchIcon from '@mui/icons-material/Search'

import { useState } from 'react'

import { theme } from '../../styles/theme'

import { Input } from '../Input'

type SearchProps = {
  searchProps: {
    placeholder: string;
    style?: React.CSSProperties;
  },
}

export function Search(props: SearchProps) {
  const [search, setSearch] = useState('')

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('Pesquisar', search)
    }
  }

  return (
    <S.Container>
      <S.Content
        style={{
          maxWidth: props.searchProps.style?.maxWidth,
        }
        }
      >
        <Input
          placeholder={props.searchProps.placeholder}
          variant="standard"
          icon={
            <SearchIcon
              sx={
                { 
                  ml: 1, 
                  color: theme.gte_platform.light[400]
                }
              }
            />
          }
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => handleKey(e)}
          style={props.searchProps.style}
        />
      </S.Content>
    </S.Container>
  )
}