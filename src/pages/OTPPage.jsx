import React from 'react';
import { useNavigate } from 'react-router-dom';
import OTPForm from '../components/OTPForm';

const OTPPage = () => {
  const navigate = useNavigate();

  // Get mobile number from localStorage instead of location state
  const mobileNumber = localStorage.getItem('mobileNumber');

  const handleOTPVerified = (data) => {
    debugger
    // Store the session/token info
  localStorage.setItem('authToken', data.data?.token || '');
   
  sessionStorage.setItem('authToken', data.data?.token || '');
  sessionStorage.setItem('sid', data.data?.sid || '');
  sessionStorage.setItem('ucc', data.data?.ucc || '');
  sessionStorage.setItem('data', JSON.stringify(data.data)); // stringify if it's an object

    // Redirect to Dashboard
    navigate('/dashboard');
  };

  if (!mobileNumber) {
    navigate('/'); // If mobile number is missing, redirect to login
    return null;
  }

  return <OTPForm mobileNumber={mobileNumber} onSuccess={handleOTPVerified} />;
};

export default OTPPage;
