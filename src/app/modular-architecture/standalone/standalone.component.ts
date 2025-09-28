import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './standalone.component.html',
  styles: [`
    .code-example {
      margin: 1.5rem 0;
    }
    
    .toggle-code-btn {
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.9em;
      margin-bottom: 0.5rem;
    }
    
    .toggle-code-btn:hover {
      background: #e9e9e9;
    }
    
    .code-container {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }
    
    .code-container.show {
      max-height: 1000px;
      transition: max-height 0.5s ease-in;
    }
    
    pre {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin: 0;
    }
    
    code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.9em;
      white-space: pre;
    }
    
    h2 { 
      color: #333; 
      margin-bottom: 1rem; 
    }
    
    h3 { 
      color: #444; 
      margin: 1.5rem 0 1rem; 
    }
    
    ul { 
      margin: 0.5rem 0 1rem 1.5rem; 
    }
    
    li { 
      margin-bottom: 0.5rem; 
    }
    
    .navigation {
      margin-bottom: 2rem;
    }
    
    .navigation a {
      color: #1976d2;
      text-decoration: none;
    }
    
    .navigation a:hover {
      text-decoration: underline;
    }
  `]
})
export class StandaloneComponent {
  showCode = {
    productCard: false,
    bootstrap: false,
    lazyLoading: false,
    defer: false
  };
  toggleCode(example: string) {
    this.showCode[example as keyof typeof this.showCode] = !this.showCode[example as keyof typeof this.showCode];
  }

  productCardExample = `// product-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: \`
    <div class="product-card">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <span class="price">{{ product.price | currency }}</span>
      <a [routerLink]="['/products', product.id]" class="view-details">
        View Details
      </a>
    </div>
  \`,
  styles: [\`
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem 0;
    }
    .price {
      font-weight: bold;
      color: #2e7d32;
      display: block;
      margin: 0.5rem 0;
    }
    .view-details {
      color: #1976d2;
      text-decoration: none;
    }
    .view-details:hover {
      text-decoration: underline;
    }
  \`]
})
export class ProductCardComponent {
  @Input() product: Product;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}`;

  bootstrapExample = `// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Other global providers
  ]
}).catch(err => console.error(err));`;

  lazyLoadingExample = `// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/routes')
      .then(m => m.PRODUCT_ROUTES)
  }
];`;

  deferExample = `@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeavyChartComponent],
  template: \`
    <h2>Dashboard</h2>
    
    @defer (on viewport) {
      <app-heavy-chart />
    } @placeholder {
      <div class="placeholder">Loading chart...</div>
    } @error {
      <div class="error">Failed to load chart</div>
    }
  \`
})
export class DashboardComponent { }`;
}
