import styled, { css } from 'styled-components'



interface WrapperProps {
  open: boolean
  $action?: boolean
}

interface ListProps {
  display?: 'block'
}

interface ItemProps {
  danger?: boolean
}

export const Wrapper = styled.div<WrapperProps>`

  ${props =>
    props.open &&
    css`
      /* position: relative;
      ${!props.$action && 'margin-right:100px;'} */

      ul {
        visibility: visible;
        opacity: 1;
        max-height: 1000px;
    
        
      }
    `}
`

export const Container = styled.div`
  position: absolute;
  z-index: 1;
  right: 16px;

  padding-top: 0.5rem;
  width: 250px; 
 
`

export const List = styled.ul<ListProps>`

  ${props => css`
  list-style: none;
    backdrop-filter: var(--neutral-color-high-pure);
    background-color: var(--neutral-color-high-pure);
    border-radius: var(--border-radius-lg);
    border: solid 1px var(--neutral-color-high-dark);
    box-shadow: var(--neutral-color-high-pure);

    visibility: hidden;
    opacity: 0;
    overflow: hidden;
    max-height: 0;
    width: 100%;
    padding: 10px;
    margin:0px;
	 
   
   
   

    ${props.display === 'block'
      ? css`
          min-width: 100%;
        `
      : css`
          min-width: 205px;
        `}

    transition: visibility 0s, opacity 250ms ease, max-height 250ms linear;
 `  }
 
`

export const Item = styled.p<ItemProps>`
list-style: none;
 ${props => css`
    cursor: pointer;

    span,
    div {
      ${props.danger
      ? css`
            color: var(--neutral-color-low-medium) !important;
          `
      : css`
            color:var(--neutral-color-low-medium) !important;
          `}
    }

    span {
      margin-right: 1rem;
    }

    a {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;

      width: 100%;
      text-decoration: none;
    }

    /* + li {
    
       border-top-color: var(--neutral-color-high-dark);
      border-top-style: solid;
      border-top-width: 2px; 
    } */
    
    
    &:hover  {
      background-color:rgba(0, 0, 0, 0.08)  ;
      border-radius:8px;
      width:100%;
    

     
    }
  `}
`


export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem 1.5rem;

  width: 100%;
`

export const Label = styled.div`

  
`

export const Text = styled.span`
position: absolute;
cursor: pointer;
font-size: 18px;

  
`

