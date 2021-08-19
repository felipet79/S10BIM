import axios from 'axios';

const AxiosMdl = axios.create({
    baseURL: 'https://developer.api.autodesk.com',
})

export default AxiosMdl;