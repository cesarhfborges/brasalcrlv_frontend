import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/home',
  },
  {
    title: 'Opções',
    group: true,
  },
  {
    title: 'Usuários',
    icon: 'person-outline',
    children: [
      {
        title: 'Listar',
        link: '/usuarios',
      },
    ],
  },
  {
    title: 'Empresas',
    icon: 'hash-outline',
    children: [
      {
        title: 'Listar',
        link: '/empresas',
      },
    ],
  },
];
