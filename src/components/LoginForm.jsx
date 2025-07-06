import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showToast } from '../utils/alerts';
import Loading from '../utils/Loading';
import URLS from '../config/apiUrls';

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      showToast({
        type: 'warning',
        title: 'Invalid number',
        text: 'Mobile number must be 10 digits.',
      });
      return;
    }

    try {
      setLoading(true);
      const mobileNumber = `+91${phoneNumber}`;

      const res = await axios.post(URLS.login, {
        mobileNumber,
        password,
      });

      if (res.data.status === 'success') {
        localStorage.setItem('mobileNumber', mobileNumber);
        navigate('/otp');
      } else {
        showToast({
          type: 'error',
          title: 'Login failed',
          text: res.data.message || 'Invalid credentials',
        });
      }
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Login failed',
        text: err.response?.data?.message || 'Please enter correct credentials',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Algo Login
        </h2>

        <div className="flex mb-4">
          <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-r-0 rounded-l text-gray-600 dark:text-gray-300">
            +91
          </span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
            }
            className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-r focus:outline-none"
            placeholder="Mobile Number"
            required
          />
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded mb-4 focus:outline-none"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {loading && <Loading text="Authenticating..." />}
      </form>
    </div>
  );
}
