import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";

export const AdvancePayment = ({ row }) => {
  const today = new Date().toISOString().split("T")[0];

    const [empName, setEmpName] = useState()
    const [advAmount, setAdvAmount] = useState()
    const [paymentType, setPaymentType] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState(today)




    let advancePaymentItem = {
        emp_name: empName,
        adv_amount: advAmount,
        payment_type: paymentType,
        date,
        discription: description
    }

    useEffect(() => {
        if (row != undefined) {
            setEmpName(row.emp_name)
            setAdvAmount(row.adv_amount)
            setDate(row.date)
            setPaymentType(row.payment_type)
            setDescription(row.discription)
        }
    },[])

    const submitadvancePaymentDetails = async (e) => {
        e.preventDefault()
        if (row == undefined) {
            try {
                const res = await axios.post(`${GlobalService.path}/addEmployeeAdvPayment`, advancePaymentItem);
                console.log(res);
                alert("Payment added successfully");
                window.location.reload();
            } catch (error) {
                alert("Failed to add payment")
                console.log(error);
            }
        } else {
            try {
                const res = await axios.put(`${GlobalService.path}/addEmployeeAdvPayment/${row.emp_id}`, advancePaymentItem);
                console.log(res);
                alert("Payment updated successfully")
                window.location.reload()
            } catch (error) {
                alert("Failed to update payment")

                console.log(error);
            }
        }

    }
    return (
        <>
            <div className="Main-Wrapper">
                <form onSubmit={submitadvancePaymentDetails} >

                    <div className="modal-dialog" style={{ width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">

                                <h2 className="modal-title" id="myModalLabel">
                                    Advance Payment Details
                                </h2>
                            </div>


                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Employee Name</label>
                                            <input
                                                type="text"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Employee Name"
                                                required=""
                                                value={empName}
                                                onChange={(e) => setEmpName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label> Date</label>
                                            <input
                                                type="date"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                required=""
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Advance Amount</label>
                                            <input
                                                type="number"
                                                name="entryName"

                                                className="form-control"
                                                placeholder="Enter Advance Amount"
                                                required=""
                                                value={advAmount}
                                                onChange={(e) => setAdvAmount(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Payment Type</label>
                                            <input
                                                type="text"
                                                name="entryName"

                                                className="form-control"
                                                placeholder="Enter Payment type"
                                                required=""
                                                value={paymentType}
                                                onChange={(e) => setPaymentType(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input
                                                type="text"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Description"
                                                required=""
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>


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