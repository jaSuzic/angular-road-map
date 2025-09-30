import { Routes } from '@angular/router';
import { ModularArchitectureComponent } from './modular-architecture.component';
import { OverviewComponent } from './overview/overview.component';
import { CoreComponent } from './core/core.component';
import { SharedComponent } from './shared/shared.component';
import { FeatureComponent } from './feature/feature.component';
import { StandaloneComponent } from './standalone/standalone.component';

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
        ]
    }
];
