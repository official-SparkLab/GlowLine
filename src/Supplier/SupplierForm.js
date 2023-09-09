import axios from "axios";
import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";

export const SupplierForm = ({ row }) => {

    const [supplierName, setSupplierName] = useState()
    const [contact, setContact] = useState()
    const [email, setEmail] = useState()
    const [description, setDescription] = useState()
    const [state, setState] = useState()
    const [address, setAddress] = useState()
    const [bankName, setBankName] = useState()
    const [ifsc, setIFSC] = useState()
    const [city, setCity] = useState()
    const [accountNo, setAccountNo] = useState()
    const [gstin, setgstin] = useState()
    const [officeContact, setOfficeContact] = useState()



    let supplierItem = {
        sup_name: supplierName,
        gstin,
        address,
        city,
        state,
        office_contact: officeContact,
        mobile_no: contact,
        email,
        bank_name: bankName,
        ifsc,
        acc_no: accountNo,
        description

    }

    useEffect(() => {
        if (row != undefined) {
            setSupplierName(row.sup_name)
            setgstin(row.gstin)
            setAddress(row.address)
            setCity(row.city)
            setState(row.state)
            setOfficeContact(row.office_contact)
            setContact(row.mobile_no)
            setEmail(row.email)
            setBankName(row.bank_name)
            setIFSC(row.ifsc)
            setAccountNo(row.acc_no)
            setDescription(row.description)
        }
    },[])

    const submitSupplierDetails = async (e) => {
        e.preventDefault()
        if (row == undefined) {
            try {
                const res = await axios.post(`${GlobalService.path}/addSupplier`, supplierItem);
                console.log(res);
                alert("Supplier added successfully");
                window.location.reload();
            } catch (error) {
                alert("Failed to add supplier")
                console.log(error);
            }
        } else {
            try {
                const res = await axios.put(`${GlobalService.path}/addSupplier/${row.sup_id}`, supplierItem);
                console.log(res);
                alert("Supplier updated successfully")
                window.location.reload()
            } catch (error) {
                alert("Failed to update supplier")
                console.log(error);
            }
        }

    }
    return (
        <>
            <div className="Main-Wrapper">
                <form onSubmit={submitSupplierDetails} >

                    <div className="modal-dialog" style={{ width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">

                                <h2 className="modal-title" id="myModalLabel">
                                    Supplier Details
                                </h2>
                            </div>
                            <hr />
                            <div className="modal-header">
                                <h4 className="modal-title" id="myModalLabel">
                                    Raw Supplier Details                            </h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Supplier Name</label>
                                            <input
                                                type="text"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Supplier Name"
                                                required=""
                                                value={supplierName}
                                                onChange={(e) => setSupplierName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Office Contact</label>
                                            <input
                                                type="number"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter Contact"
                                                required=""
                                                value={officeContact}
                                                onChange={(e) => setOfficeContact(e.target.value)}
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
                                            <label>City</label>
                                            <input
                                                type="text"
                                                name="sup_address"
                                                id="sup_address"
                                                className="form-control"
                                                placeholder="Enter City"
                                                required=""
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
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

                                </div>
                            </div>
                            {/* Customer Details */}
                            <hr />
                            <div className="modal-header">

                                <h4 className="modal-title" id="myModalLabel">
                                    Supplier Contact Details
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Contact No</label>
                                            <div className="row">
                                                <div className="col-sm-10">
                                                    <input
                                                        type="text"
                                                        id="sup_id"
                                                        name="txt_cust_code"
                                                        className="form-control"
                                                        placeholder="Enter Contact No"
                                                        required=""
                                                        value={contact}
                                                        onChange={(e) => setContact(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-sm-2">
                                                    <div className="form-group">
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            data-toggle="modal"
                                                            data-target="#myModal0"
                                                            aria-hidden="true"
                                                        >
                                                            <i className="fa fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email Id</label>
                                            <input
                                                type="text"
                                                id="date"
                                                name="date"
                                                placeholder="Enter Email Id"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <hr />
                            <div className="modal-header">

                                <h4 className="modal-title" id="myModalLabel">
                                    Supplier Bank Details
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Bank Name</label>
                                            <input
                                                type="text"
                                                id="prod_name"
                                                name="prod_name"
                                                className="form-control"
                                                placeholder="Enter Bank Name"
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
                                                id="prod_name"
                                                name="prod_name"
                                                className="form-control"
                                                placeholder="Enter IFSC"
                                                value={ifsc}
                                                onChange={(e) => setIFSC(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Account No</label>
                                            <input
                                                type="number"
                                                id="batch"
                                                name="batch"
                                                className=" form-control"
                                                value={accountNo}
                                                onChange={(e) => setAccountNo(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input
                                                type="text"
                                                id="rate"
                                                name="rate"
                                                placeholder="Enter Description"
                                                className=" form-control"
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