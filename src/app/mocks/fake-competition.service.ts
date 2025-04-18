import { Injectable } from '@angular/core';
import { Competition } from '../models/competition.model';
import { MoisResultats } from '../models/mois-resultats.model';
import { Participant } from '../models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class FakeCompetitionService {
  getFakeCompetition(): Competition {
    return fakeCompetition;
  }
}

const fakeCompetition: Competition = {
  debut: new Date().toISOString(),
  fin: new Date().toISOString(),
  mois: [
    {
      name: 'janvier',
      participants: [
        new Participant({
          numero: '0005',
          nom: 'Diamant',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Diamant',
        }),
        new Participant({
          numero: '0004',
          nom: 'Platine',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Platine',
        }),
        new Participant({
          numero: '0003',
          nom: 'Or',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Or',
        }),
        new Participant({
          numero: '0002',
          nom: 'Argent',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Argent',
        }),
        new Participant({
          numero: '0001',
          nom: 'Bronze',
          pointage: 200,
          pointBoni: 20,
          total: 220,
          classement: 'Bronze',
        })
      ],
    },
  ],
};





