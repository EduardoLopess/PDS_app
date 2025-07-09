import axios from "axios";

const API = 'http://192.168.5.5:5071/api/sabor'

export const getSabores = () => {
    return axios.get(API)
}