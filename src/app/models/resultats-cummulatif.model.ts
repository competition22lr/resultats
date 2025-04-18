import { Participant } from "./participant.model";
import { Competition } from "./competition.model";
import { MoisResultats } from "./mois-resultats.model";

export class ResultatsCummulatif {
  constructor(
    public competitions: Competition[]
  ) { }

  static fromXml(xml: Document): ResultatsCummulatif {
    const competitionEls = Array.from(xml.getElementsByTagName('competition'));

    const competitions: Competition[] = competitionEls.map(competitionEl => {
      const debut = competitionEl.getAttribute('debut') ?? '';
      const fin = competitionEl.getAttribute('fin') ?? '';

      const mois: MoisResultats[] = Array.from(competitionEl.getElementsByTagName('mois')).map(moisEl => {
        const name = moisEl.getAttribute('name') ?? '';
        const participants = Array.from(moisEl.getElementsByTagName('participant')).map(p => {
          const get = (tag: string) => p.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';

          return new Participant({
            numero: get('Numero_Membre'),
            nom: get('Nom'),
            pointage: +get('Pointage'),
            pointBoni: +get('Point_Boni'),
            total: +get('Pointage_Total'),
            classement: get('Classement')
          });
        });

        return new MoisResultats(name, participants);
      });

      return new Competition(debut, fin, mois);
    });

    return new ResultatsCummulatif(competitions);
  }

  getCompetitionsDisponibles(): string[] {
    return this.competitions.map((c, i) => `Compétition ${i + 1} (${c.debut} → ${c.fin})`);
  }

  getCompetitions(indexCompetition: number): Competition {
    return this.competitions[indexCompetition];
  }

  getMoisDisponibles(indexCompetition: number): MoisResultats[] {
    return this.competitions[indexCompetition]?.mois ?? [];
  }

  getParticipants(indexCompetition: number, moisName: string): Participant[] {
    return this.competitions[indexCompetition]?.mois.find(m => m.name.toLowerCase() === moisName)?.participants ?? [];
  }
}
