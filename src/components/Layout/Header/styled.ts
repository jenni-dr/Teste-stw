
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: var(--neutral-color-high-pure);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1.50rem 1.50rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;



 @media (max-width: 320px) {
  display:flex;
  }

`

export const Icones = styled.div`
  margin-right: 5px;
  margin-top: 5px;
 @media (max-width: 320px) {
  margin: 0px;

  i {
    font-size: 10px;
    margin-top: -10px;
  }
}
`


export const HeaderLogo = styled.div`
  display: flex;

  @media (max-width: 320px) {
    display:flex;
  img {
    width: 80px;
  }
}
`
export const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  @media (max-width: 320px) {
    margin: 0px;
    padding: 0px;
    margin-left: 10px;
}

`

export const HeaderTitle = styled.div`
  font-family: Archivo;
  font-style: Medium ;
  font-size:var(--font-size-sm) ;
  line-height: var(--line-height-lg) ;

@media (max-width: 320px) {
  font-size: 7px;
  display:flex;
}

`
export const HeaderTitle2 = styled.div`
  font-family: Archivo;
  font-style:  Regular ;
  font-size:var(--font-size-xxxs) ;
  line-height: var(--line-height-md) ;


  @media (max-width: 320px) {
    font-size: 5px;
    display:flex;

}

`

export const HeaderDrop = styled.div`
  @media (max-width: 320px) {
    display:flex;
    img {
     width: 80px;
  }
 }

`

