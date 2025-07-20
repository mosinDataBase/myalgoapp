import axios from 'axios';
import URLS from '../config/URLS';

export const placeOrder = async (orderPayload) => {
  try {
    const response = await axios.post(URLS.placeOrder, orderPayload);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error.response?.data || error.message);
    throw error;
  }
};
