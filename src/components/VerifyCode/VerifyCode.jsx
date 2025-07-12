import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleVerifyCode(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode: code } ); 
      setMessage(' Correct code ✅');
      navigate('/reset-password'); 

    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid code ❌');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleVerifyCode} className='w-1/2 mx-auto my-10'>
      <input type="text" placeholder="Type the code here..." value={code} onChange={(e) => setCode(e.target.value)}
        className="block w-full p-3 mb-4 border border-gray-300 rounded" />
      {message && (
        <div className="mb-3 text-center text-red-600 font-medium">
          {message}
        </div>
      )}
      <button type="submit" disabled={loading} className=" bg-green-700 text-white p-2 rounded hover:bg-green-800" >
        {loading ? "Verifying..." : "Confirm the code"}
      </button>
    </form>
  );
}
