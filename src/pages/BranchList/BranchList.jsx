import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import BranchDataModal from '../../components/BranchData/BranchDataModal';
import { Link } from 'react-router-dom'; 

const BranchList = () => {
  // State to store fetched branch data
  const [branchData, setBranchData] = useState([]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State to store selected branch
  const [selectedBranch, setSelectedBranch] = useState(null);
  // State to manage delete modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // State to manage edit modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // State to store edited branch
  const [editedBranch, setEditedBranch] = useState(null);
  // State to manage view modal visibility
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch data from backend endpoint
  useEffect(() => {
    fetch('http://localhost:4005/user/getallbranch')
      .then(response => response.json())
      .then(data => {
        // Set the fetched branch data
        setBranchData(data.branches);
      })
      .catch(error => {
        console.error('Error fetching branch data:', error);
      });
  }, []);

  // Function to handle click on "View" button
  const handleViewBranch = (branch) => {
    setSelectedBranch(branch);
    setIsViewModalOpen(true);
  };

  // Function to handle click on "Delete" button
  const handleDeleteBranch = (branch) => {
    // Set selected branch
    setSelectedBranch(branch);
    // Open the delete modal
    setIsDeleteModalOpen(true);
  };

  // Function to confirm branch deletion
  const handleConfirmDelete = () => {
    // Send DELETE request to backend endpoint
    fetch(`http://localhost:4005/user/delete-branch/${selectedBranch.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response) {
        // If deletion is successful, update frontend
        const updatedBranchData = branchData.filter(branch => branch.id !== selectedBranch.id);
        setBranchData(updatedBranchData);
        // Close the delete modal
        setIsDeleteModalOpen(false);
        // Clear the selectedBranch state
        setSelectedBranch(null);
      } else {
        // Handle error if deletion fails
        console.error('Failed to delete branch:', response.statusText);
        // Optionally, show error message to the user
      }
    })
    .catch(error => {
      console.error('Error deleting branch:', error);
      // Optionally, show error message to the user
    });
  };

  // Function to cancel branch deletion
  const handleCancelDelete = () => {
    // Close the delete modal
    setIsDeleteModalOpen(false);
    // Clear the selectedBranch state
    setSelectedBranch(null);
  };

  // Function to handle click on "Edit" button
  const handleEditBranch = (branch) => {
    // Set selected branch
    setSelectedBranch(branch);
    // Set edited branch
    setEditedBranch({ ...branch });
    // Open the edit modal
    setIsEditModalOpen(true);
  };

  // Function to confirm branch edit
  const handleConfirmEdit = () => {
    // Logic to edit branch in backend goes here
  };

  // Function to cancel branch edit
  const handleCancelEdit = () => {
    // Close the edit modal
    setIsEditModalOpen(false);
    // Clear the selectedBranch state
    setSelectedBranch(null);
    // Clear the editedBranch state
    setEditedBranch(null);
  };

  // Function to close view modal
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  // Filtered data based on search query
  const filteredData = branchData.filter(
    item =>
      item.branch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.address1.toLowerCase() + ' ' + item.address2.toLowerCase()).includes(searchQuery.toLowerCase()) ||
      item.branch_mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='p-10 h-full bg-gray-200'>
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4">Branch List</h1>

      {/* Search input */}
      <div className='flex items-center space-x-2'>
        <input
          type="text"
          placeholder="Search..."
          className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-[6vh]"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button className="flex items-center justify-center bg-blue-600 text-white py-5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 h-[20px] w-[180px] mb-[5px]">Search</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Branch Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.branch_name}</td>
                <td className="border px-4 py-2">{item.branch_email}</td>
                <td className="border px-4 py-2">{item.address1}, {item.address2}</td>
                <td className="border px-4 py-2 flex justify-center space-x-2">
                  <button
                    className="text-green-600 hover:text-green-800 focus:outline-none"
                    onClick={() => handleViewBranch(item)}
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                    onClick={() => handleEditBranch(item)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                    onClick={() => handleDeleteBranch(item)}
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
          {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon */}
                    <FaTrashAlt className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900" id="modal-headline">
                      Delete Branch
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this branch?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirmDelete}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelDelete}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon */}
                    <FaEdit className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900" id="modal-headline">
                      Edit Branch
                    </h3>
                    {/* Edit form goes here */}
                    <form>
                      {/* Form fields for editing branch data */}
                      <div className="mb-4">
                        <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">Branch Name</label>
                        <input type="text" id="branchName" className="mt-1 p-2 border rounded-md w-full" value={editedBranch.branchName} onChange={(e) => setEditedBranch({ ...editedBranch, branchName: e.target.value })} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="branchEmail" className="block text-sm font-medium text-gray-700">Branch Email</label>
                        <input type="text" id="branchEmail" className="mt-1 p-2 border rounded-md w-full" value={editedBranch.branchEmail} onChange={(e) => setEditedBranch({ ...editedBranch, branchEmail: e.target.value })} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="branchAddress" className="block text-sm font-medium text-gray-700">Branch Address</label>
                        <input type="text" id="branchAddress" className="mt-1 p-2 border rounded-md w-full" value={editedBranch.branchAddress.street} onChange={(e) => setEditedBranch({ ...editedBranch, branchAddress: { ...editedBranch.branchAddress, street: e.target.value } })} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="branchPhone" className="block text-sm font-medium text-gray-700">Branch Phone</label>
                        <input type="text" id="branchPhone" className="mt-1 p-2 border rounded-md w-full" value={editedBranch.branchPhone} onChange={(e) => setEditedBranch({ ...editedBranch, branchPhone: e.target.value })} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="branchCode" className="block text-sm font-medium text-gray-700">Branch Code</label>
                        <input type="text" id="branchCode" className="mt-1 p-2 border rounded-md w-full" value={editedBranch.branchCode} onChange={(e) => setEditedBranch({ ...editedBranch, branchCode: e.target.value })} />
                      </div>

                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirmEdit}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedBranch && (
        <BranchDataModal
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
          branch={selectedBranch}
        />
      )}
    </div>
  );
};

export default BranchList;
