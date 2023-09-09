import React, { useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";

export const BankDetails = () => {
    const [bankName, setBankName] = useState();
    const [IFSC, setIFSC] = useState();
    const [accountNo, setAccountNo] = useState();
    const [branch, setBranch] = useState();


    const reset = () => {
        setBankName('')
        setIFSC('')
        setAccountNo('')
    }
    let bankItem = {
        account_no: accountNo,
        ifsc: IFSC,
        bank_name: bankName,
        branch
    }

    const submitBankDetails = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${GlobalService.path}/addBankDetails`, bankItem);
            console.log(res);
            alert("Bank Details Added Successfully")
            window.location.reload();
        } catch (error) {
            alert("Failed to add bank details")
            console.log(error);
        }

    }
    return (
        <>
            <div className="Main-Wrapper">
                <form onSubmit={submitBankDetails}>

                    <div className="modal-dialog" style={{ width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header">

                                <h2 className="modal-title" id="myModalLabel">
                                    Bank Details                                </h2>
                            </div>


                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='text-start'>*Bank Name</label>
                                            <input type="text" className='form-control' placeholder='Enter Bank Name' value={bankName} onChange={(e) => setBankName(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='text-start'>*IFSC code</label>
                                            <input type="text" className='form-control' placeholder='Enter IFSC code' onChange={(e) => { setIFSC(e.target.value) }} value={IFSC} required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='text-start'>*Account Number</label>
                                            <input type="number" className='form-control' placeholder='Enter Account Number' onChange={(e) => { setAccountNo(e.target.value) }} value={accountNo} required />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className='text-start'>*Branch Name</label>
                                            <input type="text" className='form-control' placeholder='Enter branch' onChange={(e) => { setBranch(e.target.value) }} value={branch} required />
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