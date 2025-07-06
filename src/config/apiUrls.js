// src/api/urls.js

const BASE_URL = 'http://localhost:5000'; // replace with your real base URL

const URLS = {
    login: `${BASE_URL}/login`,
    otpVerify: `${BASE_URL}/verify-otp`,
    dashboardData: `${BASE_URL}/dashboard/data`,
    quotes: `${BASE_URL}/quotes`,
    symbols: `${BASE_URL}/symbols`,
    logout: `${BASE_URL}/logout`,
    // add more endpoints as needed
};

export default URLS;
