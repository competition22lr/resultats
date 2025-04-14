import { Component } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component'; // adapte le chemin selon ton projet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideNavComponent],  
  template: `<app-side-nav></app-side-nav>`,
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {}