import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-higher-order',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content">
      <h2>Higher-order Mapping Operators</h2>
      
      <section class="section">
        <p>
          Higher-order operators are used when an observable emits other observables. 
          They help manage the inner observables' lifecycle.
        </p>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>switchMap</h3>
          <button class="toggle-button" (click)="toggleCode('switchMap')">
            {{ showCode.switchMap ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Cancels the previous inner observable when a new one arrives</li>
          <li>Ideal for search inputs or autocomplete</li>
          <li>Only keeps the latest subscription active</li>
        </ul>
        <pre *ngIf="showCode.switchMap"><code [innerText]="switchMapExample"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>mergeMap (flatMap)</h3>
          <button class="toggle-button" (click)="toggleCode('mergeMap')">
            {{ showCode.mergeMap ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Runs all inner observables in parallel</li>
          <li>Good for independent operations where order doesn't matter</li>
          <li>Can lead to memory leaks if not managed properly</li>
        </ul>
        <pre *ngIf="showCode.mergeMap"><code [innerText]="mergeMapExample"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>concatMap</h3>
          <button class="toggle-button" (click)="toggleCode('concatMap')">
            {{ showCode.concatMap ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Processes inner observables one after another</li>
          <li>Maintains order of execution</li>
          <li>Useful for operations that must be sequential</li>
        </ul>
        <pre *ngIf="showCode.concatMap"><code [innerText]="concatMapExample"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>exhaustMap</h3>
          <button class="toggle-button" (click)="toggleCode('exhaustMap')">
            {{ showCode.exhaustMap ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Ignores new values while processing current</li>
          <li>Perfect for preventing duplicate form submissions</li>
          <li>Only processes one request at a time</li>
        </ul>
        <pre *ngIf="showCode.exhaustMap"><code [innerText]="exhaustMapExample"></code></pre>
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
  `]
})
export class HigherOrderComponent {
  showCode = {
    switchMap: false,
    mergeMap: false,
    concatMap: false,
    exhaustMap: false
  };

  toggleCode(key: string) {
    this.showCode[key as keyof typeof this.showCode] = !this.showCode[key as keyof typeof this.showCode];
  }
  switchMapExample = `// Search input example
this.searchInput.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => this.searchService.search(query))
).subscribe(results => {
  // Handle search results
});`;

  mergeMapExample = `// Multiple parallel requests
const userIds = [1, 2, 3];
from(userIds).pipe(
  mergeMap(id => this.userService.getUser(id))
).subscribe(user => {
  // Process each user as they arrive
});`;

  concatMapExample = `// Sequential requests
const actions = [action1$, action2$, action3$];
from(actions).pipe(
  concatMap(action => action)
).subscribe(result => {
  // Process results in order
});`;

  exhaustMapExample = `// Form submission
this.form.valueChanges.pipe(
  exhaustMap(formData => this.api.submitForm(formData))
).subscribe(response => {
  // Handle response
});`;
}
