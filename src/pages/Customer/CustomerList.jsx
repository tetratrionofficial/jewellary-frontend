import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import ViewDataModal from '../../components/UserData/ViewDataModal';
import DeleteModal from '../../components/UserData/DeleteModal';
import EditModal from '../../components/UserData/EditModal';

const CustomerList = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewedUser, setViewedUser] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchData();
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:4005/user/getallbranch');
      setBranches(response.data.branches);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

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
  const handleBranchFilterChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredData = userData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.permanent_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aadhaar.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(
    (item) =>
      selectedBranch === '' || // If no branch filter selected, return true for all items
      branches.find(branch => branch.id == item.branch_id)?.branch_name === selectedBranch
  ).filter(
    (item) =>
      (startDate === '' || new Date(item.createdAt) >= new Date(startDate)) &&
      (endDate === '' || new Date(item.createdAt) <= new Date(endDate))
  );

  return (
    <div className="h-screen p-10">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-80 mr-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedBranch}
          onChange={handleBranchFilterChange}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Branches</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.branch_name}>{branch.branch_name}</option>
          ))}
        </select>
        <label className="ml-4 mr-2">Date Range:</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className=" ml-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              {/* <th className="px-4 py-2">Address</th> */}
              <th className="px-4 py-2">Branch</th> {/* New column */}
              <th className="px-4 py-2">Plan</th> {/* New column */}
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.mobile}</td>
                {/* <td className="border px-4 py-2">{item.address}</td> */}
                <td className="border px-4 py-2">{
                  branches.find(branch => branch.id == item.branch_id)?.branch_name
                }</td> {/* Display branch */}
                <td className="border px-4 py-2">{item.plan_id == 1 ? "Plan A" : "Plan B"}</td> {/* Display plan */}
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

      {/* View Modal */}
      <ViewDataModal
        isOpen={isViewModalOpen}
        onClose={handleCancelView}
        user={viewedUser}
        branches={branches}
      />
    </div>
  );
};

export default CustomerList;
