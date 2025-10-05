import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dependency-injection',
        loadComponent: () => import('./dependency-injection/dependency-injection.component').then(m => m.DependencyInjectionComponent)
    },
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
    },
    {
        path: 'change-detection',
        loadComponent: () => import('./cd-strategies/strategies/strategies.component').then(m => m.StrategiesComponent)
    },
    {
        path: 'rxjs',
        loadComponent: () => import('./rxjs/rxjs.component').then(m => m.RxjsComponent),
        children: [
            { path: '', redirectTo: 'cold-vs-hot', pathMatch: 'full' },
            { path: 'cold-vs-hot', loadComponent: () => import('./rxjs/cold-vs-hot/cold-vs-hot.component').then(m => m.ColdVsHotComponent) },
            { path: 'higher-order', loadComponent: () => import('./rxjs/higher-order/higher-order.component').then(m => m.HigherOrderComponent) },
            { path: 'combination', loadComponent: () => import('./rxjs/combination/combination.component').then(m => m.CombinationComponent) },
            { path: 'http-requests', loadComponent: () => import('./rxjs/http-requests/http-requests.component').then(m => m.HttpRequestsComponent) }
        ]
    },
    {
        path: 'modular-architecture',
        loadChildren: () => import('./modular-architecture/modular-architecture.routes')
            .then(m => m.MODULAR_ARCHITECTURE_ROUTES)
    },
    {
        path: 'separation-of-concerns',
        loadComponent: () => import('./separation-of-concerns/separation-of-concerns.component')
            .then(m => m.SeparationOfConcernsComponent)
    },
    {
        path: 'module-federation',
        loadComponent: () => import('./module-federation/module-federation.component')
            .then(m => m.ModuleFederationComponent)
    },
    {
        path: 'api-development',
        loadComponent: () => import('./api-development/api-development.component')
            .then(m => m.ApiDevelopmentComponent)
    },
    { path: '', redirectTo: '/angular-state', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
