import axios from "axios";
import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";

export const CashBookForm = ({ row }) => {
    console.log({ row });
    const today = new Date().toISOString().split("T")[0];

    const [entryName, setEntryName] = useState();
    const [date, setDate] = useState(today);
    const [credit, setCredit] = useState();
    const [debit, setDebit] = useState();
    const [note, setNote] = useState();
    const [paidBy, setPaidBy] = useState()

    let cashBookItem = {
        entry_name: entryName,
        date: date,
        credit_amt: credit,
        debit_amt: debit,
        paid_by: paidBy,
        note
    }

    useEffect(() => {
        if (row != undefined) {
            setEntryName(row.entry_name)
            setDate(row.date)
            setCredit(row.credit_amt)
            setDebit(row.debit_amt)
            setPaidBy(row.paid_by)
            setNote(row.note)
        }
    },[])

    const submitCashBook = async (e) => {
        console.log('u r in submit');

        e.preventDefault()
        if (row == undefined) {
            try {
                const res = await axios.post(`${GlobalService.path}/addCashbook`, cashBookItem);
                console.log(res);
                alert("Cashbook added successfully")
                window.location.reload();
            } catch (error) {
                alert("Failed to add cashbook")
                console.log(error);
            }
        } else {
            try {
                const res = await axios.put(`${GlobalService.path}/addCashbook/${row.cb_id}`, cashBookItem);
                console.log(res);
                alert("Cashbook Updated successfully");
                window.location.reload();
            } catch (error) {
                alert("Failed to update cashbook")
                console.log(error);
            }
        }


    }


    return (
        <>
            <div className="Main-Wrapper">
                <form onSubmit={submitCashBook}>

                    <div className="modal-dialog" style={{ width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">

                                <h2 className="modal-title" id="myModalLabel">
                                    Cash Book
                                </h2>
                            </div>


                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Name of Entry</label>
                                            <input
                                                type="text"
                                                name="entryName"
                                                value={entryName}
                                                onChange={(e) => setEntryName(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter Name of Entry"
                                                required=""
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
                                            <label>Credit</label>
                                            <input
                                                type="number"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter credit"
                                                required=""
                                                value={credit}
                                                onChange={(e) => setCredit(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Debit</label>
                                            <input
                                                type="number"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter debit"
                                                required=""
                                                value={debit}
                                                onChange={(e) => setDebit(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Paid By</label>
                                            <input
                                                type="text"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Paid By"
                                                required=""
                                                value={paidBy}
                                                onChange={(e) => setPaidBy(e.target.value)}
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
                                                required=""
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