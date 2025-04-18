
// export class MoisResultats {
//   constructor(
//     public name: string,
//     public participants: Participant[]
//   ) { }
// }

// export class Competition {
//   constructor(
//     public debut: string,
//     public fin: string,
//     public mois: MoisResultats[]
//   ) { }
// }

// export class ResultatsCummulatif {
//   constructor(
//     public competition?: Competition
//   ) { }

//   static fromXml(xml: Document): ResultatsCummulatif {
//     const competitionEl = xml.getElementsByTagName('competition')[0];
//     const debut = competitionEl.getAttribute('debut') ?? '';
//     const fin = competitionEl.getAttribute('fin') ?? '';

//     const mois: MoisResultats[] = Array.from(competitionEl.getElementsByTagName('mois')).map(moisEl => {
//       const name = moisEl.getAttribute('name') ?? '';
//       const participants = Array.from(moisEl.getElementsByTagName('participant')).map(p => {
//         const get = (tag: string) => p.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';
//         return new Participant(
//           get('Numero_Membre'),
//           get('Nom'),
//           +get('Pointage'),
//           +get('Point_Boni'),
//           +get('Pointage_Total'),
//           get('Classement')
//         );
//       });
//       return new MoisResultats(name, participants);
//     });

//     return new ResultatsCummulatif(new Competition(debut, fin, mois));
//   }

//   getMoisDisponibles(): string[] {
//     return this.competition?.mois.map(m => m.name) ?? [];
//   }

//   getParticipants(mois: string): Participant[] {
//     return this.competition?.mois.find(m => m.name === mois)?.participants ?? [];
//   }
// }
