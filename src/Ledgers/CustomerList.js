import React,{ useEffect, useState }  from "react";
import Header from "../header";
import SideBar from "../SideBar";
import axios from "axios";
import { GlobalService } from "../service/GlobalService";
import Pagination from "react-js-pagination";
function CustomerList() {
    const currentYear = new Date().getFullYear();
    const date = new Date(currentYear, 3, 2).toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];
     
      const[fromDate,setFromDate] = useState(date);
      const[toDate,setToDate] = useState(today);
    const [tableData, setTableData] = useState([])
    
    useEffect(() => {
        const getCustomerDetails = async (e) => {
            const res = await axios.get(`${GlobalService.path}/fetchCustomer`)
            setTableData(res.data.data)
        }
        getCustomerDetails()
    }, [tableData]);

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
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }
    const itemsToShow = filteredItems.slice(startIndex, endIndex);

    const totalPageRange = 2; // Number of pages to display
    


  return (
    <div className="page-container">
      {/* Page Sidebar */}
      <SideBar />

      <div className="page-content">
        <Header />
        <div className="panel panel-white">
        <div className='row'>
        <div className='col-md-4'>
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
    </div>
          <div className="panel-heading">
            <h2 className="">Customer Ledger</h2>
          </div>
          <div className="panel-body">
            <div className="table-container">
              <table
                id="example3"
                className="display table"
                style={{ width: "100%", cellspacing: 0 }}
              >
                <thead className="sticky-header">
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Mobile No</th>
                    <th>GST No.</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                {itemsToShow && itemsToShow?.length > 0 ?
                    (itemsToShow.map((row, index) => (
                        <tr>
                           
                            <td>{index + 1}</td>
                            <td style={{width:"25%"}}>{row.cust_name}</td>
                            <td>{row.mobile}</td>
                            <td>{row.gstin}</td>
                            <td style={{width:"25%"}}>{row.address}</td>
                            <td>
                            <input
                            type="date"
                            name="fromdate"
                            id="date"
                            className="form-control"
                            value={fromDate}
                            onChange={(e)=>setFromDate(e.target.value)}
                          />
                          <br />
                          <input
                            type="date"
                            name="todate"
                            id="date"
                            className="form-control"
                            value={toDate}
                            onChange={(e)=>setToDate(e.target.value)}
                          />
                            </td>
                            <td>
                            <button
                            type="submit"
                            id="btndelete"
                            className="btn-danger btn-sm"
                            title="Delete"
                            aria-hidden="true"
                            onClick={()=>window.location.href = `/customerLedgerReport?custId=${row.cust_id}&fromDate=${fromDate}&toDate=${toDate}`}
                          >
                            <i className="fa fa-print" />
                          </button>
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
  );
}

export default CustomerList;
