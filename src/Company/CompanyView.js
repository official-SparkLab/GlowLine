import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import SideBar from "../SideBar";
import Header from "../header";

export const CompanyView = () => {
    const { id } = useParams();
    const [companyDetails, setCompanyDetails] = useState()
    const goBack = () => {
       
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${GlobalService.path}/fetchCompany/${id}`);
                const data = res.data.data[0];
                console.log(data);
                setCompanyDetails(data);
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
                                        <label >Company Name :</label>
                                        <p>
                                            {companyDetails?.com_name}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label >Contact :</label>
                                        <p>
                                            {companyDetails?.contact}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email :</label>
                                        <p>
                                            {companyDetails?.email}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Address :</label>
                                        <p>
                                            {companyDetails?.address}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>City :</label>
                                        <p>
                                            {companyDetails?.city}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>State :</label>
                                        <p>
                                            {companyDetails?.state}
                                        </p>
                                    </div>



                                    <div className="col-md-6">
                                        <label>Company Code :</label>
                                        <p>
                                            {companyDetails?.company_code}
                                        </p>
                                    </div> <div className="col-md-6">
                                        <label>GST :</label>
                                        <p>
                                            {companyDetails?.gst}
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