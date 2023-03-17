import { useCallback } from 'react'

import { IconAppearence } from './interface'

import { Container } from './styles'

interface Props {
  appearance?: IconAppearence
  size?: 'sm' | 'md' | 'lg'
  mode?: 'success' | 'helper' | 'warning' | undefined
  icon: string
  className?: string
  disabled?: boolean
}

export function Icon({
  appearance,
  size,
  mode,
  icon,
  className,
  disabled
}: Props) {
  const handleClassName = useCallback((appearence: IconAppearence) => {
    switch (appearence) {
      case 'filled':
        return 'material-icons'

      case 'outlined':
        return 'material-icons-outlined'

      case 'round':
        return 'material-icons-round'

      case 'sharp':
        return 'material-icons-sharp'

      default:
        return 'material-icons'
    }
  }, [])

  return (
    <Container
      className={`${handleClassName(appearance)} ${className}`}
      size={size}
      mode={mode}
      disabled={disabled}
      
    >
      {icon}
    </Container>
  )
}

Icon.defaultProps = {
  appearance: undefined,
  size: undefined,
  mode: undefined,
  className: undefined,
  disabled: undefined
}
