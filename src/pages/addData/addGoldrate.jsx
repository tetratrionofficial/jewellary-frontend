import React, { useState } from 'react';
import axios from 'axios';

const CreateGoldRate = () => {
  const [goldRate, setGoldRate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      };
      const payload = {
        gold_rate: goldRate,
      };

      const response = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}`+'/user/update-goldrate/1', payload, { headers });
      console.log(response.data);

      if (response.status === 200) {
        alert('Gold rate added successfully');
        setGoldRate('');
      }
      // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <div className="mb-4">
          <label htmlFor="goldRate" className="block text-gray-700 font-bold mb-2">
            Gold Rate
          </label>
          <input
            type="number"
            id="goldRate"
            value={goldRate}
            onChange={(e) => setGoldRate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGoldRate;