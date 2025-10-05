import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-exporting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-exporting.component.html',
  styleUrls: ['./group-exporting.component.scss']
})
export class GroupExportingComponent {
  showCode = false;
  activeTab = 0;
  codeTabs = ['Structure', 'Routes', 'Provide', 'Public API', 'Usage'];
  
  structureCode = `libs/orders/
  ├─ feature/
  │   ├─ orders.routes.ts
  │   ├─ orders.container.ts    // standalone
  │   ├─ orders-list.component.ts
  │   ├─ order-details.component.ts
  │   └─ provide-orders.ts      // providers for the feature (optional)
  └─ public-api.ts`;

  routesCode = `// orders.routes.ts
import { Routes } from '@angular/router';
import { provideOrders } from './provide-orders';

export const ordersRoutes: Routes = [
  {
    path: '',
    providers: [provideOrders()], // Register store/facade/providers here
    loadComponent: () => import('./orders.container').then(m => m.OrdersContainer),
    children: [
      { path: '', loadComponent: () => import('./orders-list.component').then(m => m.OrdersListComponent) },
      { path: ':id', loadComponent: () => import('./order-details.component').then(m => m.OrderDetailsComponent) },
    ]
  }
];`;

  provideCode = `// provide-orders.ts
export function provideOrders() {
  return [
    OrdersApi, 
    OrdersStore, 
    OrdersFacade,
    // Other providers for this feature
  ];
}`;

  publicApiCode = `// public-api.ts
export * from './feature/orders.routes';
export * from './feature/provide-orders';

// Feature API object (optional)
export const ORDERS_FEATURE = {
  routes: ordersRoutes,
  provide: provideOrders,   // Can accept options: provideOrders(cfg)
};

export type { OrderVm } from './feature/models';`;

  usageCode = `// Shell app or another library
import { ORDERS_FEATURE } from '@app/orders';

export const routes: Routes = [
  {
    path: 'orders',
    providers: [ORDERS_FEATURE.provide()],
    loadChildren: () => import('@app/orders').then(m => m.ORDERS_FEATURE.routes)
  }
];`;
}
