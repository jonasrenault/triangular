export class Department {

  iShare: number;
  iiShare: number;
  iiiShare: number;
  // public department: string;
  x: number;
  total: number;
  // private i: number;
  // private ii: number;
  // private iii: number;

  constructor(public i: number, public ii: number, public iii: number, public department: string, public year: number) {
    this.total = i + ii + iii;
    this.iShare = i / this.total;
    this.iiShare = ii / this.total;
    this.iiiShare = iii / this.total;
    this.x = this.iiShare + (this.iiiShare * 0.5);
  }
}
