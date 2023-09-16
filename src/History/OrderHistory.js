import React from "react";
import SideBar from "../SideBar";
import Header from "../header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faFileInvoice,
  faLocation,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import {
  faUser,
  faMobileAlt,
  faEnvelope,
  faMapMarkerAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
function OrderHistory() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cust_id = queryParams.get("cust_id");
  const invoice_no = queryParams.get("invoice_no");
  const date = queryParams.get("date");


  const [customerName, setCustomerName] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [gstin, setgstin] = useState();

  const[trans_amt,setTransAmt] = useState();
  const[hamali,setHamali] = useState();
  const [total, setotal] = useState(0);
  const [sub_total, setSubtotal] = useState();
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [igst, setIgst] = useState("");


  const [tableData, setTableData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoiceRes, invoiceProd, custRes] = await Promise.all([
          axios.get(`${GlobalService.path}/fetchSale/${date}/${invoice_no}`),
          axios.get(`${GlobalService.path}/fetchSProduct/${date}/${invoice_no}`),
          axios.get(`${GlobalService.path}/fetchCustomer/${cust_id}`),
        ]);


         // Invoice Product Details
         setTableData(invoiceProd.data.data);

        // Customer Details
        setCustomerName(custRes.data.data[0].cust_name);
        setContact(custRes.data.data[0].mobile);
        setgstin(custRes.data.data[0].gstin);
        setAddress(custRes.data.data[0].address);

        // Invoice Details
       setTransAmt(invoiceRes.data.data.trans_amt);
       setHamali(invoiceRes.data.data.hamali);
        setotal(invoiceRes.data.data.total);
        setSubtotal(invoiceRes.data.data.sub_total);
        setCgst(invoiceRes.data.data.cgst_amt);
        setSgst(invoiceRes.data.data.sgat_amt);
        setIgst(invoiceRes.data.data.igst_amt);
        

       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="page-container">
        <SideBar />

        {/* Page Content */}

        <div className="page-content">
          <Header />
          <div className="scroll">
            <div className="panel panel-white">
              <div className="panel-heading">
                <div className="back" style={{ margin: "0px 5px 10px 0px" }}>
                  <div className="row">
                    <div className="col col-md-6">
                      <a
                        onClick={() => {
                          window.history.back();
                        }}
                        type="submit"
                        className="back-button"
                      >
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          style={{ marginRight: "7px" }}
                        />
                        Back
                      </a>
                      <h2
                        className=""
                        style={{
                          fontSize: "20px",
                          fontWeight: "450",
                          marginTop: "5px",
                        }}
                      >
                        Sale History
                      </h2>
                    </div>
                    <div className="col col-md-4"></div>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div id="main-wrapper">
                  <div
                    className="panel panel-white"
                    style={{ height: "auto", padding: "10px" }}
                  >
                    <div className="row">
                      <div className="col-sm-4">
                        <h2
                          style={{
                            fontSize: "16px",
                            fontWeight: "350",
                            marginTop: "5px",
                          }}
                        >
                          Invoice No : {invoice_no}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-white">
                    <div className="profile-history">
                      <div className="row">
                        <div className="col col-md-6">
                          <div className="personal-details">
                            <h3 className="profile-heading">
                              Customer Details
                            </h3>
                            <div className="profile-details">
                              <p className="profile-item">
                                <FontAwesomeIcon
                                  icon={faUser}
                                  className="profile-label-icon"
                                  style={{ marginRight: "15px" }}
                                />
                                {customerName}
                              </p>
                              <p className="profile-item">
                                <FontAwesomeIcon
                                  icon={faMobileAlt}
                                  className="profile-label-icon"
                                  style={{ marginRight: "15px" }}
                                />
                                {contact}
                              </p>
                              <p className="profile-item">
                                <FontAwesomeIcon
                                  icon={faMapMarkerAlt}
                                  className="profile-label-icon"
                                  style={{ marginRight: "15px" }}
                                />
                                {address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="personal-details">
                        <div className="row">
                          <div className="col col-sm-10">
                            <h3 className="profile-heading">Product Details</h3>
                          </div>
                          <div className="col-sm-2">
                            <button
                              type="button"
                              className="btn btn-success edit-profile-btn"
                              data-toggle="modal"
                              data-target="#updateOrder"
                              style={{ marginTop: "5px" }}
                            >
                              Edit Order
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="edit-profile-icon"
                                style={{ marginLeft: "5px" }}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="table-container">
                        <table className="display table">
                          <thead className="sticky-header">
                            <tr>
                              <th style={{ fontWeight: "350" }}>Sr. No</th>
                              <th style={{ fontWeight: "350" }}>
                                Product Name
                              </th>
                              <th style={{ fontWeight: "350" }}>HSN</th>
                              <th style={{ fontWeight: "350" }}>Total Weight</th>
                              <th style={{ fontWeight: "350" }}>Unit/Bag's</th>
                              <th style={{ fontWeight: "350" }}>Rate</th>
                              <th style={{ fontWeight: "350" }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(tableData) &&
                              tableData.map((row, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td style={{width:"20%"}}>{row.prod_name}</td>
                                  {/* Assuming invoice_no is a property of the row object */}
                                  <td>{row.hsn}</td>
                                  <td>{row.total_weight}</td>
                                  <td>{row.qty}</td>
                                  <td>{row.rate}</td>
                                  <td>{row.total}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        </div>
                      </div>
                      <hr />
                      <div className="personal-details">
                        <div className="row">
                          <div className="col-sm-10">
                            <h3 className="profile-heading">Billing Details</h3>
                          </div>
                        </div>

                        <div className="profile-details">
                          <div className="row">
                          
                            <div className="col col-sm-2">
                              <p
                                className="profile-item"
                                style={{ fontWeight: "350" }}
                              >
                                Sub Total
                              </p>
                              <p className="profile-item">{sub_total ? sub_total : 0}</p>
                            </div>
                            <div className="col col-sm-2">
                              <p
                                className="profile-item"
                                style={{ fontWeight: "350" }}
                              >
                                GST Amount
                              </p>
                              <p className="profile-item">
                                {sgst + igst + cgst}
                              </p>
                            </div>
                            <div className="col col-sm-2">
                              <p
                                className="profile-item"
                                style={{ fontWeight: "350" }}
                              >
                                Transport Amount
                              </p>
                              <p className="profile-item">{trans_amt}</p>
                            </div><div className="col col-sm-2">
                            <p
                              className="profile-item"
                              style={{ fontWeight: "350" }}
                            >
                              Other Amount
                            </p>
                            <p className="profile-item">{hamali}</p>
                          </div>
                            <div className="col col-sm-2">
                              <p
                                className="profile-item"
                                style={{ fontWeight: "350" }}
                              >
                                Grand Total
                              </p>
                              <p className="profile-item">{total}</p>
                            </div>
                            <div className="col col-sm-1">
                             
                            </div>
                           
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col col-md-7"></div>
                        <div className="col col-md-5"></div>
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

export default OrderHistory;
