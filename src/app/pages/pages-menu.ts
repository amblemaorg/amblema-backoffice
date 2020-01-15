import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Roles y permisos',
    icon: 'unlock-outline',
    children: [
      {
        title: 'Administrar',
        link: '/pages/admin-users',
      },
      { title: 'Roles' }
    ]
  },
  {
    title: 'Usuarios',
    icon: 'people-outline',
    children: [
      { title: 'Coordinadores' },
      { title: 'Padrinos' },
      { title: 'Escuelas' },
    ]
  },
  {
    title: 'Contenido',
    icon: 'browser-outline',
    children: [
      { title: 'Web' },
      { title: 'Pasos' },
      { title: 'Módulos de aprendizaje' },
      { title: 'Configuración del Peca' }
    ]
  },
  {
    icon: 'email-outline',
    title: 'Correos'
  },
  {
    icon: 'edit-outline',
    title: 'Ver escuelas'
  },

  {
    icon: 'file-text-outline',
    title: 'Reportes'
  },
  {
    title: 'Profile',

    link: '/pages/profile'
  },
];
