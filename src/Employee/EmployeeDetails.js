import axios from "axios";
import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";

export const EmployeeDetails = ({ row }) => {

    const [empName, setEmpName] = useState()
    const [empType, setEmpType] = useState()
    const [designation, setDesignation] = useState()
    const [salary, setSalary] = useState()
    const [bankName, setBankName] = useState()
    const [IFSC, setIFSC] = useState()
    const [accountNo, setAccountNo] = useState()
    const [contact, setContact] = useState()
    const [birthDate, setBirthDate] = useState()
    const [address, setAddress] = useState()
    const [joiningDate, setJoiningDate] = useState()




    let employeeDetailsItem = {
        emp_name: empName,
        birth_date: birthDate,
        address,
        mobile_no: contact,
        join_date: joiningDate,
        emp_type: empType,
        designation,
        salary,
        bank_name: bankName,
        ifsc: IFSC,
        account_no: accountNo
    }



    useEffect(() => {
        if (row != undefined) {
            setEmpName(row.emp_name)
            setBirthDate(row.birth_date)
            setAddress(row.address)
            setContact(row.mobile_no)
            setJoiningDate(row.join_date)
            setEmpType(row.emp_type)
            setDesignation(row.designation)
            setSalary(row.salary)
            setBankName(row.bank_name)
            setIFSC(row.ifsc)
            setAccountNo(row.account_no)

        }
    }, [row])

    const submitEmployeeDetails = async (e) => {
        e.preventDefault()

        if (row == undefined) {
            try {
                const res = await axios.post(`${GlobalService.path}/addEmployee`, employeeDetailsItem);
                console.log(res);
                alert("Employee Added successfully");
                window.location.reload();
            } catch (error) {
                alert("Failed to add employee")
                console.log(error);
            }
        } else {
            try {
                const res = await axios.put(`${GlobalService.path}/addEmployee/${row.emp_id}`, employeeDetailsItem);
                console.log(res);
                alert("Employee updated successfully")
                window.location.reload()
            } catch (error) {
                alert("Failed to update employee")
                console.log(error);
            }
        }

    }
    return (
        <>
            <div className="Main-Wrapper">
                <form onSubmit={submitEmployeeDetails}>

                    <div className="modal-dialog" style={{ width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">

                                <h2 className="modal-title" id="myModalLabel">
                                    New Employee
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
                                            <label>Birth Date</label>
                                            <input
                                                type="date"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                required=""
                                                value={birthDate}
                                                onChange={(e) => setBirthDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Address"
                                                required=""
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Contact</label>
                                            <input
                                                type="number"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Contact"
                                                required=""
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)}
                                            />
                                        </div>
                                    </div>



                                    {/* <div className="modal-header">
                                        <h4 className="modal-title" id="myModalLabel">
                                            Invoice  Details                            </h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Invoice Number</label>
                                                    <input
                                                        type="text"
                                                        name="sup_address"
                                                        id="sup_address"
                                                        className="form-control"
                                                        placeholder="Enter SInvoice Number"
                                                        required=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Date</label>
                                                    <input
                                                        type="date"
                                                        name="sup_address"
                                                        id="sup_address"
                                                        className="form-control"
                                                        placeholder="Enter Contact"
                                                        required=""
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>




                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Bank Name</label>
                                                    <input
                                                        type="text"
                                                        name="sup_address"
                                                        id="sup_address"
                                                        className="form-control"
                                                        placeholder="Enter Bank Name"
                                                        required=""
                                                        value={bankName}
                                                        onChange={(e) => setBankName(e.target.value)}
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>IFSC Code</label>
                                                    <input
                                                        type="text"
                                                        name="sup_address"
                                                        id="sup_address"
                                                        className="form-control"
                                                        placeholder="Enter IFSC Code"
                                                        required=""
                                                        value={IFSC}
                                                        onChange={(e) => setIFSC(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Account Number</label>
                                                    <input
                                                        type="number"
                                                        name="sup_address"
                                                        id="sup_address"
                                                        className="form-control"
                                                        placeholder="Enter Account Number"
                                                        required=""
                                                        value={accountNo}
                                                        onChange={(e) => setAccountNo(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>GSTIN</label>
                                                    <input
                                                        type="text"
                                                        name="sup_address"
                                                        id="sup_address"
                                                        className="form-control"
                                                        placeholder="Enter GSTIN"
                                                        required=""
                                                        value={GSTIN}
                                                        onChange={(e) => setGSTIN(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="modal-header">
                                <h4 className="modal-title" id="myModalLabel">
                                    Employee Official  Details
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Joining Date</label>
                                            <input
                                                type="date"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Contact"
                                                required=""
                                                value={joiningDate}
                                                onChange={(e) => setJoiningDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Employee Type</label>
                                            <input
                                                type="text"
                                                name="entryName"

                                                className="form-control"
                                                placeholder="Enter Employee type"
                                                required=""
                                                value={empType}
                                                onChange={(e) => setEmpType(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Designation</label>
                                            <input
                                                type="text"
                                                name="entryName"

                                                className="form-control"
                                                placeholder="Enter Designation"
                                                required=""
                                                value={designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Salary</label>
                                            <input
                                                type="text"
                                                name="entryName"

                                                className="form-control"
                                                placeholder="Enter Salary"
                                                required=""
                                                value={salary}
                                                onChange={(e) => setSalary(e.target.value)}
                                            />
                                        </div>
                                    </div>





                                </div>
                            </div>

                            <div className="modal-header">
                                <h4 className="modal-title" id="myModalLabel">
                                    Employee Bank  Details
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">


                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Bank Name</label>
                                            <input
                                                type="text"
                                                name="entryName"

                                                className="form-control"
                                                placeholder="Enter Bank Name"
                                                required=""
                                                value={bankName}
                                                onChange={(e) => setBankName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>IFSC</label>
                                            <input
                                                type="text"
                                                name="entryName"

                                                className="form-control"
                                                placeholder="Enter IFSC"
                                                required=""
                                                value={IFSC}
                                                onChange={(e) => setIFSC(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Account No</label>
                                            <input
                                                type="number"
                                                name="entryName"

                                                className="form-control"
                                                placeholder="Enter Account No"
                                                required=""
                                                value={accountNo}
                                                onChange={(e) => setAccountNo(e.target.value)}
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