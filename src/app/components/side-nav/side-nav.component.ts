import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';
import { ClassementMensuelComponent } from "../classement-mensuel/classement-mensuel.component";
import { MoisResultats } from '../../models/mois-resultats.model';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatFormFieldModule,
    MatInputModule, MatToolbarModule, MatSelectModule, MatCardModule, MatIconModule, ClassementMensuelComponent],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
  
})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  competitionsDispo:string[] = [];
  moisDispo: MoisResultats[] = [];
  
  moisSelectionne!: MoisResultats;
  isMobile = false;
  indexCompetitionSelectionne: number = 0;

  constructor(private resultatsService: ResultatsService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    this.resultatsService.getResultats().subscribe(data => {
      this.competitionsDispo = data.getCompetitionsDisponibles();
      this.moisDispo = data.getMoisDisponibles(this.indexCompetitionSelectionne);

      if (this.moisDispo.length > 0) {
        this.moisSelectionne = this.moisDispo[0];
        this.onMoisChange(this.moisSelectionne);
      }
    });
  }

onCompetitionChange(competitionSelectionnee: string) {
  this.indexCompetitionSelectionne = this.competitionsDispo.indexOf(competitionSelectionnee);

  console.log('Compétition sélectionnée :', this.indexCompetitionSelectionne); 
  this.resultatsService.getMoisResultats(this.indexCompetitionSelectionne).subscribe((_moisResultats: MoisResultats[])=>{
    this.moisDispo =_moisResultats;
    this.moisSelectionne = this.moisDispo[0];
  });
}

  onMoisChange(moisSelectionne:MoisResultats): void {   
    this.moisSelectionne = moisSelectionne;

    // Fermer le sidenav si on est en mode mobile
    if (this.isMobile && this.drawer) {
      this.drawer.close();
    }
  }
}
