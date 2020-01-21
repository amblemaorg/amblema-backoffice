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
      { title: 'Roles',
        link: '/pages/permissions'
      }
    ]
  },
  {
    title: 'Usuarios',
    icon: 'people-outline',
    children: [
      {
        title: 'Coordinadores',
        link: '/pages/coordinators-users'
      },
      {
        title: 'Padrinos',
        link: '/pages/sponsors-users'
      },
      {
        title: 'Escuelas',
        link: '/pages/schools-users'
      },
    ]
  },
  {
    title: 'Contenido',
    icon: 'browser-outline',
    children: [
      {
        title: 'Web',
        icon: 'globe-outline',
        children: [
          {
            title: 'Inicio',
            link: '/pages/content/web'
          },
          {
            title: 'Nosotros'
          },
          {
            title: 'Padrinos'
          },
          {
            title: 'Coordinadores'
          },
          {
            title: 'Escuelas'
          },
          {
            title: 'Blog'
          },
        ]
      },
      {
        title: 'Pasos',
        icon: 'trending-up-outline'
      },
      {
        title: 'Módulos de aprendizaje',
        icon: 'book-open-outline'
      },
      {
        title: 'Configuración del Peca',
        icon: 'settings-2-outline'
      }
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
