import { Component, Input } from '@angular/core';
import { Participant } from '../../models/participant.model';
import { CommonModule } from '@angular/common';
import { ResultatsService } from '../../services/resultats.service';
import { MoisResultats } from '../../models/mois-resultats.model';

@Component({
  selector: 'app-classement-mensuel',
  imports: [CommonModule],
  templateUrl: './classement-mensuel.component.html',
  styleUrls: ['./classement-mensuel.component.css']
})
export class ClassementMensuelComponent {
  // @Input() participants: Participant[] = [];
  @Input() moisSelectionne!: MoisResultats ;

  constructor(public resultatsService: ResultatsService) { }

  get topParticipants() {

    let top5: Participant[] = this.moisSelectionne.participants.filter(p => p.aClassement());

    return top5;
  }

  getTrophyImage(classement: string): string {
    let imgPrefix = "logoCompetition";
    let imgSufix = ".png";
    return this.resultatsService.imageLocationUrl + imgPrefix + classement + imgSufix;
  }
}