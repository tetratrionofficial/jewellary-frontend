import React, { useState, useEffect } from 'react';
import axios from 'axios';
import goldImage from "../../assets/gold.png";
import branchImage from "../../assets/branch.png";
import employeeImage from "../../assets/employe.png";
import customerImage from "../../assets/customer.png";

const Dashboard = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [goldRate, setGoldRate] = useState(null); // State to store gold rate
  const [customers, setCustomers] = useState([]); // State to store customers
  const [employees, setEmployees] = useState([]); // State to store employees
  const [branches, setBranches] = useState([]); // State to store branches

  useEffect(() => {
    // Function to fetch gold rate
    const fetchGoldRate = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        };
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}`+'/user/goldrate/1', { headers });
        const { data } = response.data;
        setGoldRate(data.gold_rate); // Update gold rate state with fetched data
      } catch (error) {
        console.error('Error fetching gold rate:', error);
      }
    };

    // Function to fetch all customers
    const fetchAllCustomers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}`+'/user/allcustomer');
        setCustomers(response.data.customers); // Update customers state with fetched data
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };


    const fetchAllBranches = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}`+'/user/getallbranch');
        setBranches(response.data.branches); // Update branches state with fetched data
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}`+'/user/getalluser');
        setEmployees(response.data.users);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }
    fetchEmployees();

    // Fetch gold rate and all customers when component mounts
    fetchAllBranches();
    fetchGoldRate();
    fetchAllCustomers();

    // Update date and time every second
    const intervalId = setInterval(() => {
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);
 

  return (
    <div className="w-full bg-gray-200 h-screen p-10">
    <div className="flex justify-between items-center mb-8">
      <div className="flex flex-col items-center transition-all duration-500 ease-in-out transform hover:scale-105 ">
        <div className="text-gray-500">Date</div>
        <div className="font-bold">{date}</div>
      </div>
      <h4 className="text-xl font-semibold transition-all duration-500 ease-in-out transform hover:scale-105">DASHBOARD</h4>
      <div className="flex flex-col items-center transition-all duration-500 ease-in-out transform hover:scale-105">
        <div className="text-gray-500">Time</div>
        <div className="font-bold">{time}</div>
      </div>
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-500 ease-in-out transform hover:scale-105">
        <img src={goldImage} alt="Gold" className="w-12 h-12 mr-4" />
        <div>
        <div className="text-xl font-bold">{goldRate ? `₹${goldRate}` : 'Loading...'}</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-500 ease-in-out transform hover:scale-105">
        <img src={branchImage} alt="Branch" className="w-12 h-12 mr-4" />
        <div>
          <div className="text-gray-600 font-semibold"> Branches</div>
          <div className="text-xl font-bold">{branches.length}</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-500 ease-in-out transform hover:scale-105">
        <img src={employeeImage} alt="Employee" className="w-12 h-12 mr-4" />
        <div>
          <div className="text-gray-600 font-semibold">Employee</div>
          <div className="text-xl font-bold">{employees.length}</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-500 ease-in-out transform hover:scale-105">
        <img src={customerImage} alt="Customer" className="w-12 h-12 mr-4" />
        <div>
          <div className="text-gray-600 font-semibold">Customer</div>
          <div className="text-xl font-bold">{customers.length}</div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Dashboard;
