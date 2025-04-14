import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule,MatToolbarModule,MatSelectModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  moisDispo: string[] = [];
  moisSelectionne = '';
  resultats: any[] = [];
  resultatsFiltres: any[] = [];

  constructor(private resultatsService: ResultatsService) {}

  ngOnInit(): void {
    this.resultatsService.getResultats().subscribe((data) => {
      this.moisDispo = data.moisDispo;
      this.moisSelectionne = this.moisDispo[0] || '';
      this.resultats = data.resultats;
      this.resultatsFiltres = [...this.resultats];
    });
  }
  
  // méthode pour mettre à jour en fonction du mois sélectionné
onMoisChange(): void {
  this.resultatsService.getResultatsParMois(this.moisSelectionne).subscribe(resultats => {
    this.resultats = resultats;
    this.resultatsFiltres = [...resultats];
  });
}
  
  filtrer(event: Event): void {
    const valeur = (event.target as HTMLInputElement).value.toLowerCase();
    this.resultatsFiltres = this.resultats.filter((r) =>
      r.nom.toLowerCase().includes(valeur) || r.score.toString().includes(valeur)
    );
  }
}
