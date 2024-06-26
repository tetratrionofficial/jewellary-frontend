import React, { useState } from 'react';
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Login = ({ setLogin }) => {
  const [loginData, setLoginData] = useState({
    numberOrEmail: '', // Updated state key name
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isNumberValid = (number) => {
    // Phone number validation logic (e.g., length)
    return number.length === 10; // Example: Phone number should be 10 digits long
  };

  const isPasswordValid = (password) => {
    // Password validation logic (e.g., length)
    return password.length >= 6; // Example: Password should be at least 6 characters long
  };

  const handleSubmit = async () => {
    // setLogin(false);
    setError(''); // Reset error state
    const { numberOrEmail, password } = loginData;

    // Validate username/email and password
    if (!numberOrEmail || !password) {
      setError('Number/Email and Password are required.');
      return;
    }

    if (isEmailValid(numberOrEmail)) {
      if (!isEmailValid(numberOrEmail)) {
        setError('Please enter a valid email address.');
        return;
      }
    } else {
      if (!isNumberValid(numberOrEmail)) {
        setError('Please enter a valid 10-digit phone number.');
        return;
      }
    }

    // if (!isPasswordValid(password)) {
    //   setError('Password should be at least 6 characters long.');
    //   return;
    // }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}`+'/user/login', {email:loginData.numberOrEmail,password:loginData.password});
       console.log(response)
       if(response.data.token === undefined){
         setError(response.data)
       }

       if(response.data.token !== undefined){
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('user',JSON.stringify(response.data.user));
         setLogin(false)
       }
       
      
      // Handle successful login, e.g., redirect user to dashboard
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error, e.g., display error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 rounded-md w-full h-screen">
      <div className="w-full max-w-sm p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="numberOrEmail">
              Number or Email
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="numberOrEmail"
              value={loginData.numberOrEmail}
              onChange={handleChange}
            />
          </div>
          <div className="w-full px-4 mb-4 relative">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <button
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-600 focus:outline-none"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="py-2 px-6  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
         {/* Add "Forgot Password" link */}
         <div className="text-start mt-4">
          <Link to="/reset-password" className="text-blue-600 underline">Forgot Password?</Link>
        </div>
      </div>
    
    </div>
  );
};

export default Login;
