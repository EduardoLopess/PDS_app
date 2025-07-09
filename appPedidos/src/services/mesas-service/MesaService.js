import axios from "axios";

const API = 'http://192.168.5.5:5071/api/mesa'

export const getMesas = () => {
    return axios.get(API)
}