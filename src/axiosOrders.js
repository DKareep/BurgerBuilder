import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://brugercart.firebaseio.com/'
})

export default axiosInstance;