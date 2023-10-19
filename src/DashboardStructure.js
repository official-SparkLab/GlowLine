import React, { useEffect, useState } from "react";
import Header from "./header";
import SideBar from "./SideBar";
import { GlobalService } from "./service/GlobalService";
import axios from "axios";
export const DashboardStructure = () => {
  const [tableData, setTableData] = useState()

  const [tableData1, setTableData1] = useState()
  const [tableData2, setTableData2] = useState()


  useEffect(() => {
    const fetchData = async () => {
      const res1 = await axios.get(`${GlobalService.path}/goodsStock`);
      setTableData(res1.data.data);
  
      const res2 = await axios.get(`${GlobalService.path}/retailStock`);
      setTableData1(res2.data.data);
  
      const res3 = await axios.get(`${GlobalService.path}/rawStock`);
      setTableData2(res3.data.data);
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      {/* Page Container */}
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
          <div className="page-inner">
            <div className="page-title">
              <h3 className="breadcrumb-header">Dashboard</h3>
            </div>
            <div id="main-wrapper">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="panel panel-white stats-widget">
                    <div className="panel-body">
                      <div className="pull-left">
                        <span className="stats-number">$781,876</span>
                        <p className="stats-info">Total Income</p>
                      </div>
                      <div className="pull-right">
                        <i className="icon-arrow_upward stats-icon" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="panel panel-white stats-widget">
                    <div className="panel-body">
                      <div className="pull-left">
                        <span className="stats-number">578,100</span>
                        <p className="stats-info">Downloads</p>
                      </div>
                      <div className="pull-right">
                        <i className="icon-arrow_downward stats-icon" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="panel panel-white stats-widget">
                    <div className="panel-body">
                      <div className="pull-left">
                        <span className="stats-number">+23,356</span>
                        <p className="stats-info">New Registrations</p>
                      </div>
                      <div className="pull-right">
                        <i className="icon-arrow_upward stats-icon" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="panel panel-white stats-widget">
                    <div className="panel-body">
                      <div className="pull-left">
                        <span className="stats-number">58%</span>
                        <p className="stats-info">Finished Tasks</p>
                      </div>
                      <div className="pull-right">
                        <i className="icon-arrow_upward stats-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Goods Stock */}
                <div className="col-lg-4 col-md-6">
                  <div className="panel panel-white">
                    <div className="panel-heading clearfix">
                      <h4 className="panel-title">Goods Stock</h4>
                    </div>
                    <div className="table-container">
                      <table className="display" style={{width:"100%"}}>
                        <thead>
                          <tr>
                            <th>Sr. No.</th>
                            <th>Company Name</th>
                            <th>Total Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(tableData) &&
                          tableData.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.prod_name}</td>
                              <td>{(row.TotalProductionWeight) - ((row.TotalDamageWeight)+(row.TotalSalesWeight))} Kg</td>
                            </tr>
                          ))}
                      </tbody>
                      
                      </table>
                    </div>
                  </div>
                </div>
                {/* Retail Stock */}
                <div className="col-lg-4 col-md-6">
                  <div className="panel panel-white">
                    <div className="panel-heading clearfix">
                      <h4 className="panel-title">Retail Stock</h4>
                    </div>
                    <div className="table-container">
                      <table className="display" style={{width:"100%"}}>
                        <thead>
                          <tr>
                            <th>Sr. No.</th>
                            <th>Company Name</th>
                            <th>Total Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(tableData1) &&
                          tableData1.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.prod_name}</td>
                              <td>{(row.TotalPurchaseWeight) - ((row.TotalDamageWeight)+(row.TotalSalesWeight))} Kg</td>
                            </tr>
                          ))}
                      </tbody>
                      
                      </table>
                    </div>
                  </div>
                </div>
                {/* Raw Stock */}
                <div className="col-lg-4 col-md-6">
                  <div className="panel panel-white">
                    <div className="panel-heading clearfix">
                      <h4 className="panel-title">Raw Stock</h4>
                    </div>
                    <div className="table-container">
                      <table className="display" style={{width:"100%"}}>
                        <thead>
                          <tr>
                            <th>Sr. No.</th>
                            <th>Company Name</th>
                            <th>Total Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(tableData2) &&
                          tableData2.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.prod_name}</td>
                              <td>{(row.TotalPurchaseWeight) - ((row.TotalDamageWeight)+(row.TotalUsageWeight))} Kg</td>
                            </tr>
                          ))}
                      </tbody>
                      
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row */}
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <div className="panel panel-white">
                    <div className="panel-heading clearfix">
                      <h4 className="panel-title">Invoices</h4>
                    </div>
                    <div className="panel-body">
                      <div className="table-responsive invoice-table">
                        <table className="table">
                          <tbody>
                            <tr>
                              <th scope="row">0567</th>
                              <td>Kenny Highland</td>
                              <td>Themeforest</td>
                              <td>
                                <span className="label label-success">
                                  Finished
                                </span>
                              </td>
                              <td>$427</td>
                            </tr>
                            <tr>
                              <th scope="row">0186</th>
                              <td>Darrell Price</td>
                              <td>Twitter</td>
                              <td>
                                <span className="label label-success">
                                  Finished
                                </span>
                              </td>
                              <td>$1714</td>
                            </tr>
                            <tr>
                              <th scope="row">0712</th>
                              <td>Richard Lunsford</td>
                              <td>Facebook</td>
                              <td>
                                <span className="label label-danger">
                                  Denied
                                </span>
                              </td>
                              <td>$685</td>
                            </tr>
                            <tr>
                              <th scope="row">0095</th>
                              <td>Amy Walker</td>
                              <td>Youtube</td>
                              <td>
                                <span className="label label-warning">
                                  Pending
                                </span>
                              </td>
                              <td>$9900</td>
                            </tr>
                            <tr>
                              <th scope="row">1054</th>
                              <td>Kathy Olson</td>
                              <td>Youtube</td>
                              <td>
                                <span className="label label-default">
                                  Upcoming
                                </span>
                              </td>
                              <td>$1250</td>
                            </tr>
                            <tr>
                              <th scope="row">0043</th>
                              <td>Susan Mabry</td>
                              <td>Instagram</td>
                              <td>
                                <span className="label label-default">
                                  Upcoming
                                </span>
                              </td>
                              <td>$399</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="panel panel-white">
                    <div className="panel-heading clearfix">
                      <h4 className="panel-title">Server Status</h4>
                    </div>
                    <div className="panel-body">
                      <div className="container-fluid">
                        <div className="server-load row">
                          <div className="server-stat col-sm-4">
                            <p>167GB</p>
                            <span>Usage</span>
                          </div>
                          <div className="server-stat col-sm-4">
                            <p>320GB</p>
                            <span>Space</span>
                          </div>
                          <div className="server-stat col-sm-4">
                            <p>57.4%</p>
                            <span>CPU</span>
                          </div>
                        </div>
                      </div>
                      <div id="chart2">
                        <svg />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row */}
              <div className="row">
                <div className="col-lg-4 col-md-12">
                  <div className="panel panel-white">
                    <div className="panel-heading clearfix">
                      <h4 className="panel-title">Tasks</h4>
                    </div>
                    <div className="panel-body">
                      <div className="task-list">
                        <div className="task-item">
                          <span className="task-name">
                            Download 'Alpha' admin template
                          </span>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-info"
                              role="progressbar"
                              aria-valuenow={60}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "80%" }}
                            >
                              <span className="sr-only">80% Complete</span>
                            </div>
                          </div>
                        </div>
                        <div className="task-item">
                          <span className="task-name">
                            Create a new landing page
                          </span>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-info"
                              role="progressbar"
                              aria-valuenow={60}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "10%" }}
                            >
                              <span className="sr-only">10% Complete</span>
                            </div>
                          </div>
                        </div>
                        <div className="task-item">
                          <span className="task-name">
                            Delete inactive users
                          </span>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-info"
                              role="progressbar"
                              aria-valuenow={60}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "50%" }}
                            >
                              <span className="sr-only">80% Complete</span>
                            </div>
                          </div>
                        </div>
                        <div className="task-item">
                          <span className="task-name">
                            Update NVD3 chart plugin
                            <i className="fa fa-check" />
                          </span>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-primary"
                              role="progressbar"
                              aria-valuenow={60}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "100%" }}
                            >
                              <span className="sr-only">100% Complete</span>
                            </div>
                          </div>
                        </div>
                        <div className="task-item">
                          <span className="task-name">
                            Install 4 new layouts
                            <i className="fa fa-check" />
                          </span>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-primary"
                              role="progressbar"
                              aria-valuenow={60}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "100%" }}
                            >
                              <span className="sr-only">100% Complete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12">
                  <div className="panel panel-white">
                    <div className="panel-heading clearfix">
                      <h4 className="panel-title">Total Revenue</h4>
                    </div>
                    <div className="panel-body">
                      <div id="chart1">
                        <svg />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row */}

              {/* Row */}
            </div>
            {/* Main Wrapper */}
            <div className="page-footer">
              <p>
                Made with <i className="fa fa-heart" /> by stacks
              </p>
            </div>
          </div>
          {/* /Page Inner */}
        </div>
        {/* /Page Content */}
      </div>
      {/* /Page Container */}
    </>
  );
};
