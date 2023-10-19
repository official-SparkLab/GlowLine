import axios from "axios";
import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";

export const CustomerForm = ({ row }) => {
    const [customerName, setCustomerName] = useState()
    const [contact, setContact] = useState()
    const [email, setEmail] = useState()
    const [country, setCountry] = useState()
    const [state, setState] = useState()
    const [address, setAddress] = useState()
    const [bankName, setBankName] = useState()
    const [ifsc, setIFSC] = useState()

    const [accountNo, setAccountNo] = useState()
    const [gstin, setgstin] = useState()



    let customerItem = {
        cust_name: customerName,
        mobile: contact,
        email,
        country,
        state,
        address,
        bank_name: bankName,
        ifsc,
        acc_no: accountNo,
        gstin
    }


    useEffect(() => {
        if (row != undefined) {
            setCustomerName(row.cust_name)
            setContact(row.mobile)
            setEmail(row.email)
            setCountry(row.country)
            setState(row.state)
            setAddress(row.address)
            setBankName(row.bank_name)
            setIFSC(row.ifsc)
            setAccountNo(row.acc_no)
            setgstin(row.gstin)
        }
    },[row])

    const submitCustomerDetails = async (e) => {
        e.preventDefault()
        if (row == undefined) {
            try {
                const res = await axios.post(`${GlobalService.path}/addCustomer`, customerItem);
                console.log(res);
                alert("Customer Added Successfully");
                window.location.reload();
            } catch (error) {
                alert("Failed to add customer")

                console.log(error);
            }
        } else {
            try {
                const res = await axios.put(`${GlobalService.path}/addCustomer/${row.cust_id}`, customerItem);
                console.log(res);
                alert("Customer Updated successfully")
                window.location.reload()
            } catch (error) {
                alert("Failed to upadte customer")

                console.log(error);
            }
        }

    }

    return (
        <>
            <div className="Main-Wrapper">
                <form onSubmit={submitCustomerDetails}>

                    <div className="modal-dialog" style={{ width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">

                                <h2 className="modal-title" id="myModalLabel">
                                    New Customer
                                </h2>
                            </div>


                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Customer Name</label>
                                            <input
                                                type="text"
                                                name="entryName"

                                                className="form-control"
                                                placeholder="Enter Customer Name"
                                                required=""
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
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

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Email"
                                            
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Country"
                                                required=""
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input
                                                type="text"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter State"
                                                required=""
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
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
                                            <label>GSTIN</label>
                                            <input
                                                type="text"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter GSTIN"
                                                required=""
                                                value={gstin}
                                                onChange={(e) => setgstin(e.target.value)}
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