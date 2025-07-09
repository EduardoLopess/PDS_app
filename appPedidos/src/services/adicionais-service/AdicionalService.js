import axios from "axios";

const API = 'http://192.168.5.5:5071/api/adicional'

export const getAdicionais = () => {
    return axios.get(API)
}