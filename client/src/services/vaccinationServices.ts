import axios from 'axios';
const baseUrl = "http://localhost:3001/api/vaccinations";

const getAll = () => {
    return axios.get(`${baseUrl}/all`);
}

const getExpiredGivenVaccinations = () => {
    return axios.get(`${baseUrl}/expiredgivenvaccinations`)
}

export default {getAll, getExpiredGivenVaccinations}