import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Header from "../header";
import { GlobalService } from "../service/GlobalService";
import Pagination from "react-js-pagination";
import ExportToExcel from "../ExportToExcel";

export default function EinvoiceIrnList() {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${GlobalService.path}/e-invoice`);
        const data = await response.json();
        setTableData(data.data.reverse());
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filtered and paginated data
  const filteredItems = tableData.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalItemsCount = filteredItems.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = filteredItems.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="page-container">
      <SideBar />
      <div className="page-content">
        <Header />
        <div className="panel panel-white">
        <div className="page-title">
            <h3 className="breadcrumb-header">IRN List</h3>
          </div>
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control col-md-6"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-1 text-end">
              <ExportToExcel data={filteredItems} />
            </div>
          </div><br></br>
          
          <div id="main-wrapper">
            <div className="table-container">
              <table className="table display">
                <thead className="sticky-header">
                  <tr>
                    <th>Sr. No.</th>
                    <th>Document No</th>
                    <th>IRN No</th>
                    <th>Document Date & Time</th>
                   </tr>
                </thead>
                <tbody>
                  {itemsToShow.length > 0 ? (
                    itemsToShow.map((row, index) => (
                      <tr key={row.id || index}>
                        <td>{startIndex + index + 1}</td>
                        <td>{row.document_no}</td>
                        <td>{row.irn}</td>
                        <td>{row.document_date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={totalItemsCount}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
