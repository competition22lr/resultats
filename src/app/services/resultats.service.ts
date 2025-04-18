import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultatsCummulatif } from '../models/resultats-cummulatif.model';
import { Participant } from '../models/participant.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoisResultats } from '../models/mois-resultats.model';
import { Competition } from '../models/competition.model';
import { FakeCompetitionService } from '../mocks/fake-competition.service';


@Injectable({ providedIn: 'root' })
export class ResultatsService {
  private xmlUrl = 'https://raw.githubusercontent.com/competition22lr/resultats/main/data/resultats_cummulatif.xml';
  private cache: { timestamp: number, data: ResultatsCummulatif } | null = null;
  private CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
  public imageLocationUrl: string = 'https://raw.githubusercontent.com/competition22lr/resultats/refs/heads/main/public/images/';


  constructor(private http: HttpClient, private fakeService: FakeCompetitionService) { }

  getResultats(): Observable<ResultatsCummulatif> {
    const now = Date.now();

    if (this.cache && now - this.cache.timestamp < this.CACHE_DURATION) {
      return of(this.cache.data);
    }

    return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map(xmlString => {
        const xml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const data = ResultatsCummulatif.fromXml(xml);

        // 👉 Ajouter la compétition fake ici
        // data.competitions = [...data.competitions, this.fakeService.getFakeCompetition()];

        this.cache = { timestamp: now, data };
        return data;
      })
    );
  }


  getParticipantsPourMois(indexCompetition: number, mois: string): Observable<Participant[]> {
    return this.getResultats().pipe(
      map(data => {
        const comp = data.getCompetitions(indexCompetition);
        const moisData = comp?.mois?.find(m => m.name.toLowerCase() === mois.toLowerCase());

        console.log('MoisData =>', moisData);

        return moisData?.participants || [];
      })
    );
  }



  getCompetition(indexCompetitionSelectionne: number): Observable<Competition> {
    return this.getResultats().pipe(
      map(data => data.getCompetitions(indexCompetitionSelectionne))
    );
  }


  getMoisResultats(indexCompetitionSelectionne: number): Observable<MoisResultats[]> {
    return this.getResultats().pipe(
      map(data => data.getMoisDisponibles(indexCompetitionSelectionne))
    );
  }
}
