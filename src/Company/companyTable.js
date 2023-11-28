import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Modal from "../Modal/Modal"
import SideBar from "../SideBar"
import Header from "../header"

import { CompanyForm } from "./CompanyForm";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import ExportToExcel from "../ExportToExcel";

export const CompanyTable = () => {
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
        const getCompanyDetails = async (e) => {
            const res = await axios.get(`${GlobalService.path}/fetchCompany`)
            
            setTableData(res.data.data)
            
        }
        getCompanyDetails()
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
            const response = await axios.put(`${GlobalService.path}/deleteCompany/${id}`);
            if (response.status == 200) {
                alert(response.data.message)
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
                                Add Company Details
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
                        <h3 className="breadcrumb-header">Company List</h3>
                    </div>
                    <div id="main-wrapper">
                        <div className="table-container">
                            <table className="table display">
                                <thead>
                                    <tr>
                                        
                                        <th>Sr. No.</th>
                                        <th>Company Name</th>
                                        <th>Contact</th>
                                        <th>Email</th>
                                        <th>City </th>
                                        <th>State </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {itemsToShow && itemsToShow?.length > 0 ?
                                        (itemsToShow.map((row, index) => (
                                            <tr>
                                                
                                                <td>{index + 1}</td>
                                                <td>{row.com_name}</td>
                                                <td>{row.contact}</td>
                                                <td>{row.email}</td>
                                                <td>{row.city}</td>
                                                <td>{row.state}</td>
                                                <td>
                                                    
                                                    <Link className="me-3" style={{marginLeft:"10px"}} onClick={() => openModal('update', row)}>
                                                    <i
                                                    className="fa fa-edit"
                                                    style={{ color: "blue", fontSize: "18px" }}
                                                  ></i> </Link>
                                                    <Link className="confirm-text" style={{marginLeft:"10px"}} onClick={() => deleteItem(row.com_id)} >
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


        <Modal open={open} onClose={handleClose} component={CompanyForm} modalPurpose={modalOpenPurpose} rowDetails={row}></Modal>

    </>)
}