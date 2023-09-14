import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toWords } from "number-to-words";

function SaleInvoice() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const invoice_no = queryParams.get("invoice_no");
  const cust_id = queryParams.get("cust_id");
  const dateParam = queryParams.get("date");

  const [companyAddress, setCompanyAddress] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [comapnyContact, setComapnyContact] = useState("");
  const [companyGstin, setCompanyGstin] = useState("");
  const [bankName, setBankName] = useState();
  const [IFSC, setIFSC] = useState();
  const [accountNo, setAccountNo] = useState();
  const [branch, setBranch] = useState();

  const [date, setDate] = useState();
  const[DriverName,setDriverName] = useState("");
  const[VehicleNo,setVehicleNo] = useState("");
  const [dispatchNo, setDispatchNo] = useState("");
  const [destination, setDestination] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [cust_address, setCustAddress] = useState("");
  const [cust_gstin, setCustGstIn] = useState("");
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
          axios.get(`${GlobalService.path}/fetchSale/${dateParam}/${invoice_no}`),
          axios.get(`${GlobalService.path}/fetchSProduct/${dateParam}/${invoice_no}`),
          axios.get(`${GlobalService.path}/fetchCustomer/${cust_id}`),
        ]);

        // Customer Details
        setCustAddress(custRes.data.data[0].address);
        setCustomerName(custRes.data.data[0].cust_name);
        setCustGstIn(custRes.data.data[0].gstin);

        // Invoice Details
        setDate(invoiceRes.data.data.date);
        setDestination(invoiceRes.data.data.destination);
        setDispatchNo(invoiceRes.data.data.dispatch_no);
        setotal(invoiceRes.data.data.total);
        setSubtotal(invoiceRes.data.data.sub_total);
        setCgst(invoiceRes.data.data.cgst_amt);
        setSgst(invoiceRes.data.data.sgat_amt);
        setIgst(invoiceRes.data.data.igst_amt);
        setDriverName(invoiceRes.data.data.driver_name);
        setVehicleNo(invoiceRes.data.data.vehicle_no);

        // Invoice Product Details
        setTableData(invoiceProd.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetching Company Details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${GlobalService.path}/fetchCompany`);
        // Compnay Details
        setCompanyAddress(response.data.data[0].address);
        setCompanyEmail(response.data.data[0].email);
        setComapnyContact(response.data.data[0].contact);
        setCompanyGstin(response.data.data[0].gst);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetching Bank Details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${GlobalService.path}/fetchBankDetails`
        );
        // Bank Details
        setAccountNo(response.data.data[0].account_no);
        setBranch(response.data.data[0].branch);
        setIFSC(response.data.data[0].ifsc);
        setBankName(response.data.data[0].bank_name);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const totalinWords = toWords(total)
    .toLowerCase()
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase());

  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "\n   \n      .invoice-box {\n        max-width: 210mm;\n        margin: auto;\n        height: 260mm;\n       \n        border: 2px solid black;\n          position: relative;\n   \n      \n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: black;\n      }\n\n      .invoice-header {\n        max-width: 210mm;\n        font-size: 16px;\n        line-height: 24px;\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: black;\n      }\n\ntable {\n  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n  border-collapse: collapse;\n  width: 100%;\n}\n\n\n\n      \n\n      @media only screen and (max-width: 600px) {\n        .invoice-box table tr.top table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n          margin: 5px;\n        }\n\n        .invoice-box table tr.information table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n\n        }\n        .tables tfoot\n      {\n         display: table-footer-group;\n      }\n      }\n\n      /** RTL **/\n      .invoice-box.rtl {\n        direction: rtl;\n        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n      }\n\n           .tables {\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        height: 390px;\n\n        width: 100%;\n\n      }\n     \n\n      .tables tfoot\n      {\n        bottom: 0;\n        \n      }\n\n      td, th {\n        border: 1px solid black;\n\n        text-align: left;\n        padding: 2px;\n      }\n\nlabel\n      {\n        font-weight: bold;\n      }\n    ",
          }}
        />
        <div className="invoice-box ">
          <div className="invoice-header">
            <center>
              <span>Tax Invoice</span>
            </center>
            <table style={{ height: 300 }}>
              <tbody>
                <tr style={{ height: 280 }}>
                  <td style={{ width: "50%", marginTop: 0, marginBottom: 0 }}>
                    <div style={{ height: 150 }}>
                      <center style={{ top: 0, fontSize: 22, fontWeight: 600 }}>
                        Glowline Thermoplastic Paint
                      </center>
                      <div
                        style={{ marginTop: 10, marginLeft: 10, fontSize: 16 }}
                      >
                        <b>
                          <label> {companyAddress} </label>
                          <br />
                        </b>
                        <label>E-Mail : {companyEmail}</label>
                        <br />
                        <label>Mobile : {comapnyContact}</label>
                        <br />
                        <label>
                          GST No :<b>{companyGstin}</b>
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div style={{ height: 130, fontSize: 16 }}>
                      <label>Party Name: {customer_name}</label>
                      <br />
                      <label>Address : {cust_address}</label>
                      <br />
                      <label>GST NO :{cust_gstin}</label>
                    </div>
                  </td>
                  <td style={{ width: "50%" }}>
                    <table
                      style={{ marginLeft: 0, marginRight: 0, fontSize: 16 }}
                    >
                      <tbody>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <label>Invoice No : {invoice_no} </label> <br />
                            {/*?php echo $ino?*/}
                          </td>
                          <td style={{ width: "50%" }}>
                            <label>Date : {date}</label> <br />
                            {/*?php echo $pdate?*/}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <label>State Code :</label> <br />
                            {/*?php echo $ino?*/}
                          </td>
                          <td style={{ width: "50%" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <label>Dispatch No</label> <br />
                            {/*?php echo $ino?*/}
                          </td>
                          <td style={{ width: "50%" }}>{dispatchNo}</td>
                        </tr>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <label>Terms of Payment :</label> <br />
                            {/*?php echo $ino?*/}
                          </td>
                          <td style={{ width: "50%" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <label>Vehical No</label> <br />
                            {VehicleNo}
                          </td>
                          <td style={{ width: "50%" }}>0</td>
                        </tr>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <label>Driver Name :</label> <br />
                            {DriverName}
                          </td>
                          <td style={{ width: "50%" }}>
                            {/*?php echo $ino?*/}
                          </td>
                        </tr>
                        <tr style={{ height: 120 }}>
                          <td colSpan={2} style={{ top: 0 }}>
                            <label>Destination :</label> <br />
                            {destination}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <table className="tables">
            <thead>
              <tr>
                <th style={{ width: "7%" }}>No</th>
                <th style={{ width: "35%" }}>Description of Goods</th>
                <th style={{ width: "12%" }}>HSN</th>
                <th>Quantity</th>
                <th>Units/Bag's</th>
                <th style={{ width: "12%" }}>Rate</th>
                <th style={{ width: "15%" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tableData) &&
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.prod_name}</td>{" "}
                    {/* Assuming invoice_no is a property of the row object */}
                    <td>{row.hsn}</td>
                    <td>{row.weight}</td>
                    <td>{row.qty}</td>
                    <td>{row.rate}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
              <tr style={{ height: "100%" }}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>

            <tfoot style={{ bottom: 0, textAlign: "center" }}>
              <tr>
                <td colSpan={4} style={{ padding: 0, fontSize: 15 }}>
                  <div
                    style={{
                      width: "30%",
                      borderRight: "1.5px solid",
                      height: "100%",
                      padding: 2,
                      float: "left",
                    }}
                  >
                    <b>Bank Details</b>
                  </div>
                  <div style={{ width: "65%", float: "right", padding: 2 }}>
                    GLOWLINE THERMOPLASTIC PAINTS
                  </div>
                </td>
                <th colSpan={2}> Total</th>
                <th>{sub_total ? sub_total : 0}</th>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: 0, fontSize: 15 }}>
                  <div
                    style={{
                      width: "30%",
                      borderRight: "1.5px solid",
                      height: "100%",
                      padding: 2,
                      float: "left",
                    }}
                  >
                    <b>A/c No : </b>
                  </div>
                  <div style={{ width: "65%", float: "right", padding: 2 }}>
                    {accountNo}
                  </div>
                </td>
                <td colSpan={2}>CGST 18%</td>
                <td>{cgst}</td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: 0, fontSize: 15 }}>
                  <div
                    style={{
                      width: "30%",
                      borderRight: "1.5px solid",
                      height: "100%",
                      padding: 2,
                      float: "left",
                    }}
                  >
                    <b>Bank Name :</b>
                  </div>
                  <div style={{ width: "65%", float: "right", padding: 2 }}>
                    {bankName}
                  </div>
                </td>
                <td colSpan={2}>SGST 18%</td>
                <td>{sgst}</td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: 0, fontSize: 15 }}>
                  <div
                    style={{
                      width: "30%",
                      borderRight: "1.5px solid",
                      height: "100%",
                      padding: 2,
                      float: "left",
                    }}
                  >
                    <b>Branch :</b>
                  </div>
                  <div style={{ width: "65%", float: "right", padding: 2 }}>
                    {branch}
                  </div>
                </td>
                <td colSpan={2}>IGST 18%</td>
                <td>{igst}</td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: 0, fontSize: 15 }}>
                  <div
                    style={{
                      width: "30%",
                      borderRight: "1.5px solid",
                      height: "100%",
                      padding: 2,
                      float: "left",
                    }}
                  >
                    <b>IFSC Code :</b>
                  </div>
                  <div style={{ width: "65%", float: "right", padding: 2 }}>
                    {IFSC}
                  </div>
                </td>
                <td colSpan={2}>Grand Total</td>
                <th>{total}</th>
              </tr>
            </tfoot>
          </table>
          <span style={{ fontWeight: "bold" }}>
            Total Amount in word: {totalinWords} Rupees Only
          </span>
          <br />
          <br />
          <table>
            <tbody>
              <tr style={{ height: 100 }}>
                <td colSpan={2}>
                  <div style={{ float: "right", marginRight: 50 }}>
                    GLOWLINE THERMOPLASTIC PAINT
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <div style={{ float: "right", marginRight: 100 }}>
                    Authorized Signatory
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    height: 25,
                    width: "60%",
                    backgroundColor: "gray",
                    border: 0,
                  }}
                ></td>
                <td
                  style={{ height: 25, backgroundColor: "yellow", border: 0 }}
                ></td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{ height: 25, textAlign: "center", border: 0 }}
                >
                  Factory : Hanuman Nagar, Factory Road, Sankeshwar
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}

export default SaleInvoice;
