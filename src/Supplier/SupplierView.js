import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import SideBar from "../SideBar";
import Header from "../header";

export const SupplierView = () => {
    const { id } = useParams();
    const [supplierDetails, setSupplierDetails] = useState()
    const goBack = () => {
        window.history.back(); // This will go back in the browser history
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${GlobalService.path}/fetchSupplier/${id}`);
                const data = res.data.data[0];
                console.log(data);
                setSupplierDetails(data);
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
                                        <label >Supplier Name :</label>
                                        <p>
                                            {supplierDetails?.sup_name}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label >Official Contact :</label>
                                        <p>
                                            {supplierDetails?.office_contact}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label >Personal Contact :</label>
                                        <p>
                                            {supplierDetails?.mobile_no}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email :</label>
                                        <p>
                                            {supplierDetails?.email}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Address :</label>
                                        <p>
                                            {supplierDetails?.address}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>State :</label>
                                        <p>
                                            {supplierDetails?.state}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>City :</label>
                                        <p>
                                            {supplierDetails?.city}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Bank Name :</label>
                                        <p>
                                            {supplierDetails?.bank_name}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>IFSC :</label>
                                        <p>
                                            {supplierDetails?.ifsc}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Account Number :</label>
                                        <p>
                                            {supplierDetails?.acc_no}
                                        </p>
                                    </div> <div className="col-md-6">
                                        <label>GSTIN :</label>
                                        <p>
                                            {supplierDetails?.gstin}
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