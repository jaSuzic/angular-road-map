import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Modular Architecture Overview</h2>
    <p>
      Modular architecture in Angular helps you organize your application into clear, maintainable, 
      and scalable units. The main benefits include:
    </p>
    
    <ul>
      <li>Better code organization and separation of concerns</li>
      <li>Improved performance through lazy loading</li>
      <li>Easier team collaboration</li>
      <li>Better reusability of components and services</li>
      <li>Easier testing and maintenance</li>
    </ul>

    <h3>Traditional Approach (Pre-Angular 16)</h3>
    <p>
      Before Angular 16, we used NgModules to organize our application into modules:
    </p>
    <ul>
      <li><strong>CoreModule</strong>: For singleton services and components used once in the app</li>
      <li><strong>SharedModule</strong>: For shared components, directives, and pipes</li>
      <li><strong>Feature Modules</strong>: For business domains and features</li>
    </ul>

    <h3>Modern Approach (Angular 16+)</h3>
    <p>
      With Angular 16+, we can use standalone components and a more lightweight approach:
    </p>
    <ul>
      <li>No need for NgModules in most cases</li>
      <li>Components are self-contained with their dependencies</li>
      <li>Lazy loading at the component level</li>
      <li>Better tree-shaking and smaller bundles</li>
    </ul>
  `,
  styles: [`
    h2 { color: #333; margin-bottom: 1rem; }
    h3 { color: #444; margin: 1.5rem 0 1rem; }
    ul { margin: 0.5rem 0 1rem 1.5rem; }
    li { margin-bottom: 0.5rem; }
    p { margin-bottom: 1rem; line-height: 1.5; }
  `]
})
export class OverviewComponent {}
