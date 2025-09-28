import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, finalize, retry } from 'rxjs/operators';
import { of, throwError, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-error-handling',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content">
      <h2>Error Handling in RxJS</h2>
      
      <section class="section">
        <p>
          Proper error handling is crucial for building robust applications.
          RxJS provides several operators to handle errors effectively.
        </p>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>catchError</h3>
          <button class="toggle-button" (click)="toggleCode('catchError')">
            {{ showCode.catchError ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Catches errors from the source observable</li>
          <li>Must return a new observable</li>
          <li>Can be used to provide fallback values</li>
        </ul>
        <pre *ngIf="showCode.catchError"><code [innerText]="catchErrorExample"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>retry</h3>
          <button class="toggle-button" (click)="toggleCode('retry')">
            {{ showCode.retry ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Re-subscribes to the source observable on error</li>
          <li>Can be configured with a maximum number of retries</li>
          <li>Useful for transient errors (like network issues)</li>
        </ul>
        <pre *ngIf="showCode.retry"><code [innerText]="retryExample"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>finalize</h3>
          <button class="toggle-button" (click)="toggleCode('finalize')">
            {{ showCode.finalize ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Called when the observable completes or errors</li>
          <li>Perfect for cleanup operations</li>
          <li>Similar to try/finally in synchronous code</li>
        </ul>
        <pre *ngIf="showCode.finalize"><code [innerText]="finalizeExample"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>Error Handling Strategies</h3>
          <button class="toggle-button" (click)="toggleCode('strategies')">
            {{ showCode.strategies ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <div *ngIf="showCode.strategies">
          <h4>Local Error Handling</h4>
          <pre><code [innerText]="localErrorHandling"></code></pre>
          
          <h4>Global Error Handler</h4>
          <pre><code [innerText]="globalErrorHandler"></code></pre>
        </div>
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
    ul {
      padding-left: 1.5rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
    h4 {
      margin: 1.5rem 0 0.5rem 0;
      color: #333;
    }
  `]
})
export class ErrorHandlingComponent {
  showCode = {
    catchError: false,
    retry: false,
    finalize: false,
    strategies: false
  };

  toggleCode(key: string) {
    this.showCode[key as keyof typeof this.showCode] = !this.showCode[key as keyof typeof this.showCode];
  }
  catchErrorExample = `// Basic error handling
this.http.get('/api/data').pipe(
  catchError(error => {
    console.error('Error fetching data:', error);
    // Return a fallback value
    return of([]);
  })
).subscribe(data => {
  console.log('Data:', data);
});`;

  retryExample = `// Retry failed requests
this.http.get('/api/data').pipe(
  retry({
    count: 3,
    delay: (error, retryCount) => {
      // Exponential backoff
      return timer(1000 * Math.pow(2, retryCount));
    }
  })
).subscribe({
  next: data => console.log('Data:', data),
  error: err => console.error('Failed after retries:', err)
});`;

  finalizeExample = `// Cleanup with finalize
const loading = true;
this.dataService.getData().pipe(
  finalize(() => {
    loading = false;
    console.log('Request completed');
  })
).subscribe(data => {
  console.log('Data:', data);
});`;

  localErrorHandling = `// Local error handling in a service
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('/api/data').pipe(
      catchError(error => {
        // Handle specific error cases
        if (error.status === 404) {
          return throwError(() => new Error('Data not found'));
        }
        // Re-throw other errors
        return throwError(() => error);
      })
    );
  }
}`;

  globalErrorHandler = `// Global error handler
@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService) {}

  handleError(error: any): void {
    // Log to a logging service
    this.errorService.logError(error);
    
    // Show user-friendly message
    const message = this.getUserFriendlyMessage(error);
    this.notificationService.showError(message);
  }

  private getUserFriendlyMessage(error: any): string {
    // Customize based on error type
    if (error.status === 0) {
      return 'Unable to connect to the server. Please check your connection.';
    }
    return error.message || 'An unexpected error occurred.';
  }
}

// In app.module.ts
providers: [
  { provide: ErrorHandler, useClass: GlobalErrorHandler }
]`;
}
