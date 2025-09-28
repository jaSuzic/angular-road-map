import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dependency-injection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dependency-injection.component.html',
  styleUrls: ['./dependency-injection.component.scss']
})
export class DependencyInjectionComponent {
  showCode = false;
  
  // Example code blocks
  multiProviderExample = `// Logger service interface
interface Logger {
  log(message: string): void;
}

// Console logger implementation
@Injectable({ providedIn: 'root' })
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log('Console:', message);
  }
}

// File logger implementation
@Injectable({ providedIn: 'root' })
export class FileLogger implements Logger {
  log(message: string): void {
    // Implementation for file logging
  }
}

// Register both implementations
@NgModule({
  providers: [
    { provide: LOGGER, useClass: ConsoleLogger, multi: true },
    { provide: LOGGER, useClass: FileLogger, multi: true }
  ]
})
export class LoggingModule { }

// Usage
constructor(@Inject(LOGGER) private loggers: Logger[]) {}

logMessage(message: string) {
  this.loggers.forEach(logger => logger.log(message));
}`;

  injectionTokenExample = `// Create an injection token
export const API_URL = new InjectionToken<string>('API_URL');

// Provide a value for the token
@NgModule({
  providers: [
    { provide: API_URL, useValue: 'https://api.example.com' }
  ]
})
export class CoreModule {}

// Inject the value
constructor(@Inject(API_URL) private apiUrl: string) {
  console.log('API URL:', this.apiUrl);
}`;

  treeShakableExample = `// Service will be tree-shaken if not used
@Injectable({
  providedIn: 'root'  // Available app-wide but tree-shakable
})
export class DataService {
  // Service implementation
}

// Available only in specific module
@Injectable({
  providedIn: SomeFeatureModule
})
export class FeatureService {}

// New instance for each lazy-loaded module
@Injectable({
  providedIn: 'any'
})
export class UserService {}`;
  
  toggleCode() {
    this.showCode = !this.showCode;
  }
}
