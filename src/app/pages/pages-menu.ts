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
            link: '/pages/content/web/home'
          },
          {
            title: 'Nosotros',
            link: '/pages/content/web/about-us'
          },
          {
            title: 'Padrinos',
            link: '/pages/content/web/sponsors'
          },
          {
            title: 'Coordinadores',
            link: '/pages/content/web/coordinators'
          },
          {
            title: 'Escuelas',
            link: '/pages/content/web/schools'
          },
          {
            title: 'Blog',
            link: '/pages/content/web/blog'
          },
        ]
      },
      {
        title: 'Pasos',
        icon: 'trending-up-outline',
        children: [
          {
            title: 'Generales',
            link: '/pages/content/steps/generals'
          },
          {
            title: 'Padrino',
            link: '/pages/content/steps/sponsor'
          },
          {
            title: 'Coordinador',
            link: '/pages/content/steps/coordinator'
          },
          {
            title: 'Escuela',
            link: '/pages/content/steps/school'
          },
        ]
      },
      {
        title: 'Ajustes del Peca',
        icon: 'settings-2-outline',
        children: [
          {
            title: 'Lapso 1',
            children: [
              {
                title: 'Taller inicial',
                link: '/pages/content/peca-setting/workshop'
              },
              { title: 'Planificación del lapso' },
              { title: 'Venezuela megadiversa' },
              { title: 'AmbLeMonedas' },
              { title: 'Convención anual' },
            ]
          },
          {
            title: 'Lapso 2',
            children: [
              { title: 'Taller inicial' },
              { title: 'Planificación del lapso' },
              { title: 'Venezuela megadiversa' },
              { title: 'AmbLeMonedas' },
              { title: 'Convención anual' },
            ]
          },
          {
            title: 'Lapso 3',
            children: [
              { title: 'Taller inicial' },
              { title: 'Planificación del lapso' },
              { title: 'Venezuela megadiversa' },
              { title: 'AmbLeMonedas' },
              { title: 'Convención anual' },
            ]
          },
          {
            title: 'Estrategias de actividades'
          },
          {
            title: 'Administración de opciones y año escolar'
          }
        ],
      },
      {
        title: 'Módulos de aprendizaje',
        icon: 'book-open-outline',
        link: '/pages/content/learning'
      },
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
];
