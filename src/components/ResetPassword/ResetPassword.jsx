import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="py-8">
      <form onSubmit={handleResetPassword} className='w-1/2 mx-auto my-10'>
        <h2 className='text-xl capitalize mb-4 font-semibold text-green-600'>reset your account password :</h2>
        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>email :</label>
        <input type="email" placeholder="Enter your email... " value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full p-1.5 mb-4 border border-gray-300 rounded" />
        <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>New Password :</label>
        <div className="relative">
          <input  type={showPassword ? "text" : "password"} placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="block w-full p-1.5 mb-4 border border-gray-300 rounded" />
          <span onClick={()=>{setShowPassword(!showPassword)}} className='absolute top-1/2 right-3 translate-y-[-50%] cursor-pointer text-gray-500'>
            {showPassword ? ( <i className="fa-solid fa-eye-slash"></i> ) : ( <i className="fa-solid fa-eye"></i> )}
          </span>
        </div>
        {message && ( <div className="mb-3 text-center text-red-600 font-medium"> {message} </div> )} 
        <button type="submit" disabled={loading} className="p-3 bg-green-700 text-white py-2 rounded hover:bg-green-800">
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}