import axios from "axios";

const API = 'http://192.168.5.5:5071/api/produto'


export const getProdutos = () => {
    return axios.get(API)
}