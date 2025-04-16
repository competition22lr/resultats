export class Participant {
  constructor(
    public numero: string,
    public nom: string,
    public pointage: number,
    public pointBoni: number,
    public total: number,
    public classement: string
  ) { }
}