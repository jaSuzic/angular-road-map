import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'angular-state',
    loadComponent: () => import('./angular-state/angular-state.component').then(m => m.AngularStateComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', loadComponent: () => import('./angular-state/overview/overview.component').then(m => m.OverviewComponent) },
      { path: 'component-signals', loadComponent: () => import('./angular-state/component-signals/component-signals.component').then(m => m.ComponentSignalsComponent) },
      { path: 'services', loadComponent: () => import('./angular-state/services/services.component').then(m => m.ServicesComponent) },
      { path: 'state-libraries', loadComponent: () => import('./angular-state/state-libraries/state-libraries.component').then(m => m.StateLibrariesComponent) },
      { path: 'decision-guide', loadComponent: () => import('./angular-state/decision-guide/decision-guide.component').then(m => m.DecisionGuideComponent) }
    ]
  }
];
