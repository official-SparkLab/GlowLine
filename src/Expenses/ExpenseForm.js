import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";

export const ExpenseForm = ({ row }) => {
  const today = new Date().toISOString().split("T")[0];

    const [expenseName, setExpenseName] = useState()
    const [expenseDetails, setExpenseDetails] = useState()
    const [date, setDate] = useState(today)
    const [amount, setAmount] = useState()
    const [paidStatus, setPaidStatus] = useState()
    const [note, setNote] = useState()

    let expenseItem = {
        exp_name: expenseName,
        exp_details: expenseDetails,
        date,
        exp_amt: amount,
        paid_status: paidStatus,
        note
    }

    useEffect(() => {
        if (row != undefined) {
            setExpenseName(row.exp_name)
            setExpenseDetails(row.exp_details)
            setDate(row.date)
            setAmount(row.exp_amt)
            setPaidStatus(row.paid_status)
            setNote(row.note)
        }
    }, [row])

    const submitExpenseDetails = async (e) => {
        e.preventDefault()
        if (row == undefined) {
            try {
                console.log(expenseItem);
                const res = await axios.post(`${GlobalService.path}/addExpense`, expenseItem);
                console.log(res);
                alert("Expense added successfully");
                window.location.reload();
            } catch (error) {
                alert("failed to add expense")
                console.log(error);
            }
        } else {
            try {
               
                const res = await axios.put(`${GlobalService.path}/addExpense/${row.exp_id}`, expenseItem);
                console.log(res);
                alert("Expense updated successfully")
                window.location.reload()
            } catch (error) {
                alert("Failed to update expense")
                console.log(error);
            }
        }

    }

    return (
        <>
            <div className="Main-Wrapper">
                <form onSubmit={submitExpenseDetails}>

                    <div className="modal-dialog" style={{ width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">

                                <h2 className="modal-title" id="myModalLabel">
                                    Manage Expense Details
                                </h2>
                            </div>


                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Expense Name</label>
                                            <input
                                                type="text"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Expense Name"
                                                required=""
                                                value={expenseName}
                                                onChange={(e) => setExpenseName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Expense Details</label>
                                            <input
                                                type="text"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Expense Details"
                                                required=""
                                                value={expenseDetails}
                                                onChange={(e) => setExpenseDetails(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                id="date"
                                                className="form-control"
                                                placeholder=" "
                                                required=""
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Amount</label>
                                            <input
                                                type="number"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Amount"
                                                required=""
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Paid Status</label>
                                            <input
                                                type="text"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Paid Status"
                                                required=""
                                                value={paidStatus}
                                                onChange={(e) => setPaidStatus(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Note</label>
                                            <input
                                                type="text"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Note"
                                                
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* Customer Details */}

                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    id="add-row"
                                    name="btn_save"
                                    className="btn btn-success"
                                >
                                    Save
                                </button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}