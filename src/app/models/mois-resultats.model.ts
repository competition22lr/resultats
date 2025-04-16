import { Participant } from "./participant.model";

export class MoisResultats {
    constructor(
      public name: string,
      public participants: Participant[]
    ) { }
  }