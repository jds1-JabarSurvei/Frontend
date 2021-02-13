import axios from 'axios';

axios.defaults.withCredentials = true;

const APICall = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default APICall;