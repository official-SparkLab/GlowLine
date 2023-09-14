import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Modal from "../Modal/Modal"
import SideBar from "../SideBar"
import Header from "../header"

import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import ExportToExcel from "../ExportToExcel";
import { Purchase_Payble_Form } from "./Purchase_Payble_Form";


export const Purchase_Payble_Table = () => {
    const [open, setOpen] = useState(false)
    const [modalOpenPurpose, setModalOpenPurpose] = useState()
    const [row, setRow] = useState()
    const [tableData, setTableData] = useState()
    const openModal = (modalPurpose, row) => {
        setRow(row)
        setModalOpenPurpose(modalPurpose)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const getExpenseDetails = async (e) => {
            const res = await axios.get(`${GlobalService.path}/fetchPurchasePayable`)
            console.log(res);
            setTableData(res.data.data.reverse())
            console.log(tableData);
        }
        getExpenseDetails()
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
    const pageCount = Math.ceil(allItems?.length / itemsPerPage);

    const pageRange = () => {
        if (pageCount <= totalPageRange) {
            return Array.from({ length: pageCount }, (_, i) => i + 1);
        } else {
            const halfRange = Math.floor((totalPageRange - 3) / 2);
            const startPages = [1, 2, 3];
            const endPages = [pageCount - 2, pageCount - 1, pageCount];

            return [...startPages, '...', ...Array.from({ length: totalPageRange - 6 }, (_, i) => i + currentPage - halfRange), '...', ...endPages];
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }


    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`${GlobalService.path}/deletePurchasePayable/${id}`);
            if (response.status == 200) {
                alert("Record Deleted successfully")
                window.location.reload()
            } else alert('Failed to Delete')


        } catch (error) {
            alert('Failed to delete record')
            console.error('Error deleting item:', error);
        }
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
                                Add Purchase Payable
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
                        <h3 className="breadcrumb-header">Payable List</h3>
                    </div>
                    <div id="main-wrapper">
                        <div className="table-container">
                            <table className="table display">
                                <thead className="sticky-header">
                                    <tr>
                                      
                                        <th>Sr. No.</th>
                                        <th>Supplier Name</th>
                                        <th>Date</th>
                                        <th>Pending Amount</th>
                                        <th>Paid Amount </th>
                                        <th>Available Balance</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {itemsToShow && itemsToShow?.length > 0 ?
                                        (itemsToShow.map((row, index) => (
                                            <tr>
                                              
                                                <td>{index + 1}</td>
                                                <td>{row.sup_name}</td>
                                                <td>{row.date}</td>
                                                <td>{row.pending_amt}</td>
                                                <td>{row.paid_amount}</td>
                                                <td>{row.available_bal}</td>
                                                <td>
                                                    <a className="confirm-text"  style={{marginLeft:"10px"}} onClick={() => deleteItem(row.pur_pay_id)} >
                                                        <img src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg" alt="img" />
                                                    </a>
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


        <Modal open={open} onClose={handleClose} component={Purchase_Payble_Form} modalPurpose={modalOpenPurpose} rowDetails={row}></Modal>

    </>)
}