import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, concat, fromEvent, merge, of } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-combination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content">
      <h2>Combination Operators</h2>
      
      <section class="section">
        <p>
          Combination operators allow you to combine multiple observables into one.
          Each operator has different strategies for handling the combination.
        </p>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>forkJoin</h3>
          <button class="toggle-button" (click)="toggleCode('forkJoin')">
            {{ showCode.forkJoin ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Waits for all observables to complete</li>
          <li>Emits the last value from each observable as an array</li>
          <li>Useful for parallel requests where you need all results</li>
        </ul>
        <pre *ngIf="showCode.forkJoin"><code [innerText]="forkJoinExample"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>combineLatest</h3>
          <button class="toggle-button" (click)="toggleCode('combineLatest')">
            {{ showCode.combineLatest ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Emits whenever any source observable emits</li>
          <li>Provides the latest value from each observable</li>
          <li>Useful for forms with multiple inputs</li>
        </ul>
        <pre *ngIf="showCode.combineLatest"><code [innerText]="combineLatestExample"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>merge</h3>
          <button class="toggle-button" (click)="toggleCode('merge')">
            {{ showCode.merge ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Combines multiple observables into one</li>
          <li>Emits values as they arrive from any source</li>
          <li>Order is not guaranteed</li>
        </ul>
        <pre *ngIf="showCode.merge"><code [innerText]="mergeExample"></code></pre>
      </section>

      <section class="section">
        <div class="example-header">
          <h3>concat</h3>
          <button class="toggle-button" (click)="toggleCode('concat')">
            {{ showCode.concat ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
        <ul>
          <li>Subscribes to observables in order</li>
          <li>Only subscribes to next observable when previous completes</li>
          <li>Maintains order of observables</li>
        </ul>
        <pre *ngIf="showCode.concat"><code [innerText]="concatExample"></code></pre>
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
export class CombinationComponent {
  showCode = {
    forkJoin: false,
    combineLatest: false,
    merge: false,
    concat: false
  };

  toggleCode(key: string) {
    this.showCode[key as keyof typeof this.showCode] = !this.showCode[key as keyof typeof this.showCode];
  }
  forkJoinExample = `// Wait for multiple HTTP requests
forkJoin([
  this.http.get('/api/users'),
  this.http.get('/api/posts'),
  this.http.get('/api/comments')
]).subscribe({
  next: ([users, posts, comments]) => {
    console.log('Users:', users);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
  },
  error: err => console.error('Error:', err)
});`;

  combineLatestExample = `// Example with form controls
// First, define your form in the component:
// this.form = this.fb.group({
//   firstName: [''],
//   lastName: ['']
// });

// Then use combineLatest to react to changes in either field
combineLatest([
  this.form.get('firstName')?.valueChanges || of(''),
  this.form.get('lastName')?.valueChanges || of('')
]).subscribe(([firstName, lastName]) => {
  console.log('Full name:', firstName + ' ' + lastName);
});

// Example with startWith for initial values
combineLatest([
  (this.form.get('firstName')?.valueChanges || of('')).pipe(startWith('')),
  (this.form.get('lastName')?.valueChanges || of('')).pipe(startWith(''))
]).subscribe(([firstName, lastName]) => {
  console.log('Full name (with initial):', firstName + ' ' + lastName);
});`;

  mergeExample = `// Merge multiple event streams
const clicks$ = fromEvent(document, 'click');
const keys$ = fromEvent(document, 'keydown');

// Merge both streams
merge(clicks$, keys$).subscribe(event => {
  console.log('Event:', event.type);
});

// With mapping to different actions
merge(
  clicks$.pipe(map(() => 'click')),
  keys$.pipe(map(() => 'key'))
).subscribe(type => {
  console.log('Event type:', type);
});`;

  concatExample = `// Sequential requests
concat(
  this.userService.getUser(1),
  this.userService.getUser(2),
  this.userService.getUser(3)
).subscribe({
  next: user => console.log('User loaded:', user),
  error: err => console.error('Error loading user:', err),
  complete: () => console.log('All users loaded')
});

// With delay between requests
concat(
  this.userService.getUser(1).pipe(delay(1000)),
  this.userService.getUser(2),
  this.userService.getUser(3)
).subscribe(user => {
  console.log('Delayed user:', user);
});`;
}
