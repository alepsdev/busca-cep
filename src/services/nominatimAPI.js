import axios from "axios";

const nominatimAPI = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/reverse'
})

export default nominatimAPI;