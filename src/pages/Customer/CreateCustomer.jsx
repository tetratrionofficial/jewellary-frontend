import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    permanent_address: '',
    aadhaar: '',
    date: '',
    password: '',
    branch_id: '',
    plan_id: '',
    amount: '',
    emp_id: '',
  });

  const [sameaddress , setSameaddress] = useState(false)

  const emiDuration = 11; // Pre-defined EMI duration from superadmin (non-editable)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calculate monthly EMI
      const monthlyEmi = formData.amount / emiDuration;
      // Submit form data along with the calculated monthly EMI
      const response = await axios.post('http://localhost:4005/user/create-customer', {
        ...formData,
        monthlyEmi,
      });
      // Handle success response
      console.log('Response from backend:', response.data);
      if(response.data){
        setFormData(
          {
            name: '',
            email: '',
            mobile: '',
            address: '',
            permanent_address: '',
            aadhaar: '',
            date: '',
            password: '',
            branch_id: '',
            plan_id: '',
            amount: '',
            emp_id: '',
          }
        );
         alert("Customer created successfully")
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div className=" mx-auto p-10 w-full h-screen overflow-scroll">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Create Customer</h2>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2 text-blue-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2 text-blue-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mobile" className="block font-bold mb-2 text-blue-700">
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block font-bold mb-2 text-blue-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* checkbox for same as current address */}

          

            <div className="mb-4">
              <label htmlFor="permanentAddress" className="block font-bold mb-2 text-blue-700">
                Permanent Address
              </label>
              <div className="mb-4 flex flex-row items-center justify-start text-center">
            <label htmlFor="permanentAddress" className="block  mb-2 text-blue-700 mr-4">
                same as current address 
              </label>
              <input type="checkbox" name="address" id="address"  value={sameaddress} onChange={()=>{
                setFormData({ ...formData, permanent_address: formData.address });
                setSameaddress(!sameaddress)}} />

            </div>
              <input
                type="text"
                id="permanent_address"
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="aadhaar" className="block font-bold mb-2 text-blue-700">
                Aadhaar
              </label>
              <input
                type="text"
                id="aadhaar"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block font-bold mb-2 text-blue-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-2 text-blue-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="branchId" className="block font-bold mb-2 text-blue-700">
                Branch ID
              </label>
              <input
                type="text"
                id="branch_id"
                name="branch_id"
                value={formData.branch_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="plan" className="block font-bold mb-2 text-blue-700">
                Plan
              </label>
              <select
                id="plan_id"
                name="plan_id"
                value={formData.plan_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a plan</option>
                <option value="1">Plan A</option>
                <option value="2">Plan B</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block font-bold mb-2 text-blue-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="emp_id" className="block font-bold mb-2 text-blue-700">
                Employee ID
              </label>
              <input
                type="text"
                id="emp_id"
                name="emp_id"
                value={formData.emp_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Create Customer
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-6">
          <div className="mb-4">
            <p className="text-blue-700 font-bold">EMI Duration: {emiDuration} months</p>
          </div>

          {formData.amount && (
            <div className="mb-4">
              <p className="text-blue-700 font-bold">
                Monthly EMI: ₹{(formData.amount / emiDuration).toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCustomer;
