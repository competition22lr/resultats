import { Component } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from "./components/header/header.component"; // adapte le chemin selon ton projet

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, SideNavComponent] 
})
export class AppComponent {}