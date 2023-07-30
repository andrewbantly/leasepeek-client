export interface Unit {
    status: string;
    unit: number;
    unitType: string;
    unitSqFt: number;
    resident: number;
    name: string;
    marketRent: number;
    val: number;
    resDeposit: number;
    otherDeposit: number;
    moveIn: Date;
    leaseExp: Date;
    moveOut: Date | null;
    balance: number;
    rliab: number;
    amenf: number;
    car: number;
    rntres: number;
    total: number;
}

export interface ExcelDataRow {
    [key: string]: any;
  }