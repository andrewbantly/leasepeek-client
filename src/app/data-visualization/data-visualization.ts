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
}