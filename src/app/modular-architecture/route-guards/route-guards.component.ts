import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '../../shared/tabs/tabs.component';
import { TabComponent } from '../../shared/tabs/tabs.component';

@Component({
    selector: 'app-route-guards',
    standalone: true,
    imports: [CommonModule, TabsComponent, TabComponent],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="content">
      <h1>Route Guards & Resolvers</h1>
      <p>
        Route Guards control access to routes and handle navigation scenarios in your Angular application. 
        They are essential for implementing features like authentication, authorization, and data pre-fetching.
      </p>
      
      <h2>Route Guards</h2>
      <p>
        Guards control access to routes in different scenarios:
      </p>
      
      <app-tabs>
        <app-tab title="CanActivate">
          <p>Controls if a route can be activated (e.g., user must be logged in)</p>
          <pre><code>{{canActivateCode}}</code></pre>
        </app-tab>
        
        <app-tab title="CanLoad">
          <p>Controls if a lazy-loaded module can be loaded (protects the bundle download)</p>
          <pre><code>{{canLoadCode}}</code></pre>
        </app-tab>
        
        <app-tab title="CanActivateChild">
          <p>Controls access to child routes</p>
          <pre><code>{{canActivateChildCode}}</code></pre>
        </app-tab>
        
        <app-tab title="CanMatch">
          <p>Dynamically decides which route should match (Angular 14+)</p>
          <pre><code>{{canMatchCode}}</code></pre>
        </app-tab>
        
        <app-tab title="CanDeactivate">
          <p>Controls if a user can leave a route (e.g., with unsaved changes)</p>
          <pre><code>{{canDeactivateCode}}</code></pre>
        </app-tab>
      </app-tabs>
      
      <h2>Resolvers</h2>
      <p>
        Resolvers allow you to fetch data before the component is activated, providing a smoother user experience 
        by eliminating the "flicker" of loading states.
      </p>
      
      <pre><code>{{resolverCode}}</code></pre>
      
      <h2>Combining Guards and Resolvers</h2>
      <p>
        You can combine guards and resolvers for a complete solution:
      </p>
      <ol>
        <li>First, the guard checks if the user has access</li>
        <li>If access is granted, the resolver fetches the required data</li>
        <li>Finally, the component is activated with the data already available</li>
      </ol>
      
      <pre><code>{{combinedExampleCode}}</code></pre>
      
      <h2>Browser-Level Protection</h2>
      <p>
        For protecting against accidental page refreshes or navigation away from the page, you can use the browser's 
        <code>beforeunload</code> event:
      </p>
      
      <pre><code>{{beforeUnloadCode}}</code></pre>
    </div>
  `,
    styles: [`
    .content {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    pre {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
    }
    code {
      font-family: 'Courier New', monospace;
    }
    h2 {
      margin-top: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    ol, ul {
      margin: 15px 0;
      padding-left: 25px;
    }
    li {
      margin-bottom: 8px;
    }
  `]
})
export class RouteGuardsComponent {
    canActivateCode = `@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}`;

    canLoadCode = `@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}`;

    canActivateChildCode = `@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivateChild {
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.auth.isAdmin();
  }
}`;

    canMatchCode = `const routes: Routes = [
  {
    path: 'admin',
    canMatch: [RoleGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { role: 'admin' }
  },
  {
    path: 'admin',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];`;

    canDeactivateCode = `@Injectable({ providedIn: 'root' })
export class PendingChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return component.canDeactivate ? 
      component.canDeactivate() : 
      true;
  }
}

// In your component:
export class YourComponent implements CanComponentDeactivate {
  form: FormGroup;
  
  canDeactivate(): boolean | Observable<boolean> {
    if (this.form.pristine) return true;
    
    // Show confirmation dialog
    return confirm('You have unsaved changes. Leave anyway?');
  }
}`;

    resolverCode = `@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService) {}
  
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<User> | Promise<User> | User {
    const id = route.paramMap.get('id');
    return this.userService.getUser(id);
  }
}

// In routing:
const routes: Routes = [
  {
    path: 'user/:id',
    component: UserDetailComponent,
    resolve: {
      user: UserResolver
    }
  }
];

// In component:
export class UserDetailComponent {
  user$ = this.route.data.pipe(map(d => d['user']));
  
  constructor(private route: ActivatedRoute) {}
}`;

    combinedExampleCode = `const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      userProfile: ProfileResolver,
      notifications: NotificationsResolver
    },
    children: [
      {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  }
];`;

    beforeUnloadCode = `@Component({
  // ...
})
export class FormComponent {
  form: FormGroup;
  
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    if (this.form.dirty) {
      event.preventDefault();
      // Standard for most browsers
      event.returnValue = '';
      // For older browsers
      return false;
    }
  }
  
  // Also handle in-app navigation
  canDeactivate(): boolean | Observable<boolean> {
    if (this.form.pristine) return true;
    return confirm('You have unsaved changes. Leave anyway?');
  }
}`;
}
