
import { HeaderContainer, HeaderDrop, HeaderLogo, HeaderTitle, HeaderTitle2, Icones, Text } from "./styled";
import LogoImage from '../../../assets/Logo.svg'
import { useNavigate } from "react-router-dom";
import { useBreadCrumbsItems } from "../../../hooks/useBreadCrumbsItems";

export function Header() {

  const TITLE = document.title.includes('-') ? document.title.split('-')[1] : document.title;
  const breadCrumbItems = useBreadCrumbsItems();
  const navigate = useNavigate();



  return (
    <HeaderContainer className="">
      <HeaderLogo>
        <Icones className="" style={{ cursor: 'pointer' }}>
          <i className="material-icons " onClick={() => navigate(-1)}>arrow_back_ios</i>
        </Icones>
        <img src={LogoImage} alt="Username" />
        <Text className="" >
          <HeaderTitle className="text-align-center ">
            {TITLE}
          </HeaderTitle>
          <HeaderTitle2 className="text-align-center ">
            {breadCrumbItems.map((item, index) =>
              <>
                <span>{index > 0 ? ' - ' : ''}</span>
                <span onClick={() => navigate(`${index > 0 ? '/' : ''}${item.route}`)}>{item.name}</span>
              </>
            )}
          </HeaderTitle2>
        </Text>
      </HeaderLogo>
      <HeaderDrop>
      </HeaderDrop>
    </HeaderContainer>
  )
}