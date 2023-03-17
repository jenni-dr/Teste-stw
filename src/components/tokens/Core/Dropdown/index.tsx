import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { Link, Navigate } from 'react-router-dom'
import { Icon } from '../../Icons/Icon'

import { useNavigate } from "react-router-dom";
import { IDropdown } from './interface'

import { Wrapper, Container, List, Item, ItemWrapper, Label, Text } from './styles'
import { AuthStorage } from '../../../../services/authStorage';
import { useSetRecoilState } from 'recoil';
import { UserAtom } from '../../../../recoil/atoms';

interface Props {
  children: ReactNode
  display?: 'block'
  type: 'hover' | 'click'
  list: IDropdown[]
  $action?: boolean
  onOpen?: (open: boolean) => void
}

export function Dropdown({
  children,
  display,
  type,
  list,
  $action,
  onOpen
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const setUser = useSetRecoilState(UserAtom);
 

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  useEffect(() => {
    onOpen && onOpen(open)
  }, [onOpen, open])

  const handleOnClick = useCallback(() => {
    type === 'click' && setOpen(open => !open)
  }, [type])

  const handleOnMouseEnter = useCallback(() => {
    type === 'hover' && setOpen(true)
  }, [type])

  const handleOnMouseLeave = useCallback(() => {
    type === 'hover' && setOpen(false)
  }, [type])

  function Logout(){
    setUser(null);
    AuthStorage.clear();
    // navigate('/')
    navigate('/auth/login')
  }

  return (
    <Wrapper
      ref={wrapperRef}
      open={open}
      $action={$action}
      onClick={handleOnClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {children}

      <Container>
        <List display={display}>
          {list.map(item => (
            <Item
              key={item.text}
              danger={item.danger}
              onClick={item.onClick}
              className={item.route ? 'route' : 'no-route'}
            >
              {item.route ? (
                <Link to={item.route}>
                  {item.icon && <Icon icon={item.icon} />}

                  <Label>{item.text}</Label>
                </Link>
              ) : (
                <ItemWrapper>
                  {item.icon && <Icon icon={item.icon} />}

                  <Label>{item.text}</Label>
                </ItemWrapper>
              )}
               
            </Item>
                
          ))}
          <div style={{cursor:'pointer',}} onClick={() => navigate("/auth/login")} >
           <i className="material-icons ml-4" style={{color:'red'}}>exit_to_app</i>
           <Text className=" ml-2" style={{color:'red',}} onClick={()=>Logout()}>Sair</Text>
           </div>
          
        </List>
      
      </Container>
    </Wrapper>
  )
}

Dropdown.defaultProps = {
  display: undefined,
  $action: undefined,
  onOpen: undefined
}
