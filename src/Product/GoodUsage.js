import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import Header from "../header";

export const GoodUsage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [prod_id, setProdId] = useState();
  const [prodName, setProdName] = useState();
  const [date, setDate] = useState(today);

  const [HDNCode, setHDNCode] = useState();
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);
  let [totalWeight, setTotalWeight] = useState(0);
  const [type, setType] = useState("");

  const [productData, setProductData] = useState();
  const [selectedProductData, setSelectedProductData] = useState();

  const handleProductAutocompleteChange = (event, newValue) => {
    setProdName(newValue);
  };

  useEffect(() => {
    const getProductDetails = async (e) => {
      const productRes = await axios.get(
        `${GlobalService.path}/fetchProductsForGoodsUsage`
      );
      console.log(productRes);
      setProductData(productRes.data.data);

      if (prodName != undefined || prodName != null) {
        const filteredData = productData?.filter(
          (row) => row.prod_name === prodName
        );
        setSelectedProductData(filteredData[0]);
        console.log("prod_name=", filteredData);
        setHDNCode(filteredData[0]?.hsn);
        setProdId(filteredData[0]?.p_id);
        setType(filteredData[0]?.type);
      }
    };

    getProductDetails();
  }, [prodName]);

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    const newTotalWeight = newQuantity * weight; // Calculate the new total weight
    setQuantity(newQuantity);
    setTotalWeight(newTotalWeight);
  };

  const handleWeightChange = (e) => {
    const newWeight = e.target.value;
    const newTotalWeight = quantity * newWeight; // Calculate the new total weight
    setWeight(newWeight);
    setTotalWeight(newTotalWeight);
  };

  let productname = productData?.map((data) => {
    return data.prod_name;
  });
  let productDetails = {
    prod_id: selectedProductData?.p_id,
    prod_name: selectedProductData?.prod_name,
    date,
    hsn: selectedProductData?.hsn,
    qty: quantity,
    weight,
    total_weight: totalWeight,
    type,
  };

  const addProductDetails = async (e) => {
    e.preventDefault();
    console.log(productDetails);

    try {
      const res = await axios.post(
        `${GlobalService.path}/addGoodsUsage`,
        productDetails
      );
      alert("Product added successfully");
      setProdId();
      setQuantity(0);
      setWeight(0);
      setTotalWeight(0);
      setType("");
    } catch (error) {
      alert("Failed to add product");
      console.log(error);
    }
  };

  return (
    <>
      <div className="page-container">
        {/* Page Sidebar */}
        <SideBar />
        {/* /Page Sidebar */}
        {/* Page Content */}
        <div className="page-content">
          {/* Page Header */}
          <Header />
          {/* /Page Header */}
          {/* Page Inner */}

          <div className="panel panel-white">
            <div className="Main-Wrapper">
              <form onSubmit={addProductDetails}>
                <div className="modal-dialog" style={{ width: "100%" }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="row">
                        <div className="col col-sm-6">
                          <h2 className="modal-title" id="myModalLabel">
                            Goods Usage Details
                          </h2>
                        </div>
                        <div className="col col-sm-6 text-right">
                          <a className="btn btn-primary" href="goodsUsageList">
                            View List
                          </a>
                        </div>
                      </div>
                    </div>
                    <hr style={{ height: 5, color: "blacks" }} />
                    <div className="modal-header">
                      <h4 className="modal-title" id="myModalLabel">
                        Product Details
                      </h4>
                    </div>

                    <div className="modal-body">
                      <div className="row">
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
                              onChange={handleWeightChange}
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
                              onChange={handleQuantityChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Total Weight</label>
                            <input
                              type="number"
                              id="date"
                              name="date"
                              placeholder="Enter Total Weight"
                              className="form-control"
                              value={totalWeight}
                              onChange={(e) => setTotalWeight(e.target.value)}
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
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
