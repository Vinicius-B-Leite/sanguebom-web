import axios from "axios";

export const api = axios.create({
    // baseURL: 'https://sangue-bom.onrender.com/'
    baseURL: 'http://localhost:3333/'
})