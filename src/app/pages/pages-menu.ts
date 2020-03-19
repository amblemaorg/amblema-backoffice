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
      {
        title: 'Roles',
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
        title: 'Ajustes del PECA',
        icon: 'settings-2-outline',
        children: [
          {
            title: 'Lapso 1',
            children: [
              {
                title: 'Taller inicial',
                link: '/pages/content/peca-setting/workshop'
              },
              {
                title: 'Planificación del lapso',
                link: '/pages/content/peca-setting/lapse'
              },
              { title: 'Venezuela megadiversa' },
              {
                title: 'AmbLeMonedas',
                link: '/pages/content/peca-setting/coins'
              },
              {
                title: 'Convención anual',
                link: '/pages/content/peca-setting/convention'
              },
            ]
          },
          {
            title: 'Lapso 2',
            children: [
              {
                title: 'Taller inicial',
                link: '/pages/content/peca-setting/workshop'
              },
              {
                title: 'Planificación del lapso',
                link: '/pages/content/peca-setting/lapse'
              },
              { title: 'Venezuela megadiversa' },
              {
                title: 'AmbLeMonedas',
                link: '/pages/content/peca-setting/coins'
              },
              {
                title: 'Convención anual',
                link: '/pages/content/peca-setting/convention'
              },
            ]
          },
          {
            title: 'Lapso 3',
            children: [
              {
                title: 'Taller inicial',
                link: '/pages/content/peca-setting/workshop-2'
              },
              { title: 'Planificación del lapso',
                link: '/pages/content/peca-setting/lapse-2'
              },
              { title: 'Venezuela megadiversa' },
              {
                title: 'AmbLeMonedas',
                link: '/pages/content/peca-setting/coins-2'
              },
              {
                title: 'Convención anual',
                link: '/pages/content/peca-setting/convention-2'
              },
            ]
          },
          {
            title: 'Estrategias de actividades',
            link: '/pages/content/peca-setting/activity-strategies',
          },
          {
            title: 'Período académico',
            children: [
              {
                title: 'Lapsos',
                link: '/pages/content/peca-setting/admin-lapses'
              },
              {
                title: 'Años escolares',
                link: '/pages/content/peca-setting/admin-year',
              }
            ]
          }
        ],
      },
      {
        title: 'Temas del Pensum',
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
    title: 'Ver escuelas',
    link: '/pages/projects'
  },

  {
    icon: 'file-text-outline',
    title: 'Reportes'
  },
];
