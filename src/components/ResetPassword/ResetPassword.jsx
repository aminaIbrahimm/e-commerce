import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleResetPassword(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', { email, newPassword });
      setMessage("✅Password changed successfully");
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setMessage(error.response?.data?.message || '❌An error occurred while changing your password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleResetPassword} className='w-1/2 mx-auto my-10'>
      <h2 className='text-xl text-center mb-4 font-semibold text-green-600'>Change Password</h2>
      <input type="email" placeholder="Enter your email... " value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full p-3 mb-4 border border-gray-300 rounded" />

      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="block w-full p-3 mb-4 border border-gray-300 rounded" />
      {message && ( <div className="mb-3 text-center text-red-600 font-medium"> {message} </div> )} 
      <button type="submit" disabled={loading} className="p-3 bg-green-700 text-white py-2 rounded hover:bg-green-800">
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}