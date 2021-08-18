import axios from 'axios';
const baseUrl = "http://localhost:3001/api/orders";

const getAll = () => {
    return axios.get(`${baseUrl}/all`)
}

const getUnUsed = () => {
    return axios.get(`${baseUrl}/unused`)
}

export default {getAll, getUnUsed}