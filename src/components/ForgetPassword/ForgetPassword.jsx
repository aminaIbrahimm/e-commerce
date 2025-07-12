import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    setIsLoading(true);
    setMessage('');
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      setMessage('Code sent successfully!');
      localStorage.setItem('resetEmail', email);
      navigate('/verify-code');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto my-10">
      {message && (
        <div className="p-4 mb-4 text-sm text-center text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400">
          {message}
        </div>
      )}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      <button type="submit" disabled={isLoading} className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Send Code'} </button>
    </form>
  );
}
