import { Routes } from '@angular/router';
import { LazyLoadingComponent } from './lazy-loading.component';

export const LAZY_LOADING_ROUTES: Routes = [
  {
    path: '',
    component: LazyLoadingComponent,
    title: 'Lazy Loading & Preload Strategies'
  }
];
