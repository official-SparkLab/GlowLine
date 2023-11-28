import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Modal from "../Modal/Modal"
import SideBar from "../SideBar"
import Header from "../header"
import { AdvancePayment } from "./AdvancePayment";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import Pagination from "react-js-pagination";
import ExportToExcel from "../ExportToExcel";
import { Link } from "react-router-dom";

export const AdvancePaymentTable = () => {
    const [open, setOpen] = useState(false)
    const [modalOpenPurpose, setModalOpenPurpose] = useState()
    const [tableData, setTableData] = useState()
    const [row, setRow] = useState()

    const openModal = (modalPurpose, row) => {
        setRow(row)
        setModalOpenPurpose(modalPurpose)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }


    useEffect(() => {
        const getEmployeeAdvPaymentDetails = async (e) => {
            const res = await axios.get(`${GlobalService.path}/fetchEmployeeAdvPayment`)
           
            setTableData(res.data.data)
         
        }
        getEmployeeAdvPaymentDetails()
    }, [])
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
   

    const deleteItem = async (id) => {
        try {
            const response = await axios.put(`${GlobalService.path}/deleteEmployeeAdvPayment/${id}`);
            if (response.status == 200) {
                alert("Record Delete Successfully")
                window.location.reload()
            } else alert('Failed to Delete')


        } catch (error) {
            alert('Failed to delete record')
            console.error('Error deleting item:', error);
        }
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }
    return (<>

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

                <div className="panel panel-white" >

                    <div className='row'>
                        <div className='col-md-4'>
                            <button
                                type="button"
                                className="btn btn-success m-b-sm"
                                onClick={() => openModal('add')}
                            >
                                Add Advance Payment Details
                            </button>
                        </div>
                        <div className='col-md-7'>
                            <input
                                type="text"
                                className="form-control col-md-6"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e)}
                            />
                        </div>
                        <div className='col-md-1  text-end'>
                            <ExportToExcel data={filteredItems} />
                        </div>
                    </div>
                    <div className="page-title">
                        <h3 className="breadcrumb-header">Payment List</h3>
                    </div>
                    <div id="main-wrapper">
                        <div className="table-container">
                            <table className="table display">
                                <thead>
                                    <tr>
                                       
                                        <th>Sr. No.</th>
                                        <th>Employee Name</th>
                                        <th>Advance Amount </th>
                                        <th>Payment Type</th>
                                        <th>Description </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {itemsToShow && itemsToShow?.length > 0 ?
                                        (itemsToShow.map((row, index) => (
                                            <tr>
                                                
                                                <td>{index + 1}</td>
                                                <td>{row.emp_name}</td>
                                                <td>{row.adv_amount}</td>
                                                <td>{row.payment_type}</td>
                                                <td>{row.discription}</td>
                                                <td>
                                                   
                                                    <Link className="me-3" style={{marginLeft:"10px"}} onClick={() => openModal('update', row)}>
                                                    <i
                                                    className="fa fa-edit"
                                                    style={{ color: "blue", fontSize: "18px" }}
                                                  ></i>  </Link>
                                                    <Link className="confirm-text" style={{marginLeft:"10px"}} onClick={() => deleteItem(row.emp_id)} >
                                                    <i
                                                    className="fa fa-trash"
                                                    style={{ color: "red", fontSize: "18px" }}
                                                  ></i> </Link>
                                                </td>
                                            </tr>
                                        ))) : (<tr><td>No Data Available</td></tr>)}

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


        <Modal open={open} onClose={handleClose} component={AdvancePayment} modalPurpose={modalOpenPurpose} rowDetails={row}></Modal>

    </>)
}