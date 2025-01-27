import React, { useState, useEffect } from "react";
import axios from 'axios';
import SideBar from "../SideBar";
import Header from "../header";
import Footer from "../Footer";
import { blue } from "@mui/material/colors";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse, differenceInCalendarDays } from 'date-fns';

import { useNavigate } from 'react-router-dom';

function NewInvoiceForm() {
    const navigate = useNavigate(); // useNavigate component function 

    const [inputGstNumber, setInputGstNumber] = useState("");
    const [gstDetails, setGstDetails] = useState(null);
    const [token, setToken] = useState("");

    // Define state variables for each form field Of transaction details
    const [supplyType, setSupplyType] = useState(""); // State for document number

    const [documentNo, setDocumentNo] = useState(""); // State for document number
    const [documentType, setDocumentType] = useState(""); // State for document type


    // Define state variables for each form field Of Seller
    const [sellerTradeName, setSellerTradeName] = useState("GLOWLINE THERMOPLASTIC PAINTS");
    const [sellerGstNo, setSellerGstNo] = useState("29FTHPK8890K1ZN");
    const [sellerLegalName, setSellerLegalName] = useState("GLOWLINE");
    const [sellerAddress1, setSellerAddress1] = useState("HANUMAN NAGAR CTC 3443/A");
    const [sellerAddress2, setSellerAddress2] = useState("HANUMAN NAGARSankeshwar");
    const [sellerLocation, setSellerLocation] = useState("Belagavi");
    const [sellerPincode, setSellerPincode] = useState("591313");
    const [sellerStateCode, setSellerStateCode] = useState("29");
    const [sellerPhone, setSellerPhone] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");

    // Define state variables for each form field Of Seller
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingLocation, setShippingLocation] = useState("");
    const [shippingPincode, setShippingPincode] = useState("");
    const [shippingStateCode, setShippingStateCode] = useState("");

    // Define state variables for each form field Of Buyer
    const [LegalName, setLegalName] = useState("");
    const [TradeName, setTradeName] = useState("");
    const [buyerAddress1, setBuyerAddress1] = useState("");
    const [buyerAddress2, setBuyerAddress2] = useState("");
    const [buyerLocation, setBuyerLocation] = useState("");
    const [buyerPincode, setBuyerPincode] = useState("");
    const [buyerStateCode, setBuyerStateCode] = useState("");
    const [posStateCode, setPosStateCode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    // Define state variables for each form field Of Tranportation  details
    const [transporterId, setTransporterId] = useState("");
    const [transporterName, setTransporterName] = useState("");
    const [approximateDistance, setApproximateDistance] = useState("0");

    // Define state variables for each form field Of Tranportation  PART-B details
    const [transportMode, setTransportMode] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [transportDocNo, setTransportDocNo] = useState("");



    useEffect(() => {
        const fetchData = async () => {
            const email = "shubhamkurade63@gmail.com";
            let Token = "";
            let tokenExpiry = "";

            // ..Declare Headers for Authentication

            const HEADERTOK = {
                headers: {
                    "username": "API_29FTHPK8890K1ZN",
                    "password": "Sangram#98",
                    "ip_address": "192.168.1.6",
                    "client_id": "EINP4913288e-348b-41e8-a476-ad6c8e0fb94a",
                    "client_secret": "EINP81dd4f2f-c3a6-45ec-93d1-bb948ce22b04",
                    "gstin": "29FTHPK8890K1ZN"
                }
            };


            // .......Authentication API Integration

            try {
                const response = await axios.get('https://api.whitebooks.in/einvoice/authenticate?email=' + email, HEADERTOK);
                console.log('Authentication Response:', response);

                // Session storage 
                sessionStorage.setItem('AuthenticationData', JSON.stringify(response.data));

                if (response.data.status_cd === "Sucess") {
                    Token = response.data.data.AuthToken;
                    tokenExpiry = response.data.data.TokenExpiry;
                    console.log('Auth Token:', Token);
                    console.log('Token Expiry:', tokenExpiry);
                    setToken(Token); // Store the token in state

                    // Fetch GST details if GST number is provided
                    if (inputGstNumber) {
                        await getGstDetails(Token, inputGstNumber);
                    }
                } else {
                    console.error('Authentication Error:', response.data.status_desc);
                    return;
                }
            } catch (e) {
                console.error('Authentication Catch Error:', e.message);
                return;
            }
        };

        fetchData();
    }, [inputGstNumber]);


    // .....Get GST Details And Set Gst Details


    const getGstDetails = async (Token, gstNumber) => {
        if (gstNumber.length !== 15) {
            console.error("Invalid GST Number: GST Number must be exactly 15 characters.");
            return; // लांबी 15 नसल्यास API कॉल होणार नाही
        }

        const email = "shubhamkurade63@gmail.com";
        const HEADER = {
            headers: {
                "username": "API_29FTHPK8890K1ZN",
                "ip_address": "192.168.1.6",
                "client_id": "EINP4913288e-348b-41e8-a476-ad6c8e0fb94a",
                "client_secret": "EINP81dd4f2f-c3a6-45ec-93d1-bb948ce22b04",
                "gstin": "29FTHPK8890K1ZN",
                "auth-token": Token
            }
        };

        try {
            const response = await axios.get('https://api.whitebooks.in/einvoice/type/GSTNDETAILS/version/V1_03', {
                params: {
                    param1: gstNumber,
                    email: email
                },
                headers: HEADER.headers
            });
            console.log('GST Details Response:', response.data);
            // Extract necessary fields from response.data
            const { LegalName, TradeName, AddrBnm, AddrBno, AddrSt, AddrLoc, StateCode, AddrPncd } = response.data.data;

            // Update state variables with fetched GST details
            setLegalName(LegalName || "");
            setTradeName(TradeName || "");
            setBuyerAddress1(`${AddrBno}, ${AddrBnm}`.trim());
            setBuyerAddress2(`${AddrBnm}, ${AddrLoc}`); // If AddrFlno is to be included, update this
            setBuyerLocation(AddrLoc || "");
            setBuyerPincode(AddrPncd || "");
            setBuyerStateCode(StateCode || "");
            setPhone(""); // Assuming phone and email are not fetched from this response
            setEmail("");

            setGstDetails(response.data.data); // Save all GST details to state

        } catch (error) {
            console.error('Error fetching GST details:', error);
        }
    };



    // ...delare variables for Submit data 

    const handleGstInputChange = (event) => {
        setInputGstNumber(event.target.value);
    };

    const handleRemoveItem = index => {
        const list = [...items];
        list.splice(index, 1);
        setItems(list);
    };
    const [items, setItems] = useState([
        {
            productName: "",
            hsn: "",
            quantity: "",
            unit: "",
            value: "",
            cgst: "",
            sgst: "",
            igst: ""
        }
    ]);
    const handleItemChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...items];
        list[index][name] = value;
        setItems(list);
    };
    const handleAddItem = () => {
        setItems([...items, { productName: "", hsn: "", quantity: "", unit: "", value: "", cgst: "", sgst: "", igst: "" }]);
    };


    // .................ValDtls Calculation and gst calculation sum ............
    const totalCgstAmt = items.reduce((sum, item) => {
        const AssAmt = parseFloat(item.value) || 0;
        const CgstAmt = (AssAmt * parseFloat(item.cgst) || 0) / 100;
        return sum + CgstAmt;
    }, 0);

    const totalSgstAmt = items.reduce((sum, item) => {
        const AssAmt = parseFloat(item.value) || 0;
        const SgstAmt = (AssAmt * parseFloat(item.sgst) || 0) / 100;
        return sum + SgstAmt;
    }, 0);

    const totalIgstAmt = items.reduce((sum, item) => {
        const AssAmt = parseFloat(item.value) || 0;
        const IgstAmt = (AssAmt * parseFloat(item.igst) || 0) / 100;
        return sum + IgstAmt;
    }, 0);

    const totalAssVal = items.reduce((sum, item) => sum + (parseFloat(item.value) || 0), 0);
    const totalInvVal = totalAssVal + totalCgstAmt + totalSgstAmt + totalIgstAmt;


    const [totals, setTotals] = useState({
        totalAssVal: 0,
        totalCgstAmt: 0,
        totalSgstAmt: 0,
        totalIgstAmt: 0,
        totalInvVal: 0,
    });

    useEffect(() => {
        setTotals({
            totalAssVal: safeNumber(totalAssVal),
            totalCgstAmt: safeNumber(totalCgstAmt),
            totalSgstAmt: safeNumber(totalSgstAmt),
            totalIgstAmt: safeNumber(totalIgstAmt),
            totalInvVal: safeNumber(totalInvVal),
        });
    }, [items]);

    // Define the safeNumber function at the top
    const safeNumber = (num, decimals = 2) => {
        const parsedNum = parseFloat(num);
        return isNaN(parsedNum) ? "0.00" : parsedNum.toFixed(decimals);
    };

    // ..........Submit API Integration 

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = "shubhamkurade63@gmail.com";

        const DATA = {
            "Version": "1.1",
            "TranDtls": {
                "TaxSch": "GST",
                "SupTyp": supplyType
                // "RegRev": "Y",
                // "EcmGstin": null,
                // "IgstOnIntra": "N"
            },
            "DocDtls": {
                "Typ": documentType,
                "No": documentNo,  // Use the document number from the form
                "Dt": documentDateFormat
            },
            "SellerDtls": {
                "Gstin": sellerGstNo,
                "LglNm": sellerLegalName,
                "TrdNm": sellerTradeName,
                "Addr1": sellerAddress1,
                "Addr2": sellerAddress2,
                "Loc": sellerLocation,
                "Pin": sellerPincode,
                "Stcd": sellerStateCode,
                // "Ph": "9000000000",
                // "Em": "abc@gmail.com"
            },
            "BuyerDtls": {
                "Gstin": inputGstNumber,
                "LglNm": TradeName,
                "TrdNm": TradeName,
                "Pos": posStateCode,
                "Addr1": buyerAddress1,
                "Addr2": buyerAddress2,
                "Loc": buyerLocation,
                "Pin": buyerPincode,
                "Stcd": buyerStateCode,
                // "Ph": "9000000000",
                // "Em": "abc@gmail.com"
            },
            // "DispDtls": {
            //     "Nm": "ABC company pvt ltd",
            //     "Addr1": "7th block, kuvempu layout",
            //     "Addr2": "kuvempu layout",
            //     "Loc": "Banagalore",
            //     "Pin": 518360,
            //     "Stcd": "37"
            // },
            "ShipDtls": {
                "Gstin": inputGstNumber,
                "LglNm": TradeName,
                // "TrdNm": "kuvempu layout",
                "Addr1": shippingAddress,
                // "Addr2": "kuvempu layout",
                "Loc": shippingLocation,
                "Pin": shippingPincode,
                "Stcd": shippingStateCode
            },
            "ItemList": items.map((item, index) => {
                // GST calculation based on the form inputs
                const AssAmt = parseFloat(item.value).toFixed(2);
                const CgstAmt = parseFloat((AssAmt * item.cgst) / 100).toFixed(2);
                const SgstAmt = parseFloat((AssAmt * item.sgst) / 100).toFixed(2);
                const IgstAmt = parseFloat((AssAmt * item.igst) / 100).toFixed(2);

                const UnitPrice = parseFloat((item.value / item.quantity)).toFixed(2);

                const TotItemVal = (parseFloat(AssAmt) + parseFloat(CgstAmt) + parseFloat(SgstAmt) + parseFloat(IgstAmt)).toFixed(2);

                // ................GstRt value set..............
                let GstRt = '';
                if (item.igst > 0) {
                    GstRt = item.igst.toString();  // Pass IGST value
                } else {
                    GstRt = (parseFloat(item.cgst) + parseFloat(item.sgst)).toString();  // Pass CGST + SGST value
                }
                // ................End GstRt value set..............

                return {
                    "SlNo": (index + 1).toString(),
                    "IsServc": "N",
                    "PrdDesc": item.productName,
                    "HsnCd": item.hsn,
                    // "BchDtls": {
                    //     "Nm": "123456",
                    // },
                    "Qty": item.quantity,
                    "Unit": item.unit,
                    "UnitPrice": UnitPrice,
                    "TotAmt": AssAmt,
                    "AssAmt": AssAmt,
                    "GstRt": GstRt,  // Pass IGST value here
                    "SgstAmt": SgstAmt,  // Calculated SGST amount
                    "IgstAmt": IgstAmt,  // Calculated IGST amount
                    "CgstAmt": CgstAmt,  // Calculated CGST amount
                    "TotItemVal": TotItemVal,  // Total value after adding GST amounts
                };
            }),

            "ValDtls": {
                "AssVal": safeNumber(totalAssVal),  // No need for .toFixed(2)
                "CgstVal": safeNumber(totalCgstAmt), // No need for .toFixed(2)
                "SgstVal": safeNumber(totalSgstAmt), // No need for .toFixed(2)
                "IgstVal": safeNumber(totalIgstAmt), // No need for .toFixed(2)
                "TotInvVal": safeNumber(totalInvVal), // No need for .toFixed(2)
            },

            // "PayDtls": {
            //     "Nm": "ABCDE",
            //     "Accdet": "5697389713210",
            //     "Mode": "Cash",
            //     "Fininsbr": "SBIN11000",
            //     "Payterm": "100",
            //     "Payinstr": "Gift",
            //     "Crtrn": "test",
            //     "Dirdr": "test",
            //     "Crday": 100,
            //     "Paidamt": 10000,
            //     "Paymtdue": 5000
            // },
            // "RefDtls": {
            //     "InvRm": "TEST",
            //     "DocPerdDtls": {
            //         "InvStDt": "20/05/2024",
            //         "InvEndDt": "20/05/2024"
            //     },
            //     "PrecDocDtls": [
            //         {
            //             "InvNo": "DOC/002",
            //             "InvDt": "20/05/2024",
            //             "OthRefNo": "123456"
            //         }
            //     ],
            //     "ContrDtls": [
            //         {
            //             "RecAdvRefr": "DOC/002",
            //             "RecAdvDt": "20/05/2024",
            //             "Tendrefr": "Abc001",
            //             "Contrrefr": "Co123",
            //             "Extrefr": "Yo456",
            //             "Projrefr": "Doc-456",
            //             "Porefr": "Doc-789",
            //             "PoRefDt": "20/05/2024"
            //         }
            //     ]
            // },
            // "AddlDocDtls": [
            //     {
            //         "Url": "https://einv-apisandbox.nic.in",
            //         "Docs": "Test Doc",
            //         "Info": "Document Test"
            //     }
            // ],
            // "ExpDtls": {
            //     "ShipBNo": "A-248",
            //     "ShipBDt": "20/05/2024",
            //     "Port": "INABG1",
            //     "RefClm": "N",
            //     "ForCur": "AED",
            //     "CntCode": "AE"
            // },
            "EwbDtls": {
                // "Transid": transporterId,
                "Transname": transporterName,
                "Distance": approximateDistance,
                "Transdocno": transportDocNo,
                // "TransdocDt": "20/05/2024",
                "Vehno": vehicleNo,
                "Vehtype": vehicleType,
                "TransMode": transportMode
            }
        };

        // delaire headers for Generate API 
        const HEADER = {
            headers: {
                "email": email,
                "username": "API_29FTHPK8890K1ZN",
                "password": "Sangram#98",
                "ip_address": "192.168.1.6",
                "client_id": "EINP4913288e-348b-41e8-a476-ad6c8e0fb94a",
                "client_secret": "EINP81dd4f2f-c3a6-45ec-93d1-bb948ce22b04",
                "gstin": "29FTHPK8890K1ZN",
                "auth-token": token
            }
        };

        // Generate API Integration 
        try {
            const url = 'https://api.whitebooks.in/einvoice/type/GENERATE/version/V1_03?email=' + email;
            const response = await axios.post(url, DATA, HEADER);
            console.log('Generate e-Invoice Response:', response.data);
            // API response मधील status_cd तपासा
            if (response.data.status_cd === '1') {
                // Session storage मध्ये डेटा स्टोअर करा
                sessionStorage.setItem('einvoiceData', JSON.stringify(response.data));

                sessionStorage.setItem('documentDetails', JSON.stringify(documentNo));

                
                // Navigate वापरून पेज redirect करा
                navigate('/InvoiceActivities');
            } else {
                console.log('e-Invoice generation failed:', response.data);
                // इथे एरर हँडलिंग किंवा user ला message दाखवू शकता
                alert(response.data.status_desc); 
            }
        } catch (e) {
            console.error('Generate e-Invoice Catch Error:', e.message);
        }
    };

// ...........[Pin Code To Pin Code Distance Calculation ].at.............
    

// const [result, setResult] = useState("");
//     useEffect(() => {
//         if (sellerPincode && shippingPincode) {
//             const fetchDistance = async () => {
//                 try {
//                     const apiKey = "AIzaSyDj-sgKrZCi-fPycM2hx1ptlfxr13d9iyQ"; // Google Maps API Key येथे टाका
//                     const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${sellerPincode}&destinations=${shippingPincode}&key=${apiKey}`;

//                     const response = await axios.get(url);
//                     console.log(response)
//                     if (response.data.status === "OK") {
//                         const distance = response.data.rows[0].elements[0].distance.text;
//                         const duration = response.data.rows[0].elements[0].duration.text;

//                         setResult(`Distance: ${distance}, Duration: ${duration}`);
//                     } else {
//                         setResult(`Error: ${response.data.error_message}`);
//                     }
//                 } catch (error) {
//                     setResult(`Error: ${error.message}`);
//                 }
//             };

//             fetchDistance();
//         }
//     }, [sellerPincode, shippingPincode]); // Dependency array मध्ये पिन कोड्स आहेत



    // .....Document type Options  for select feild
    const documentTypeOptions = [
        { value: 'INV', label: 'Invoice' },
        { value: 'CRN', label: 'Credit Note' },
        { value: 'DBN', label: 'Debit Note' },

    ];


    // .....Document type Options  for select feild
    const supplyTypeOptions = [
        { value: 'B2B', label: 'B2B' },
        { value: 'B2C', label: 'B2C' },
        { value: 'SEZWP', label: 'SEZ with Payment' },
        { value: 'SEZWOP', label: 'SEZ without Payment' },
        { value: 'EXPWP', label: 'Export with Payment' },
        { value: 'EXPWOP', label: 'Export without Payment' },
        { value: 'DEXP', label: 'Deemed Export' },

    ];


    // .....State Codes Options  for select feild
    const stateCodesOptions = [
        { value: '1', label: 'JAMMU AND KASHMIR' },
        { value: '2', label: 'HIMACHAL PRADESH' },
        { value: '3', label: 'PUNJAB' },
        { value: '4', label: 'CHANDIGARH' },
        { value: '5', label: 'UTTARAKHAND' },
        { value: '6', label: 'HARYANA' },
        { value: '7', label: 'DELHI' },
        { value: '8', label: 'RAJASTHAN' },
        { value: '9', label: 'UTTAR PRADESH' },
        { value: '10', label: 'BIHAR' },
        { value: '11', label: 'SIKKIM' },
        { value: '12', label: 'ARUNACHAL PRADESH' },
        { value: '13', label: 'NAGALAND' },
        { value: '14', label: 'MANIPUR' },
        { value: '15', label: 'MIZORAM' },
        { value: '16', label: 'TRIPURA' },
        { value: '17', label: 'MEGHALAYA' },
        { value: '18', label: 'ASSAM' },
        { value: '19', label: 'WEST BENGAL' },
        { value: '20', label: 'JHARKHAND' },
        { value: '21', label: 'Odisha' },
        { value: '22', label: 'CHHATTISGARH' },
        { value: '23', label: 'MADHYA PRADESH' },
        { value: '24', label: 'GUJARAT' },
        { value: '25', label: 'DAMAN AND DIU' },
        { value: '26', label: 'DADRA AND NAGAR HAVELI' },
        { value: '27', label: 'MAHARASHTRA' },
        { value: '29', label: 'KARNATAKA' },
        { value: '30', label: 'GOA' },
        { value: '31', label: 'LAKSHADWEEP' },
        { value: '32', label: 'KERALA' },
        { value: '33', label: 'TAMIL NADU' },
        { value: '34', label: 'PUDUCHERRY' },
        { value: '35', label: 'ANDAMAN AND NICOBAR' },
        { value: '36', label: 'TELANGANA' },
        { value: '37', label: 'ANDHRA PRADESH' },
        { value: '38', label: 'Ladakh' },
        { value: '97', label: 'OTHER TERRITORY' },
        { value: '96', label: 'OTHER COUNTRY' }
    ];


    // ..............Document Date Format Changed .............
    const [documentDate, setDocumentDate] = useState(null);
    const [documentDateFormat, setDocumentDateFormat] = useState('');


    const handleDateChange = (date) => {
        setDocumentDate(date);
        setDocumentDateFormat(format(date, 'dd/MM/yyyy'));
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setDocumentDateFormat(value);
    };



    // .............Same As Billing Details In Shiiping Details...............
    const handleSameAsBilling = (e) => {
        if (e.target.checked) {
            setShippingAddress(buyerAddress1 + ' ' + buyerAddress2);
            setShippingLocation(buyerLocation);
            setShippingPincode(buyerPincode);
            setShippingStateCode(posStateCode);
        } else {
            setShippingAddress('');
            setShippingLocation('');
            setShippingPincode('');
            setShippingStateCode('');
        }
    };

    return (
        <div className="page-container">
            <SideBar />
            <div className="page-content">
                <Header />
                <div className="panel panel-white">
                    <div className="panel-heading" style={{ backgroundColor: "#9F84CD", padding: "10px 10px", height: "40px", margin: "10px 0px" }}>
                        <h4 className="panel-title" style={{ color: "black" }}>Transaction Details</h4>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-sm-3 col-sm-12">
                                    <label>Supply Type</label>
                                    <select
                                        className="form-control"
                                        value={supplyType}
                                        onChange={(e) => setSupplyType(e.target.value)}
                                    >
                                        <option value="">Select Supply Type</option>
                                        {supplyTypeOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* <div className="col-md-6 col-sm-12">
                                    <label>Sub Type</label>
                                    <select
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                    >
                                        <option>Supply</option>
                                        <option>Export</option>
                                        <option>Job Work</option>
                                        <option>SKD/CKD/Lots</option>
                                        <option>Recipient Not Known</option>
                                        <option>For Own Use</option>
                                        <option>Exhibition or Fairs</option>
                                        <option>Others</option>
                                    </select>
                                </div> */}


                                <div className="col-sm-3 col-sm-12">
                                    <label>Document Type</label>
                                    <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="form-control">
                                        <option value="">Select Document Type</option>
                                        {documentTypeOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-sm-3 col-sm-12">
                                    <label>Document No</label>
                                    <input
                                        placeholder="Document No"
                                        type="text"
                                        className="form-control"
                                        value={documentNo}
                                        onChange={(e) => setDocumentNo(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-3 col-sm-12">
                                    <label>Document Date</label>
                                    <DatePicker
                                        selected={documentDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="dd/mm/yyyy"
                                        className="form-control"
                                        customInput={
                                            <input
                                                type="text"
                                                value={documentDateFormat}
                                                onChange={handleInputChange}
                                                pattern="^[0-3][0-9]\/[0-1][0-9]\/[2][0][1-2][0-9]$"
                                                title="Date format should be dd/mm/yyyy"
                                                required
                                            />
                                        }
                                    />
                                </div>
                                {/* <div className="col-sm-3 col-sm-12">
                                    <label>tranzaction Type</label>
                                    <select
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                    >
                                        <option>Regular</option>

                                    </select>
                                </div> */}

                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-12" >
                                    <div className="panel-heading" style={{ backgroundColor: "#9F84CD", padding: "10px 10px", height: "40px", margin: "10px 0px" }}>
                                        <h4 className="panel-title" style={{ color: "black" }}>Bill From</h4>
                                    </div>

                                    <label className="col-sm-2">Name</label>
                                    <div className="form-group col-sm-10">
                                        <input
                                            placeholder="Name"
                                            type="text"
                                            className="form-control"
                                            value={sellerTradeName}
                                            onChange={(e) => setSellerTradeName(e.target.value)}
                                        />
                                    </div>

                                    <label className="col-sm-2">GSTIN</label>
                                    <div className="form-group col-sm-10">
                                        <input
                                            placeholder="GSTIN"
                                            type="text"
                                            className="form-control"
                                            value={sellerGstNo}
                                            onChange={(e) => setSellerGstNo(e.target.value)}
                                        />
                                    </div>
                                    <label className="col-sm-2">State</label>
                                    <div className="form-group col-sm-10">
                                        <input
                                            placeholder="State"
                                            type="text"
                                            className="form-control"
                                            value={sellerStateCode}
                                            onChange={(e) => setSellerStateCode(e.target.value)}
                                            list="state-options"  // Datalist reference
                                        />
                                        <datalist id="state-options">
                                            <option value="29">KARNATAKA</option>
                                        </datalist>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="panel-heading" style={{ backgroundColor: "#9F84CD", padding: "10px 10px", height: "40px", margin: "10px 0px" }}>
                                        <h4 className="panel-title" style={{ color: "black" }}>Dispatch From</h4>
                                    </div>
                                    <label className="col-sm-2">Address</label>
                                    <div className="form-group col-sm-5">
                                        <input
                                            placeholder="Address"
                                            type="text"
                                            className="form-control"
                                            value={sellerAddress1}
                                            onChange={(e) => setSellerAddress1(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-sm-5">
                                        <input
                                            placeholder="Address"
                                            type="text"
                                            className="form-control"
                                            value={sellerAddress2}
                                            onChange={(e) => setSellerAddress2(e.target.value)}
                                        />
                                    </div>

                                    <label className="col-sm-2">Place</label>
                                    <div className="form-group col-sm-10">
                                        <input
                                            placeholder="Place"
                                            type="text"
                                            className="form-control"
                                            value={sellerLocation}
                                            onChange={(e) => setSellerLocation(e.target.value)}
                                        />
                                    </div>
                                    <label className="col-sm-2">Pincode</label>
                                    <div className="form-group col-sm-3">
                                        <input
                                            placeholder="Pincode"
                                            type="text"
                                            className="form-control"
                                            value={sellerPincode}
                                            onChange={(e) => setSellerPincode(e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="form-group col-sm-7">
                                        <input
                                            placeholder="_State-"
                                            type="text"
                                            className="form-control"
                                            value={sellerStateCode}
                                            onChange={(e) => setSellerStateCode(e.target.value)}
                                        />
                                    </div> */}
                                </div>

                            </div>

                            {/* .................Billing To................... */}

                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="panel-heading" style={{ backgroundColor: "#9F84CD", padding: "10px 10px", height: "40px", margin: "10px 0px" }}>
                                        <h4 className="panel-title" style={{ color: "black" }}>Bill To</h4>
                                    </div>

                                    <label className="col-sm-2">Name</label>
                                    <div className="form-group col-sm-10">
                                        <input
                                            placeholder="Name"
                                            type="text"
                                            className="form-control"
                                            defaultValue={TradeName}
                                            onChange={(e) => setTradeName(e.target.value)}
                                        />
                                    </div>

                                    <label className="col-sm-2">GSTIN</label>
                                    <div className="form-group col-sm-10">
                                        <input
                                            placeholder="GSTIN"
                                            type="text"
                                            className="form-control"
                                            value={inputGstNumber}
                                            onChange={handleGstInputChange}
                                        />
                                    </div>
                                    <label className="col-sm-2">POS State</label>
                                    <div className="form-group col-sm-10">
                                        <input
                                            placeholder="State Code Place of Supply"
                                            type="text"
                                            className="form-control"
                                            defaultValue={posStateCode}
                                            onChange={(e) => setPosStateCode(e.target.value)}
                                            list="buyerstate-options"
                                        />
                                        <datalist id="buyerstate-options">
                                            <option value="1">JAMMU AND KASHMIR</option>
                                            <option value="2">HIMACHAL PRADESH</option>
                                            <option value="3">PUNJAB</option>
                                            <option value="4">CHANDIGARH</option>
                                            <option value="5">UTTARAKHAND</option>
                                            <option value="6">HARYANA</option>
                                            <option value="7">DELHI</option>
                                            <option value="8">RAJASTHAN</option>
                                            <option value="9">UTTAR PRADESH</option>
                                            <option value="10">BIHAR</option>
                                            <option value="11">SIKKIM</option>
                                            <option value="12">ARUNACHAL PRADESH</option>
                                            <option value="13">NAGALAND</option>
                                            <option value="14">MANIPUR</option>
                                            <option value="15">MIZORAM</option>
                                            <option value="16">TRIPURA</option>
                                            <option value="17">MEGHALAYA</option>
                                            <option value="18">ASSAM</option>
                                            <option value="19">WEST BENGAL</option>
                                            <option value="20">JHARKHAND</option>
                                            <option value="21">Odisha</option>
                                            <option value="22">CHHATTISGARH</option>
                                            <option value="23">MADHYA PRADESH</option>
                                            <option value="24">GUJARAT</option>
                                            <option value="25">DAMAN AND DIU</option>
                                            <option value="26">DADRA AND NAGAR HAVELI</option>
                                            <option value="27">MAHARASHTRA</option>
                                            <option value="29">KARNATAKA</option>
                                            <option value="30">GOA</option>
                                            <option value="31">LAKSHADWEEP</option>
                                            <option value="32">KERALA</option>
                                            <option value="33">TAMIL NADU</option>
                                            <option value="34">PUDUCHERRY</option>
                                            <option value="35">ANDAMAN AND NICOBAR</option>
                                            <option value="36">TELANGANA</option>
                                            <option value="37">ANDHRA PRADESH</option>
                                            <option value="38">Ladakh</option>
                                            <option value="97">OTHER TERRITORY</option>
                                            <option value="96">OTHER COUNTRY</option>
                                        </datalist>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="panel-heading" style={{ backgroundColor: "#9F84CD", padding: "10px 10px", height: "40px", margin: "10px 0px" }}>
                                        <h4 className="panel-title" style={{ color: "black" }}></h4>
                                    </div>
                                    <label className="col-sm-2">Address</label>
                                    <div className="form-group col-sm-5">
                                        <input
                                            placeholder="Address"
                                            type="text"
                                            className="form-control"
                                            defaultValue={buyerAddress1}
                                            onChange={(e) => setBuyerAddress1(e.target.value)}

                                        />
                                    </div>
                                    <div className="form-group col-sm-5">
                                        <input
                                            placeholder="Address"
                                            type="text"
                                            className="form-control"
                                            defaultValue={buyerAddress2}
                                            onChange={(e) => setBuyerAddress2(e.target.value)}

                                        />
                                    </div>

                                    <label className="col-sm-2">Place</label>
                                    <div className="form-group col-sm-10">
                                        <input
                                            placeholder="Place"
                                            type="text"
                                            className="form-control"
                                            defaultValue={buyerLocation}
                                            onChange={(e) => setBuyerLocation(e.target.value)}
                                        />
                                    </div>
                                    <label className="col-sm-2">Pincode</label>
                                    <div className="form-group col-sm-3">
                                        <input
                                            placeholder="Pincode"
                                            type="text"
                                            className="form-control"
                                            defaultValue={buyerPincode}
                                            onChange={(e) => setBuyerPincode(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-sm-7">
                                        <input
                                            placeholder="_State-"
                                            type="text"
                                            className="form-control"
                                            Value={buyerStateCode}
                                            onChange={(e) => setBuyerStateCode(e.target.value)}
                                            list="buyerstate-options1"
                                        />
                                        <datalist id="buyerstate-options1">
                                            <option value="1">JAMMU AND KASHMIR</option>
                                            <option value="2">HIMACHAL PRADESH</option>
                                            <option value="3">PUNJAB</option>
                                            <option value="4">CHANDIGARH</option>
                                            <option value="5">UTTARAKHAND</option>
                                            <option value="6">HARYANA</option>
                                            <option value="7">DELHI</option>
                                            <option value="8">RAJASTHAN</option>
                                            <option value="9">UTTAR PRADESH</option>
                                            <option value="10">BIHAR</option>
                                            <option value="11">SIKKIM</option>
                                            <option value="12">ARUNACHAL PRADESH</option>
                                            <option value="13">NAGALAND</option>
                                            <option value="14">MANIPUR</option>
                                            <option value="15">MIZORAM</option>
                                            <option value="16">TRIPURA</option>
                                            <option value="17">MEGHALAYA</option>
                                            <option value="18">ASSAM</option>
                                            <option value="19">WEST BENGAL</option>
                                            <option value="20">JHARKHAND</option>
                                            <option value="21">Odisha</option>
                                            <option value="22">CHHATTISGARH</option>
                                            <option value="23">MADHYA PRADESH</option>
                                            <option value="24">GUJARAT</option>
                                            <option value="25">DAMAN AND DIU</option>
                                            <option value="26">DADRA AND NAGAR HAVELI</option>
                                            <option value="27">MAHARASHTRA</option>
                                            <option value="29">KARNATAKA</option>
                                            <option value="30">GOA</option>
                                            <option value="31">LAKSHADWEEP</option>
                                            <option value="32">KERALA</option>
                                            <option value="33">TAMIL NADU</option>
                                            <option value="34">PUDUCHERRY</option>
                                            <option value="35">ANDAMAN AND NICOBAR</option>
                                            <option value="36">TELANGANA</option>
                                            <option value="37">ANDHRA PRADESH</option>
                                            <option value="38">Ladakh</option>
                                            <option value="97">OTHER TERRITORY</option>
                                            <option value="96">OTHER COUNTRY</option>
                                        </datalist>
                                    </div>
                                </div>
                            </div>

                            {/* ..................Ship Details................. */}

                            <div className="row">
                                <div className="panel-heading" style={{ backgroundColor: "#9F84CD", padding: "5px 10px", height: "auto", margin: "10px 0px" }}>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h4 className="panel-title" style={{ color: "black" }}>Shipping Details</h4>
                                        </div>
                                        <div className="col-md-10">
                                            <input
                                                type="checkbox"
                                                onChange={handleSameAsBilling}
                                            />
                                            <label><strong>Same as Billing Details</strong></label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3 col-sm-12" style={{ padding: "0px 10px" }}>
                                    <label>Shipping Address</label>
                                    <input
                                        placeholder="Address"
                                        type="text"
                                        className="form-control"
                                        defaultValue={shippingAddress}
                                        onChange={(e) => setShippingAddress(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-3 col-sm-12" style={{ padding: "0px 10px" }}>
                                    <label>Shipping Place</label>
                                    <input
                                        placeholder="Place"
                                        type="text"
                                        className="form-control"
                                        defaultValue={shippingLocation}
                                        onChange={(e) => setShippingLocation(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-3 col-sm-12" style={{ padding: "0px 10px" }}>
                                    <label>Shipping Pincode</label>
                                    <input
                                        placeholder="Pincode"
                                        type="text"
                                        className="form-control"
                                        defaultValue={shippingPincode}
                                        onChange={(e) => setShippingPincode(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-3 col-sm-12" style={{ padding: "0px 10px" }}>
                                    <label>Shipping State</label>
                                    <input
                                        placeholder="_State-"
                                        type="text"
                                        className="form-control"
                                        defaultValue={shippingStateCode}
                                        onChange={(e) => setShippingStateCode(e.target.value)}
                                        list="shipping-options"
                                    />
                                    <datalist id="shipping-options">
                                        <option value="1">JAMMU AND KASHMIR</option>
                                        <option value="2">HIMACHAL PRADESH</option>
                                        <option value="3">PUNJAB</option>
                                        <option value="4">CHANDIGARH</option>
                                        <option value="5">UTTARAKHAND</option>
                                        <option value="6">HARYANA</option>
                                        <option value="7">DELHI</option>
                                        <option value="8">RAJASTHAN</option>
                                        <option value="9">UTTAR PRADESH</option>
                                        <option value="10">BIHAR</option>
                                        <option value="11">SIKKIM</option>
                                        <option value="12">ARUNACHAL PRADESH</option>
                                        <option value="13">NAGALAND</option>
                                        <option value="14">MANIPUR</option>
                                        <option value="15">MIZORAM</option>
                                        <option value="16">TRIPURA</option>
                                        <option value="17">MEGHALAYA</option>
                                        <option value="18">ASSAM</option>
                                        <option value="19">WEST BENGAL</option>
                                        <option value="20">JHARKHAND</option>
                                        <option value="21">Odisha</option>
                                        <option value="22">CHHATTISGARH</option>
                                        <option value="23">MADHYA PRADESH</option>
                                        <option value="24">GUJARAT</option>
                                        <option value="25">DAMAN AND DIU</option>
                                        <option value="26">DADRA AND NAGAR HAVELI</option>
                                        <option value="27">MAHARASHTRA</option>
                                        <option value="29">KARNATAKA</option>
                                        <option value="30">GOA</option>
                                        <option value="31">LAKSHADWEEP</option>
                                        <option value="32">KERALA</option>
                                        <option value="33">TAMIL NADU</option>
                                        <option value="34">PUDUCHERRY</option>
                                        <option value="35">ANDAMAN AND NICOBAR</option>
                                        <option value="36">TELANGANA</option>
                                        <option value="37">ANDHRA PRADESH</option>
                                        <option value="38">Ladakh</option>
                                        <option value="97">OTHER TERRITORY</option>
                                        <option value="96">OTHER COUNTRY</option>
                                    </datalist>
                                </div>
                            </div>

                            {/* ......................Product Details....................... */}
                            <div className="row">
                                <div
                                    className="panel-heading"
                                    style={{
                                        backgroundColor: "#9F84CD",
                                        padding: "10px 10px",
                                        height: "40px",
                                        margin: "10px 0px"
                                    }}
                                >
                                    <h4 className="panel-title" style={{ color: "black" }}>
                                        Item Details
                                    </h4>
                                </div>
                                {items.map((item, index) => (
                                    <div key={index} className="col-sm-12">
                                        <div className="row">
                                            <div className="col-sm-3" style={{ padding: "0px 2px" }}>
                                                <label>Product Name</label>
                                                <input
                                                    type="text"
                                                    name="productName"
                                                    value={item.productName}
                                                    onChange={e => handleItemChange(index, e)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-sm-1" style={{ padding: "0px 2px" }}>
                                                <label>HSN</label>
                                                <input
                                                    type="text"
                                                    name="hsn"
                                                    value={item.hsn}
                                                    onChange={e => handleItemChange(index, e)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-sm-1" style={{ padding: "0px 2px" }}>
                                                <label>Quantity</label>
                                                <input
                                                    type="text"
                                                    name="quantity"
                                                    value={item.quantity}
                                                    onChange={e => handleItemChange(index, e)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-sm-1" style={{ padding: "0px 2px" }}>
                                                <label>Unit</label>
                                                <input
                                                    type="text"
                                                    name="unit"
                                                    value={item.unit}
                                                    onChange={e => handleItemChange(index, e)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-sm-2" style={{ padding: "0px 2px" }}>
                                                <label>Value/Taxable Value</label>
                                                <input
                                                    type="number"
                                                    name="value"
                                                    value={item.value}
                                                    onChange={e => handleItemChange(index, e)}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col-sm-1" style={{ padding: "0px 2px" }}>
                                                <label>CGST</label>
                                                <select
                                                    name="cgst"
                                                    value={item.cgst}
                                                    onChange={e => handleItemChange(index, e)}
                                                    className="form-control"
                                                >
                                                    <option>0</option>
                                                    <option>9</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-1" style={{ padding: "0px 2px" }}>
                                                <label>SGST</label>
                                                <select
                                                    name="sgst"
                                                    value={item.sgst}
                                                    onChange={e => handleItemChange(index, e)}
                                                    className="form-control"
                                                >
                                                    <option>0</option>
                                                    <option>9</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-1" style={{ padding: "0px 2px" }}>
                                                <label>IGST</label>
                                                <select
                                                    name="igst"
                                                    value={item.igst}
                                                    onChange={e => handleItemChange(index, e)}
                                                    className="form-control"
                                                >
                                                    <option>0</option>
                                                    <option>18</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-1" style={{ padding: "0px 2px" }}>
                                                <br></br>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleRemoveItem(index)}
                                                >
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* Button to add new item */}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddItem}
                                    style={{ marginTop: "10px", float: "right" }}
                                >
                                    Add New
                                </button>
                            </div>

                            {/* Values */}

                            <div className="row" style={{ marginTop: "20px", paddingTop: "10px", borderTop: "1px solid black" }}>
                                <div className="col-sm-3 col-sm-12" style={{ padding: "0px 1px" }}>
                                    <label>Total Tax'ble Amount</label>
                                    <input
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                        readOnly

                                        value={totals.totalAssVal} />
                                </div>
                                <div className="col-sm-2 col-sm-12" style={{ padding: "0px 1px" }}>
                                    <label>CGST Amount </label>
                                    <input
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                        value={totals.totalCgstAmt}
                                    />
                                </div>
                                <div className="col-sm-2 col-sm-12" style={{ padding: "0px 1px" }}>
                                    <label>SGST Amount</label>
                                    <input
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                        value={totals.totalSgstAmt}
                                    />
                                </div>
                                <div className="col-sm-2 col-sm-12" style={{ padding: "0px 1px" }}>
                                    <label>IGST Amount</label>
                                    <input
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                        value={totals.totalIgstAmt}
                                    />
                                </div>
                                {/* <div className="col-sm-2 col-sm-12" style={{ padding: "0px 1px" }}>
                                    <label>Other Amount(+/-)</label>
                                    <input
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                    />
                                </div> */}
                                <div className="col-sm-3 col-sm-12" style={{ padding: "0px 1px" }}>
                                    <label>Total Inv. Amount</label>
                                    <input
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                        value={totals.totalInvVal}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="panel-heading" style={{ backgroundColor: "#9F84CD", padding: "10px 10px", height: "40px", margin: "10px 0px" }}>
                                    <h4 className="panel-title" style={{ color: "black" }}>Tranportation Details</h4>
                                </div>


                                {/* <div className="col-sm-3 col-sm-12" style={{ padding: "0px 10px" }}>
                                    <label>Transporter ID</label>
                                    <input
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                        value={transporterId}
                                        onChange={(e) => setTransporterId(e.target.value)}
                                    />
                                </div> */}
                                <div className="col-sm-4 col-sm-12" style={{ padding: "0px 10px" }}>
                                    <label>Transporter Name</label>
                                    <input
                                        placeholder="Enter Name"
                                        type="text"
                                        className="form-control"
                                        defaultValue={transporterName}
                                        onChange={(e) => setTransporterName(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-4 col-sm-12" style={{ padding: "0px 10px" }}>
                                    <label>Approximate Distance (in KM)</label>
                                    <input
                                        placeholder=""
                                        type="text"
                                        className="form-control"
                                        defaultValue={approximateDistance}
                                        onChange={(e) => setApproximateDistance(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="panel-heading" style={{ backgroundColor: "#9F84CD", padding: "10px 10px", height: "40px", margin: "10px 0px" }}>
                                    <h4 className="panel-title" style={{ color: "black" }}>PART-B</h4>
                                </div>


                                <div className="col-sm-6 col-sm-12" style={{ padding: "0px 10px" }}>
                                    <label>Mode :</label>

                                    <input
                                        placeholder=""
                                        type="radio"
                                        className=""
                                        name="transport-type"
                                        value="1"
                                        onChange={(e) => setTransportMode(e.target.value)}
                                        style={{ margin: "0px 5px" }} />
                                    <label>Road</label>
                                    <input
                                        placeholder=""
                                        type="radio"
                                        className=""
                                        name="transport-type"
                                        value="2"
                                        onChange={(e) => setTransportMode(e.target.value)}
                                        style={{ margin: "0px 5px" }} />
                                    <label>Rail</label>
                                    <input
                                        placeholder=""
                                        type="radio"
                                        className=""
                                        name="transport-type"
                                        value="3"
                                        onChange={(e) => setTransportMode(e.target.value)}
                                        style={{ margin: "0px 5px" }} />
                                    <label>Air</label>
                                    <input
                                        placeholder=""
                                        type="radio"
                                        className=""
                                        name="transport-type"
                                        value="4"
                                        onChange={(e) => setTransportMode(e.target.value)}
                                        style={{ margin: "0px 5px" }} />
                                    <label>Ship or Ship Cum Road/Rail </label>

                                </div>
                                <div className="col-sm-6 col-sm-12" style={{ padding: "0px 10px" }}>
                                    <label>Vehicle Type</label>

                                    <input
                                        placeholder=""
                                        type="radio"
                                        className=""
                                        name="vehicle-type"
                                        value="R"
                                        onChange={(e) => setVehicleType(e.target.value)}
                                        style={{ margin: "0px 5px" }} />
                                    <label>Regular</label>
                                    <input
                                        placeholder=""
                                        type="radio"
                                        className=""
                                        name="vehicle-type"
                                        value="O"
                                        onChange={(e) => setVehicleType(e.target.value)}
                                        style={{ margin: "0px 5px" }} />
                                    <label>Over Dimensional Cargo </label>

                                </div>

                            </div>


                            <div className="row" style={{ marginTop: "15px" }}>
                                <div className="col-md-6 col-sm-12" style={{ padding: "0px 5px" }}>
                                    <label className="col-sm-2" style={{ padding: "0px 5px" }}>Vehicle No :</label>
                                    <div className="form-group col-sm-7" style={{ padding: "0px 1px" }}>
                                        <input
                                            placeholder=""
                                            type="text"
                                            className="form-control"
                                            value={vehicleNo}
                                            onChange={(e) => setVehicleNo(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12" style={{ padding: "0px 5px" }}>
                                    <label className="col-sm-5" style={{ padding: "0px 5px" }}>Transporter Doc. No. & Date :</label>
                                    <div className="form-group col-sm-7" style={{ padding: "0px 1px" }}>
                                        <input
                                            placeholder=""
                                            type="text"
                                            className="form-control"
                                            defaultValue={transportDocNo}
                                            onChange={(e) => setTransportDocNo(e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="form-group col-sm-4">
                                        <input
                                            placeholder=""
                                            type="date"
                                            className="form-control"
                                        />
                                    </div> */}

                                </div>

                            </div>

                            {/* buttons */}
                            <div className="row" style={{ marginTop: "15px" }}>
                                <div className="col-md-5 col-sm-12">

                                </div>
                                <div className="col-md-1 col-sm-12">
                                    <button type="submit" name="submit" className="btn btn-primary">Submit</button>
                                </div>


                                <div className="col-md-5 col-sm-12">

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default NewInvoiceForm;
