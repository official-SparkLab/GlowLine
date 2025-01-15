import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Toastify Import
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import SideBar from '../SideBar';
import Header from '../header';
import Footer from '../Footer';
import axios from 'axios';
import { GlobalService } from "../service/GlobalService";
import { useLocation, useNavigate } from 'react-router-dom';

export default function InvoiceActivities() {
  const navigate = useNavigate();
  // State to hold session data
  const [einvoiceData, setEinvoiceData] = useState(null);
  const [authenticationData, setAuthenticationData] = useState(null);
  const [documentNo, setDocumentNo] = useState(null);
  const [irnNo, setIrnNo] = useState(null);
  const [documentDate, setDocumentDate] = useState(null);

  // Fetch data from sessionStorage when the component mounts
  useEffect(() => {
    const storedData = sessionStorage.getItem('einvoiceData');
    if (storedData) {
      const parsedData = JSON.parse(storedData); // JSON पार्स करा
      setEinvoiceData(parsedData); // Parsed data सेट करा
      if (parsedData.data && parsedData.data.Irn) {
        setIrnNo(parsedData.data.Irn); // IRN सेट करा
        setDocumentDate(parsedData.data.AckDt); // IRN सेट करा
      }
      console.log("E-Invoice Data", parsedData);
    }
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  useEffect(() => {
    const AuthenticationData = sessionStorage.getItem('AuthenticationData');
    if (AuthenticationData) {
      setAuthenticationData(JSON.parse(AuthenticationData)); // Parse the JSON string to JavaScript object
      console.log("AuthenticationData", AuthenticationData);
    }
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  useEffect(() => {
    const documentDetails = sessionStorage.getItem('documentDetails');
    if (documentDetails) {
      setDocumentNo(JSON.parse(documentDetails)); // Parse the JSON string to JavaScript object
      console.log("documentDetails", documentDetails);
    }
  }, []); 
  // Get Invoice Details By IRN
  const getEInvoiceDetails = async (Token, gstNumber) => {
    const email = "shubhamkurade63@gmail.com";
    const HEADER = {
      headers: {
        username: authenticationData.data.UserName,
        ip_address: authenticationData.header.ip_address,
        client_id: authenticationData.header.client_id,
        client_secret: authenticationData.header.client_secret,
        gstin: authenticationData.header.gstin,
        "auth-token": authenticationData.data.AuthToken,
      },
    };

    try {
      const response = await axios.get(
        "https://api.mastergst.com//einvoice/type/GETIRN/version/V1_03",
        {
          params: {
            param1: einvoiceData.data.Irn,
            email: email,
            supplier_gstn: authenticationData.header.gstin,
          },
          headers: HEADER.headers,
        }
      );
      console.log("E-Invoice Details Response:", response.data);
    } catch (error) {
      console.error("Error fetching E-Invoice Details:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(irnNo);
    toast.success("IRN copied to clipboard!", {
      position: "top-right",
      autoClose: 3000, // Toast visibility duration in milliseconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const saveDetails = async (e) => {
    e.preventDefault();
     // Validate required fields

// Validate Category fields
if (!irnNo) {
    alert("Please Enter Category Name");
    return;
}
// End Validate Category fields
let item = {
        irn: irnNo,
        document_no: documentNo,
        document_date: documentDate
      
    };
    try {
        let result = await fetch(`${GlobalService.path}/e-invoice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(item),
        });
       
        if (result.ok) {
            toast.success("Data added successfully", { autoClose: 1500 });
           
            navigate("/newInvoice");
        } else {
            toast.error("Failed to add Data");
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed to add Data");
    }
};
  return (
    <div>
      <div className="page-container">
        <SideBar />
        <div className="page-content">
          <Header />
          <div className="panel panel-white">
            <div className="panel-heading">
              <h4 className="panel-title">Add rows</h4>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-6 col-sm-12">
                  <label>Document No</label>
                  <input
                    placeholder="Document No"
                    type="text"
                    className="form-control"
                    value={documentNo}
                    readOnly
                  />
                </div>
                <div className="col-sm-6 col-sm-12">
                  <label>IRN</label>
                  <div
                    className="input-group"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      placeholder="IRN No"
                      type="text"
                      className="form-control"
                      value={irnNo}
                      readOnly
                      style={{ flex: 1 }} // Input field ने संपूर्ण रुंदी व्यापावी
                    />
                    <span
                      className="input-group-text"
                      onClick={handleCopy}
                      style={{
                        cursor: "pointer",
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        marginLeft: "5px", // Field पासून थोडा अंतर द्या
                        padding: "6px 12px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i className="fa fa-copy"></i>
                    </span>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-sm-6 col-sm-12">
                  <label>Document Date & Time</label>
                  <input 
                  type="text" 
                  className="form-control"
                  value={documentDate} 
                  readOnly
                  />
                </div>
                <div className="col-sm-6 col-sm-12">
                  <label></label>
                  <br></br>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ float: "right" }}
                    onClick={saveDetails}
                  >
                    Save Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
