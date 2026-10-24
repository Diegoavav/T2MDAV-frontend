import { Routes } from '@angular/router';
import { Alumnos } from './components/alumnos/alumnos';
import { Productos } from './components/productos/productos';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  },
  {
    path: 'alumnos',
    component: Alumnos
  },
  {
    path: 'productos',
    component: Productos
  },
  {
    path: '**',
    redirectTo: 'alumnos'
  }
];