import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent, TabComponent } from '../../shared/tabs/tabs.component';

@Component({
  selector: 'app-lazy-loading',
  standalone: true,
  imports: [CommonModule, TabsComponent, TabComponent],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="content">
      <h1>Lazy Loading & Preload Strategies</h1>
      <p>
        Lazy loading is a technique that loads feature modules only when they're needed, typically when the user navigates to their routes. 
        This significantly reduces the initial bundle size and speeds up the initial load time of your application.
      </p>
      
      <p>
        However, lazy loading alone means users might experience a delay when first navigating to a lazy-loaded route. 
        This is where preloading strategies come in - they load lazy-loaded modules in the background after the initial application load.
      </p>

      <h2>Angular's Built-in Preloading Strategies</h2>
      
      <app-tabs>
        <app-tab title="Basic Lazy Loading">
          <p>Basic setup for lazy loading with no preloading (default behavior):</p>
          <pre><code>{{basicLazyLoadingCode}}</code></pre>
        </app-tab>
        
        <app-tab title="Preload All Modules">
          <p>Preload all lazy-loaded modules after the initial load:</p>
          <pre><code>{{preloadAllCode}}</code></pre>
        </app-tab>
        
        <app-tab title="Selective Preloading">
          <p>Custom strategy to preload only specific modules:</p>
          <pre><code>{{selectivePreloadingCode}}</code></pre>
        </app-tab>
        
        <app-tab title="Angular 16+ (Standalone)">
          <p>Lazy loading with standalone components in Angular 16+:</p>
          <pre><code>{{standaloneCode}}</code></pre>
        </app-tab>
      </app-tabs>
      
      <h2>When to Use Which Strategy?</h2>
      <ul>
        <li><strong>NoPreloading (default)</strong>: Use when you want to minimize initial load time and don't mind the delay on first navigation.</li>
        <li><strong>PreloadAllModules</strong>: Best for small to medium applications where you want to balance initial load time with navigation performance.</li>
        <li><strong>Custom Preloading</strong>: Ideal for larger applications where you want to preload only the most important modules.</li>
      </ul>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Use route-level preloading with <code>data: &#123; preload: true &#125;</code> for critical feature modules.</li>
        <li>Consider network conditions - you might want to implement a custom strategy that only preloads on Wi-Fi.</li>
        <li>Measure performance impact of different strategies using Chrome DevTools.</li>
        <li>In Angular 16+, prefer using <code>loadComponent</code> for single components and <code>loadChildren</code> for route groups.</li>
      </ul>
    </div>
  `,
  styles: [`
    .content {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    pre {
      margin: 20px 0;
      border-radius: 4px;
    }
    h2 {
      margin-top: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    ul {
      margin: 15px 0;
      padding-left: 25px;
    }
    li {
      margin-bottom: 8px;
    }
  `]
})
export class LazyLoadingComponent {
  basicLazyLoadingCode = `// app-routing.module.ts
const routes: Routes = [
  { 
    path: 'users', 
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule) 
  },
  { 
    path: 'products', 
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }`;

  preloadAllCode = `// app-routing.module.ts
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { 
    path: 'users', 
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule) 
  },
  { 
    path: 'products', 
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules 
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }`;

  selectivePreloadingCode = `// app-routing.module.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectivePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] ? load() : of(null);
  }
}

const routes: Routes = [
  { 
    path: 'users', 
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    data: { preload: true } 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    // No preload
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: SelectivePreloadStrategy 
    })
  ],
  exports: [RouterModule],
  providers: [SelectivePreloadStrategy]
})
export class AppRoutingModule { }`;

  standaloneCode = `// app.routes.ts
import { Routes } from '@angular/router';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';

// For loading a single component
const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(c => c.AboutComponent)
  },
  // For loading a group of routes
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES),
    data: { preload: true }
  }
];

// In main.ts or app.config.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes, 
      withPreloading(PreloadAllModules)
    )
  ]
});

// Custom preload strategy for standalone
@Injectable({ providedIn: 'root' })
export class SelectivePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] ? load() : of(null);
  }
}

// Then use it in your app config
provideRouter(
  routes,
  withPreloading(SelectivePreloadStrategy)
)`;
}
