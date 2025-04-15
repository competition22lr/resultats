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
import { Participant } from '../../models/resultats.model';
import { HeaderComponent } from "../header/header.component";




@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatFormFieldModule,
    MatInputModule, MatToolbarModule, MatSelectModule, MatCardModule, MatIconModule, HeaderComponent],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
  
})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  moisDispo: string[] = [];
  moisSelectionne: string = '';
  resultats: Participant[] = [];
  resultatsFiltres: Participant[] = [];
  isMobile = false;

  constructor(private resultatsService: ResultatsService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    this.resultatsService.getResultats().subscribe(data => {
      this.moisDispo = data.getMoisDisponibles();
      if (this.moisDispo.length > 0) {
        this.moisSelectionne = this.moisDispo[0];
        this.onMoisChange();
      }
    });
  }

  onMoisChange(): void {
    this.resultatsService.getParticipantsParMois(this.moisSelectionne).subscribe(resultats => {
      this.resultats = resultats;
      this.resultatsFiltres = [...resultats];
    });
  }

  participantSelectionne: Participant | null = null;

  onSelectParticipant(participant: Participant): void {
    this.participantSelectionne = participant;
    if (this.isMobile && this.drawer) {
      this.drawer.close(); // referme le menu après clic
    }
  }

  getClassementColor(classement: string): string {
    switch (classement.toLowerCase()) {
      case 'platine': return '#b3e5fc'; // bleu pâle
      case 'or': return '#fff9c4';      // jaune pâle
      case 'argent': return '#e0e0e0';  // gris clair
      case 'bronze': return '#ffe0b2';  // orange pâle
      default: return '#f5f5f5';        // fond neutre
    }
  }

}
