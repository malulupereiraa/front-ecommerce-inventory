import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './@core/guard/auth/auth.guard'

export const routes: Routes = [
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: ''
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/home/routes').then((m) => m.routes)
      },
      {
        path: 'inventario',
        loadChildren: () => import('./views/inventario/routes').then((m) => m.routes)
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login'
    }
  },
  { path: '**', redirectTo: 'login' }
];
