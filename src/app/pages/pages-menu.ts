import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'USERS',
    group: true,
  },
  {
    title: 'Roles y permisos',
    children: [
      { title: 'Administrar' },
      { title: 'Roles' }
    ]
  },
  {
    title: 'Usuarios',
    children: [
      { title: 'Coordinadores' }, 
      { title: 'Padrinos' }, 
      { title: 'Escuelas' }, 
    ]
  },
  {
    title: 'Contenido',
    children: [
      { title: 'Web' }, 
      { title: 'Pasos' },
      { title: 'Módulos de aprendizaje' },
      { title: 'Configuración del Peca' }
    ]
  },
  {
    title: 'Correos'
  },
  {
    title: 'Ver escuelas'
  },

  {
    title: 'Reportes'
  },
  {
    title: 'Profile',
    icon: 'people-outline',
    link: '/pages/profile'
  },
];
