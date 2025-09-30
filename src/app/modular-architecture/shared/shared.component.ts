import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-shared-module',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container">
        <h2>Shared Module</h2>
        <p>
            The Shared Module contains reusable components, directives, and pipes that are used across multiple feature modules.
        </p>

        <h3>What belongs in Shared?</h3>
        <ul>
            <li>Commonly used components (buttons, cards, modals, etc.)</li>
            <li>Directives (tooltips, highlight, etc.)</li>
            <li>Pipes (date formatting, currency, etc.)</li>
            <li>Commonly used Angular modules (CommonModule, FormsModule, etc.)</li>
        </ul>

        <h3>Implementation Example</h3>
        <p>Traditional approach (with NgModule):</p>
        <div class="code-example">
            <button class="toggle-code-btn" (click)="toggleCode('ngModule')">
                {{ showCode.ngModule ? 'Hide' : 'Show' }} NgModule Example
            </button>
            <div class="code-container" [class.show]="showCode.ngModule">
                <pre><code [innerHTML]="ngModuleExample"></code></pre>
            </div>
        </div>

        <p>Modern approach (Standalone):</p>
        <div class="code-example">
            <button class="toggle-code-btn" (click)="toggleCode('standalone')">
                {{ showCode.standalone ? 'Hide' : 'Show' }} Standalone Example
            </button>
            <div class="code-container" [class.show]="showCode.standalone">
                <pre><code [innerHTML]="standaloneExample"></code></pre>
            </div>
        </div>

        <h3>Best Practices</h3>
        <ul>
            <li>Only put truly shared, stateless components in the shared module</li>
            <li>Never provide services in shared modules (use providedIn: 'root' or feature modules)</li>
            <li>Export only what other modules need</li>
            <li>Keep shared modules lean and focused</li>
            <li>Consider creating multiple shared modules for different domains</li>
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
export class SharedComponent {
    showCode = {
        ngModule: false,
        standalone: false
    };

    toggleCode(example: keyof typeof this.showCode) {
        this.showCode[example] = !this.showCode[example];
    }

    ngModuleExample = `// shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonComponent,
    HighlightDirective,
    ShortenPipe
  ],
  exports: [
    CommonModule,
    ButtonComponent,
    HighlightDirective,
    ShortenPipe
  ]
  // No providers here!
})
export class SharedModule { }`;

    standaloneExample = `// shared/components/button/button.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <button [class]="'btn ' + type" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  \`,
  styles: [\`
    .btn {
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
    }
    .btn.primary {
      background: #1976d2;
      color: white;
      border: none;
    }
    .btn.secondary {
      background: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  \`]
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
}

// Usage in a component:
// <app-button type="primary">Click me</app-button>`;
}
