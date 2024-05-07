import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import ViewDataModal from '../../components/UserData/ViewDataModal'; // Import ViewDataModal
import DeleteModal from '../../components/UserData/DeleteModal';
import EditModal from '../../components/UserData/EditModal';

const UserList = () => {
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      userName: 'John Doe',
      email: 'john.doe@example.com',
      contactNumber: '1234567890',
      role: 'admin',
    },
    // Add other dummy data
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // New state for ViewDataModal
  const [viewedUser, setViewedUser] = useState(null); // New state for ViewDataModal

  const handleViewUser = (user) => {
    setViewedUser(user); // Set the viewed user
    setIsViewModalOpen(true); // Open the ViewDataModal
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
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmEdit = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setEditedUser(null);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
    setEditedUser(null);
  };

  const handleCancelView = () => {
    setIsViewModalOpen(false); // Close the ViewDataModal
    setViewedUser(null); // Reset the viewed user
  };

  const filteredData = dummyData.filter(
    (item) =>
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
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
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.userName}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.contactNumber}</td>
                <td className="border px-4 py-2">{item.role}</td>
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

export default UserList;
