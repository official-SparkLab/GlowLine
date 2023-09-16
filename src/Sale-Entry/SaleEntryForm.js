import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export const SaleEntryForm = () => {
  const today = new Date().toISOString().split("T")[0];

  const [invoiceNumber, setInvoiceNumber] = useState();
  const [date, setDate] = useState(today);
  const [prodName, setProdName] = useState();
  const [prodId, setProdId] = useState(1);
  const [HDNCode, setHDNCode] = useState();
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [rate, setRate] = useState();
  const [total, setTotal] = useState();
  const [supplyPlace, setSupplyPlace] = useState();
  const [dispatchNo, setDispatchNo] = useState();
  const [destination, setDestination] = useState();
  const [transportAmount, setTransportAmount] = useState();
  const [otherAmount, setOtherAmount] = useState();
  const[Driver_Name,setDriverName] = useState("");
  const[Vehicle_No,setVehicleNo] = useState();
  const [CGST, setCGST] = useState();
  const [IGST, setIGST] = useState();
  const [SGST, setSGST] = useState();
  const [CGSTValue, setCGSTValue] = useState();
  const [IGSTValue, setIGSTValue] = useState();
  const [SGSTValue, setSGSTValue] = useState();
  const [gstBillingTotal, setgstBillingTotal] = useState();
  const [tableData, setTableData] = useState();
  const [customerName, setCustomerName] = useState();
  const [contact, setContact] = useState();
  const [GSTIN, setGSTIN] = useState();
  const [address, setAddress] = useState();
  const [productData, setProductData] = useState();
  const [selectedProductData, setSelectedProductData] = useState();
  const [itemsToShow, setItemToShow] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [custId, setCustId] = useState();

  const handleAutocompleteChange = (event, newValue) => {
    setCustomerName(newValue);
    console.log(customerName);
  };

  const handleProductAutocompleteChange = (event, newValue) => {
    setProdName(newValue);
  };

  useEffect(() => {
    const getCustomerDetails = async (e) => {
      const res = await axios.get(`${GlobalService.path}/fetchCustomer`);
      setTableData(res.data.data);
      console.log(res.data.data);

      const productRes = await axios.get(
        `${GlobalService.path}/fetchProductsForSale`
      );
      console.log(productRes);
      setProductData(productRes.data.data);

      if (customerName != undefined || customerName != null) {
        const filtered = tableData?.filter(
          (row) => row.cust_name === customerName
        );
        if (filtered != undefined) {
          setCustId(filtered[0]?.cust_id);
          setContact(filtered[0]?.mobile);
          setGSTIN(filtered[0]?.gstin);
          setAddress(filtered[0]?.address);
        }
      }

      if (prodName != undefined || prodName != null) {
        const filteredData = productData?.filter(
          (row) => row.prod_name === prodName
        );
        setSelectedProductData(filteredData[0]);
        console.log("prod_name=", filteredData);
        setHDNCode(filteredData[0]?.hsn);
        setRate(filteredData[0]?.rate);
      }
    };

    getCustomerDetails();
  }, [customerName, prodName]);

  useEffect(() => {
    // Calculate totalWeight whenever quantity changes
    const totalWeight = weight * quantity;
    setTotalWeight(totalWeight);
    const total = totalWeight * rate;
    setTotal(total);
  }, [quantity, weight, rate]);

  useEffect(() => {
    // let totalAll=itemsToShow?.map((row) => {
    //     let total=0;
    //     total = total + row.total;
    //     return
    // })
    const totalAll = itemsToShow?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
    // console.log(itemsToShow.Math.sum);
    console.log(totalAll);
    setSubTotal(totalAll);
  }, [itemsToShow]);

  let custname = tableData?.map((data) => {
    return data.cust_name;
  });

  let productname = productData?.map((data) => {
    return data.prod_name;
  });
  let productDetails = {
    sales_prod_id: prodId,
    invoice_no: invoiceNumber,
    s_date: date,
    p_id: selectedProductData?.p_id,
    prod_name: selectedProductData?.prod_name,
    hsn: selectedProductData?.hsn,
    total_weight:totalWeight,
    qty: quantity,
    rate,
    total,
    type: selectedProductData?.type,
  };

  const addProductDetails = async (e) => {
    e.preventDefault();
    console.log(productDetails);

    try {
      const res = await axios.post(
        `${GlobalService.path}/addSaleProduct`,
        productDetails
      );
      alert("Product added successfully");
      console.log(res);
      // const pID=prodId+1
      setProdId(prodId + 1);

      const getProdTableData = await axios.get(
        `${GlobalService.path}/fetchSaleProduct/${date}/${invoiceNumber}`
      );
      setItemToShow(getProdTableData.data.data);
      console.log(getProdTableData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let saleProductDetails = {
    invoice_no: invoiceNumber,
    date,
    cust_id: custId,
    cust_name: customerName,
    mobile: contact,
    gstin: GSTIN,
    address,
    place_of_supply: supplyPlace,
    dispatch_no: dispatchNo,
    destination: destination,
    trans_amt: transportAmount,
    hamali: otherAmount,
    driver_name:Driver_Name,
    vehicle_no:Vehicle_No,
    cgst: CGST,
    cgst_amt: CGSTValue,
    sgat: SGST,
    sgat_amt: SGSTValue,
    igst: IGST,
    igst_amt: IGSTValue,
    sub_total: subTotal,
    total: grandTotal,
  };

  const submitSaleProduct = async (e) => {
    e.preventDefault();
    console.log(saleProductDetails);
    try {
      const res = await axios.post(
        `${GlobalService.path}/addSale`,
        saleProductDetails
      );

      alert("Sale details added successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `${GlobalService.path}/deleteSaleProduct/${id}`
      );
      console.log(response);
      if (response.status == 200) {
        alert(response.data.message);
        const deletedProduct = itemsToShow.find(
          (product) => product.sp_id === id
        );
        console.log(deletedProduct);
        // Calculate the new subtotal by subtracting the deleted product's total from the current subtotal
        const newSubTotal = subTotal - deletedProduct?.total;
        // Update the subtotal state
        setSubTotal(newSubTotal);
        setItemToShow((itemsToShow) =>
          itemsToShow.filter((product) => product.sp_id !== id)
        );
      } else alert("Failed to Delete");
    } catch (error) {
      alert("Failed to delete record");
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    console.log(subTotal);

    const cgstValue = isNaN(CGST) ? 0 : parseFloat((CGST / 100) * subTotal);
    const sgstValue = isNaN(SGST) ? 0 : parseFloat((SGST / 100) * subTotal);
    const igstValue = isNaN(IGST) ? 0 : parseFloat((IGST / 100) * subTotal);
    // const cgstValue = ((CGST / 100) * subTotal)
    setCGSTValue(cgstValue);
    // const sgstValue = ((SGST / 100) * subTotal)
    setSGSTValue(sgstValue);
    // const igstValue = ((IGST / 100) * subTotal)
    setIGSTValue(igstValue);
    const grandTotal =
      parseFloat(sgstValue) +
      parseFloat(cgstValue) +
      parseFloat(igstValue) +
      parseFloat(subTotal) +
      parseFloat(transportAmount) +
      parseFloat(otherAmount);

    setGrandTotal(parseFloat(grandTotal));
    console.log(CGST);
    console.log(SGST);
    console.log(IGST);

    console.log(CGSTValue);
    console.log(SGSTValue);
    console.log(IGSTValue);

    console.log("grand=", parseFloat(grandTotal).toFixed(2));
    console.log("tran=", transportAmount);
    console.log("hamali=", otherAmount);
  }, [CGST, SGST, IGST, transportAmount, otherAmount, subTotal]);

  return (
    <>
      <div className="Main-Wrapper">
        <form onSubmit={submitSaleProduct}>
          <div className="modal-dialog" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="myModalLabel">
                  Sale Details
                </h2>
              </div>
              <hr />
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Invoice Details{" "}
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Invoice Number</label>
                      <input
                        type="text"
                        name="Invoice"
                        id="Invoice"
                        className="form-control"
                        placeholder="Enter Invoice Number"
                        required=""
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        name="Date"
                        id="Date"
                        className="form-control"
                        required=""
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Customer Details */}
              <hr />
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Customer Details
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={custname}
                      value={customerName} // Set the value prop to control the selected value
                      onChange={handleAutocompleteChange}
                      renderInput={(params) => (
                        <TextField {...params} label="Customer Name" />
                      )}
                    />
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Contact</label>
                      <input
                        type="text"
                        id="Contact"
                        name="Contact"
                        placeholder="Enter Contact"
                        className="form-control"
                        maxLength={10}
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>GSTIN</label>
                      <input
                        type="text"
                        name="GSTIN"
                        id="GSTIN"
                        className="form-control"
                        placeholder="Enter GSTIN"
                        required=""
                        value={GSTIN}
                        onChange={(e) => setGSTIN(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        name="Address"
                        id="Address"
                        className="form-control"
                        placeholder="Enter Address"
                        required=""
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Product Details
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label> Product Id</label>
                      <input
                        type="number"
                        name="Product"
                        id="Product"
                        className="form-control"
                        placeholder="Enter Id"
                        required=""
                        value={prodId}
                        onChange={(e) => setProdId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Product Name</label>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo-productname"
                        options={productname}
                        value={prodName} // Set the value prop to control the selected value
                        onChange={handleProductAutocompleteChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Product Name" />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>HSN Code</label>
                      <input
                        type="text"
                        name="HSN"
                        id="HSN"
                        className="form-control"
                        placeholder="Enter HSN code"
                        required=""
                        value={HDNCode}
                        onChange={(e) => setHDNCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Weight</label>
                      <input
                        type="number"
                        id="Weight"
                        name="Weight"
                        placeholder="Enter Weight"
                        className="form-control"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Qty</label>
                      <input
                        type="number"
                        id="Qty"
                        name="Qty"
                        placeholder="Enter Qty"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Total Weight</label>
                      <input
                        type="text"
                        id="Total Weight"
                        name="Total Weight"
                        placeholder="Enter Total Weight"
                        className="form-control"
                        value={totalWeight}
                        onChange={(e)=>setTotalWeight(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Rate</label>
                      <input
                        type="text"
                        id="Rate"
                        name="Rate"
                        placeholder="Enter Rate"
                        className="form-control"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Total</label>
                      <input
                        type="text"
                        id="Total"
                        name="Total"
                        placeholder="Enter Total"
                        className="form-control"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={addProductDetails}
                  id="add-row"
                  name="btn_save"
                  className="btn btn-success"
                >
                  Add Product
                </button>
              </div>
              {itemsToShow ? (
                <div className="table-responsive">
                  <table className="table  datanew">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Product Name</th>
                        <th>Rate</th>
                        <th>HSN</th>
                        <th>Type</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {itemsToShow && itemsToShow?.length > 0 ? (
                        itemsToShow.map((row, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{row.prod_name}</td>
                            <td>{row.rate}</td>
                            <td>{row.hsn}</td>
                            <td>{row.type}</td>
                            <td>{row.total}</td>
                            <td>
                              <a
                                className="confirm-text"
                                onClick={() => deleteItem(row.sp_id)}
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                  alt="img"
                                />
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>No Data Available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div></div>
              )}

              <hr />
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Transport Details
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Place of Supply</label>
                      <input
                        type="text"
                        id="Place of Supply"
                        name="Place of Supply"
                        className="form-control"
                        placeholder="Enter Place of Supply"
                        value={supplyPlace}
                        onChange={(e) => setSupplyPlace(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Dispatch No</label>
                      <input
                        type="text"
                        id="Dispatch"
                        name="Dispatch"
                        className="form-control"
                        placeholder="Enter Dispatch No"
                        value={dispatchNo}
                        onChange={(e) => setDispatchNo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Destination</label>
                      <input
                        type="text"
                        id="Destination"
                        name="Destination"
                        className=" form-control"
                        placeholder="Enter Desination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Driver Name</label>
                      <input
                        type="text"
                        id="driverName"
                        name="driverName"
                        placeholder="Enter Driver Name"
                        className=" form-control"
                        value={Driver_Name}
                        onChange={(e) => setDriverName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Vehicle No.</label>
                      <input
                        type="text"
                        id="vehicleNo"
                        name="vehicleNo"
                        placeholder="Enter Vehicle Number"
                        className=" form-control"
                        value={Vehicle_No}
                        onChange={(e) => setVehicleNo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Transport Amount</label>
                      <input
                        type="number"
                        id="Transport"
                        name="Transport"
                        placeholder="Enter Transport Amount"
                        className=" form-control"
                        value={transportAmount}
                        onChange={(e) => setTransportAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Other Amount</label>
                      <input
                        type="number"
                        id="Other"
                        name="Other"
                        placeholder="Enter Other Amount"
                        className=" form-control"
                        value={otherAmount}
                        onChange={(e) => setOtherAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                  <div className="form-group">
                    <label>Sub Total</label>
                    <input
                      type="text"
                      id="Sub"
                      name="Sub"
                      placeholder="0"
                      className=" form-control"
                      value={subTotal}
                     
                    />
                  </div>
                </div>
                </div>
              </div>
              <hr style={{ height: 5, color: "blacks" }} />
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  GST &amp; Billing
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>CGST</label>
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="text"
                           
                            name="txt_cgst"
                          
                            id="cgst1"
                            className="form-control"
                            placeholder="9"
                            required=""
                            value={CGST}
                            onChange={(e) => setCGST(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            name="txt_cgst_amt"
                            id="cgst2"
                            className="form-control"
                            placeholder="0"
                            onkeypress="javascript : return isFloat(event)"
                            required=""
                            value={CGSTValue}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>SGST</label>
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="text"
                            name="txt_sgst"
                            id="sgst1"
                          
                            className="form-control"
                          placeholder="9"
                            required=""
                            value={SGST}
                            onChange={(e) => setSGST(e.target.value)}
                          />  
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            name="txt_sgst_amt"
                            id="sgst2"
                            className="form-control"
                            placeholder=""
                           
                            required=""
                            value={SGSTValue}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>IGST</label>
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="text"
                            name="txt_igst"
                            id="igst1"
                            className="form-control"
                         placeholder="0"
                            required=""
                            value={IGST}
                            onChange={(e) => setIGST(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            name="txt_igst_amt"
                            id="igst2"
                            className="form-control"
                            placeholder=""
                          
                            required=""
                            value={IGSTValue}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Total</label>
                      <input
                        type="text"
                        name="txt_grndtotal"  
                        id="grand_total"
                        className="form-control"
                        placeholder={0}
                        required=""
                        value={grandTotal}
                        onChange={(e) => setGrandTotal(e.target.value)}
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
  );
};
