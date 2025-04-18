import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResultatsService } from '../../services/resultats.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public resultatsService: ResultatsService) { }
}