import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaBuilding, FaPhone } from 'react-icons/fa';
import axios from 'axios';

const BranchCreate = () => {
    const [formData, setFormData] = useState({
        branchName: '',
        branchEmail: '',
        branchAddress: {
            state: '',
            city: '',
            pinCode: '',
        },
        branchCode: '',
        phoneNumber: '',
        countryCode: '+91',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            branchAddress: {
                ...formData.branchAddress,
                [name]: value,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Perform form validation
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return; // Exit early if there are validation errors
        }
    
        // Prepare the payload to send to the backend
        const payload = {
            branch_name: formData.branchName,
            branch_code: formData.branchCode,
            address1: formData.branchAddress.state, // Adjusted to match backend API field name
            address2: formData.branchAddress.city, // Adjusted to match backend API field name
            city: formData.branchAddress.city, // Adjusted to match backend API field name
            state: formData.branchAddress.state, // Adjusted to match backend API field name
            pincode: formData.branchAddress.pinCode, // Adjusted to match backend API field name
            branch_email: formData.branchEmail,
            branch_mobile: formData.phoneNumber
        };
    
        try {
            // Send POST request to your backend API
            const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}`+'/user/create-branch', payload);
            console.log(response.data); // Log the response from the backend
                if(response.data.message === 'Success') {
                    alert('Branch created successfully');
                  setFormData({
                    branchName: '',
                    branchEmail: '',
                    branchAddress: {
                        state: '',
                        city: '',
                        pinCode: '',
                    },
                    branchCode: '',
                    phoneNumber: '',
                    countryCode: '+91',
                    });

                } else {
                    alert('Failed to create branch');
                }

            // Optionally, you can perform further actions based on the response
        } catch (error) {
            console.error('Error creating branch:', error);
            // Handle errors, such as displaying an error message to the user
        }
    };
    

    const validateForm = () => {
        let errors = {};
        // Add your validation rules here
        if (!formData.branchName) {
            errors.branchName = 'Branch name is required';
        }
        if (!formData.branchEmail) {
            errors.branchEmail = 'Branch email is required';
        }
        // Add more validation rules as needed
        return errors;
    };

    return (
        <div className=" py-8 px-4 sm:px-6 lg:px-8 h-screen">
            <div className="max-w-4xl mx-auto ">
                <h1 className="text-2xl font-bold mb-4">Create Branch</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    {/* Branch Name */}
                    <div>
                        <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">
                            <FaBuilding className="inline-block mr-2" />
                            Branch Name
                        </label>
                        <input
                            type="text"
                            id="branchName"
                            name="branchName"
                            value={formData.branchName}
                            onChange={handleChange}
                            required
                            placeholder="Enter Branch Name"
                            className={`mt-1 block w-full border ${errors.branchName ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.branchName && <p className="text-red-500 mt-1">{errors.branchName}</p>}
                    </div>
                    {/* Branch Email */}
                    <div>
                        <label htmlFor="branchEmail" className="block text-sm font-medium text-gray-700">
                            <FaEnvelope className="inline-block mr-2" />
                            Branch Email
                        </label>
                        <input
                            type="email"
                            id="branchEmail"
                            name="branchEmail"
                            value={formData.branchEmail}
                            onChange={handleChange}
                            required
                            placeholder="Enter Branch Email"
                            className={`mt-1 block w-full border ${errors.branchEmail ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.branchEmail && <p className="text-red-500 mt-1">{errors.branchEmail}</p>}
                    </div>
                    {/* Address Section */}
                    <div className="col-span-2">
                        <label className="block text-base font-medium text-gray-700">
                            <FaMapMarkerAlt className="inline-block mr-2" />
                            Branch Address
                        </label>
                        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-6">
                            <div>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.branchAddress.state}
                                    onChange={handleAddressChange}
                                    required
                                    placeholder="State"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.branchAddress.city}
                                    onChange={handleAddressChange}
                                    required
                                    placeholder="City"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    id="pinCode"
                                    name="pinCode"
                                    value={formData.branchAddress.pinCode}
                                    onChange={handleAddressChange}
                                    required
                                    placeholder="Pin Code"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Branch Code */}
                    <div>
                        <label htmlFor="branchCode" className="block text-sm font-medium text-gray-700">
                            Branch Code
                        </label>
                        <input
                            type="text"
                            id="branchCode"
                            name="branchCode"
                            value={formData.branchCode}
                            onChange={handleChange}
                            placeholder="Enter Branch Code"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            <FaPhone className="inline-block mr-2" />
                            Phone Number
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="countryCode"
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                placeholder="+91"
                                className="mt-1 mr-2 block w-16 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter Phone Number"
                                className="mt-1 block w-full border-l-0 border-r border-t border-b border-gray-300 rounded-r-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-center mt-10">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Branch
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default BranchCreate;
