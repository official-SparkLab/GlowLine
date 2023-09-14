import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Modal from "../Modal/Modal";
import SideBar from "../SideBar";
import Header from "../header";
import { SaleEntryForm } from "./SaleEntryForm";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import ExportToExcel from "../ExportToExcel";

export const SaleEntryTable = () => {
  const [open, setOpen] = useState(false);
  const [modalOpenPurpose, setModalOpenPurpose] = useState();
  const openModal = (modalPurpose) => {
    setModalOpenPurpose(modalPurpose);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const getCustomerDetails = async (e) => {
      const res = await axios.get(`${GlobalService.path}/fetchSale`);
      console.log(res);
      setTableData(res.data.data.reverse());
      console.log(tableData);
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
  const pageCount = Math.ceil(allItems?.length / itemsPerPage);

  const pageRange = () => {
    if (pageCount <= totalPageRange) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    } else {
      const halfRange = Math.floor((totalPageRange - 3) / 2);
      const startPages = [1, 2, 3];
      const endPages = [pageCount - 2, pageCount - 1, pageCount];

      return [
        ...startPages,
        "...",
        ...Array.from(
          { length: totalPageRange - 6 },
          (_, i) => i + currentPage - halfRange
        ),
        "...",
        ...endPages,
      ];
    }
  };
  return (
    <>
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
                <button
                  type="button"
                  className="btn btn-success m-b-sm"
                  onClick={() => openModal("add")}
                >
                  Add Sale Details
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
              <h3 className="breadcrumb-header">Sale List</h3>
            </div>
            <div id="main-wrapper">
              <div className="table-container">
                <table className="display table">
                  <thead className="sticky-header">
                    <tr>
                      <th>Sr. No.</th>
                      <th>Invoice No</th>
                      <th>Date</th>
                      <th>Customer Name </th>
                      <th>Total Amount </th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {itemsToShow && itemsToShow?.length > 0 ? (
                      itemsToShow.map((row, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{row.invoice_no}</td>
                          <td>{row.date}</td>
                          <td style={{width:"20%"}}>{row.cust_name}</td>

                          <td>{row.total}</td>

                          <td>
                          <a
                          className="me-3"
                          href={`/saleHistory?invoice_no=${row.invoice_no}&cust_id=${row.cust_id}`}
                          style={{cursor:"pointer"}}
                        >
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                            alt="img"
                          />
                        </a>
                            <a
                              type="submit"
                              id="btndelete"
                              className="btn-danger btn-sm"
                              title="Delete"
                              aria-hidden="true"
                              style={{marginLeft:"10px",cursor:"pointer"}}
                              onClick={()=>window.location.href = `/saleInvoice?invoice_no=${row.invoice_no}&cust_id=${row.cust_id}&date=${row.date}`}
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

      <Modal
        open={open}
        onClose={handleClose}
        component={SaleEntryForm}
        modalPurpose={modalOpenPurpose}
      ></Modal>
    </>
  );
};
