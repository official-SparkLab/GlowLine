import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { GlobalService } from "../service/GlobalService";
function GeneralLedger() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromDate = queryParams.get("fromDate");
  const toDate = queryParams.get("toDate");
  const [tableData, setTableData] = useState([]);

  // Genereal Ledger Api Call
  useEffect(() => {
    const getCustomerDetails = async (e) => {
      const res = await axios.get(
        `${GlobalService.path}/generalLedger/${fromDate}/${toDate}`
      );
      console.log(res);
      setTableData(res.data.data);
      console.log(tableData);
    };
    getCustomerDetails();
  }, []);

  let credit = 0;
  let debit = 0;

  return (
    <div>
      <div>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="bootstrap.css" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "\n   \n      .invoice-box {\n        max-width: 210mm;\n        margin: auto;\n        height: 260mm;\n       \n        border: 2px solid black;\n          position: relative;\n   \n      \n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: #555;\n      }\n\n      .invoice-header {\n        max-width: 210mm;\n    \n        font-size: 16px;\n        line-height: 24px;\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: #555;\n      }\n\ntable {\n  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n  border-collapse: collapse;\n  width: 100%;\n}\n\n\n\n      \n\n      @media only screen and (max-width: 600px) {\n        .invoice-box table tr.top table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n          margin: 5px;\n        }\n\n        .invoice-box table tr.information table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n\n        }\n        .tables tfoot\n      {\n         display: table-footer-group;\n      }\n      }\n\n      /** RTL **/\n      .invoice-box.rtl {\n        direction: rtl;\n        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n      }\n\n           .tables {\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        height: 480px;\n\n        width: 100%;\n\n      }\n     \n\n      .tables tfoot\n      {\n        bottom: 0;\n        \n      }\n\n      td, th {\n        border: 1px solid black;\n\n        text-align: left;\n        padding: 2px;\n      }\n\n\n    ",
          }}
        />
        <div className="invoice-box ">
          <div className="invoice-header">
            <center>
              <h2>Glow Line</h2>
            </center>
            <center>
              <h4>General Ledger</h4>
            </center>
          </div>
          <br />
          <table className="tables">
            <thead>
              <tr>
              <th>Date</th>
              <th>Particulars</th>
              <th>Vch Type</th>
              <th>Vch No.</th>
              <th>Debit</th>
              <th>Credit</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                (debit = parseFloat(debit) + parseFloat(row.total)),
                (credit = parseFloat(credit) + parseFloat(row.sub_total)),
                (
                <tr key={index}>
                <td>{row.date}</td>
                <td>{row.cust_name}</td>
                <td>{row.cust_name}</td>
                <td>{row.invoice_no}</td>
                <td>{parseFloat(row.total)}</td>
                <td>{parseFloat(row.sub_total)}</td>
                
                </tr>
              )))}

              <tr style={{ height: "100%" }}>
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
            <tfoot style={{ bottom: 0 }}>
              <tr>
                <th />
                <th />
                <th />
                
                <td>&#8377;{Math.round(debit)}</td>
                <td>&#8377;{Math.round(credit)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GeneralLedger;
