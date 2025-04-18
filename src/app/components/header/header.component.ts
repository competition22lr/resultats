import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResultatsService } from '../../services/resultats.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public resultatsService: ResultatsService) { }
}