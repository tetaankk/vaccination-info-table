import axios from 'axios';
const baseUrl = "http://localhost:3001/api/orders";

const getAll = () => {
    return axios.get(`${baseUrl}/all`)
}

const getUnOpenedBottles = () => {
    return axios.get(`${baseUrl}/unopenedbottles`)
}

const getExpiredVaccinations = (date: string) => {
    return axios.get(`${baseUrl}/expiredvaccinations/${date}`)
}

export default {getAll, getUnOpenedBottles, getExpiredVaccinations}