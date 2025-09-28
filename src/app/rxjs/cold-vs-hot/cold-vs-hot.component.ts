import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cold-vs-hot',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content">
      <h2>Cold vs Hot Observables & Multicasting</h2>
      
      <section class="section">
        <div class="example-header">
          <h3>Cold Observables</h3>
          <button class="toggle-button" (click)="toggleCode('cold')">
            {{ showCode.cold ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <p>
          Cold observables create their own execution for each subscriber. Each subscription triggers a new producer.
          Example: <code>http.get()</code> - each subscription creates a new HTTP request.
        </p>
        <pre *ngIf="showCode.cold"><code [innerText]="coldExample"></code></pre>
      </section>

      <section class="section">
        <h3>Hot Observables</h3>
        <p>
          Hot observables share the same execution between all subscribers. The producer is created independently.
          Example: DOM events like <code>mousemove</code> or <code>Subjects</code>.
        </p>
      </section>

      <section class="section">
        <h3>Subjects</h3>
        <div class="subject-type">
          <h4>Subject</h4>
          <ul>
            <li>No initial value</li>
            <li>Doesn't store the last emitted value</li>
            <li>Only emits values after subscription</li>
          </ul>
        </div>

        <div class="subject-type">
          <h4>BehaviorSubject</h4>
          <ul>
            <li>Requires an initial value</li>
            <li>Stores and emits the last value to new subscribers</li>
            <li>Great for application state</li>
          </ul>
        </div>

        <div class="subject-type">
          <h4>ReplaySubject</h4>
          <ul>
            <li>Can be configured to store multiple values</li>
            <li>Replays a specified number of values to new subscribers</li>
            <li>Useful for caching</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>Multicasting</h3>
          <button class="toggle-button" (click)="toggleCode('multicast')">
            {{ showCode.multicast ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <p>
          Share a single execution among multiple subscribers using <code>share()</code> or <code>shareReplay()</code>.
          This is particularly useful for HTTP requests where you want to avoid duplicate requests.
        </p>
        <pre *ngIf="showCode.multicast"><code [innerText]="multicastExample"></code></pre>
      </section>
    </div>
  `,
  styles: [`
    .content {
      max-width: 800px;
      margin: 0 auto;
    }
    .section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .example-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .toggle-button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 8px 16px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .toggle-button:hover {
      background-color: #45a049;
    }
    .subject-type {
      margin: 1.5rem 0;
      padding: 1rem;
      background: #fff;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      margin: 1rem 0;
    }
    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.85em;
      line-height: 1.4;
    }
  `]
})
export class ColdVsHotComponent {
  showCode = {
    cold: false,
    multicast: false
  };

  toggleCode(key: string) {
    this.showCode[key as keyof typeof this.showCode] = !this.showCode[key as keyof typeof this.showCode];
  }
  coldExample = `// Cold observable example
const cold$ = new Observable(observer => {
  const value = Math.random();
  observer.next(value);
});

// Each subscription gets a different value
cold$.subscribe(console.log); // 0.123
cold$.subscribe(console.log); // 0.456`;

  multicastExample = `@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products$?: Observable<Product[]>;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    if (!this.products$) {
      this.products$ = this.http.get<Product[]>('/api/products').pipe(
        shareReplay({ bufferSize: 1, refCount: false }) // Cache forever
      );
    }
    return this.products$;
  }
}`;
}
