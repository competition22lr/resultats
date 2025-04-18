// export class Participant {
//   constructor(
//     public numero: string,
//     public nom: string,
//     public pointage: number,
//     public pointBoni: number,
//     public total: number,
//     public classement: string
//   ) { }

//   aClassement(): boolean {
//     return this.classement?.trim() !== '';
//   }
// }


export class Participant {
  numero!: string;
  nom!: string;
  pointage!: number;
  pointBoni!: number;
  total!: number;
  classement!: string;

  constructor(init?: Partial<Participant>) {
    Object.assign(this, init);
  }

  aClassement(): boolean {
    return !!this.classement && this.classement.trim() !== '';
  }
}