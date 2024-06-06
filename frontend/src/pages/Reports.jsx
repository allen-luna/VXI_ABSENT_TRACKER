import React, {useState, useEffect} from 'react'
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import api from '../api'
import toast from 'react-hot-toast';

const Reports = () => {
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        getUserData()
    },[])

    const getUserData = async () => {
      try {
          const userData = await api.get("/api/absent-request/data/");
          setUserData(userData.data);
      } catch (error) {
          toast.error("Error fetching data:");
      }
  };


  const totalPages = Math.ceil(userData.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = userData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
    };
    return new Date(dateString).toLocaleString(undefined, options);
};



  return (
    <div className="flex flex-col p-4">
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4">Image</th>
                  <th scope="col" className="px-6 py-4">HRID</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">Team</th>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Requested Date</th>
                  <th scope="col" className="px-6 py-4">Requested Date & Start Shift</th>
                  <th scope="col" className="px-6 py-4">Requested Date & End Shift</th>
                  <th scope="col" className="px-6 py-4">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 flex justify-center">
                      <img src={`${import.meta.env.VITE_IMAGE_URL}${row.author}`} alt={row.name} className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-6 py-4 text-center">{row.author}</td>
                    <td className="px-6 py-4 text-center">{row.name}</td>
                    <td className="px-6 py-4 text-center">{row.team}</td>
                    <td className="px-6 py-4 text-center">{row.category}</td>
                    <td className="px-6 py-4 text-center">{row.date_request}</td>
                    <td className="px-6 py-4 text-center">{formatDate(row.start_shift)}</td>
                    <td className="px-6 py-4 text-center">{formatDate(row.end_shift)}</td>
                    <td className="px-6 py-4 text-center">{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <nav>
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      <GrFormPreviousLink className="w-5 h-5" />
                    </button>
                  </li>
                  <li className='bg-orange-500'>
                    <span
                      className={`px-4 py-2 leading-tight border cursor-pointer bg-orange-500${
                        'text-gray-500 bg-white'
                      } border-gray-300`}
                      onClick={() => paginate(currentPage)}
                    >
                      {currentPage}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      <GrFormNextLink className="w-5 h-5" />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports