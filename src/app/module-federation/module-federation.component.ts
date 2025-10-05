import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-module-federation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module-federation.component.html',
  styles: [`
    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    section {
      margin-bottom: 2rem;
    }
    h1 {
      color: #1976d2;
      margin-bottom: 1.5rem;
    }
    h2 {
      color: #0d47a1;
      margin: 1.5rem 0 1rem;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 0.5rem;
    }
    h3 {
      color: #1565c0;
      margin: 1.2rem 0 0.8rem;
    }
    pre {
      background-color: #f5f5f5;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      font-family: 'Courier New', monospace;
      background-color: #f5f5f5;
      padding: 0.2em 0.4em;
      border-radius: 3px;
    }
    ul {
      padding-left: 1.5rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
  `]
})
export class ModuleFederationComponent {
  codeVisibility = {
    remoteConfig: false,
    shellIntegration: false
  };

  toggleCode(block: keyof typeof this.codeVisibility) {
    this.codeVisibility[block] = !this.codeVisibility[block];
  }
}
