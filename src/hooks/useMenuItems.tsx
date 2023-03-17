import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { UserAtom } from "../recoil/atoms"

export type MenuItem = {
    icon?: string;
    label: string;
    route?: string;
    hide?: boolean;
    active?: boolean;
    onClick?: () => void;
    options?: MenuItem[];
  };
  

export const useMenuItems = () => {
  

  const { pathname } = useLocation();
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
   
    let MENUADMIN: MenuItem[] = [
      {
        label: 'Estabelecimentos Comerciais', icon: 'storefront', route: '/admin/commercial-establishment'
      },
      {
        label: 'Integradores', route: '/admin/integrators', icon: 'share'
      },
      {
        label: 'Tabela de Bonificação', icon: 'table_rows', route: '/admin/bonus'
      },
      {
        label: 'Aprovações Pendentes', icon: 'check', route: '/admin/approvals'
      },
      {
        label: 'Logout', icon: 'exit_to_app', route: '/auth/logout'
      },
    ];
    let MENUEC: MenuItem[] = [
      // {
      //   label: 'Home', icon: 'dashboard'
      // },
      {
        label: 'Meu Perfil', icon: 'people', route: '/establishment/profile'
      },
      {
        label: 'Meu Cadastro', icon: 'people', route: '/establishment/registration'
      },
      {
        label: 'Logout', icon: 'exit_to_app', route: '/auth/logout'
      },
    ];

    let aux =  MENUEC;
    aux = aux.map(item => {
      if (item.route && item.route.includes(pathname)) {
        return { ...item, active: true }
      }
      return item
    })
    setMenu(aux);
  }, [pathname, ])

  return menu
}