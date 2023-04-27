import axios from "axios";

const viaCepAPI = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})

export default viaCepAPI;