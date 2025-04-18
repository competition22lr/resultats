import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';
import { MoisResultats } from '../../models/mois-resultats.model';
import { filter } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatFormFieldModule,
    MatInputModule, MatToolbarModule, MatSelectModule, MatCardModule, MatIconModule,
    RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']

})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  competitionsDispo: string[] = [];
  moisDispo: MoisResultats[] = [];
  showClassement = true;
  moisSelectionne!: MoisResultats;
  isMobile = false;
  indexCompetitionSelectionne: number = 0;

  constructor(private resultatsService: ResultatsService,
    private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router) {

    // Écoute les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showClassement = !event.url.includes('/reglements');
    });
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    // Récupère les paramètres de l'URL
    this.route.paramMap.subscribe(params => {
      const competitionParam = params.get('competition');
      this.indexCompetitionSelectionne = competitionParam ? +competitionParam : 0;

      this.resultatsService.getResultats().subscribe(data => {
        this.competitionsDispo = data.getCompetitionsDisponibles();

        // Actualise les mois pour la compétition actuelle
        this.moisDispo = data.getMoisDisponibles(this.indexCompetitionSelectionne);

        if (this.moisDispo.length > 0) {
          this.moisSelectionne = this.moisDispo[0];
        }
      });
    });
  }

  onCompetitionChange(index: number) {
    this.indexCompetitionSelectionne = index;

    this.resultatsService.getMoisResultats(index).subscribe((_moisResultats: MoisResultats[]) => {
      this.moisDispo = _moisResultats;

      if (this.moisDispo.length > 0) {
        this.moisSelectionne = this.moisDispo[0];

        // 🔁 Redirige avec mois encodé (remplace les points par underscore)
        const moisEncoded = this.moisSelectionne.name.toLowerCase().replace(/\./g, '_');
        this.router.navigate(['/classement', index, moisEncoded]);
      }
    });
  }

  encodeMois(mois: string): string {
    return mois.toLowerCase().replace(/\./g, '_');
  }

  onMoisChange(moisSelectionne: MoisResultats): void {
    this.moisSelectionne = moisSelectionne;

    // Fermer le sidenav si on est en mode mobile
    if (this.isMobile && this.drawer) {
      this.drawer.close();
    }
  }
}
