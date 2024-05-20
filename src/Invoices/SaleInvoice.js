import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toWords } from "number-to-words";
import "./Print.css";
function SaleInvoice() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const invoice_no = queryParams.get("invoice_no");
  const cust_id = queryParams.get("cust_id");
  const dateParam = queryParams.get("date");
  const com_id = queryParams.get("com_id");


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
  }, [invoice_no,cust_id,dateParam]);

  // Fetching Company Details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${GlobalService.path}/fetchCompany/${com_id}`);
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



  const convertToWords = (num) => {
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    if (num >= 1 && num <= 10) {
      // Convert numbers 1 to 10
      return capitalizeFirstLetter(toWords(num));
    } else if (num < 1000) {
      // Convert numbers less than 1000
      return capitalizeFirstLetter(toWords(num));
    } else if (num < 100000) {
      // Convert numbers less than 100000 (in thousands)
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      return (
        (thousands > 1 ? capitalizeFirstLetter(toWords(thousands)) + " " : "") +
        "Thousand " +
        convertToWords(remainder)
      );
    } else if (num < 10000000) {
      // Convert numbers less than 10000000 (in lakhs)
      const lakhs = Math.floor(num / 100000);
      const remainder = num % 100000;
      return (
        (lakhs > 1 ? capitalizeFirstLetter(toWords(lakhs)) + " " : "") +
        "Lakh " +
        convertToWords(remainder)
      );
    } else {
      // Convert larger numbers (in millions, billions, etc.)
      const divisor = Math.pow(10, Math.floor(Math.log10(num)) - 1);
      const quotient = Math.floor(num / divisor);
      const remainder = num % divisor;
      return (
        convertToWords(quotient) +
        " " +
        capitalizeFirstLetter(toWords(divisor)) +
        " " +
        convertToWords(remainder)
      );
    }
  };
  
  const totalinWords = convertToWords(total);
  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html:
              "\n   \n      .invoice-box {\n        max-width: 210mm;\n        margin: auto;\n  margin-top: 10px;\n        height: 245mm;\n       \n        border: 1px solid black;\n          position: relative;\n   \n      \n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: black;\n      }\n\n      .invoice-header {\n        max-width: 210mm;\n        font-size: 16px;\n        line-height: 20px;\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: black;\n      }\n\ntable {\n  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n  border-collapse: collapse;\n  width: 100%;\n}\n\n\n\n      \n\n      @media only screen and (max-width: 600px) {\n        .invoice-box table tr.top table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n          margin: 5px;\n        }\n\n        .invoice-box table tr.information table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n\n        }\n        .tables tfoot\n      {\n         display: table-footer-group;\n      }\n      }\n\n      /** RTL **/\n      .invoice-box.rtl {\n        direction: rtl;\n        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n      }\n\n           .tables {\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        height: 390px;\n\n        width: 100%;\n\n      }\n     \n\n      .tables tfoot\n      {\n        bottom: 0;\n        \n      }\n\n      td, th {\n        border: 1px solid black;\n\n         text-align: left;\n        padding: 2px;\n      }\n\nlabel\n      {\n        font-weight: bold;\n      }\n    ",
          }}
        />
        <div className="invoice-box" style={{backgroundColor:"white"}}>
          <div className="invoice-header">
            <center>
              <span>Tax Invoice</span>
            </center>
            <table style={{ height: 300 }}>
              <tbody>
                <tr style={{ height: 300 }}>
                  <td style={{ width: "50%", marginTop: 0, marginBottom: 0 }}>
                    <div style={{ height: 120 }}>
                      <h4 style={{ top: 0, fontSize: 17, marginLeft: 10, fontWeight: 600 }}>
                        Name :Glowline Thermoplastic Paint
                      </h4>
                      <div
                        style={{ marginTop: 10, marginLeft: 10,}}
                      >
                        
                          <h5 style={{fontSize:"14px"}}><b>Office  :</b> {companyAddress} </h5>
                          
                        
                        <h5 style={{fontSize:"14px"}}><b>E-Mail :</b> {companyEmail}</h5>
                        
                        <h5 style={{fontSize:"14px"}}><b>Mobile :</b>{comapnyContact}</h5>
                       
                        <h5 style={{fontSize:"15px"}}>
                        <b>GST No :{companyGstin}</b>
                        </h5>
                      </div>
                    </div>
                    <hr />
                    <div style={{ height: 140,  }}>
                      <label style={{fontSize:"16px"}}>Party Name: </label>&nbsp;
                      <span style={{fontSize:"14px"}}>{customer_name}</span>
                      <br />
                      <h5 ><b>Address  &nbsp;&nbsp;&nbsp;&nbsp;: </b>{cust_address}</h5>
                      
                      <h5  style={{fontSize:"15px"}}><b>GST NO   &nbsp;&nbsp;&nbsp;&nbsp;: {cust_gstin}</b></h5>
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
                           
                          </td>
                          <td style={{ width: "50%" }}> {VehicleNo}</td>
                        </tr>
                        <tr>
                          <td style={{ width: "50%" }}>
                            <label>Driver Name :</label> <br />
                           
                          </td>
                          <td style={{ width: "50%" }}>
                          {DriverName}
                          </td>
                        </tr>
                        <tr style={{ height: 120 }}>
                          <td colSpan={2} style={{ top: 0 }}>
                            <h5 style={{fontSize:""}}><b>Destination : </b>{destination}</h5> <br />
                           
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <table className="tables" style={{marginTop:"5px"}}>
            <thead>
              <tr>
                <th style={{ width: "7%" }}><b>No</b></th>
                <th style={{ width: "35%" }}><b>Description of Goods</b></th>
                <th style={{ width: "12%" }}><b>HSN</b></th>
                <th><b>Quantity</b></th>
                <th><b>Units/Bag's</b></th>
                <th style={{ width: "12%" }}><b>Rate</b></th>
                <th style={{ width: "15%" }}><b>Amount</b></th>
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
                    <td>{row.total_weight}</td>
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
                    Bank Details
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
                    A/c No :
                  </div>
                  <div style={{ width: "65%", float: "right", padding: 2 }}>
                    {accountNo}
                  </div>
                </td>
                <td colSpan={2}>CGST 9%</td>
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
                    Bank Name :
                  </div>
                  <div style={{ width: "65%", float: "right", padding: 2 }}>
                    {bankName}
                  </div>
                </td>
                <td colSpan={2}>SGST 9%</td>
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
                    Branch :
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
                    IFSC Code :
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
              <tr style={{ height:"80px",border:"0" }}>
                <td colSpan={2} style={{border:"0"}}>
                  <div style={{ float: "right", marginRight: 50 }}>
                    GLOWLINE THERMOPLASTIC PAINT
                  </div>
                 
                  <br />
                  <br />
                  <br />
                  <div style={{ float: "right", marginRight: 100 }}>
                    Authorized Signatory
                  </div>
                </td>
              </tr>
              <tr style={{height:"25px"}}>
                <td className="gray-color"></td>
                <td className="yellow-color"></td>
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
