import axios from 'axios';
const baseUrl = "http://localhost:3001/api/vaccinations";

const getTotalPerDistrict = () => {
    return axios.get(`${baseUrl}/totalperdistrict`);
}

const getUsedVaccinations = (date: string) => {
    return axios.get(`${baseUrl}/usedvaccinations/${date}`)
}

const getAverageUsedVaccinationsPerDistrict = () => {
    return axios.get(`${baseUrl}/averageUsedVaccinationsPerDistrict`)
}

export default {getTotalPerDistrict, getUsedVaccinations, getAverageUsedVaccinationsPerDistrict}