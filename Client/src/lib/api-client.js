import axios from "axios"
import {HOST} from "../utils/constants.js"

axios.defaults.headers.get['Accepts'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
export const apiClient=axios.create({
    baseURL:HOST,
});
