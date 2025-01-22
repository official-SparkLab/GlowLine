import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Header from "../header";
import { GlobalService } from "../service/GlobalService";
import Pagination from "react-js-pagination";
import ExportToExcel from "../ExportToExcel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS Import

export default function EinvoiceIrnList() {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${GlobalService.path}/e-invoice`);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setTableData(data.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const filteredItems = tableData.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalItemsCount = filteredItems.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const itemsToShow = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ............IRN NO Copy................

  const handleCopy = (irn) => {
    navigator.clipboard.writeText(irn);
    toast.success("IRN copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // ..............Eway Bill No Copy.............

  const handleEWBNoCopy = (eway_no) => {
    navigator.clipboard.writeText(eway_no);
    toast.success("EWB NO copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
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
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-1 text-end">
              <ExportToExcel data={filteredItems} />
            </div>
          </div>
          <br />
          <div id="main-wrapper">
            <div className="table-container">
              <table className="table display">
                <thead className="sticky-header">
                  <tr>
                    <th>Sr. No.</th>
                    <th>Document No</th>
                    <th>IRN No</th>
                    <th>E-Way Bill No</th>
                    <th>Document Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsToShow.length > 0 ? (
                    itemsToShow.map((row, index) => (
                      <tr key={row.id || index}>
                        <td>{startIndex + index + 1}</td>
                        <td>{row.document_no}</td>
                        <td>
                          {row.irn ? (
                            <>
                              {row.irn}{" "}
                              <span
                                className="input-group-text"
                                onClick={() => handleCopy(row.irn)}
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #ced4da",
                                  borderRadius: "4px",
                                  marginLeft: "15px",
                                  padding: "6px 12px",
                                  alignItems: "center",
                                }}
                              >
                                <i className="fa fa-copy" style={{ color: "green" }}></i>
                              </span>
                            </>
                          ) : (
                            "IRN Not Available"
                          )}
                        </td>

                        <td>
                          {row.eway_no ? (
                            <>
                              {row.eway_no}{" "}
                              <span
                                className="input-group-text"
                                onClick={() => handleEWBNoCopy(row.eway_no)}
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #ced4da",
                                  borderRadius: "4px",
                                  marginLeft: "15px",
                                  padding: "6px 12px",
                                  alignItems: "center",
                                }}
                              >
                                <i className="fa fa-copy" style={{ color: "green" }}></i>
                              </span>
                            </>
                          ) : (
                            ""
                          )}
                        </td>

                        <td>{row.document_date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
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
      <ToastContainer />
    </div>
  );
}
