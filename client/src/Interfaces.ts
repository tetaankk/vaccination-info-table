export interface IOrder {
    id: string,
    number: number,
    responsiblePerson: string,
    healthCareDistrict: string,
    vaccine: string,
    injections: number,
    arrived: string,
}

export interface IVaccination {
    id: string,
    sourceBottle: string,
    gender: string,
    vaccinationDate: string,
}

export interface IVaccinationWithDistrict {
    id: string,
    date: Date,
    sourceBottle: string,
    healthCareDistrict: string,
}

export interface ITotalVaccinationsPerDistrict {
    healthCareDistrict: string,
    injections: number,
}

export interface IExpiredOrder {
    id: string,
    healthCareDistrict: string,
    injections: number,
    numOfVaccsGiven: number,
    unUsedInjections: number,
    arrived: string,
}

export interface IInfotableRow {
    healthCareDistrict: string,
    arrivedInjections: number,
    usedInjections: number
}