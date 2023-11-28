import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Header from "../header";

import Modal from "../Modal/Modal";

import axios from "axios";
import { GlobalService } from "../service/GlobalService";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import ExportToExcel from "../ExportToExcel";
import { BankDetails } from "./BankDetails";
import { Button } from "@mui/material";

export const BankDetailsTable = () => {
  const [open, setOpen] = useState(false);
  const [modalOpenPurpose, setModalOpenPurpose] = useState();
  const [tableData, setTableData] = useState();
  const [row, setRow] = useState();
  const openModal = (modalPurpose, row) => {
    setRow(row);
    setModalOpenPurpose(modalPurpose);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const bankDetails = async (e) => {
      const res = await axios.get(`${GlobalService.path}/fetchBankDetails`);
      setTableData(res.data.data);
    };
    bankDetails();
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
  const itemsToShow = filteredItems.slice(startIndex, endIndex);

  const totalPageRange = 2; // Number of pages to display
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };


  const deleteItem = async (id) => {
    try {
      const response = await axios.put(
        `${GlobalService.path}/deleteBankDetails/${id}`
      );
      if (response.status === 200) {
        alert("Deleted Bank Details");
        window.location.reload();
      } else alert("Failed to Delete");
    } catch (error) {
      alert("Failed to delete record");
      console.error("Error deleting item:", error);
    }
  };


  return (
    <>
      <div className="page-container">
        {/* Page Sidebar */}
        <SideBar />

        <div className="page-content">
          <Header />
          <div className=" panel panel-white">
            <div className="row">
              <div className="col-md-4">
                <button
                  type="button"
                  className="btn btn-success m-b-sm"
                  onClick={() => openModal("add")}
                >
                  Add Bank Details
                </button>
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
              <h3 className="breadcrumb-header">Bank Details</h3>
            </div>
            <div id="main-wrapper">
              <div className="table-container">
                <table className="table display">
                  <thead className="sticky-header">
                    <tr>
                      <th>Sr. No.</th>
                      <th>Bank Name</th>
                      <th>IFSC CODE</th>
                      <th>Account Number </th>
                      <th>Branch Name</th>

                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {itemsToShow && itemsToShow?.length > 0 ? (
                      itemsToShow.map((row, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{row.bank_name}</td>
                          <td>{row.ifsc}</td>
                          <td>{row.account_no}</td>
                          <td>{row.branch}</td>

                          <td>
                            <Link
                              className="me-3"
                              style={{ marginLeft: "10px" }}
                              onClick={() => openModal("update", row)}
                            >
                            <i
                            className="fa fa-edit"
                            style={{ color: "blue", fontSize: "18px" }}
                          ></i>
                            </Link>
                            <Link
                              className="confirm-text"
                              style={{ marginLeft: "10px" }}
                              onClick={() => deleteItem(row.cb_id)}
                            >
                            <i
                            className="fa fa-trash"
                            style={{ color: "red", fontSize: "18px" }}
                          ></i>
                            </Link>
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

      <Modal
        open={open}
        onClose={handleClose}
        component={BankDetails}
        modalPurpose={modalOpenPurpose}
        rowDetails={row}
      ></Modal>
    </>
  );
};
