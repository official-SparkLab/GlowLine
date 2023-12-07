import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export const QuatationForm = () => {
  const today = new Date().toISOString().split("T")[0];

  const [voucherNo, setvoucherNo] = useState();
  const [date, setDate] = useState(today);
  const [prodName, setProdName] = useState();
  const [prodId, setProdId] = useState(1);
  const [HDNCode, setHDNCode] = useState();
  const [weight, setWeight] = useState(25);
  const [quantity, setQuantity] = useState(null);
  const [totalWeight, setTotalWeight] = useState(0);
  const [rate, setRate] = useState();
  const [total, setTotal] = useState();
  const [order_no, setOrderNo] = useState();
  const [destination, setDestination] = useState();
  const [transportAmount, setTransportAmount] = useState(null);
  const [otherAmount, setOtherAmount] = useState(null);
  const [CGST, setCGST] = useState(null);
  const [IGST, setIGST] = useState(null);
  const [SGST, setSGST] = useState(null);
  const [CGSTValue, setCGSTValue] = useState(0);
  const [IGSTValue, setIGSTValue] = useState(0);
  const [SGSTValue, setSGSTValue] = useState(0);

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
 

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const res = await axios.get(`${GlobalService.path}/fetchCustomer`);
        setTableData(res.data.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
  
    fetchCustomerDetails();
  }, []); // No dependencies needed here
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productRes = await axios.get(`${GlobalService.path}/fetchProductsForSale`);
        setProductData(productRes.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
  
    fetchProductDetails();
  }, []); // No dependencies needed here
  
  useEffect(() => {
    const updateCustomerDetails = () => {
      if (customerName !== undefined || customerName !== null) {
        const filtered = tableData?.filter((row) => row.cust_name === customerName);
        if (filtered !== undefined && filtered.length > 0) {
          setCustId(filtered[0]?.cust_id);
          setContact(filtered[0]?.mobile);
          setGSTIN(filtered[0]?.gstin);
          setAddress(filtered[0]?.address);
        }
      }
    };
  
    updateCustomerDetails();
  }, [customerName, tableData]);
  
  useEffect(() => {
    const updateProductDetails = () => {
      if (prodName !== undefined || prodName !== null) {
        const filteredData = productData?.filter((row) => row.prod_name === prodName);
        if (filteredData !== undefined && filteredData.length > 0) {
          setSelectedProductData(filteredData[0]);
          
          setHDNCode(filteredData[0]?.hsn);
          setRate(filteredData[0]?.rate);
        }
      }
    };
  
    updateProductDetails();
  }, [prodName, productData]);
  

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
  
    setSubTotal(totalAll);
  }, [itemsToShow]);


  let productDetails = {
    q_prod_id: prodId,
    voucher_no: voucherNo,
    q_date: date,
    gp_id: selectedProductData?.p_id,
    prod_name: selectedProductData?.prod_name,
    hsn: selectedProductData?.hsn,
    weight,
    qty: quantity,
    rate,
    total,
    type: selectedProductData?.type,
  };

  const addProductDetails = async (e) => {
    e.preventDefault();
   

    try {
      const res = await axios.post(
        `${GlobalService.path}/addQuataionProduct`,
        productDetails
      );
      alert("Product added successfully");
      console.log(res);
      // const pID=prodId+1
      setProdId(prodId + 1);

      const getProdTableData = await axios.get(
        `${GlobalService.path}/fetchQuatationProduct/${voucherNo}`
      );
      setItemToShow(getProdTableData.data.data);
    
    } catch (error) {
      console.log(error);
    }
  };

  let saleProductDetails = {
    voucher_no: voucherNo,
    date,
    cust_id: custId,
    cust_name: customerName,
    mobile: contact,
    gstin: GSTIN,
    address,
    order_no: order_no,
    destination: destination,
    trans_amt: transportAmount,
    hamali: otherAmount,
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
      const res = await axios.post(
        `${GlobalService.path}/addQuatation`,
        saleProductDetails
      );

      alert("Quatation details added successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `${GlobalService.path}/deleteQuatationProduct/${id}`
      );
      
      if (response.status == 200) {
        alert("Record deleted successfully");
        const deletedProduct = itemsToShow.find(
          (product) => product.qp_id == id
        );
        
        // Calculate the new subtotal by subtracting the deleted product's total from the current subtotal
        const newSubTotal = subTotal - deletedProduct?.total;
        // Update the subtotal state
        setSubTotal(newSubTotal);
        setItemToShow((itemsToShow) =>
          itemsToShow.filter((product) => product.qp_id != id)
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
    
  }, [CGST, SGST, IGST, transportAmount, otherAmount, subTotal,CGSTValue,IGSTValue,SGSTValue]);

  return (
    <>
      <div className="Main-Wrapper">
        <form onSubmit={submitSaleProduct}>
          <div className="modal-dialog" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="myModalLabel">
                  Quatation Details
                </h2>
              </div>
              <hr />
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Quatation Details{" "}
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Voucher Number</label>
                      <input
                        type="text"
                        name="sup_address"
                        id="sup_address"
                        className="form-control"
                        placeholder="Enter Voucher Number"
                        required=""
                        value={voucherNo}
                        onChange={(e) => setvoucherNo(e.target.value)}
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
                   <label>Customer Name</label>
                   <select
                   name="cname"
                   id="CUstName"
                   className="form-control"
                   value={customerName}
                   onChange={(e) =>
                     setCustomerName(
                       e.target.value
                     )
                   }
                 >
                   <option>Select customer</option>
                   {Array.isArray(tableData) && tableData.map((item, index) => (
                     <option key={index} value={item.cust_name}>
                       {item.cust_name}
                     </option>
                   ))}
                 </select>
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
                        name="sup_address"
                        id="sup_address"
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
                    <input
                    name="pname"
                    id="prodName"
                    list="products"
                    className="form-control"
                    placeholder=""
                    value={prodName}
                    onChange={(e) =>
                      setProdName(
                        e.target.value
                      )
                    }
                  />
                    <datalist id="products">
                    {Array.isArray(productData) && productData.map((item, index) => (
                      <option key={index} value={item.prod_name}>
                        {item.prod_name}
                      </option>
                    ))}
                  </datalist>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>HSN Code</label>
                      <input
                        type="text"
                        name="sup_address"
                        id="sup_address"
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
                        id="date"
                        name="date"
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
                        id="date"
                        name="date"
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
                        id="date"
                        name="date"
                        placeholder="Enter Total Weight"
                        className="form-control"
                        value={totalWeight}
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
                        id="date"
                        name="date"
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
                        id="date"
                        name="date"
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
                              <Link
                                className="confirm-text"
                                onClick={() => deleteItem(row.qp_id)}
                              >
                              <i
                              className="fa fa-trash"
                              style={{ color: "red", fontSize: "18px" }}
                            ></i>
                              </Link>
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
                      <label>Buyers Referal No./Order No.</label>
                      <input
                        type="text"
                        id="prod_name"
                        name="prod_name"
                        className="form-control"
                        placeholder="Enter Order No"
                        value={order_no}
                        onChange={(e) => setOrderNo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Destination</label>
                      <input
                        type="text"
                        id="batch"
                        name="batch"
                        className=" form-control"
                        placeholder="Enter Desination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Packing and Forwarding</label>
                      <input
                        type="number"
                        id="rate"
                        name="rate"
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
                        id="rate"
                        name="rate"
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
                      id="rate"
                      name="rate"
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
