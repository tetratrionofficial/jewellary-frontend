import React from 'react';
import { FaEdit } from 'react-icons/fa';

const EditModal = ({ isOpen, onClose, onConfirmEdit, onCancelEdit, editedUser, setEditedUser }) => {
  return (
    isOpen && (
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
                    Edit User
                  </h3>
                  {/* Edit form goes here */}
                  <form>
                    {/* Form fields for editing user data */}
                    <div className="mb-4">
                      <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                      <input type="text" id="userName" className="mt-1 p-2 border rounded-md w-full" value={editedUser.userName} onChange={(e) => setEditedUser({ ...editedUser, userName: e.target.value })} />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input type="text" id="email" className="mt-1 p-2 border rounded-md w-full" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                      <input type="text" id="contactNumber" className="mt-1 p-2 border rounded-md w-full" value={editedUser.contactNumber} onChange={(e) => setEditedUser({ ...editedUser, contactNumber: e.target.value })} />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                      <input type="text" id="role" className="mt-1 p-2 border rounded-md w-full" value={editedUser.role} onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={onConfirmEdit}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Changes
              </button>
              <button
                onClick={onCancelEdit}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditModal;
