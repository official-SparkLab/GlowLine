import React, { useEffect, useState } from "react"
import { GlobalService } from "../service/GlobalService"
import axios from "axios"

export const ProductForm = ({ row }) => {
    const [prodType, setProdType] = useState()
    const [prodName, setProdName] = useState()
    const [rate, setRate] = useState()
    const [GST, setGST] = useState()
    const [HSN, setHSN] = useState()
    const [description, setDescription] = useState()

    let prodItem = {
        prod_name: prodName,
        rate,
        gst: GST,
        hsn: HSN,
        description,
        type: prodType
    }

    useEffect(() => {
        if (row != undefined) {
            console.log('row=', row);
            setProdName(row.prod_name)
            setRate(row.rate)
            setGST(row.gst)
            setHSN(row.hsn)
            setDescription(row.description)
            setProdType(row.type)
        }
    }, [])

    const submitProductDetails = async (e) => {
        e.preventDefault()
        if (row == undefined) {
            try {
                const res = await axios.post(`${GlobalService.path}/addProduct`, prodItem);
                console.log(res);
                alert("Product added successfully");
                window.location.reload();
            } catch (error) {
                alert("Failed to add product")
                console.log(error);
            }
        } else {
            try {
                const res = await axios.put(`${GlobalService.path}/addProduct/${row.p_id}`, prodItem);
                console.log(res);
                alert("Product updated successfully")
                window.location.reload()
            } catch (error) {
                alert("Failed to update product")
                console.log(error);
            }
        }

    }

    const handleOptionChange = (e) => {
        setProdType(e.target.value)
    }
    return (<>
        <div className="Main-Wrapper">
            <form onSubmit={submitProductDetails}>

                <div className="modal-dialog" style={{ width: "100%" }}>
                    <div className="modal-content">
                        <div className="modal-header">

                            <h2 className="modal-title" id="myModalLabel">
                                Manage Product Details
                            </h2>
                        </div>


                        <div className="modal-body">
                            <div className="row">

                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Select Product Type</label>
                                        <input type='radio' value='Raw' checked={prodType === 'Raw'}
                                            name="option" onChange={handleOptionChange} />Raw &nbsp; &nbsp;
                                        <input type='radio' value='Goods' checked={prodType === 'Goods'}
                                            name="option" onChange={handleOptionChange} />Goods &nbsp; &nbsp;
                                        <input type='radio' value='Retail' checked={prodType === 'Retail'}
                                            name="option" onChange={handleOptionChange} />Retail &nbsp; &nbsp;
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            name="productName"
                                            className="form-control"
                                            placeholder="Enter Product Name"
                                            required=""
                                            value={prodName}
                                            onChange={(e) => setProdName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Rate</label>
                                        <input
                                            type="number"
                                            name="entryName"
                                            className="form-control"
                                            placeholder="Enter Rate"
                                            required=""
                                            value={rate}
                                            onChange={(e) => setRate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>GST 18%</label>
                                        <input
                                            type="number"
                                            name="sup_address"
                                            id="sup_address"
                                            className="form-control"
                                            placeholder="Enter GST"
                                            required=""
                                            value={GST}
                                            onChange={(e) => setGST(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>HSN</label>
                                        <input
                                            type="text"
                                            name="sup_address"
                                            id="sup_address"
                                            className="form-control"
                                            placeholder="Enter HSN"
                                            required=""
                                            value={HSN}
                                            onChange={(e) => setHSN(e.target.value)}
                                        />
                                    </div>
                                </div>


                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Product Description</label>
                                        <input
                                            type="text"
                                            name="sup_address"
                                            id="sup_address"
                                            className="form-control"
                                            placeholder="Enter Production Description"
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
    </>)
}