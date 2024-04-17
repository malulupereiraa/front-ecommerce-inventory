import { Routes } from '@angular/router';

const rootInventario: string = 'gerenciar-inventario-loja'

export const routes: Routes = [
  {
    path: rootInventario,
    loadComponent: () => import('./inventario-list/inventario-list.component').then(m => m.InventarioListComponent),
    data: {
      title: 'Inventário'
    }
  },
  {
    path: rootInventario + '/cadastrar',
    loadComponent: () => import('./inventario-ce/inventario-ce.component').then(m => m.InventarioCeComponent),
    data: {
      title: 'Cadastrar Produto'
    }
  },
  {
    path: rootInventario + '/editar/:id',
    loadComponent: () => import('./inventario-ce/inventario-ce.component').then(m => m.InventarioCeComponent),
    data: {
      title: 'Editar Produto'
    }
  },
  {
    path: rootInventario + '/visualizar/:id',
    loadComponent: () => import('./inventario-ce/inventario-ce.component').then(m => m.InventarioCeComponent),
    data: {
      title: 'Visualizar Produto'
    }
  }
];

