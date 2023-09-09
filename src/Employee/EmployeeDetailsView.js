import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import SideBar from "../SideBar";
import Header from "../header";

export const EmployeeDetailsView = () => {
    const { id } = useParams();
    const [empDetails, setEmpDetails] = useState()
    const goBack = () => {
        window.history.back(); // This will go back in the browser history
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${GlobalService.path}/fetchEmployee/${id}`);
                const data = res.data.data[0];
                console.log(data);
                setEmpDetails(data);
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
                                            {empDetails?.emp_name}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label >Birth Date :</label>
                                        <p>
                                            {empDetails?.birth_date}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label >Contact :</label>
                                        <p>
                                            {empDetails?.mobile_no}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Joining Date :</label>
                                        <p>
                                            {empDetails?.join_date}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Address :</label>
                                        <p>
                                            {empDetails?.address}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Employee Type :</label>
                                        <p>
                                            {empDetails?.emp_type}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Designation :</label>
                                        <p>
                                            {empDetails?.designation}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Salary :</label>
                                        <p>
                                            {empDetails?.salary}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Bank Name :</label>
                                        <p>
                                            {empDetails?.bank_name}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>IFSC :</label>
                                        <p>
                                            {empDetails?.ifsc}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Account Number :</label>
                                        <p>
                                            {empDetails?.account_no}
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