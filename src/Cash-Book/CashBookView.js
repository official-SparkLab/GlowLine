import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import SideBar from "../SideBar";
import Header from "../header";

export const CashBookView = () => {
    const { id } = useParams();
    const [cashBookDetails, setCashBookDetails] = useState()
    const goBack = () => {
        };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${GlobalService.path}/fetchCashbook/${id}`);
                const data = res.data.data[0];
                console.log(data);
                setCashBookDetails(data);
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
                            <div className="card border-Light" style={{ padding: '2%', textAlign: 'left', justifyContent: 'left'}}>
                                <div className="row ViewLabel" >
                                    <div className="col-md-6">
                                        <label >Entry Name :</label>
                                        <p>
                                            {cashBookDetails?.entry_name}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label >Date :</label>
                                        <p>
                                            {cashBookDetails?.date}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Credit :</label>
                                        <p>
                                            {cashBookDetails?.credit_amt}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Debit :</label>
                                        <p>
                                            {cashBookDetails?.debit_amt}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Paid By :</label>
                                        <p>
                                            {cashBookDetails?.paid_by}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Note :</label>
                                        <p>
                                            {cashBookDetails?.note}
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