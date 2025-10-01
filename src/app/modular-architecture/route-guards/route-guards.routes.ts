import { Routes } from '@angular/router';
import { RouteGuardsComponent } from './route-guards.component';

export const ROUTE_GUARDS_ROUTES: Routes = [
  {
    path: '',
    component: RouteGuardsComponent,
    title: 'Route Guards & Resolvers'
  }
];
