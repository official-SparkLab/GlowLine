import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import SideBar from "../SideBar";
import Header from "../header";

export const ExpenseView = () => {
    const { id } = useParams();
    const [expenseDetails, setExpenseDetails] = useState()
    const goBack = () => {
        window.history.back(); // This will go back in the browser history
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${GlobalService.path}/fetchExpense/${id}`);
                const data = res.data.data[0];
                console.log(data);
                setExpenseDetails(data);
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
                                        <label >Expense Name :</label>
                                        <p>
                                            {expenseDetails?.exp_name}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label >Expense Details :</label>
                                        <p>
                                            {expenseDetails?.exp_details}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Date :</label>
                                        <p>
                                            {expenseDetails?.date}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Amount :</label>
                                        <p>
                                            {expenseDetails?.exp_amt}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Paid Status :</label>
                                        <p>
                                            {expenseDetails?.paid_status}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Note :</label>
                                        <p>
                                            {expenseDetails?.note}
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