import React, { useState, useEffect } from 'react';
import axios from 'axios';
import goldImage from "../../assets/gold.png";
import branchImage from "../../assets/branch.png";
import employeeImage from "../../assets/employe.png";
import customerImage from "../../assets/customer.png";

const Dashboard = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Update date and time every second
    const intervalId = setInterval(() => {
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
    }, 1000);

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
          <div className="text-gray-600 font-semibold">Gold Rate</div>
          <div className="text-xl font-bold">$68000</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-500 ease-in-out transform hover:scale-105">
        <img src={branchImage} alt="Branch" className="w-12 h-12 mr-4" />
        <div>
          <div className="text-gray-600 font-semibold">Branch</div>
          <div className="text-xl font-bold">50</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-500 ease-in-out transform hover:scale-105">
        <img src={employeeImage} alt="Employee" className="w-12 h-12 mr-4" />
        <div>
          <div className="text-gray-600 font-semibold">Employee</div>
          <div className="text-xl font-bold">200</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center transition-all duration-500 ease-in-out transform hover:scale-105">
        <img src={customerImage} alt="Customer" className="w-12 h-12 mr-4" />
        <div>
          <div className="text-gray-600 font-semibold">Customer</div>
          <div className="text-xl font-bold">1000</div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Dashboard;
