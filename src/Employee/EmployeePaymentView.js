import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import SideBar from "../SideBar";
import Header from "../header";

export const EmployeePaymentView = () => {
    const { id } = useParams();
    const [empPaymentDetails, setEmpPaymentDetails] = useState()
    const goBack = () => {
       
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${GlobalService.path}/fetchEmployeePayment/${id}`);
                const data = res.data.data[0];
                console.log(data);
                setEmpPaymentDetails(data);
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
                                        <label >Employee Name :</label>
                                        <p>
                                            {empPaymentDetails?.emp_name}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label >Salary Type :</label>
                                        <p>
                                            {empPaymentDetails?.salary_type}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label >Salary Amount :</label>
                                        <p>
                                            {empPaymentDetails?.salary_amount}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Date :</label>
                                        <p>
                                            {empPaymentDetails?.date}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Deduction :</label>
                                        <p>
                                            {empPaymentDetails?.deduction}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Description :</label>
                                        <p>
                                            {empPaymentDetails?.description}
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