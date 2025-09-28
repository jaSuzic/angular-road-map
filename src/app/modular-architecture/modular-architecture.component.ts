import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-modular-architecture',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
    template: `
    <div class="container">
      <aside class="sidebar">
        <h2>Modular Architecture</h2>
        <nav>
          <ul>
            <li><a routerLink="/modular-architecture/overview" 
                   routerLinkActive="active" 
                   [routerLinkActiveOptions]="{exact: true}">Overview</a></li>
            <li><a routerLink="/modular-architecture/core" 
                   routerLinkActive="active">Core Module</a></li>
            <li><a routerLink="/modular-architecture/shared" 
                   routerLinkActive="active">Shared Module</a></li>
            <li><a routerLink="/modular-architecture/feature" 
                   routerLinkActive="active">Feature Modules</a></li>
            <li><a routerLink="/modular-architecture/standalone" 
                   routerLinkActive="active">Standalone Approach</a></li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styles: [`
    .container {
      display: flex;
      min-height: 100%;
    }
    .sidebar {
      width: 250px;
      padding: 1rem;
      background: #f5f5f5;
      border-right: 1px solid #ddd;
    }
    .content {
      flex: 1;
      padding: 1rem;
    }
    nav ul {
      list-style: none;
      padding: 0;
    }
    nav li {
      margin-bottom: 0.5rem;
    }
    nav a {
      display: block;
      padding: 0.5rem;
      color: #333;
      text-decoration: none;
      border-radius: 4px;
    }
    nav a:hover, nav a.active {
      background: #e0e0e0;
    }
    pre {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      font-family: 'Courier New', Courier, monospace;
    }
  `]
})
export class ModularArchitectureComponent { }
