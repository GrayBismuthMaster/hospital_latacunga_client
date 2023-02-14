import axios from 'axios';
// const baseURL = 'http://50.19.61.249:5002/api';
const baseURL = 'https://server.cmedcita.com/api';
export default axios.create({
    baseURL
})