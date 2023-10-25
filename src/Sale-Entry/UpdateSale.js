import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";


function UpdateSale() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const invoice_no = queryParams.get("invoice_no");
  const [invoiceNumber, setInvoiceNumber] = useState(invoice_no);
  const [date, setDate] = useState( queryParams.get("date"));
  const [prodName, setProdName] = useState();
  const [prodId, setProdId] = useState(null);
  const [HDNCode, setHDNCode] = useState();
  let [weight, setWeight] = useState(25);
  const [quantity, setQuantity] = useState(null);
  let [totalWeight, setTotalWeight] = useState(0);
  const [rate, setRate] = useState(0);
  let [total, setTotal] = useState(0);
  const [supplyPlace, setSupplyPlace] = useState();
  const [dispatchNo, setDispatchNo] = useState();
  const [destination, setDestination] = useState();
  const [transportAmount, setTransportAmount] = useState(null);
  const [otherAmount, setOtherAmount] = useState(null);
  const [Driver_Name, setDriverName] = useState("");
  const [Vehicle_No, setVehicleNo] = useState();
  const [CGST, setCGST] = useState(null);
  const [IGST, setIGST] = useState(null);
  const [SGST, setSGST] = useState(null);
  let [CGSTValue, setCGSTValue] = useState(0);
  let [IGSTValue, setIGSTValue] = useState(0);
  let [SGSTValue, setSGSTValue] = useState(0);
  const [customerName, setCustomerName] = useState();
  const [contact, setContact] = useState();
  const [GSTIN, setGSTIN] = useState();
  const [address, setAddress] = useState();
  const [productData, setProductData] = useState();
  const [selectedProductData, setSelectedProductData] = useState();
  const [itemsToShow, setItemToShow] = useState();
  const [subTotal, setSubTotal] = useState(0);
  let [grandTotal, setGrandTotal] = useState(0);
  const custId = queryParams.get("cust_id");
  const [sales_prod_id,setSalesProdId] = useState(null);

  useEffect(() => {
    const getCustomerDetails = async (e) => {

      const productRes = await axios.get(
        `${GlobalService.path}/fetchProductsForSale`
      );
      console.log(productRes);
      setProductData(productRes.data.data);
    }

    if (prodName != undefined || prodName != null) {
      const filteredData = productData?.filter(
        (row) => row.prod_name == prodName
      );
      setSelectedProductData(filteredData[0]);
      setHDNCode(filteredData[0]?.hsn);
      setRate(filteredData[0]?.rate);
      setProdName(filteredData[0]?.prod_name);
      setProdId(filteredData[0]?.p_id);
     
  };

    getCustomerDetails();
  }, [prodName,productData]);


 


  
 

  const handleRowClick = (row) => {
    
    setSalesProdId(row.sales_prod_id);
    setProdId(row.p_id);
    setProdName(row.prod_name);
    setHDNCode(row.hsn)
    setQuantity(row.qty);
    setTotalWeight(row.total_weight);
    setRate(row.rate);
    setTotal(row.total);
    setSubTotal((subTotal) - (row.total));
  };

// Getting Product details and sale details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoiceRes, invoiceProd] = await Promise.all([
          axios.get(`${GlobalService.path}/fetchSale/${date}/${invoice_no}`),
          axios.get(
            `${GlobalService.path}/fetchSProduct/${date}/${invoice_no}`
          ),
        ]);

        // Invoice Product Details
        setItemToShow(invoiceProd.data.data);
        // Customer Details
        setCustomerName(invoiceRes.data.data.cust_name);
        setContact(invoiceRes.data.data.mobile);
        setGSTIN(invoiceRes.data.data.gstin);
        setAddress(invoiceRes.data.data.address);

        // Invoice Details
        setTransportAmount(invoiceRes.data.data.trans_amt);
        setOtherAmount(invoiceRes.data.data.hamali);
        setGrandTotal(invoiceRes.data.data.total)
        setSubTotal(invoiceRes.data.data.sub_total);
        setDestination(invoiceRes.data.data.destination);
        setDispatchNo(invoiceRes.data.data.dispatch_no);
        setDriverName(invoiceRes.data.data.driver_name);
        setVehicleNo(invoiceRes.data.data.vehicle_no);
        setSupplyPlace(invoiceRes.data.data.place_of_supply);
        setCGST(invoiceRes.data.data.cgst);
        setSGST(invoiceRes.data.data.sgat);
        setIGST(invoiceRes.data.data.igst);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [invoice_no,date]);


  let productDetails = {
    s_date: date,
    p_id: prodId,
    prod_name: prodName,
    hsn: HDNCode,
    total_weight: totalWeight,
    qty: quantity,
    rate,
    total :Number( rate * quantity * weight),
    type: selectedProductData?.type,
  };

  const addProductDetails = async (e) => {
    e.preventDefault();
   

    try {
      const res = await axios.put(
        `${GlobalService.path}/updateSaleProduct/${sales_prod_id}/${invoice_no}`,
        productDetails
      );
      alert("Product Updated successfully");
      console.log(res);
      setSubTotal(total + subTotal)
      const getProdTableData = await axios.get(
        `${GlobalService.path}/fetchSProduct/${date}/${invoiceNumber}`
      );
      setItemToShow(getProdTableData.data.data);
      
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
    driver_name: Driver_Name,
    vehicle_no: Vehicle_No,
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
    
    try {
      const res = await axios.put(
        `${GlobalService.path}/updateSale/${date}/${invoice_no}`,
        saleProductDetails
      );
console.log(res);
      alert("Sale details Updated successfully");
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
        alert("Product deleted successfully");
        const deletedProduct = itemsToShow.find(
          (product) => product.sp_id == id
        );
        console.log(deletedProduct);
        // Calculate the new subtotal by subtracting the deleted product's total from the current subtotal
        const newSubTotal = subTotal - deletedProduct?.total;
        // Update the subtotal state
        setSubTotal(newSubTotal);
        setItemToShow((itemsToShow) =>
          itemsToShow.filter((product) => product.sp_id != id)
        );
      } else alert("Failed to Delete");
    } catch (error) {
      alert("Failed to delete record");
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
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
      parseFloat(parseFloat((CGST / 100) * transportAmount)) +
      parseFloat(transportAmount) +
      parseFloat(otherAmount);

    setGrandTotal(parseFloat(grandTotal));
  }, [CGST, SGST, IGST, transportAmount, otherAmount, subTotal]);

  return (
    <div
      className="modal fade"
      id="updateOrder"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <form onSubmit={submitSaleProduct}>
        <div className="modal-dialog" style={{ width: "80%" }}>
          <div className="modal-content">
            <div className="modal-header">
               <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
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
                    <select
                    name="pname"
                    id="prodName"
                    className="form-control"
                    value={prodName}
                    onChange={(e) =>
                      setProdName(
                        e.target.value
                      )
                    }
                  >
                    <option>Select product</option>
                    {Array.isArray(productData) && productData.map((item, index) => (
                      <option key={index} value={item.prod_name}>
                        {item.prod_name}
                      </option>
                    ))}
                  </select>
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
                      value={totalWeight = Number(weight * quantity)}
                      onChange={(e) => setTotalWeight(e.target.value)}
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
                      value={total = Number(totalWeight * rate)}
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
                Update Product
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
                          <button
                              type="button"
                              style={{ marginLeft: "5px" }}
                              className="btn btn-primary btn-sm"
                              title="Update"
                              onClick={() => handleRowClick(row)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                            <Button
                              className="confirm-text"
                              onClick={() => deleteItem(row.sp_id)}
                            >
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                alt="img"
                              />
                            </Button>
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
                    <label>Packing and Forwarding</label>
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
                      onChange={(e)=>setSubTotal(e.target.value)}
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
                          onChange={(e)=>setCGSTValue(e.target.value)}
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
                          onChange={(e)=>setSGSTValue(e.target.value)}
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
                          onChange={(e)=>setIGSTValue(e.target.value)}
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
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateSale;
