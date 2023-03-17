
import styled, { css } from 'styled-components'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?:'red'
  mode?: 'success' | 'helper' | 'warning'
  disabled?: boolean
}

export const Container = styled.span<Props>`
 

`
