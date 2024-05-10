import React from 'react';

const ViewProfile = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-center p-10">
      <div className="md:w-1/2  p-4">
        <div className="max-w-md flex items-center justify-center mx-auto bg-white  overflow-hidden">
            <img
              className="w-80 h-80 rounded-full object-cover"
              src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png"
              alt="Profile Picture"
            />
        </div>
        <h2 className="text-xl font-semibold text-center mt-4">User name</h2>
      </div>
      <div className="md:w-2/3 p-4">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold">Email:</h3>
            <p className="text-gray-800">john@example.com</p>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold">Mobile:</h3>
            <p className="text-gray-800">+1 123 456 7890</p>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold">Address:</h3>
            <p className="text-gray-800">123 Main Street, Cityville</p>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold">Permanent Address:</h3>
            <p className="text-gray-800">456 Oak Road, Townsville</p>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold">Aadhaar:</h3>
            <p className="text-gray-800">1234 5678 9012</p>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold">Date:</h3>
            <p className="text-gray-800">May 9, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;