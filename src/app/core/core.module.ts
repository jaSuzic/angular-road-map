import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

// This module is now a simple wrapper that can be used to provide core services
// All components are standalone and should be imported directly where needed

@NgModule({
  imports: [
    CommonModule,
    NavbarComponent // Import standalone component
  ],
  exports: [NavbarComponent],
  providers: [
    // Add any core services here
  ]
})
export class CoreModule { }
