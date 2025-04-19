import { Component } from '@angular/core';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from "./components/header/header.component"; // adapte le chemin selon ton projet

import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, SideNavComponent, RouterModule]
})
export class AppComponent {
  showClassement = true;

  constructor(private router: Router) {
    // ecoute les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showClassement = !event.url.includes('/reglements');
    });
  }
}
