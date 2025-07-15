//const BASE_URL = 'http://localhost:10000'; 
const BASE_URL = 'https://myalgoserver-n87u.onrender.com'; 

const URLS = {
    login: `${BASE_URL}/auth/login`,
    PUBLIC_URL: `/myalgoapp`,
    otpVerify: `${BASE_URL}/auth/verify-otp`,
    dashboardData: `${BASE_URL}/dashboard/data`, // (add this route later if needed)
    quotes: `${BASE_URL}/quotes`,
    symbols: `${BASE_URL}/master/symbols`,
    livedata: `${BASE_URL}/quotes/livedata`,
    websocket: `${BASE_URL}`,
    logout: `${BASE_URL}/logout`, // (add this route later if needed)
    orderLogs: `${BASE_URL}/execute-orders/orders`,
    netPositions:  `${BASE_URL}/net/positions`,
    wsUnsubscribe: `${BASE_URL}/socket/unsubscribe`,
     socketBase: BASE_URL,

    // add more endpoints as needed
};

export default URLS;
