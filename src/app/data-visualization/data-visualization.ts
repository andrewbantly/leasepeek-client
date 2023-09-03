export interface MarketRentXDate {
    date: Date;
    marketRent: number;
    unitType: string;
    unitNumber: number;
}

export interface UnitVacancy {
    unitType: string;
    isVacant: boolean;
    moveOut: boolean;
    isOccupied: boolean;
}

export interface UnitTypeStats {
    unitType: string;
    occupied: number;
    vacants: number;
    moveOuts: number;
  }
  