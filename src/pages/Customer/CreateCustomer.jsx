import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadhaar: '',
    date: '',
    password: '',
    branch_id: '',
    plan_id: '',
    amount: '',
    emp_id: '',
  });


  const user = JSON.parse(localStorage.getItem('user'));

  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {


    const fetchBranches = async () => {
      try {
        const response = await axios.get('http://localhost:4005/user/getallbranch');
        setBranches(response.data.branches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }

      if (user.role === 'SUPER_ADMIN') {
        setFormData({ ...formData, branch_id: user.branch_id });
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4005/user/getalluser');
        setEmployees(response.data.users);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }
    fetchEmployees();

    fetchBranches();
  }, []);
  const emiDuration = 11;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const monthlyEmi = formData.amount / emiDuration;
      const response = await axios.post('http://localhost:4005/user/create-customer', {
        ...formData,
        monthlyEmi,
      });
      console.log('Response from backend:', response.data);
      if (response.data) {
        setFormData({
          name: '',
          email: '',
          mobile: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          permanent_address: '',
          aadhaar: '',
          date: '',
          password: '',
          branch_id: '',
          plan_id: '',
          amount: '',
          emp_id: '',
        });
        alert('Customer created successfully');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div className=" w-full h-screen overflow-scroll p-10">


      <div className="flex items-center justify-center w-full  overflow-scroll p-10">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Create Customer</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="mobile" className="block text-gray-700 font-bold mb-2">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="pincode" className="block text-gray-700 font-bold mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="aadhaar" className="block text-gray-700 font-bold mb-2">
                Aadhaar
              </label>
              <input
                type="text"
                id="aadhaar"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {
                user.role === 'SUPER_ADMIN' &&
                <>
                  <div >
                    <label htmlFor="branch_id" className="block text-gray-700 font-bold mb-2">
                      Branch
                    </label>
                    <select
                      id="branch_id"
                      name="branch_id"
                      value={formData.branch_id}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a branch</option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.branch_name} ({branch.branch_code})
                        </option>
                      ))}
                    </select>
                  </div>
                </>

              }

              <div >
                <label htmlFor="branch_id" className="block text-gray-700 font-bold mb-2">
                  Plan
                </label>
                <select
                  id="plan_id"
                  name="plan_id"
                  value={formData.plan_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a plan</option>
                  <option value="1">Plan A</option>
                  <option value="2">Plan B</option>
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="branch_id" className="block text-gray-700 font-bold mb-2">
                Onboarded Through
              </label>
              <select
                id="emp_id"
                name="emp_id"
                value={formData.emp_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select name</option>
                {employees.filter(
                  (employee) => employee.role === 'EMP'
                ).map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="emiDuration" className="block text-gray-700 font-bold mb-2">
                EMI Duration
              </label>
              <input
                disabled
                type="text"
                id="emiDuration"
                name="emiDuration"
                value={emiDuration}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="emi" className="block text-gray-700 font-bold mb-2">
                Monthly EMI
              </label>
              <input
                disabled
                type="text"
                id="emi"
                name="emi"
                value={(formData.amount / emiDuration).toFixed(2)}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Create Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;