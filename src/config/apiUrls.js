// src/api/urls.js

const BASE_URL = 'http://localhost:5000'; // replace with your real base URL
const WEB_SOCKET_URL = 'http://localhost:5000/'
const URLS = {
    login: `${BASE_URL}/login`,
    otpVerify: `${BASE_URL}/verify-otp`,
    dashboardData: `${BASE_URL}/dashboard/data`,
    quotes: `${BASE_URL}/quotes`,
    symbols: `${BASE_URL}/symbols`,
    livedata: `${BASE_URL}/livedata`,
    websocket: `${WEB_SOCKET_URL}`,
    logout: `${BASE_URL}/logout`,
    // add more endpoints as needed
};

export default URLS;
