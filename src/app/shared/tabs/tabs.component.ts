import { Component, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule, NgIf],
  template: `
    <div *ngIf="active" class="tab-content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-content { 
      padding: 15px;
    }
  `]
})
export class TabComponent {
  @Input() title: string = '';
  active = false;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, NgFor], // Remove TabComponent from imports as it's not directly used in the template
  template: `
    <div class="tabs">
      <ul class="tab-nav">
        <li *ngFor="let tab of tabs" 
            (click)="selectTab(tab)"
            [class.active]="tab.active">
          {{ tab.title }}
        </li>
      </ul>
      <div class="tab-content-container">
        <ng-content select="app-tab"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .tabs { 
      margin: 20px 0; 
      font-family: Arial, sans-serif;
    }
    .tab-nav {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      border-bottom: 1px solid #ddd;
    }
    .tab-nav li {
      padding: 10px 20px;
      cursor: pointer;
      background: #f5f5f5;
      margin-right: 5px;
      border: 1px solid #ddd;
      border-bottom: none;
      border-radius: 4px 4px 0 0;
      transition: all 0.2s ease;
    }
    .tab-nav li:hover {
      background: #e9e9e9;
    }
    .tab-nav li.active {
      background: white;
      border-bottom: 1px solid white;
      margin-bottom: -1px;
      font-weight: bold;
    }
    .tab-content-container {
      padding: 15px;
      border: 1px solid #ddd;
      border-top: none;
      border-radius: 0 0 4px 4px;
    }
  `]
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit() {
    // Activate first tab by default if none are active
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (activeTabs.length === 0 && this.tabs.length > 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(selectedTab: TabComponent) {
    // Deactivate all tabs
    this.tabs.forEach(tab => tab.active = false);
    
    // Activate the selected tab
    selectedTab.active = true;
  }
}
