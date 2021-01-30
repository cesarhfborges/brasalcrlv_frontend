import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'CRLV',
    icon: 'book-open-outline',
    link: '/home',
    home: true,
    data: ['user', 'admin']
  },
  {
    title: 'Opções',
    group: true,
    data: ['admin']
  },
  {
    title: 'Usuários',
    icon: 'person-outline',
    data: ['admin'],
    children: [
      {
        title: 'Listar',
        link: '/usuarios',
        data: ['admin'],
      },
    ],
  },
  {
    title: 'Empresas',
    icon: 'hash-outline',
    data: ['admin'],
    children: [
      {
        title: 'Listar',
        link: '/empresas',
        data: ['admin'],
      },
    ],
  },
];
