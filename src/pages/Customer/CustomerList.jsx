import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import ViewDataModal from '../../components/UserData/ViewDataModal';
import DeleteModal from '../../components/UserData/DeleteModal';
import EditModal from '../../components/UserData/EditModal';

const CustomerList = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewedUser, setViewedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4005/user/allcustomer');
      setUserData(response.data.customers);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleViewUser = (user) => {
    setViewedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    // Call API to delete user
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmEdit = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setEditedUser(null);
    // Call API to update user
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setEditedUser(null);
  };

  const handleCancelView = () => {
    setIsViewModalOpen(false);
    setViewedUser(null);
  };

  const filteredData = userData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.permanent_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aadhaar.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen p-10">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <input
        type="text"
        placeholder="Search..."
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Permanent Address</th>
              <th className="px-4 py-2">Aadhaar</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.mobile}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.permanent_address}</td>
                <td className="border px-4 py-2">{item.aadhaar}</td>
                <td className="border px-4 py-2 flex justify-center space-x-2">
                  <button
                    className="text-green-600 hover:text-green-800 focus:outline-none"
                    onClick={() => handleViewUser(item)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                    onClick={() => handleEditUser(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                    onClick={() => handleDeleteUser(item)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
        onCancelDelete={handleCancelDelete}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleCancelEdit}
        onConfirmEdit={handleConfirmEdit}
        onCancelEdit={handleCancelEdit}
        editedUser={editedUser}
        setEditedUser={setEditedUser}
      />

      {/* ViewDataModal */}
      <ViewDataModal
        isOpen={isViewModalOpen}
        onClose={handleCancelView}
        user={viewedUser}
      />
    </div>
  );
};

export default CustomerList;
