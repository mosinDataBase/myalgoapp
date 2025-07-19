// src/pages/SupportPage.jsx
import React, { useState } from 'react';

const SupportPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can integrate with backend ticket system or email API here
 

    setSubmitted(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Support</h2>

      {submitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Thank you! Your message has been received. Our support team will contact you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default SupportPage;
