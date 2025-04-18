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
      const paramCompetition = params.get('competition');
      const paramMois = params.get('mois');
  
      this.indexCompetitionSelectionne = paramCompetition !== null ? Number(paramCompetition)?Number(paramCompetition) :0 : 0;
      // ✅ Décodage des underscores → points
      this._moisSelectionne = paramMois !== null ? paramMois.replace(/_/g, '.') : '';

  
      console.log("params.get('competition') =>", paramCompetition);
      console.log("params.get('mois') =>", paramMois);
  
      console.log("this.indexCompetitionSelectionne =>", this.indexCompetitionSelectionne);
      console.log("this._moisSelectionne =>", this._moisSelectionne);

      // Charge la compétition
      this.resultatsService.getCompetition(this.indexCompetitionSelectionne).subscribe(competition => {
        this.competitionSelectionnee = competition;
  
        console.log("this.competitionSelectionnee =>", this.competitionSelectionnee);

        // Fallback : si aucun mois dans l'URL ou s'il n'est pas trouvé, on prend le premier
        this.moisSelectionne =
          this.competitionSelectionnee.mois.find(m => m.name.toLowerCase() === this._moisSelectionne.toLowerCase()) ||
          this.competitionSelectionnee.mois[0];
  
        this._moisSelectionne = this.moisSelectionne.name;
  
        console.log("mois sélectionné :", this.moisSelectionne);
  
        // Ensuite on récupère les participants
        this.resultatsService
          .getParticipantsPourMois(this.indexCompetitionSelectionne, this._moisSelectionne)
          .subscribe((_Participant: Participant[]) => {
            this.participants = _Participant;
            console.log("participants =>", this.participants);
          });
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