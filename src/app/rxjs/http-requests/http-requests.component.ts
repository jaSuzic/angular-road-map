import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-http-requests',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="content">
      <h2>HTTP Requests with RxJS</h2>
      
      <section class="section">
        <p>
          RxJS is commonly used with Angular's HttpClient for handling HTTP requests.
          Here are some common patterns and best practices.
        </p>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>Basic HTTP Request</h3>
          <button class="toggle-button" (click)="toggleCode('basicRequest')">
            {{ showCode.basicRequest ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <pre *ngIf="showCode.basicRequest"><code [innerText]="basicRequest"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>Cancelable Requests</h3>
          <button class="toggle-button" (click)="toggleCode('cancelableRequest')">
            {{ showCode.cancelableRequest ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <p>
          Use switchMap to automatically cancel previous requests when a new one is made.
          This is particularly useful for search functionality.
        </p>
        <pre *ngIf="showCode.cancelableRequest"><code [innerText]="cancelableRequest"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>Request Caching</h3>
          <button class="toggle-button" (click)="toggleCode('requestCaching')">
            {{ showCode.requestCaching ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <p>
          Cache HTTP responses to avoid duplicate requests.
        </p>
        <pre *ngIf="showCode.requestCaching"><code [innerText]="requestCaching"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>Parallel Requests</h3>
          <button class="toggle-button" (click)="toggleCode('parallelRequests')">
            {{ showCode.parallelRequests ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <p>
          Make multiple requests in parallel and wait for all to complete.
        </p>
        <pre *ngIf="showCode.parallelRequests"><code [innerText]="parallelRequests"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>Sequential Requests</h3>
          <button class="toggle-button" (click)="toggleCode('sequentialRequests')">
            {{ showCode.sequentialRequests ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <p>
          Make requests one after another, using data from previous requests.
        </p>
        <pre *ngIf="showCode.sequentialRequests"><code [innerText]="sequentialRequests"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>Error Handling</h3>
          <button class="toggle-button" (click)="toggleCode('errorHandling')">
            {{ showCode.errorHandling ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <p>
          Handle errors at different levels of the request chain.
        </p>
        <pre *ngIf="showCode.errorHandling"><code [innerText]="errorHandling"></code></pre>
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
export class HttpRequestsComponent {
    showCode = {
        basicRequest: false,
        cancelableRequest: false,
        requestCaching: false,
        parallelRequests: false,
        sequentialRequests: false,
        errorHandling: false
    };

    toggleCode(key: string) {
        this.showCode[key as keyof typeof this.showCode] = !this.showCode[key as keyof typeof this.showCode];
    }
    basicRequest = `// Basic GET request
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  // In component
  users$ = this.dataService.getUsers().pipe(
    catchError(error => {
      console.error('Error loading users:', error);
      return of([]);
    })
  );
}

// In template
// <div *ngFor="let user of users$ | async">{{ user.name }}</div>`;

    cancelableRequest = `// Cancelable search
@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>('/api/search', { params: { q: term } });
  }
}

// In component
searchResults$ = this.searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => 
    term ? this.searchService.search(term) : of([])
  )
);`;

    requestCaching = `// Request caching with shareReplay
@Injectable({ providedIn: 'root' })
export class ProductService {
  private products$: Observable<Product[]>;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    if (!this.products$) {
      this.products$ = this.http.get<Product[]>('/api/products').pipe(
        shareReplay(1) // Cache the last emitted value
      );
    }
    return this.products$;
  }

  // Clear cache if needed
  clearCache() {
    this.products$ = null;
  }
}`;

    parallelRequests = `// Parallel requests with forkJoin
loadDashboardData() {
  return forkJoin({
    users: this.http.get('/api/users'),
    posts: this.http.get('/api/posts'),
    stats: this.http.get('/api/stats')
  });
}

// In component
dashboardData$ = this.dashboardService.loadDashboardData();`;

    sequentialRequests = `// Sequential requests with switchMap
loadUserDetails(userId: string) {
  return this.http.get('/api/users/' + userId).pipe(
    switchMap(user => {
      return this.http.get('/api/users/' + userId + '/permissions').pipe(
        map(permissions => ({
          ...user,
          permissions
        }))
      );
    })
  );
}`;

    errorHandling = `// Error handling
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Client-side or network error
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('Network error'));
    }
    // Backend returned an unsuccessful response code
    console.error('Backend returned code ' + error.status + ', body was:', error.error);
    return throwError(() => new Error('Something went wrong'));
  }

  getResource<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}

// In component
loadData() {
  this.loading = true;
  this.apiService.getResource<Data>('/api/data')
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: data => this.data = data,
      error: err => this.error = err.message
    });
}`;
}