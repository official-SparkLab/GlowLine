import React, { useState, useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { Link } from "react-router-dom";
export const PurchaseEntryForm = () => {
  const today = new Date().toISOString().split("T")[0];
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [date, setDate] = useState(today);
  const [prodName, setProdName] = useState();
  const [prodId, setProdId] = useState(1);
  const [HDNCode, setHDNCode] = useState();
  const [weight, setWeight] = useState(25);
  const [quantity, setQuantity] = useState(null);
  const [totalWeight, setTotalWeight] = useState(0);
  const [rate, setRate] = useState();
  const [total, setTotal] = useState();
  const [supplyPlace, setSupplyPlace] = useState();
  const [dispatchNo, setDispatchNo] = useState();
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
  const [SupplierName, setSupplierName] = useState(null);
  const [contact, setContact] = useState();
  const [GSTIN, setGSTIN] = useState();
  const [address, setAddress] = useState();
  const [productData, setProductData] = useState();
  const [selectedProductData, setSelectedProductData] = useState();
  const [itemsToShow, setItemToShow] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [suptId, setSupId] = useState();
  const[com_id,setComId] = useState(null);
  const[comapnyGstNo,setCompanyGstNo] = useState(null);
  const[CompanyData,setCompanyData] = useState([]);
  const[selectedCompanyData,setSelectedCompanyData] = useState([]);


  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const compResponse = await axios.get(`${GlobalService.path}/fetchCompany`);
        setCompanyData(compResponse.data.data);
      } catch (error) {
        console.error("Error fetching Company data:", error);
      }
    };
  
    fetchCompanyDetails();
  }, []); // No dependencies needed here
  
  useEffect(() => {
    const updateCompanyDetails = () => {
      if (comapnyGstNo !== undefined || comapnyGstNo !== null) {
        const filtered = CompanyData?.filter((row) => row.gst === comapnyGstNo);
        if (filtered !== undefined && filtered.length > 0) {
          setSelectedCompanyData(filtered[0])
          setComId(filtered[0]?.com_id);
        }
      }
    };
  
    updateCompanyDetails();
  }, [comapnyGstNo, CompanyData]);


  useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        const res = await axios.get(`${GlobalService.path}/fetchSupplier`);
        setTableData(res.data.data);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };
  
    fetchSupplierDetails();
  }, []); // No dependencies needed here
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productRes = await axios.get(`${GlobalService.path}/fetchProductsForPurchase`);
        setProductData(productRes.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
  
    fetchProductDetails();
  }, []); // No dependencies needed here
  
  useEffect(() => {
    const updateSupplierDetails = () => {
      if (SupplierName !== undefined || SupplierName !== null) {
        const filtered = tableData?.filter((row) => row.sup_name === SupplierName);
        if (filtered !== undefined && filtered.length > 0) {
          setSupId(filtered[0]?.sup_id);
          setContact(filtered[0]?.mobile_no);
          setGSTIN(filtered[0]?.gstin);
          setAddress(filtered[0]?.address);
        }
      }
    };
  
    updateSupplierDetails();
  }, [SupplierName, tableData]);
  
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
    const totalAll = itemsToShow?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
    setSubTotal(totalAll);
  }, [itemsToShow]);

  let productDetails = {
    pur_prod_id: prodId,
    invoice_no: invoiceNumber,
    p_date: date,
    p_id: selectedProductData?.p_id,
    prod_name: selectedProductData?.prod_name,
    total_weight:totalWeight,
    qty: quantity,
    rate,
    total,
    hsn: selectedProductData?.hsn,
    type: selectedProductData?.type,
  };

  // Add Product Details Api

  const addProductDetails = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${GlobalService.path}/addPurchaseProduct`,
        productDetails
      );
      alert("Product added successfully");
      console.log(res);
      // const pID=prodId+1
      setProdId(prodId + 1);

      const getProdTableData = await axios.get(
        `${GlobalService.path}/fetchPProduct/${date}/${invoiceNumber}`
      );
      setItemToShow(getProdTableData.data.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  // Add Purchase Details
  let purchaseDetails = {
    invoice_no: invoiceNumber,
    date,
    sup_id: suptId,
    sup_name: SupplierName,
    mobile_no: contact,
    gstin: GSTIN,
    address,
    place_of_supply: supplyPlace,
    dispatch_no: dispatchNo,
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
    com_id:selectedCompanyData.com_id
  };

  const submitPurchaseDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${GlobalService.path}/addPurchase`,
        purchaseDetails
      );
      alert("Purchase Details added successfully");
      window.location.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Purchased Product
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `${GlobalService.path}/deletePurchaseProduct/${id}`
      );
      console.log(response);
      if (response.status == 200) {
        alert("Product Deleted Success");
        const deletedProduct = itemsToShow.find(
          (product) => product.row_p_id == id
        );
        console.log(deletedProduct);
        // Calculate the new subtotal by subtracting the deleted product's total from the current subtotal
        const newSubTotal = subTotal - deletedProduct?.total;
        // Update the subtotal state
        setSubTotal(newSubTotal);
        setItemToShow((itemsToShow) =>
          itemsToShow.filter((product) => product.row_p_id != id)
        );
      } else alert("Failed to Delete");
    } catch (error) {
      alert("Failed to delete record");
      console.error("Error deleting item:", error);
    }
  };

  // Percentage Calculations

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
        <form onSubmit={submitPurchaseDetails}>
          <div className="modal-dialog" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="myModalLabel">
                  Purchase Details
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
                        name="sup_address"
                        id="sup_address"
                        className="form-control"
                        placeholder="Enter SInvoice Number"
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
                  <label>Company GST No.</label>
                  <select
                  name="gno"
                  id="gstno"
                  className="form-control"
                  value={comapnyGstNo}
                  onChange={(e) =>
                    setCompanyGstNo(
                      e.target.value
                    )
                  }
                >
                  <option>Select GST No.</option>
                  {Array.isArray(CompanyData) && CompanyData.map((item, index) => (
                    <option key={index} value={item.gst}>
                      {item.gst}
                    </option>
                  ))}
                </select>
                  </div>
                </div>
              </div>
              {/* Supplier Details */}
              <hr />
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">
                  Supplier Details
                </h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                    <label>Supplier Name</label>
                    <input
                    name="sname"
                    id="supName"
                    list="suppliers"
                    className="form-control"
                    placeholder="Please Select Supplier"
                    value={SupplierName}
                    onChange={(e) =>
                      setSupplierName(
                        e.target.value
                      )
                    }
                  />
                    <datalist id="suppliers">
                    {Array.isArray(tableData) && tableData.map((item, index) => (
                      <option key={index} value={item.sup_name}>
                        {item.sup_name}
                      </option>
                    ))}
                  </datalist>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Contact</label>
                      <input
                        type="text"
                        id="date"
                        name="date"
                        placeholder="Enter contact"
                        className="form-control"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>GSTIN</label>
                      <input
                        type="text"
                        name="sup_address"
                        id="sup_address"
                        className="form-control"
                        placeholder="Enter Supplier Name"
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
                      <label>Product ID</label>
                      <input
                        type="text"
                        id="date"
                        name="date"
                        placeholder="Product Id"
                        className="form-control"
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
                    placeholder="Please Select Product"
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
                      <label>HSN</label>
                      <input
                        type="text"
                        id="date"
                        name="date"
                        placeholder="Enter HSN"
                        className="form-control"
                        value={HDNCode}
                        onChange={(e) => setHDNCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Weight</label>
                      <input
                        type="text"
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
                        type="text"
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
                                onClick={() => deleteItem(row.row_p_id)}
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
                      <label>Place of Supply</label>
                      <input
                        type="text"
                        id="prod_name"
                        name="prod_name"
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
                        id="prod_name"
                        name="prod_name"
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
                        id="batch"
                        name="batch"
                        className=" form-control"
                        placeholder="Enter Desination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Pakcing and Forwarding</label>
                      <input
                        type="text"
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
                        type="text"
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
                            placeholder="2.5"
                          
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
                            placeholder=""
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
