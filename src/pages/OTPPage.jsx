import React from 'react';
import { useNavigate } from 'react-router-dom';
import OTPForm from '../components/OTPForm';

const OTPPage = () => {
  const navigate = useNavigate();

  // Get mobile number from localStorage instead of location state
  const mobileNumber = localStorage.getItem('mobileNumber');

  const handleOTPVerified = (data) => {
    // Store the session/token info
    localStorage.setItem('authToken', data.data?.token || '');
    localStorage.setItem('sid', data.data?.sid || '');
    localStorage.setItem('ucc', data.data?.ucc || '');
    localStorage.setItem('data', data);

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
