import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import SideBar from "../SideBar";
import Header from "../header"; 

export const CustomerView = () => {
    const { id } = useParams();
    const [customerDetails, setCustomerDetails] = useState()
    const goBack = () => {
       
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${GlobalService.path}/fetchCustomer/${id}`);
                const data = res.data.data[0];
                console.log(data);
                setCustomerDetails(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the fetchData function

    }, [id]);
    return (
        <>
            <div className="page-container">
                {/* Page Sidebar */}
                <SideBar />

                <div className="page-content">
                    <Header />
                    <div className=" panel panel-white" >
                        <button
                            type="button"
                            className="btn btn-success m-b-sm"
                            onClick={() => goBack()}
                        >
                            Go Back
                        </button>

                        <div id="main-wrapper">
                            <div className="card border-Light" style={{ padding: '2%', textAlign: 'left', justifyContent: 'left' }}>
                                <div className="row ViewLabel" >
                                    <div className="col-md-6">
                                        <label >Customer Name :</label>
                                        <p>
                                            {customerDetails?.cust_name}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label >Contact :</label>
                                        <p>
                                            {customerDetails?.mobile}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email :</label>
                                        <p>
                                            {customerDetails?.email}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Address :</label>
                                        <p>
                                            {customerDetails?.address}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>State :</label>
                                        <p>
                                            {customerDetails?.state}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Country :</label>
                                        <p>
                                            {customerDetails?.country}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Bank Name :</label>
                                        <p>
                                            {customerDetails?.bank_name}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>IFSC :</label>
                                        <p>
                                            {customerDetails?.ifsc}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Account Number :</label>
                                        <p>
                                            {customerDetails?.acc_no}
                                        </p>
                                    </div> <div className="col-md-6">
                                        <label>GSTIN :</label>
                                        <p>
                                            {customerDetails?.gstin}
                                        </p>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}