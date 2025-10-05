import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
@Component({
    selector: 'app-separation-of-concerns',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './separation-of-concerns.component.html',
    styleUrls: ['./separation-of-concerns.component.scss']
})
export class SeparationOfConcernsComponent {
    showExample = false;
    activeTab = 0;
    codeTabs = ['api.service.ts', 'todo.store.ts', 'todo.facade.ts', 'todo.component.ts'];
    
    apiServiceCode = `@Injectable({ providedIn: 'root' })
export class TodoApi {
  constructor(private http: HttpClient) {}
  
  list() { 
    return this.http.get<Todo[]>('/api/todos'); 
  }
  
  add(dto: { title: string }) { 
    return this.http.post<Todo>('/api/todos', dto); 
  }
}`;

    storeCode = `@Injectable({ providedIn: 'root' })
export class TodoStore {
  private _todos = signal<Todo[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  // Read-only signals
  readonly todos = computed(() => this._todos());
  readonly loading = computed(() => this._loading());
  readonly error = computed(() => this._error());

  // Mutators
  setLoading(v: boolean) { this._loading.set(v); }
  setError(msg: string | null) { this._error.set(msg); }
  setTodos(v: Todo[]) { this._todos.set(v); }
  pushTodo(t: Todo) { this._todos.update(arr => [t, ...arr]); }
}`;

    facadeCode = `@Injectable({ providedIn: 'root' })
export class TodoFacade {
  // Expose read-only signals to components
  todos = this.store.todos;
  loading = this.store.loading;
  error = this.store.error;

  constructor(
    private api: TodoApi, 
    private store: TodoStore
  ) {}

  load() {
    this.store.setLoading(true);
    this.api.list().pipe(
      finalize(() => this.store.setLoading(false)),
      catchError(err => {
        this.store.setError('Load failed');
        return EMPTY;
      })
    ).subscribe(list => this.store.setTodos(list));
  }

  add(title: string) {
    this.api.add({ title }).pipe(
      catchError(err => {
        this.store.setError('Add failed');
        return EMPTY;
      })
    ).subscribe(t => this.store.pushTodo(t));
  }
}`;

    componentCode = `@Component({
  standalone: true,
  selector: 'app-todos',
  imports: [CommonModule, FormsModule],
  template: \`
    <button (click)="facade.load()" [disabled]="facade.loading()">
      Reload
    </button>
    
    <div *ngIf="facade.loading()">Loading...</div>
    <div *ngIf="facade.error()" class="error">
      {{ facade.error() }}
    </div>

    <form (ngSubmit)="add()">
      <input 
        [(ngModel)]="title" 
        name="title" 
        placeholder="New todo"
        [disabled]="facade.loading()"
      />
      <button [disabled]="!title.trim() || facade.loading()">
        Add
      </button>
    </form>

    <ul>
      <li *ngFor="let t of facade.todos()">
        {{ t.title }}
      </li>
    </ul>
  \`
})
export class TodoComponent {
  title = '';
  
  constructor(public facade: TodoFacade) {}
  
  add() {
    if (this.title.trim()) { 
      this.facade.add(this.title.trim()); 
      this.title = ''; 
    } 
  }
}`;
}