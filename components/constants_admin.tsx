"use client"

import { FiUser, FiBell, FiHome, FiSettings, FiMail, FiHelpCircle } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";



export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
};

export const SIDENAV_ITEMS: SideNavItem[] = [
    
  {
    title: 'Accueil',
    path: '/',
    icon: <FiHome size={24} />,
  },
  {
      title: 'Utilisateurs',
      path: '/admin',
      icon: <FiUser  size={24} />,
    },
    {
        title: 'Plantes',
        path: '/admin/plants',
        icon: <BiLeaf size={24} />,
      },
    // {
    //   title: 'Notifications',
    //   path: '/notifications',
    //   icon: <FiBell size={24} />,
    // },
    {
      title: 'Paramètres',
      path: '/settings',
      icon: <FiSettings size={24} />,
      submenu: true,
      subMenuItems: [
        { title: 'Compte', path: '/settings/account' },
        { title: 'Confidentialité', path: '/settings/privacy' },
      ],
    },
  ];