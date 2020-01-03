import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'USERS',
    group: true,
  },
  {
    title: 'Profile',
    icon: 'people-outline',
    link: '/pages/profile'
  },
];
