import React, { useState } from 'react';
import axios from 'axios';

const UserCreate = () => {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    contactNumber: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMatch(userData.password === userData.confirmPassword);
    }
  };

  const handleSubmit = async () => {
    console.log('User Data:', userData);
    if (userData.password !== userData.confirmPassword) {
      alert('Confirm password does not match with password.');
      return;
    }
    try {
      const response = await axios.post('', userData);
      console.log(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-blue-100 p-12 rounded-md">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create User</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="userName">
              User Name
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="tel"
              name="contactNumber"
              value={userData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
              Select Role
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="role"
              value={userData.role}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={handleSubmit}
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;