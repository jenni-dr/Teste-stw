import { HeaderTitle } from './../Header/styled';

import styled, { css } from 'styled-components';

interface ContainerProps {
  hover: boolean;
}

interface ItemProps {
  active?: boolean;
}

export const Container = styled.nav<ContainerProps>`

  ${(props) => css`

    background: var(--neutral-color-high-pure);;
    border-radius: 1.5rem;
    border: 1px solid var(--neutral-color-high-dark);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    position: fixed;
   
    z-index: 1;
    left: 24px;
    top: calc(25vh + (86px / 2));
    max-height: 80vh;

  
    width: var(--spacing-xxl);
  
    
    transition: width 250ms ease;
       
    
     }
     /* Handle */
     ::-webkit-scrollbar-thumb {
       background: transparent;
       border-radius: 10px;
     }  
     /* Handle on hover */
     ::-webkit-scrollbar-thumb:hover {
       /* /*   background: transparent;  * */
     }



   
    @media (min-width: 1600px) {
      width: var(--spacing-xxl);
      height: 65vh;
      left: 54px;
      top: calc(18vh + (86px / 2));
       }
    
    ${props.hover &&
    css`
      width: 288px;
     @media (min-width: 1600px) {
      width: 288px;
      }
    `}
  `}
`;


export const Brand = styled.div``;

export const List = styled.ul`
  margin-top: 3.5rem;
  width: 100%;
  margin-right: 35px;
  
  li {
    list-style: none;
    a,
    
    div > div {
      span:nth-child(2) {
        opacity: 0;
        visibility: hidden;

        transition: visibility 0s, opacity 500ms linear;
        text-decoration: none;
      }
    }

    div {
      position: relative;

      &::after {
        /* height: 150vh; */
        font-family: "Material Icons";
        font-size: 1rem;

        content: "keyboard_arrow_down";

        position: absolute;
        top: 0.8125rem;
        right: 1.5rem;

        opacity: 0;
        visibility: hidden;

        transition: visibility 0s, opacity 500ms linear;

      }
    }
  }

  &.open {
    li {
  
      min-height: 48px;
     
     a,
      div > div {
        padding: 0 0 0 1.5rem;
        min-height: 48px;
        span:nth-child(2) {
          opacity: 1;
          visibility: visible;
        }
      }

      div {
        &::after {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
`;

export const Item = styled.li<ItemProps>`
  border-radius: 8px;
   ${(props) => css`
    min-height: 45px;
    width: 100%;
    + li {
      list-style: none;
      /* margin-top: 0.5rem; */
    
    }
    
    a,
    div > div {
      list-style: none;
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      text-decoration: none;
    

      min-height: 35px;
      width: 100%;
      /* padding: 10px 0; */

      outline: unset;

      span {
        color: var(--neutral-color-low-medium) !important;

        ${props.active &&
    css`
          color: var(--brand-color-primary-pure) !important;
        `}
      }

      span:nth-child(2) {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-regular);
        line-height: var(--line-height-default);
        margin-left: 1rem;
      }
    }

    a {
      transition: background-color 250ms ease;

      &:hover {

        background-color: rgba(0, 0, 0, 0.08) !important;
        span {
          color: var(--neutral-color-low-medium) !important;
        }
      }
    }

    div {
      &:hover {
        div {
          span {
            color: var(--neutral_color_low_dark) !important;
          }
        }

        ul {
          visibility: visible;
          opacity: 1;
          max-height: 300px;

          transition: visibility 0s, opacity 250ms ease, max-height 250ms linear;
        }
      }

      &:hover,
      :focus-within {
        div  {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.08);
          color:#666666;
         
        }
      }

    }

  `}
`;

export const SubGestao = styled.ul`
  visibility: hidden;
  opacity: 0;
  /* background-color: var( --neutral-color-high-dark); */

  max-height: 0;
  height: auto;
  width: 100%;
  /* margin-bottom: 25px; */

     
  overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    
  
    /* width */
     ::-webkit-scrollbar {
       width: 5px;
      
    }
    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px transparent;
      border-radius: 10px;
      margin-top: 80px;
      margin-bottom: 20px;
      background-color: transparent;
     
    
     }
     /* Handle */
     ::-webkit-scrollbar-thumb {
       background: transparent;
       border-radius: 10px;
     }  
     /* Handle on hover */
     ::-webkit-scrollbar-thumb:hover {
       /* /*   background: transparent;  * */
     }
  
 `;
export const SubList = styled.ul`
  visibility: hidden;
  opacity: 0;
  /* background-color: var( --neutral-color-high-dark); */

  max-height: 0;
  height: auto;
  width: 100%;
       
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    
  
    /* width */
     ::-webkit-scrollbar {
       width: 5px;
      
    }
    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px transparent;
      border-radius: 10px;
      margin-top: 80px;
      margin-bottom: 20px;
      background-color: transparent;
     
    
     }
     /* Handle */
     ::-webkit-scrollbar-thumb {
       background: transparent;
       border-radius: 10px;
     }  
     /* Handle on hover */
     ::-webkit-scrollbar-thumb:hover {
       /* /*   background: transparent;  * */
     }

       
  
 `;

export const SubItem = styled.li`
  
  ${props => css`
    height: 56px;
    width: 100%;
  
    a {
      
      cursor: pointer;
      font-family: 'Nunito", sans-serif';
      width: 100%;
      height: 100%;
      text-decoration:none;
      color: var(--neutral_color_low_dark) !important;
      margin-left: -25px;
      padding-left: 10px;
      position: relative;
      margin-top: 10px;

         
      &:hover {
        background-color: rgba(0, 0, 0, 0.08); !important;
       }
    }
  `}
`

