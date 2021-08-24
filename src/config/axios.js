import axios from 'axios';

const Axios = axios.create({
    //baseURL: process.env.REACT_APP_URL,
    baseURL: 'http://200.48.100.203:5030/api/S10ERP/RequestS10ERPData',
})

export default Axios;