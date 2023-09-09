import axios from "axios";
import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";

export const CompanyForm = ({row}) => {

    const [companyName, setCompanyName] = useState()
    const [contact, setContact] = useState()
    const [email, setEmail] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [address, setAddress] = useState()
    const [gst, setGST] = useState()
    const [companyCode, setCompanyCode] = useState()

    let companyItem = {
        com_name: companyName,
        contact,
        email,
        city,
        state,
        address,
        gst,
        company_code: companyCode
    }
    useEffect(() => {
        if (row != undefined) {
            setCompanyName(row.com_name)
            setContact(row.contact)
            setEmail(row.email)
            setCity(row.city)
            setState(row.state)
            setAddress(row.address)
            setGST(row.gst)
            setCompanyCode(row.company_code)
        }
    },[])

    const submitCompanyDetails = async (e) => {
        e.preventDefault()
        if (row == undefined) {
            try {
                const res = await axios.post(`${GlobalService.path}/addCompany`, companyItem);
                console.log(res);
                alert("Company details added successfully")
                window.location.reload();
            } catch (error) {
                alert("Failed to add company details")

                console.log(error);
            }
        } else {
            try {
                const res = await axios.put(`${GlobalService.path}/addCompany/${row.com_id}`, companyItem);
                console.log(res);
                alert("Company details updated successfully");
                window.location.reload();
                
            } catch (error) {
                alert("Failed to update bank details")

                console.log(error);
            }
        }

    }


    return (
        <>
            <div className="Main-Wrapper">
                <form onSubmit={submitCompanyDetails}>

                    <div className="modal-dialog" style={{ width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">

                                <h2 className="modal-title" id="myModalLabel">
                                    Company Details
                                </h2>
                            </div>


                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Company Name</label>
                                            <input
                                                type="text"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Company Name"
                                                required=""
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Contact</label>
                                            <input
                                                type="number"
                                                name="entryName"
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
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Email"
                                                required=""
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                name="entryName"
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
                                                name="entryName"
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
                                                name="entryName"
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
                                            <label>GST</label>
                                            <input
                                                type="text"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter GST"
                                                required=""
                                                value={gst}
                                                onChange={(e) => setGST(e.target.value)}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Company Code</label>
                                            <input
                                                type="text"
                                                name="entryName"
                                                className="form-control"
                                                placeholder="Enter Company Code"
                                                required=""
                                                value={companyCode}
                                                onChange={(e) => setCompanyCode(e.target.value)}

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