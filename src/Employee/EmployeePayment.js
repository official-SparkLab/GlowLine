import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";

export const EmployeePayment = ({ row }) => {
  const today = new Date().toISOString().split("T")[0];

    const [empName, setEmpName] = useState()
    const [salaryType, setSalaryType] = useState()
    const [salaryAmount, setSalaryAmount] = useState()
    const [description, setDescription] = useState()
    const [deduction, setDeduction] = useState()
    const [date, setDate] = useState(today)



    let empPaymentItem = {
        emp_name: empName,
        date,
        salary_type: salaryType,
        salary_amount: salaryAmount,
        deduction,
        description
    }

    useEffect(() => {
        if (row != undefined) {
            setEmpName(row.emp_name)
            setSalaryAmount(row.salary_amount)
            setDate(row.date)
            setSalaryType(row.salary_type)
            setDeduction(row.deduction)
            setDescription(row.description)
        }
    }, [])

    const submitEmployeePaymentDetails = async (e) => {
        e.preventDefault()
        if (row == undefined) {
            try {
                const res = await axios.post(`${GlobalService.path}/addEmployeePayment`, empPaymentItem);
                console.log(res);
                alert("Payment added successfully")
                window.location.reload();
            } catch (error) {
                alert("Failed to add payment")
                console.log(error);
            }
        } else {
            try {
                const res = await axios.put(`${GlobalService.path}/addEmployeePayment/${row.emp_id}`, empPaymentItem);
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
                <form onSubmit={submitEmployeePaymentDetails} >

                    <div className="modal-dialog" style={{ width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">

                                <h2 className="modal-title" id="myModalLabel">
                                    Employee Payment Details
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
                                            <label>Salary Type</label>
                                            <input
                                                type="text"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Salary type"
                                                required=""
                                                value={salaryType}
                                                onChange={(e) => setSalaryType(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Salary Amount</label>
                                            <input
                                                type="number"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Salary Amount"
                                                required=""
                                                value={salaryAmount}
                                                onChange={(e) => setSalaryAmount(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Deduction</label>
                                            <input
                                                type="number"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Deduction"
                                                required=""
                                                value={deduction}
                                                onChange={(e) => setDeduction(e.target.value)}
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