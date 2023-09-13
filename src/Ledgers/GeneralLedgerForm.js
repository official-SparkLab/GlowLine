import React from "react";
import { useState } from "react";
import SideBar from "../SideBar";
import Header from "../header";
function GeneralLedgerForm() {
  const today = new Date().toISOString().split("T")[0];
  const [tableData, setTableData] = useState([]);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  const handleSubmit = () => {
    window.location.href = `/generalLedgerReport?fromDate=${fromDate}&toDate=${toDate}`;
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
            <h2>General Ledger</h2>
            <div className="row" style={{ marginTop: "60px" }}>
              
              <div className="col-md-5">
                <label>From</label>
                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="col-md-5">
                <label>To</label>
                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label></label>
                <br />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                  onClick={handleSubmit}
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralLedgerForm;
