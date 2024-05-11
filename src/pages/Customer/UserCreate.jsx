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
  };

  const handleSubmit = async () => {
    if (userData.password !== userData.confirmPassword) {
      alert('Confirm password does not match with password.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:4005/user/create-user', userData);
      console.log(response.data);
      // Optionally, you can show a success message or redirect the user after successful creation
      if(response.status === 200) {
        alert('User created successfully');
      }
      else {
        alert('User creation failed');
      }

      setUserData({
        userName: '',
        email: '',
        contactNumber: '',
        role: '',
        password: '',
        confirmPassword: '',
      });

    } catch (error) {
      console.error('Error creating user:', error);

      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
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
  );
};

export default UserCreate;
