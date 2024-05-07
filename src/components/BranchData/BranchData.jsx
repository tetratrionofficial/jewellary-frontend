import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaBuilding, FaPhone } from 'react-icons/fa';



const BranchData = ({ branch }) => {
    return (
        <>
      
      
        <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Branch Details</h1>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-16">
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            <FaBuilding className="inline-block mr-2" />
                            Branch ID:
                        </p>
                        <p className="text-lg font-semibold">{branch.id}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            <FaBuilding className="inline-block mr-2" />
                            Branch Name:
                        </p>
                        <p className="text-lg font-semibold">{branch.branchName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            <FaEnvelope className="inline-block mr-2" />
                            Branch Email:
                        </p>
                        <p className="text-lg font-semibold">{branch.branchEmail}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            <FaMapMarkerAlt className="inline-block mr-2" />
                            Branch City:
                        </p>
                        <p className="text-lg font-semibold">{branch.branchAddress.city}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            <FaPhone className="inline-block mr-2" />
                            Branch Phone:
                        </p>
                        <p className="text-lg font-semibold">{branch.countryCode} {branch.branchPhone}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            <FaBuilding className="inline-block mr-2" />
                            Branch Code:
                        </p>
                        <p className="text-lg font-semibold">{branch.branchCode}</p>
                    </div>
                </div>
            </div>
        </div>
        
       

        </>
    );
};

export default BranchData;
