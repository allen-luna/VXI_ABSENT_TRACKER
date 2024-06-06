import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import api from "../api";

const UpdateUserModal = ({userData, imageDataURL, isOpen, onClose}) => {

    const [addUserData, setAddUserData] = useState({ ...userData });

      useEffect(() => {
        if (userData) {
          setAddUserData({
            hrid: userData.hrid || '',
            nt_account: userData.nt_account || '',
            firstName: userData.firstName || '',
            middleName: userData.middleName || '',
            lastName: userData.lastName || '',
            position: userData.position || '',
            team: userData.team || '',
            employeeStatus: userData.employeeStatus || '',
            userStatus: userData.userStatus || '',
          });
        }
      }, [userData]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setAddUserData((prev) => ({
          ...prev,
          [name]: value
        }));
      };

      const updateSubmit = async () => {
        console.log(addUserData)
        try {
          const response = await api.patch(`/api/update/user/${userData.hrid}/`, addUserData);
          console.log(response.data);
          toast.success("User updated successfully");
        } catch (error) {
          console.error('Failed to update user:', error);
          toast.error("Failed to update user");
        }
        onClose(); // Close the modal after update
      };
      

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="relative bg-white p-8 rounded shadow-lg w-11/12 md:w-3/4 lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <h2 className="text-2xl font-bold mb-4 col-span-full">Update User</h2>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={onClose}
            >
              &times;
            </button>
            <div className="flex items-center justify-center col-span-1 md:col-span-1">
              {imageDataURL ? (
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}${imageDataURL}`}
                  alt={addUserData?.lastName}
                  className="max-h-full h-full object-cover"
                />
              ) : (
                <img className="rounded-full" />
              )}
            </div>
            <div className="col-span-1 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 font-bold">HRID:</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={addUserData.hrid}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold">NTAccount:</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={addUserData.nt_account}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold">First Name:</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={addUserData.firstName}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold">Middle Name:</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={addUserData.middleName}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold">Last Name:</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={addUserData.lastName}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold">Employee Title:</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={addUserData.position}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold">Team:</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={addUserData.team}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold">Employee Status:</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={addUserData.employeeStatus}
                    disabled
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold">User Status:</label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="userStatus"
                    value={addUserData.userStatus}
                    onChange={handleChange}
                  >
                    <option value="" className="text-gray-400" disabled>
                      Select Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 ml-auto">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  type="submit"
                  onClick={updateSubmit}
                >
                  Update User
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default UpdateUserModal