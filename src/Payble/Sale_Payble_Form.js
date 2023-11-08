import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import { Autocomplete, TextField } from "@mui/material";

import axios from "axios";

export const Sale_Payble_Form = ({ row }) => {
  const today = new Date().toISOString().split("T")[0];
  const [customer_name, setCustomerName] = useState();
  const [contact, setContact] = useState();
  const [GSTIN, setGSTIN] = useState();
  const [date, setDate] = useState(today);
  const [custId, setCustId] = useState();
  const [tableData, setTableData] = useState();
  const [pendingAmt, setPendingAmt] = useState(0);
  const [paid_amount, setPaid_amount] = useState(0);
  let [available_bal, setAvailable_bal] = useState(null);
  const [payment_mode, setPaymentMode] = useState("Select");
  const [trx_no, setTrx_no] = useState("");
  const[sales_pay_id,setSales_pay_id] = useState();


  const handleChange = (e) => {
    setPaymentMode(e.target.value);
  };

  // Fetch Supplier Details
  useEffect(() => {
    const getSupplierDetails = async (e) => {
      const res = await axios.get(`${GlobalService.path}/fetchCustomer`);
      setTableData(res.data.data);

      if (customer_name != undefined || customer_name != null) {
        const filtered = tableData?.filter(
          (row) => row.cust_name == customer_name
        );
        if (filtered != undefined) {
          setCustId(filtered[0]?.cust_id);
          setContact(filtered[0]?.mobile);
          setGSTIN(filtered[0]?.gstin);

          // Call the next API using supId here
          await callNextApi(filtered[0]?.cust_id);
        }
      }
    };

    // Callig next api for pyble amount
    const callNextApi = async (custId) => {
      try {
        // Replace 'nextApiPath' with the actual path of the next API
        const nextApiRes = await axios.get(
          `${GlobalService.path}/salePayableAmt/${custId}`
        );

        setPendingAmt(nextApiRes.data.totalAmt);
      } catch (error) {
        // Handle any errors from the next API
        console.error(error);
      }
    };

    getSupplierDetails();
  }, [customer_name]);

  useEffect(() => {
    if (row != undefined) {
      setSales_pay_id(row.sale_pay_id);
      setCustId(row.cust_id);
      setDate(row.date);
      setContact(row.mobile);
      setCustomerName(row.cust_name);
      setGSTIN(row.gstin);
      setAvailable_bal(row.available_bal);
      setPendingAmt(row.pending_amt);
      setPaid_amount(row.paid_amount);
      setPaymentMode(row.payment_mode);
      setTrx_no(row.trx_no);
    }
  }, [row]);

  // Add Purchase Details
  let payableDetails = {
    cust_id: custId,
    cust_name: customer_name,
    date,
    mobile: contact,
    gstin: GSTIN,
    pending_amt: pendingAmt,
    paid_amount: paid_amount,
    available_bal: available_bal,
    payment_mode: payment_mode,
    trx_no: trx_no,
  };

  const addSalePayble = async (e) => {
    e.preventDefault();
    if (row == undefined) {
      try {
        const res = await axios.post(
          `${GlobalService.path}/addSalePayable`,
          payableDetails
        );
        alert("Sale Payble Details added successfully");
        window.location.reload();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.put(
          `${GlobalService.path}/addSalePayable/${sales_pay_id}`,
          payableDetails
        );
        console.log(res);
        alert("Sale Payble details updated successfully");
        window.location.reload();
      } catch (error) {
        alert("Failed to update bank details");

        console.log(error);
      }
    }
  };

  return (
    <div className="Main-Wrapper">
        <div className="modal-dialog" style={{ width: "100%" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="myModalLabel">
                Sale Payble Details
              </h2>
            </div>
            <hr />
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                Customer Details
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                  <label>Customer Name</label>
                  <input
                  name="cname"
                  id="custName"
                  list="customers"
                  className="form-control"
                  placeholder="Please Select Customer"
                  value={customer_name}
                  onChange={(e) =>
                    setCustomerName(
                      e.target.value
                    )
                  }
                />
                 <datalist id="customers">
                  {Array.isArray(tableData) && tableData.map((item, index) => (
                    <option key={index} value={item.cust_name}>
                      {item.cust_name}
                    </option>
                  ))}
                </datalist>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="form-control"
                      placeholder=" "
                      required=""
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Mobile no</label>
                    <input
                      type="text"
                      id="sup_mob"
                      name="sup_mob"
                      className="form-control"
                      placeholder="Enter mobile no"
                      onkeypress="javascript : return isContactno(event)"
                      required=""
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                </div>
                <div className="card border-dark mb-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>GSTIN</label>
                      <input
                        type="text"
                        id="sup_gst"
                        name="sup_gst"
                        className="form-control"
                        placeholder="Enter GSTIN "
                        onkeypress="javascript : return isAlphanumric(event)"
                        required=""
                        value={GSTIN}
                        onChange={(e) => setGSTIN(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ height: 5, color: "blacks" }} />
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                Billing Details
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Pending Amount</label>
                    <input
                      type="number"
                      id="p_amt"
                      className="form-control"
                      placeholder={0}
                      onkeypress="javascript : return isFloat(event)"
                      required=""
                      value={pendingAmt}
                      onChange={(e) => setPendingAmt(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Paid Amount</label>
                    <input
                      type="number"
                      id="paid_amt"
                      name="paid_amt"
                      onkeyup="cal1();"
                      className="form-control"
                      placeholder={0}
                      onkeypress="javascript : return isFloat(event)"
                      required=""
                      value={paid_amount}
                      onChange={(e) => {
                        setPaid_amount(e.target.value);
                        setAvailable_bal(pendingAmt - e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Available Balance</label>
                    <input
                      type="number"
                      id="balance"
                      className="form-control"
                      placeholder="0"
                      required=""
                      readOnly
                      value={available_bal}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Payment mode</label>
                    <select
                      name="pmode"
                      id="pmode"
                      className="form-control"
                      value={payment_mode} // Set the value attribute to the selectedValue state
                      onChange={handleChange}
                    >
                      <option value="Select">Select</option>
                      <option value="URD">URD</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Trx.no</label>
                    <input
                      type="text"
                      id="tr_no"
                      name="tr_no"
                      className="form-control"
                      placeholder="trx. No"
                      onkeypress="javascript : return isAlphanumric(event)"
                      required=""
                      value={trx_no}
                      onChange={(e) => setTrx_no(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="add-row"
                name="btn_save"
                onClick={addSalePayble}
                className="btn btn-success"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};
