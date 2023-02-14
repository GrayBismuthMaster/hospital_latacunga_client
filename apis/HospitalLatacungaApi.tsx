import axios from 'axios';
//http://3.12.17.53:5001/api
export default axios.create({
    baseURL: 'http://50.19.61.249:5002/api'
})