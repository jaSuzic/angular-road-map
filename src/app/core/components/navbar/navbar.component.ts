import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/" class="navbar-brand">Angular Roadmap</a>
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/rxjs" routerLinkActive="active">RxJS</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #1976d2;
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      margin-left: 1.5rem;
      padding: 0.5rem 0;
      position: relative;
    }
    .nav-links a:hover,
    .nav-links a.active {
      opacity: 0.9;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    .nav-links a:hover::after,
    .nav-links a.active::after {
      transform: scaleX(1);
    }
  `]
})
export class NavbarComponent {}
