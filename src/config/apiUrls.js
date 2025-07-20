//const BASE_URL = 'http://localhost:10000'; 
const BASE_URL = 'https://myalgoserver-n87u.onrender.com'; 

const URLS = {
  socketBase      : BASE_URL,
  websocket       : `${BASE_URL}`,

  login           : `${BASE_URL}/auth/login`,
  PUBLIC_URL      : `/myalgoapp`,
  otpVerify       : `${BASE_URL}/auth/verify-otp`,
  logout          : `${BASE_URL}/auth/logout`,

  dashboardData   : `${BASE_URL}/dashboard/data`,
  quotes          : `${BASE_URL}/quotes/symbol`,
  livedata        : `${BASE_URL}/quotes/livedata`,
  getMainIndices        : `${BASE_URL}/quotes/getMainIndices`,

  symbolsLoad     : `${BASE_URL}/masterscript/refreshdata`,
  symbolSearch    : `${BASE_URL}/scriptsearch/search_symbol`,

  orderLogs       : `${BASE_URL}/execute-orders/orders`,
  netPositions    : `${BASE_URL}/net/positions`,
  placeOrder      : `${BASE_URL}/order/placeOrder`,  

  wsUnsubscribe   : `${BASE_URL}/socket/unsubscribe`,

  optionChain     : `${BASE_URL}/optionchain`,
  getExpiries     : `${BASE_URL}/expiry/getExpiries`,
  unsubscribeOptions   : `${BASE_URL}/socket/unsubscribeOptions`,
};


export default URLS;
