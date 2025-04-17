import { Component, Input, OnInit } from '@angular/core';
import { Participant } from '../../models/participant.model';
import { CommonModule } from '@angular/common';
import { ResultatsService } from '../../services/resultats.service';
import { MoisResultats } from '../../models/mois-resultats.model';
import { ActivatedRoute } from '@angular/router';
import { Competition } from '../../models/competition.model';

@Component({
  selector: 'app-classement-mensuel',
  imports: [CommonModule],
  templateUrl: './classement-mensuel.component.html',
  styleUrls: ['./classement-mensuel.component.css']
})
export class ClassementMensuelComponent implements OnInit {
  participants: Participant[] = [];
  competitionSelectionnee!: Competition;
  moisSelectionne?: MoisResultats;
  indexCompetitionSelectionne!: number;
  private _moisSelectionne!: string;

  constructor(public resultatsService: ResultatsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.indexCompetitionSelectionne = Number(params.get('competition')) || 0;
      this._moisSelectionne = params.get('mois') || '';
  
      console.log("params.get('competition') =>", params.get('competition'));
      console.log("params.get('mois') =>", params.get('mois'));
  
      this.resultatsService.getCompetition(this.indexCompetitionSelectionne).subscribe(competition => {
        this.competitionSelectionnee = competition;
  
        // Cas où le mois est "mois" ou vide => on prend le premier disponible
        if (this._moisSelectionne === '' || this._moisSelectionne.toLowerCase() === 'mois') {
          this.moisSelectionne = this.competitionSelectionnee.mois[0];
        } else {
          this.moisSelectionne = this.competitionSelectionnee.mois.find(m =>
            m.name.toLowerCase() === this._moisSelectionne.toLowerCase()
          );
        }
  
        // Met à jour _moisSelectionne avec le vrai nom si trouvé
        this._moisSelectionne = this.moisSelectionne?.name || '';
  
        console.log("Mois sélectionné =>", this._moisSelectionne);
  
        // Appel des participants seulement une fois le mois trouvé
        if (this._moisSelectionne) {
          this.resultatsService
            .getParticipantsPourMois(this.indexCompetitionSelectionne, this._moisSelectionne)
            .subscribe((participants: Participant[]) => {
              this.participants = participants;
              console.log("Participants =>", this.participants);
            });
        }
      });
    });
  }
  

  get topParticipants() {
    let top5: Participant[] = this.participants.filter(p => p.aClassement());

    return top5;
  }

  getTrophyImage(classement: string): string {
    let imgPrefix = "logoCompetition";
    let imgSufix = ".png";
    return this.resultatsService.imageLocationUrl + imgPrefix + classement + imgSufix;
  }
}