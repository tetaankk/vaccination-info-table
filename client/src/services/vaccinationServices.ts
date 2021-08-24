import axios from 'axios';
const baseUrl = "http://localhost:3001/api/vaccinations";

const getAll = () => {
    return axios.get(`${baseUrl}/all`);
}

const getUsedVaccinations = (date: string) => {
    return axios.get(`${baseUrl}/usedvaccinations/${date}`)
}

export default {getAll, getUsedVaccinations}