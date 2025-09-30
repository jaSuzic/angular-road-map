import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="rxjs-layout">
      <div class="sidebar">
        <h2>RxJS</h2>
        <nav class="nav-links">
          <a routerLink="cold-vs-hot" routerLinkActive="active" class="nav-link">Cold vs Hot Observables</a>
          <a routerLink="higher-order" routerLinkActive="active" class="nav-link">Higher-order Operators</a>
          <a routerLink="combination" routerLinkActive="active" class="nav-link">Combination Operators</a>
          <a routerLink="error-handling" routerLinkActive="active" class="nav-link">Error Handling</a>
          <a routerLink="http-requests" routerLinkActive="active" class="nav-link">HTTP Requests</a>
        </nav>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .rxjs-layout {
      display: flex;
      min-height: 100vh;
      gap: 2rem;
      padding: 1rem;
    }

    .sidebar {
      width: 250px;
      flex-shrink: 0;
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      height: fit-content;
    }

    .sidebar h2 {
      margin: 0 0 1.5rem 0;
      color: #333;
      font-size: 1.5rem;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-link {
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: #666;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .nav-link:hover {
      background: #e9ecef;
      color: #333;
    }

    .nav-link.active {
      background: #e3f2fd;
      color: #1976d2;
      font-weight: 500;
    }

    .content {
      flex: 1;
      padding: 1rem;
    }
  `]
})
export class RxjsComponent {}
