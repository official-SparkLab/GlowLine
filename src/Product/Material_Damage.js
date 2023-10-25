import React, { useEffect, useState } from "react";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import { Autocomplete,  TextField } from "@mui/material";
import SideBar from "../SideBar";
import Header from "../header";

export const MaterialDamage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [prodName, setProdName] = useState();
  const [date, setDate] = useState(today);

  const [HDNCode, setHDNCode] = useState();
  const [totalweight, setTotalWeight] = useState(0);
  const[type,setType] = useState("");

  const [productData, setProductData] = useState();
  const [selectedProductData, setSelectedProductData] = useState();



  useEffect(() => {
    const getProductDetails = async (e) => {
      const productRes = await axios.get(
        `${GlobalService.path}/fetchProducts`
      );
      console.log(productRes);
      setProductData(productRes.data.data);

      if (prodName != undefined || prodName != null) {
        const filteredData = productData?.filter(
          (row) => row.prod_name == prodName
        );
        setSelectedProductData(filteredData[0]);
        console.log("prod_name=", filteredData);
        setHDNCode(filteredData[0]?.hsn);
        setType(filteredData[0]?.type);
      }
    };
    getProductDetails();
  }, [prodName,productData]);

 

  let productDetails = {
    p_id: selectedProductData?.p_id,
    prod_name: selectedProductData?.prod_name,
    date,
    hsn: selectedProductData?.hsn,
    total_weight: totalweight,
    type,
  };

  const addProductDetails = async (e) => {
    e.preventDefault();
    

    try {
      const res = await axios.post(
        `${GlobalService.path}/addDamage`,
        productDetails
      );
      console.log(res);
      alert("Product added successfully");
      setTotalWeight(0);
      setType("");
    } catch (error) {
      alert("Failed to add product");
      console.log(error);
    }
  };

  return (
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
                        Material Damage Details
                      </h2>
                    </div>
                    <div className="col col-sm-6 text-right">
                      <a className="btn btn-primary" href="damageList">
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
                          <option>{prodName}</option>
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
                          <label>Total Weight</label>
                          <input
                            type="number"
                            id="date"
                            name="date"
                            placeholder="Enter Qty"
                            className="form-control"
                            value={totalweight}
                            onChange={(e)=>setTotalWeight(e.target.value)}
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
    
  );
};
