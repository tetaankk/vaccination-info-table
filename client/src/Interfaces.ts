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
    date: string,
}