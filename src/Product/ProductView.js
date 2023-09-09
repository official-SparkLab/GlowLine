import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalService } from "../service/GlobalService";
import axios from "axios";
import SideBar from "../SideBar";
import Header from "../header";

export const ProductView = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState()
    const goBack = () => {
        window.history.back(); // This will go back in the browser history
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${GlobalService.path}/fetchProduct/${id}`);
                const data = res.data.data[0];
                console.log(data);
                setProductDetails(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the fetchData function

    }, [id]);
    return (
        <>
            <div className="page-container">
                {/* Page Sidebar */}
                <SideBar />

                <div className="page-content">
                    <Header />
                    <div className=" panel panel-white" >
                        <button
                            type="button"
                            className="btn btn-success m-b-sm"
                            onClick={() => goBack()}
                        >
                            Go Back
                        </button>

                        <div id="main-wrapper">
                            <div className="card border-Light" style={{ padding: '2%', textAlign: 'left', justifyContent: 'left' }}>
                                <div className="row ViewLabel" >
                                    <div className="col-md-6">
                                        <label>Product Type :</label>
                                        <p>
                                            {productDetails?.type}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label >Product Name :</label>
                                        <p>
                                            {productDetails?.prod_name}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label >Rate :</label>
                                        <p>
                                            {productDetails?.rate}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <label>GST :</label>
                                        <p>
                                            {productDetails?.gst}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>HSN :</label>
                                        <p>
                                            {productDetails?.hsn}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <label>description :</label>
                                        <p>
                                            {productDetails?.description}
                                        </p>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}