import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import Header from "../header";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import Pagination from "react-js-pagination";
import ExportToExcel from "../ExportToExcel";

function QuatationInvoiceView() {

  
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
      const getCustomerDetails = async (e) => {
        const res = await axios.get(`${GlobalService.path}/fetchQuatation`);
  
        setTableData(res.data.data.reverse());
      };
      getCustomerDetails();
    }, []);
  
    const [searchQuery, setSearchQuery] = useState("");
  
    const itemsPerPage = 10; // Number of items to display per page
    const allItems = tableData; // Your array of items
  
    const [currentPage, setCurrentPage] = useState(1);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredItems = allItems
      ? allItems.filter((item) =>
          Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : [];
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    };
    const itemsToShow = filteredItems.slice(startIndex, endIndex);
  
    const totalPageRange = 2; // Number of pages to display
  return (
    <div>
    <div className="page-container">
    {/* Page Sidebar */}
    <SideBar />
    {/* /Page Sidebar */}
    {/* Page Content */}
    <div className="page-content">
      {/* Page Header */}
      <Header />
      {/* /Page Header */}
      {/* Page Inner */}

      <div className="panel panel-white">
        <div className="row">
          <div className="col-md-4">
           
          </div>
          <div className="col-md-7">
            <input
              type="text"
              className="form-control col-md-6"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
          <div className="col-md-1  text-end">
            <ExportToExcel data={filteredItems} />
          </div>
        </div>
        <div className="page-title">
          <h3 className="breadcrumb-header">Quatation List</h3>
        </div>
        <div id="main-wrapper">
          <div className="table-container">
            <table className="display table">
              <thead className="sticky-header">
                <tr>
                  <th>Sr. No.</th>
                  <th>Voucher No</th>
                  <th>Date</th>
                  <th>Destination</th>
                  <th>Total Amount </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {itemsToShow && itemsToShow?.length > 0 ? (
                  itemsToShow.map((row, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{row.voucher_no}</td>
                      <td>{row.date}</td>
                      <td>{row.destination}</td>

                      <td>{row.total}</td>

                      <td>
                        <a
                          id="btnprint"
                          className="btn-danger btn-sm"
                          title="Invoice"
                          aria-hidden="true"
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                          href={`/quatationInvoice?voucher_no=${row.voucher_no}`}
                        >
                          <i className="fa fa-print" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Data Available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={allItems?.length}
            pageRangeDisplayed={totalPageRange} // Number of visible page links
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default QuatationInvoiceView