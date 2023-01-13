import axios from 'axios';
//http://3.12.17.53:5001/api
export default axios.create({
    baseURL: 'http://localhost:5001/api'
})