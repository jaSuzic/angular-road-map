import { Routes } from '@angular/router';
import { ModularArchitectureComponent } from './modular-architecture.component';
import { OverviewComponent } from './overview/overview.component';
import { CoreComponent } from './core/core.component';
import { SharedComponent } from './shared/shared.component';
import { FeatureComponent } from './feature/feature.component';
import { StandaloneComponent } from './standalone/standalone.component';
import { LAZY_LOADING_ROUTES } from './lazy-loading/lazy-loading.routes';
import { ROUTE_GUARDS_ROUTES } from './route-guards/route-guards.routes';
import { FeatureModuleLabComponent } from './feature-module-lab/feature-module-lab.component';

export const MODULAR_ARCHITECTURE_ROUTES: Routes = [
    {
        path: '',
        component: ModularArchitectureComponent,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: OverviewComponent },
            { path: 'core', component: CoreComponent },
            { path: 'shared', component: SharedComponent },
            { path: 'feature', component: FeatureComponent },
            { path: 'standalone', component: StandaloneComponent },
            { path: 'lazy-loading', children: LAZY_LOADING_ROUTES },
            { path: 'route-guards', children: ROUTE_GUARDS_ROUTES },
            { path: 'feature-module-lab', component: FeatureModuleLabComponent },
        ]
    }
];
