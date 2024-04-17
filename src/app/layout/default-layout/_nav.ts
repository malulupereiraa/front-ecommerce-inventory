import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/home',
    iconComponent: { name: 'cil-home' },
  },
  {
    title: true,
    name: 'Produtos'
  },
  {
    name: 'Gerenciar Inventário',
    url: '/inventario/gerenciar-inventario-loja',
    iconComponent: { name: 'cil-notes' }
  },
];
