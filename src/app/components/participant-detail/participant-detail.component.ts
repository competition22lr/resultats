import { Component, Input } from '@angular/core';
import { Participant } from '../../models/resultats.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant-detail.component.html',
  styleUrls: ['./participant-detail.component.css']
})
export class ParticipantDetailComponent {
  @Input() participant!: Participant;
}
