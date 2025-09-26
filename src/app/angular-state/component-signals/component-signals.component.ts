import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-component-signals',
  standalone: true,
  templateUrl: './component-signals.component.html',
})
export class ComponentSignalsComponent {
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((value) => !value);
  }
}
