import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

// This module is now a simple wrapper that can be used to organize shared components
// All components are standalone and should be imported directly where needed

@NgModule({
  imports: [
    CommonModule,
    SpinnerComponent // Import standalone component
  ],
  exports: [
    CommonModule,
    SpinnerComponent
  ]
})
export class SharedModule { }
