import axios from 'axios';
const baseUrl = "http://localhost:3001/api/orders";

const getAll = () => {
    return axios.get(`${baseUrl}/all`)
}

const getAllThisDay = (date: string) => {
    return axios.get(`${baseUrl}/all/${date}`)
}

const getUnOpenedBottles = () => {
    return axios.get(`${baseUrl}/unopenedbottles`)
}

const getExpiringVaccinationsThisDay = (date: string) => {
    return axios.get(`${baseUrl}/expiringvaccinationsthisday/${date}`)
}

const getExpiringVaccinationsTenDays = (date: string) => {
    return axios.get(`${baseUrl}/expiringvaccinationstendays/${date}`)
}


export default {getAll, getUnOpenedBottles, getExpiringVaccinationsThisDay, getExpiringVaccinationsTenDays, getAllThisDay}