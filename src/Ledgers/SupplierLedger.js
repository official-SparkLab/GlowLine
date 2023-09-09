import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { GlobalService } from "../service/GlobalService";

function SupplierLedger() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [SupID, setSupID] = useState(queryParams.get("supId"));
  const [fromDate, setFromDate] = useState(queryParams.get("fromDate"));
  const [toDate, setTodate] = useState(queryParams.get("toDate"));

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [data, setData] = useState([]);

  // Fetch Customer Details
  useEffect(() => {
    const getSupplierDetails = async () => {
      try {
        const response = await axios.get(
          `${GlobalService.path}/fetchSupplier/${SupID}`
        );
        const supplierData = response.data.data[0]; // Assuming you expect only one customer

        if (supplierData) {
          setData(supplierData);
          setName(supplierData.sup_name);
          setContactNo(supplierData.mobile_no);
          setAddress(supplierData.address);
        }
      } catch (error) {
        console.error("Error fetching supplier details:", error);
        // Handle error appropriately (e.g., show an error message)
      }
    };

    getSupplierDetails();
  }, [SupID]);

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const getLedgerDetails = async () => {
      try {
        const response = await axios.get(
          `${GlobalService.path}/supplierLedger/${SupID}/${fromDate}/${toDate}`
        );
        const supplierData = response.data.data;
        // Assuming you expect only one customer
        setTableData(supplierData);
      } catch (error) {
        console.error("Error fetching suplier details:", error);
        // Handle error appropriately (e.g., show an error message)
      }
    };

    getLedgerDetails();
  }, []);


  let previousGrandTotal = 0;
  let availableBal = 0;

  return (
    <div>
      <div>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "\n   \n      .invoice-box {\n        max-width: 210mm;\n        margin: auto;\n        height: 260mm;\n       \n        border: 2px solid black;\n          position: relative;\n   \n      \n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: #555;\n      }\n\n      .invoice-header {\n        max-width: 210mm;\n    \n        font-size: 16px;\n        line-height: 24px;\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: #555;\n      }\n\ntable {\n  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n  border-collapse: collapse;\n  width: 100%;\n}\n\n\n\n      \n\n      @media only screen and (max-width: 600px) {\n        .invoice-box table tr.top table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n          margin: 5px;\n        }\n\n        .invoice-box table tr.information table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n\n        }\n        .tables tfoot\n      {\n         display: table-footer-group;\n      }\n      }\n\n      /* RTL */\n      .invoice-box.rtl {\n        direction: rtl;\n        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n      }\n\n           .tables {\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        height: 480px;\n\n        width: 100%;\n\n      }\n     \n\n      .tables tfoot\n      {\n        bottom: 0;\n        \n      }\n\n      td, th {\n        border: 1px solid black;\n\n        text-align: left;\n        padding: 2px;\n      }\n\n\n    ",
          }}
        />
        <div className="invoice-box ">
          <div className="invoice-header">
            <center>
              <h2>Glow Line</h2>
            </center>
            <center>
              <h4>Supplier Ledger Summery</h4>
            </center>
            <table style={{ tableLayout: "fixed" }}>
              <tbody>
                <tr>
                  <td>
                    Customer Name: <label>{name}</label>
                  </td>
                  <td>Address: {address}</td>
                </tr>
                <tr>
                  <td>
                    Contact: <label>{contactNo}</label>
                  </td>
                  <td>
                    Date From:{fromDate} <label>to</label> {toDate}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <table className="tables">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Date</th>
                <th>Description</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tableData) && tableData.length > 0 &&
                tableData.map((row, index) => {
                    // Calculate the new available balance
                    if (row.total > 0)
                    availableBal =
                     ( Number(availableBal) - Number(row.total));
                  else
                    availableBal = Number(availableBal) + Number(row.sub_total);

                  // Determine the sign for available balance display
                  const availableBalSign = availableBal >= 0 ? "-" : "+";
                  return(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.date}</td>
                    <td>{row.invoice_no}</td>
                    <td>{row.total ? row.total : 0}</td>
                    <td>{row.sub_total? row.sub_total : 0}</td>
                    
                    <td>{availableBalSign}
                    {Math.abs(availableBal)}</td>
                  </tr>
                  )})}
              <tr style={{height:"100%"}}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>

            <tfoot style={{ bottom: 0 }}>
              <tr>
                <th>Sr. No</th>
                <th>Date</th>
                <th>Description</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Balance</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SupplierLedger;
