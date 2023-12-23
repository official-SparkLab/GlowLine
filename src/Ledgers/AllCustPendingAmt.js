import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import Header from "../header";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import Pagination from "react-js-pagination";
import ExportToExcel from "../ExportToExcel";

function AllCustPendingAmt() {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPageRange = 2;

  useEffect(() => {
    const getCustomerDetails = async () => {
      try {
        const res = await axios.get(`${GlobalService.path}/customerPendingAmount`);
        setTableData(Array.isArray(res.data.data) ? res.data.data : []);
        console.log(res.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // This error is from Axios (e.g., network error, timeout)
          console.error("Axios error:", error.message);
        } else {
          // This is a non-Axios error (e.g., syntax error, server returned an error)
          console.error("Error fetching data:", error.message);
        }
        // You can also set an error state if needed
        // setError(true);
      }
    };
    
    getCustomerDetails();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredItems = tableData
    ? tableData.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];

  const itemsToShow = filteredItems.slice(startIndex, endIndex);

  return (
    <div>
      <div className="page-container">
        <SideBar />
        <div className="page-content">
          <Header />
          <div className="panel panel-white">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control col-md-6"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e)}
                />
              </div>
              <div className="col-md-1 text-end">
                <ExportToExcel data={filteredItems} />
              </div>
            </div>
            <div className="page-title">
              <h3 className="breadcrumb-header">Pending Amount List</h3>
            </div>
            <div id="main-wrapper">
              <div className="table-container">
                <table className="display table">
                  <thead className="sticky-header">
                    <tr>
                      <th style={{width:"5%"}}>Sr. No.</th>
                      <th style={{width:"20%"}}>Customer Name</th>
                      <th style={{width:"20%"}}>Pending Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsToShow.map((row, index) => (
                      <tr key={index}>
                        <td>{startIndex + index + 1}</td>
                        <td>{row.cust_name}</td>
                        <td>{row.pendingAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={filteredItems.length}
                pageRangeDisplayed={totalPageRange}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCustPendingAmt;
