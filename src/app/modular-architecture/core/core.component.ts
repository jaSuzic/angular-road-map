import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-core-module',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container">
        <h2>Core Module</h2>
        <p>
            The Core Module contains application-wide singleton services and components that are imported once in the AppModule.
        </p>

        <h3>What belongs in Core?</h3>
        <ul>
            <li>Singleton services (AuthService, LoggerService, etc.)</li>
            <li>Global components (Navbar, Footer, LoadingSpinner, etc.)</li>
            <li>HTTP interceptors</li>
            <li>Authentication guards</li>
            <li>Error handling services</li>
        </ul>

        <h3>Implementation Example</h3>
        <p>Traditional approach (with NgModule):</p>
        <div class="code-example">
            <button (click)="toggleCode('coreModule')" class="toggle-code-btn">
                {{ showCode.coreModule ? 'Hide Code' : 'Show Code' }}
            </button>
            <div class="code-container" [class.show]="showCode.coreModule">
                <pre><code class="language-typescript">{{ coreModuleExample }}</code></pre>
            </div>
        </div>

        <p>Modern approach (Standalone):</p>
        <div class="code-example">
            <button (click)="toggleCode('bootstrap')" class="toggle-code-btn">
                {{ showCode.bootstrap ? 'Hide Code' : 'Show Code' }}
            </button>
            <div class="code-container" [class.show]="showCode.bootstrap">
                <pre><code class="language-typescript">{{ bootstrapExample }}</code></pre>
            </div>
        </div>

        <h3>Best Practices</h3>
        <ul>
            <li>Import CoreModule only in AppModule (if using NgModules)</li>
            <li>Use <code>providedIn: 'root'</code> for services when possible</li>
            <li>Keep CoreModule focused on app-wide concerns</li>
            <li>Avoid importing SharedModule in CoreModule</li>
        </ul>
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
export class CoreComponent {
    showCode = {
        coreModule: false,
        bootstrap: false
    };

    toggleCode(example: string) {
        this.showCode[example as keyof typeof this.showCode] = !this.showCode[example as keyof typeof this.showCode];
    }

    coreModuleExample = `// core/core.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class CoreModule { }`;

    bootstrapExample = `// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app'; 
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([authInterceptor])
        ),
        // Other global providers
    ]
}).catch(err => console.error(err));`;
}
