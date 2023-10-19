import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toWords } from "number-to-words";

function Quotation() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const voucher_no = queryParams.get("voucher_no");

  const [companyAddress, setCompanyAddress] = useState("");
  const [companyGstin, setCompanyGstin] = useState("");
  const [bankName, setBankName] = useState();
  const [IFSC, setIFSC] = useState();
  const [accountNo, setAccountNo] = useState();
  const [branch, setBranch] = useState();

  const [date, setDate] = useState();
  const [orderNo, setOrderNo] = useState("");
  const [destination, setDestination] = useState("");

  const [total, setotal] = useState(0);
  const [sub_total, setSubtotal] = useState();
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [igst, setIgst] = useState("");
  const[trans_amt,setTransAMt]  = useState("");
  const[otherCharges,setOtherCharges] = useState("");

  const [tableData, setTableData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoiceRes, invoiceProd] = await Promise.all([
          axios.get(`${GlobalService.path}/fetchQuatation/${voucher_no}`),
          axios.get(
            `${GlobalService.path}/fetchQuatationProduct/${voucher_no}`
          ),
        ]);

        // Invoice Details
        setDate(invoiceRes.data.data.date);
        setDestination(invoiceRes.data.data.destination);
        setOrderNo(invoiceRes.data.data.order_no);
        setotal(invoiceRes.data.data.total);
        setSubtotal(invoiceRes.data.data.sub_total);
        setCgst(invoiceRes.data.data.cgst_amt);
        setSgst(invoiceRes.data.data.sgat_amt);
        setIgst(invoiceRes.data.data.igst_amt);
        setTransAMt(invoiceRes.data.data.trans_amt);
        setOtherCharges(invoiceRes.data.data.hamali)

        // Invoice Product Details
        setTableData(invoiceProd.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [voucher_no]);

  // Fetching Company Details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${GlobalService.path}/fetchCompany`);
        // Compnay Details
        setCompanyAddress(response.data.data[0].address);
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
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            "\n   \n      .invoice-box {\n        max-width: 250mm;\n        margin: auto;\n        height: 250mm;\n       \n        border: 2px solid black;\n          position: relative;\n   \n      \n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: black;\n      }\n\n      .invoice-header {\n        max-width: 250mm;\n    \n        font-size: 16px;\n        line-height: 24px;\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        color: black;\n      }\n\ntable {\n  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n  border-collapse: collapse;\n  width: 100%;\n}\n\n\n\n      \n\n      @media only screen and (max-width: 600px) {\n        .invoice-box table tr.top table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n          margin: 5px;\n        }\n\n        .invoice-box table tr.information table td {\n          width: 100%;\n          display: block;\n          text-align: center;\n\n        }\n        .tables tfoot\n      {\n         display: table-footer-group;\n      }\n      }\n\n      /** RTL **/\n      .invoice-box.rtl {\n        direction: rtl;\n        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n      }\n\n           .tables {\n        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;\n        height: 360px;\n\n        width: 100%;\n\n      }\n     \n\n      .tables tfoot\n      {\n        bottom: 0;\n        \n      }\n\n      td, th {\n        border: 1px solid black;\n\n        text-align: left;\n        padding: 2px;\n      }\n\nlabel\n      {\n        font-weight: bold;\n      }\n    ",
        }}
      />
      <div className="invoice-box ">
        <div className="invoice-header">
          <center style={{ backgroundColor: "yellow" }}>
            <span>
              <b>PROFORMA INVOICE</b>
            </span>
          </center>
          <table>
            <tbody>
              <tr>
                <td style={{ width: "50%", marginTop: 0, marginBottom: 0 }}>
                  <center style={{ top: 0, fontSize: 22, fontWeight: 600 }}>
                    Glowline Thermoplastic Paint
                  </center>
                  <div style={{ height: 150, marginTop: 10, marginLeft: 10 }}>
                    <b>
                      <label>
                       {companyAddress}
                      </label>
                      <br />
                    </b>
                    <label>{/*?php echo $state;?*/}</label>
                    <br />
                    <label>
                      GST No :<b>{companyGstin}</b>
                    </label>
                    <br />
                    <br />
                    <label>E-Mail :</label>
                  </div>
                </td>
                <td style={{ width: "50%" }}>
                  <table style={{ marginLeft: 0, marginRight: 0 }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "50%" }}>
                          <label>Quotation No : {voucher_no}</label> <br />
                          {/*?php echo $ino?*/}
                        </td>
                        <td style={{ width: "50%" }}>
                          <label>Date : {date}</label> <br />
                          {/*?php echo $pdate?*/}
                        </td>
                      </tr>
                      <tr>
                        <th style={{ width: "50%" }}>Mode/Term of Payment</th>
                        <td style={{ width: "50%" }}>{/*?php echo $ino?*/}</td>
                      </tr>
                      <tr>
                        <th style={{ width: "50%" }}>
                          Buyer's Ref./ Order No. : 
                        </th>
                        <td style={{ width: "50%" }}>{orderNo}</td>
                      </tr>
                      <tr>
                        <th style={{ width: "50%" }}>
                          Other Refference(s) :-{" "}
                        </th>
                        <td style={{ width: "50%" }}>
                          {" "}
                          <br />
                          {/*?php echo $ino?*/}
                        </td>
                      </tr>
                      <tr>
                        <th style={{ width: "50%" }}>
                          Dispatch Through :- {/*?php echo $pdate?*/}
                        </th>
                        <th style={{ width: "50%" }}>
                          <br />
                        </th>
                      </tr>
                      <tr>
                        <th style={{ width: "50%" }}>Destination :- </th>
                        <td style={{ width: "50%" }}>
                          {destination}
                          <br />
                          {/*?php echo $ino?*/}
                        </td>
                      </tr>
                      <tr>
                        <th style={{ width: "50%" }} colSpan={2}>
                          Term of Delivery :-{" "}
                        </th>
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
              <th style={{ width: "7%" }}>Sr. No</th>
              <th>Description of Goods</th>
              <th style={{ width: "15%" }}>HSN</th>
              <th style={{ width: "10%" }}>Quantity</th>
              <th style={{ width: "10%" }}>Unit/Bags</th>
              <th>Rate</th>
              <th style={{ width: "17%" }}>Taxable Value</th>
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
              <td></td>
            </tr>
          </tbody>

          <tfoot style={{ bottom: 0 }}>
            <tr>
              <th colSpan={3} style={{ padding: 0 }}></th>
              <th colSpan={3}>Total</th>
              <th>{sub_total}</th>
            </tr>
            <tr>
              <td colSpan={3} style={{ padding: 0 }}></td>
              <td colSpan={3}>GST 18%</td>
              <td>{igst + sgst + cgst}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ padding: 0 }}></td>
              <td colSpan={3}>Total Value</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td colSpan={3} style={{ padding: 0 }}></td>
              <td colSpan={4}>
                <center>Extra Actucal</center>
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ padding: 0 }}></td>
              <td colSpan={3} style={{ height: 40 }}>
                Transport + Other Amount
              </td>
              <th>
                {(trans_amt+otherCharges)}
              </th>
            </tr>
          </tfoot>
        </table>
        <span style={{ fontWeight: "bold" }}>
          Total Amount in word:{totalinWords} Only
        </span>
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <td style={{ width: "50%", marginTop: 0, marginBottom: 0 }}>
                <center style={{ top: 0, fontSize: 22, fontWeight: 600 }}>
                  Glowline Thermoplastic Paints
                </center>
                <div style={{ height: 150, marginTop: 10, marginLeft: 10 }}>
                  <b>
                    <label>Bank Name : {bankName}</label>
                    <br />
                  </b>
                  <br />
                  <label>Account No : {accountNo}</label>
                  <br />
                  <br />
                  <label>IFSC : {IFSC}</label>
                  <br />
                  <br />
                  <label>Branch : {branch}</label>
                </div>
              </td>
              <td style={{ height: 135, textAlign: "right" }}>
                <p style={{ marginBottom: 85, marginRight: 50 }} />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  height: 25,
                  width: "50%",
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
    </div>
  );
}

export default Quotation;
