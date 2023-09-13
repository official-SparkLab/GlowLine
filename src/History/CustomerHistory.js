import React from "react";
import SideBar from "../SideBar";
import Header from "../header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";

import {
  faUser,
  faMobileAlt,
  faEnvelope,
  faMapMarkerAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function CustomerHistory() {

    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cust_id = queryParams.get("cust_id");

    const [customerName, setCustomerName] = useState()
    const [contact, setContact] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [bankName, setBankName] = useState()
    const [ifsc, setIFSC] = useState()
    const[brnach,setBranch] = useState()
    const [accountNo, setAccountNo] = useState()
    const [gstin, setgstin] = useState()

    const [tableData, setTableData] = useState([]);
    useEffect(() => {
      const getCustomerDetails = async (e) => {
        const res = await axios.get(`${GlobalService.path}/fetchSaleById/${cust_id}`);
        console.log(res);
        setTableData(res.data.data);
        console.log(tableData);
      };
      getCustomerDetails();
    }, []);


    useEffect(() => {
        const getCustomerDetails = async (e) => {
            const res = await axios.get(`${GlobalService.path}/fetchCustomer/${cust_id}`)
            console.log(res);
            setCustomerName(res.data.data[0].cust_name);
            setContact(res.data.data[0].mobile);
            setgstin(res.data.data[0].gstin);
            setAddress(res.data.data[0].address);
            setBankName(res.data.data[0].bank_name);
            setAccountNo(res.data.data[0].acc_no);
            setIFSC(res.data.data[0].ifsc);
            setBranch(res.data.data[0].branch);
            console.log(tableData);
        }
        getCustomerDetails()
    }, [])


  return (
    <div>
      <div className="page-container">
        <SideBar />

        {/* Page Content */}
        <div className="page-content">
          <Header />
          <div className="panel panel-white">
            <div className="panel-heading">
              <div className="back" style={{ margin: "0px 5px 10px 0px" }}>
                <a href="/customerTable" type="submit" className="back-button">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ marginRight: "7px" }}
                  />
                  Back
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div id="main-wrapper">
                <div
                  className="panel panel-white"
                  style={{ height: "auto", padding: "10px" }}
                >
                  <div className="row">
                    <div className="col-sm-9">
                      <h2
                        className=""
                        style={{
                          fontSize: "25px",
                          fontWeight: "450",
                          marginTop: "5px",
                        }}
                      >
                        Profile Information
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="panel panel-white">
                  <div className="profile-history">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="personal-details">
                          <h3 className="profile-heading">Personal Details</h3>
                          <div className="profile-details">
                            <p className="profile-item">
                              <FontAwesomeIcon
                                icon={faUser}
                                className="profile-label-icon"
                                style={{ marginRight: "20px" }}
                              />
                              {customerName}
                            </p>
                            <p className="profile-item">
                              <FontAwesomeIcon
                                icon={faMobileAlt}
                                className="profile-label-icon"
                                style={{ marginRight: "20px" }}
                              />
                            {contact}
                            </p>
                            <p className="profile-item">
                              <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                className="profile-label-icon"
                                style={{ marginRight: "20px" }}
                              />
                              {address}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="personal-details">
                          <h3 className="profile-heading">Bank Details</h3>
                          <div className="profile-details">
                            <p className="profile-item">
                              Bank Name : {bankName}
                            </p>
                            <p className="profile-item">
                              Account Number :  {accountNo}
                            </p>

                           
                            <p className="profile-item">IFSC: {ifsc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="panel panel-white">
                      <div className="panel-heading clearfix">
                        <h4 className="panel-title">Order History</h4>
                      </div>
                      <div className="panel-body">
                        <div className="table-container">
                          <table id="example3" className="display table">
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
                            {tableData && tableData?.length > 0 ? (
                                tableData.map((row, index) => (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{row.invoice_no}</td>
                                    <td>{row.date}</td>
                                    <td style={{width:"20%"}}>{customerName}</td>
                                    <td>{row.total}</td>
          
                                    <td>
                                      <a
                                        className="me-3"
                                        href={`/saleHistory?invoice_no=${row.invoice_no}&cust_id=${row.cust_id}&date=${row.date}`}
                                        style={{cursor:"pointer"}}
                                      >
                                        <img
                                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                          alt="img"
                                        />
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
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHistory;
