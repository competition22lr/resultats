import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  ResultatsCummulatif } from '../models/resultats-cummulatif.model';
import { Participant } from '../models/participant.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResultatsService {
  private xmlUrl = 'https://raw.githubusercontent.com/competition22lr/resultats/main/data/resultats_cummulatif.xml';
  private cache: { timestamp: number, data: ResultatsCummulatif } | null = null;
  private CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  constructor(private http: HttpClient) {}

  getResultats(): Observable<ResultatsCummulatif> {
    const now = Date.now();

    if (this.cache && now - this.cache.timestamp < this.CACHE_DURATION) {
      return of(this.cache.data);
    }

    return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map(xmlString => {
        const xml = new DOMParser().parseFromString(xmlString, 'text/xml');
        const data = ResultatsCummulatif.fromXml(xml);
        this.cache = { timestamp: now, data };
        return data;
      })
    );
  }

  getParticipantsParMois(indexCompetitionSelectionne: number, mois: string): Observable<Participant[]> {
    return this.getResultats().pipe(
      map(data => data.getParticipants(indexCompetitionSelectionne, mois))
    );
  }
}
