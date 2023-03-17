import { useState } from 'react';
import { Icon } from '../../tokens/Icons/Icon';
import { Brand, Container, Item, List, SubGestao, SubItem, SubList } from './styled';
import { NavLink, useNavigate } from 'react-router-dom';


interface INavigation {
  icon: string;
  label: string;
  route?: string;
  text?: string;
  list?: {
    text: string;
    route: string;
  }[];
  gestao?: {
    icon: string;
    text: string;
    route: string;
  }[];
}

const nav: INavigation[] = [
  {
    icon: 'home',
    label: 'Home',
    route: '/',
  },
  {
    icon: 'account_balance',
    label: 'Universidades',
   
  },
  {
    icon: 'folder',
    label: 'Documentos',
  
    
  },
  {
    icon: ' receipt',
    label: 'Relatórios',
   
   
  },
  {
    icon: 'grid_view',
    label: 'Serviço',
  
   
  },
  {
    icon: 'groups',
    label: 'Pessoas',
    
    
  },
  {
    icon: 'description',
    label: 'Tarefas',
   
  },
 
  ];

export function SideMenu({ openNavMenu, closeNavMenu }: any) {

  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <Container
      hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Brand className={`${hover && 'open'}`} />
      <List className={`${hover && 'open'}`}>
        {nav.map((item, idx) => {
          if (item.route) {
            return (
              <Item
                key={idx}
                // onClick={() => navigate(item.route)}
                active={location.pathname == item.route}
                onClick={() => (item.route ? navigate(item.route) : null)}
              >
                <NavLink to={item.route}>
                  <Icon
                    appearance={
                      location.pathname === item.route ? undefined : 'filled'
                    }
                    icon={item.icon}
                  />

                  <span>{item.label}</span>
                </NavLink>
              </Item>
            )
          }

          return (
            <Item key={idx}>
              <div>
                <div>
                  <Icon
                    appearance={
                      location.pathname === item.route ? undefined : 'filled'
                    }
                    icon={item.icon}
                  />

                  <span>{item.label}</span>
                </div>
                <SubList className=''
                  key={idx}>
                  {item.list?.map((subitem, subidx) => (
                    <SubItem key={subidx}>
                      <NavLink to={subitem.route}>
                        <span>{subitem.text}</span>

                      </NavLink>
                    </SubItem >
                  ))}
                </SubList>

                <SubGestao className=''
                  key={idx}>
                  {item.gestao?.map((subitem, subidx) => (
                    <SubItem key={subidx}>
                      <NavLink to={subitem.route}>
                        <Icon
                          appearance={
                            location.pathname === item.route ? undefined : 'filled'
                          }
                          icon={subitem.icon}
                        />
                        <span>{subitem.text}</span>

                      </NavLink>
                    </SubItem >
                  ))}
                </SubGestao>
              </div>
            </Item>
          )

        })}
        <div></div>
      </List>
    </Container>
  );
}
