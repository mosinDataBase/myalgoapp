import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mobileNumber = `+91${phoneNumber}`;
      const res = await axios.post('http://localhost:5000/login', {
        mobileNumber,
        password,
      });
      debugger;
      if (res.data.status === 'success') {
        localStorage.setItem('mobileNumber', mobileNumber);
        navigate('/otp');
      }
    } catch (err) {
      
      Swal.fire({
        toast: true,
        position: 'top', // top-end, top-right etc.
        icon: 'error',
        title: 'Login failed',
        text: 'Please enter correct credentials',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast-custom',
          title: 'swal2-toast-title',
          htmlContainer: 'swal2-toast-text',
        },
      });
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Algo Login</h2>

      <div className="flex mb-4">
        <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l text-gray-600">
          +91
        </span>
        <input
          className="flex-1 p-2 border rounded-r"
          placeholder="Mobile Number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            // Only allow digits and max 10
            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
            setPhoneNumber(val);
          }}
          required
        />
      </div>

      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}
