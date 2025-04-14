import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseStringPromise } from 'xml2js';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResultatsService {
  private xmlUrl = 'https://raw.githubusercontent.com/competition22lr/resultats/main/data/resultats_cummulatif.xml';

  constructor(private http: HttpClient) { }

  getResultats(): Observable<{ moisDispo: string[], resultats: any[] }> {
    return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map(xmlString => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'text/xml');

        const moisElements = Array.from(xml.getElementsByTagName('mois'));

        const moisDispo = moisElements.map(el => el.getAttribute('name') || '').filter(Boolean);

        const moisParDefaut = moisElements.find(el => el.getAttribute('name') === 'Avr.2025') || moisElements[0];
        if (!moisParDefaut) return { moisDispo: [], resultats: [] };

        const participants = Array.from(moisParDefaut.getElementsByTagName('participant'));

        const getText = (el: Element, tag: string): string =>
          el.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';

        const resultats = participants.map(p => ({
          numero: getText(p, 'Numero_Membre'),
          nom: getText(p, 'Nom'),
          pointage: +getText(p, 'Pointage'),
          pointBoni: +getText(p, 'Point_Boni'),
          total: +getText(p, 'Pointage_Total'),
          classement: getText(p, 'Classement')
        }));

        return { moisDispo, resultats };
      })
    );
  }

  getResultatsParMois(mois: string): Observable<any[]> {
    return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map(xmlString => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'text/xml');
        const moisEl = Array.from(xml.getElementsByTagName('mois'))
          .find(el => el.getAttribute('name') === mois);
        if (!moisEl) return [];

        const getText = (el: Element, tag: string): string =>
          el.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';

        const participants = Array.from(moisEl.getElementsByTagName('participant'));
        return participants.map(p => ({
          numero: getText(p, 'Numero_Membre'),
          nom: getText(p, 'Nom'),
          pointage: +getText(p, 'Pointage'),
          pointBoni: +getText(p, 'Point_Boni'),
          total: +getText(p, 'Pointage_Total'),
          classement: getText(p, 'Classement')
        }));
      })
    );
  }

}