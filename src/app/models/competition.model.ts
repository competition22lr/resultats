import { MoisResultats } from "./mois-resultats.model";

export class Competition {
    constructor(
      public debut: string,
      public fin: string,
      public mois: MoisResultats[]
    ) { }
  }