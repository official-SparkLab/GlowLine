import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { GlobalService } from "../service/GlobalService";

function SupplierLedger() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const SupID = queryParams.get("supId");
  const fromDate = queryParams.get("fromDate");
  const toDate = queryParams.get("toDate");
  const [pendingAmt, setPendingAmt] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  let credit = 0;
  let debit = 0;

  // Fetch Customer Details
  useEffect(() => {
    const getSupplierDetails = async () => {
      try {
        const response = await axios.get(
          `${GlobalService.path}/fetchSupplier/${SupID}`
        );
        const supplierData = response.data.data[0]; // Assuming you expect only one customer

        if (supplierData) {
          setName(supplierData.sup_name);
          setContactNo(supplierData.mobile_no);
          setAddress(supplierData.address);
          // Call the next API using supId here
          await callNextApi(SupID);
        }
      } catch (error) {
        console.error("Error fetching supplier details:", error);
        // Handle error appropriately (e.g., show an error message)
      }
    };

    // Callig next api for pyble amount
    const callNextApi = async (supId) => {
      try {
        // Replace 'nextApiPath' with the actual path of the next API
        const nextApiRes = await axios.get(
          `${GlobalService.path}/payableAmt/${supId}`
        );

        setPendingAmt(nextApiRes.data.totalAmt);
      } catch (error) {
        // Handle any errors from the next API
        console.error(error);
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
        console.log(tableData);
      } catch (error) {
        console.error("Error fetching suplier details:", error);
        // Handle error appropriately (e.g., show an error message)
      }
    };

    getLedgerDetails();
  }, [SupID, fromDate, toDate]);

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
        <div
          className="invoice-box "
          style={{ height: "auto", minHeight: "700px", padding: "12px" }}
        >
          <div
            className="invoice-header"
            style={{
              display: "flex",
              marginTop: "12px",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ flexDirection: "column", textAlign: "center" }}>
              <h4>
                <b>GLOWLINE THERMOPLASTIC PAINTS</b>
              </h4>
              <p style={{ fontSize: "14px" }}>KOLHAPUR,MAHARASHTRA</p>
              <p style={{ fontSize: "14px" }}>shubhamkurade63@gmail.com</p>
              <p style={{ fontSize: "14px" }}>9604096305</p>
              <h4>
                <b>{name}</b>
              </h4>
              <p style={{ fontSize: "14px" }}>{address}</p>

              <p style={{ fontSize: "14px" }}>
                {fromDate} to {toDate}
              </p>
            </div>
          </div>
          <br />
          <table className="tables">
            <thead>
              <tr>
                <th style={{ borderRight: "0", borderLeft: "0" }}>Date</th>
                <th
                  style={{
                    fontWeight: "bold",
                    borderRight: "0",
                    borderLeft: "0",
                  }}
                >
                  Particulars
                </th>
                <th style={{ borderRight: "0", borderLeft: "0" }}>Vch Type</th>
                <th style={{ borderRight: "0", borderLeft: "0" }}>Vch No.</th>
                <th
                  style={{
                    fontWeight: "bold",
                    borderRight: "0",
                    borderLeft: "0",
                  }}
                >
                  Debit
                </th>
                <th
                  style={{
                    fontWeight: "bold",
                    borderRight: "0",
                    borderLeft: "0",
                  }}
                >
                  Credit
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tableData) &&
                tableData.length > 0 &&
                tableData.map(
                  (row, index) => (
                    (debit = parseFloat(debit) + parseFloat(row.total)),
                    (credit = parseFloat(credit) + parseFloat(row.sub_total)),
                    (
                      <tr key={index}>
                        <td style={{ border: "0" }}>{row.date}</td>
                        <td style={{ fontWeight: "bold", border: "0" }}>
                          {row.rawp_id}
                        </td>
                        <td style={{ fontWeight: "bold", border: "0" }}>
                          {row.sup_name}
                        </td>
                        <td style={{ border: "0" }}>{row.invoice_no}</td>
                        <td style={{ border: "0" }}>
                          {row.total ? parseFloat(row.total) : 0}
                        </td>
                        <td style={{ border: "0" }}>
                          {row.sub_total ? parseFloat(row.sub_total) : 0}
                        </td>
                      </tr>
                    )
                  )
                )}
              <tr style={{ height: "100%" }}>
                <td style={{ border: "0" }}></td>
                <td style={{ border: "0" }}></td>
                <td style={{ border: "0" }}></td>
                <td style={{ border: "0" }}></td>
                <td style={{ border: "0" }}></td>
                <td style={{ border: "0" }}></td>
              </tr>
              <tr>
                <th style={{ border: "0" }} />
                <th style={{ border: "0" }} />
                <th style={{ border: "0" }} />
                <th style={{ border: "0" }} />

                <td
                  style={{
                    borderLeft: "0",
                    borderRight: "0",
                    borderBottom: "0",
                  }}
                >
                  &#8377;{Math.round(debit)}
                </td>
                <td
                  style={{
                    borderLeft: "0",
                    borderRight: "0",
                    borderBottom: "0",
                  }}
                >
                  &#8377;{Math.round(credit)}
                </td>
              </tr>
              <tr>
                <th style={{ border: "0" }} />
                <th style={{ border: "0" }} />
                <th style={{ border: "0" }} />
                <th style={{ border: "0" }} />

                <td
                  style={{
                    borderRight: "0",
                    borderLeft: "0",
                    fontWeight: "bold",
                  }}
                >
                  Balance
                </td>
                <td
                  style={{
                    borderRight: "0",
                    borderLeft: "0",
                    fontWeight: "bold",
                  }}
                >
                  &#8377;{Math.round(pendingAmt)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SupplierLedger;
