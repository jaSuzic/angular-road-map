import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-feature-module',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container">
        <!-- Ostali HTML sadržaj... -->

        <h3>Implementation Example</h3>
        <p>Traditional approach (with NgModule):</p>
        <div class="code-example">
            <button (click)="toggleCode('ngModule')" class="toggle-code-btn">
                {{ showCode.ngModule ? 'Hide Code' : 'Show Code' }}
            </button>
            <div class="code-container" [class.show]="showCode.ngModule">
                <pre><code class="language-typescript">{{ ngModuleExample }}</code></pre>
            </div>
        </div>

        <p>Modern approach (Standalone with Routes):</p>
        <div class="code-example">
            <button (click)="toggleCode('standaloneRoutes')" class="toggle-code-btn">
                {{ showCode.standaloneRoutes ? 'Hide Code' : 'Show Code' }}
            </button>
            <div class="code-container" [class.show]="showCode.standaloneRoutes">
                <pre><code class="language-typescript">{{ standaloneRoutesExample }}</code></pre>
            </div>
        </div>

        <h3>Lazy Loading</h3>
        <p>Lazy loading improves initial load time by loading feature modules only when needed.</p>
        
        <p>With NgModules:</p>
        <div class="code-example">
            <button (click)="toggleCode('lazyLoadingNg')" class="toggle-code-btn">
                {{ showCode.lazyLoadingNg ? 'Hide Code' : 'Show Code' }}
            </button>
            <div class="code-container" [class.show]="showCode.lazyLoadingNg">
                <pre><code class="language-typescript">{{ lazyLoadingNgExample }}</code></pre>
            </div>
        </div>

        <p>With Standalone:</p>
        <div class="code-example">
            <button (click)="toggleCode('lazyLoadingStandalone')" class="toggle-code-btn">
                {{ showCode.lazyLoadingStandalone ? 'Hide Code' : 'Show Code' }}
            </button>
            <div class="code-container" [class.show]="showCode.lazyLoadingStandalone">
                <pre><code class="language-typescript">{{ lazyLoadingStandaloneExample }}</code></pre>
            </div>
        </div>

        <!-- Ostali HTML sadržaj... -->
    </div>
    `,
    styles: [`
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
        }
        h2 { color: #333; margin-bottom: 1rem; }
        h3 { color: #444; margin: 1.5rem 0 1rem; }
        ul { margin: 0.5rem 0 1rem 1.5rem; }
        li { margin-bottom: 0.5rem; }
        
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
    `]
})
export class FeatureComponent {
    showCode = {
        ngModule: false,
        standaloneRoutes: false,
        lazyLoadingNg: false,
        lazyLoadingStandalone: false
    };

    toggleCode(example: keyof typeof this.showCode) {
        this.showCode[example] = !this.showCode[example];
    }

    ngModuleExample = `// products/products.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductsService } from './products.service';

const routes = [
    { path: '', component: ProductsListComponent },
    { path: ':id', component: ProductDetailComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProductsListComponent,
        ProductDetailComponent
    ],
    providers: [ProductsService]
})
export class ProductsModule { }`;

    standaloneRoutesExample = `// products/products.routes.ts
import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ProductService } from './product.service';

export const PRODUCTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./products-list.component')
            .then(m => m.ProductsListComponent),
        children: [
            {
                path: ':id',
                loadComponent: () => import('./product-detail.component')
                    .then(m => m.ProductDetailComponent),
                resolve: {
                    product: (route: any) => 
                        inject(ProductService).getProduct(route.paramMap.get('id')!)
                }
            }
        ]
    }
];`;

    lazyLoadingNgExample = `// app-routing.module.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'products', 
        loadChildren: () => import('./products/products.module')
            .then(m => m.ProductsModule) 
    }
];`;

    lazyLoadingStandaloneExample = `// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        loadChildren: () => import('./products/products.routes')
            .then(m => m.PRODUCTS_ROUTES)
    }
];`;
}