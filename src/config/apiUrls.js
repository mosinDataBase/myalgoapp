const BASE_URL = 'http://localhost:10000'; 
//const BASE_URL = 'https://myalgoserver-n87u.onrender.com'; 

const URLS = {
    socketBase      : BASE_URL,
    websocket       : `${BASE_URL}`,

    login           : `${BASE_URL}/auth/login`,
    PUBLIC_URL      : `/myalgoapp`,
    otpVerify       : `${BASE_URL}/auth/verify-otp`,
    logout          : `${BASE_URL}/auth/logout`,

    dashboardData   : `${BASE_URL}/dashboard/data`,
    quotes          : `${BASE_URL}/quotes`,
    symbolsLoad     : `${BASE_URL}/masterscript/refreshdata`,
    livedata        : `${BASE_URL}/quotes/livedata`,
    
    orderLogs       : `${BASE_URL}/execute-orders/orders`,
    netPositions    :  `${BASE_URL}/net/positions`,
    wsUnsubscribe   : `${BASE_URL}/socket/unsubscribe`,
    symbolSearch    : `${BASE_URL}/scriptsearch/search_symbol`,
    

    // add more endpoints as needed
};

export default URLS;
