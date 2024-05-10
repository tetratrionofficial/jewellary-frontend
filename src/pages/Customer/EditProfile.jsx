import React, { useState } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '+1 123 456 7890',
    address: '123 Main Street, Cityville',
    permanentAddress: '456 Oak Road, Townsville',
    aadhaar: '1234 5678 9012',
    date: 'May 9, 2024',
    profilePicture: 'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png',
  });

  const [previewImage, setPreviewImage] = useState(formData.profilePicture);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data or perform any other actions
    console.log(formData);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-center p-10 h-screen overflow-scroll">
      <div className="md:w-1/2 p-4">
        <div className="max-w-md mx-auto bg-white flex items-center justify-center  overflow-hidden">
          <div className="relative">
            <img
              className="w-80 h-80 rounded-full object-cover"
              src={previewImage}
              alt="Profile Picture"
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center mt-4">
          {formData.name}
        </h2>
        <div className="mt-4 text-center">
          <label
            htmlFor="profilePicture"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
          >
            Change Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
      <div className="md:w-2/3 p-4">
        <form onSubmit={handleSubmit}>
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Profile Details</h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="text-gray-600 font-semibold block"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-gray-600 font-semibold block"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="text-gray-600 font-semibold block"
              >
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="text-gray-600 font-semibold block"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="permanentAddress"
                className="text-gray-600 font-semibold block"
              >
                Permanent Address:
              </label>
              <input
                type="text"
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="aadhaar"
                className="text-gray-600 font-semibold block"
              >
                Aadhaar:
              </label>
              <input
                type="text"
                id="aadhaar"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="text-gray-600 font-semibold block"
              >
                Date:
              </label>
              <input
                type="text"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;