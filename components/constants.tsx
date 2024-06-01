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
      title: 'Home',
      path: '/',
      icon: <FiHome size={24} />,
    },
    {
      title: 'Profile',
      path: '/profile',
      icon: <FiUser  size={24} />,
    },
    {
        title: 'My Plants',
        path: '/profile/plants',
        icon: <BiLeaf size={24} />,
      },
    {
      title: 'Notifications',
      path: '/notifications',
      icon: <FiBell size={24} />,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <FiSettings size={24} />,
      submenu: true,
      subMenuItems: [
        { title: 'Account', path: '/settings/account' },
        { title: 'Privacy', path: '/settings/privacy' },
      ],
    },
    {
      title: 'Help',
      path: '/help',
      icon: <FiHelpCircle size={24} />,
    },
  ];