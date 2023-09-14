import React from "react";

function SideBar() {


  return (
    <div>
    <div className="page-sidebar">
    <a className="logo-box" href="https://glowline.in/">
      <span style={{ color: "green" , fontSize:"18px" }}>GlowLine</span>
      
      <i className="icon-close" id="sidebar-toggle-button-close" />
    </a>
    <div className="page-sidebar-inner scrollBar-widht">
      <div className="page-sidebar-menu">
        <ul className="accordion-menu">
          <li>
            <a href="/">
              <i className="menu-icon fa fa-dashboard" />
              <span>Dashboard</span>
            </a>
          </li>
          <hr style={{ width: "80%" }} />
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-book" />
              <span>Cash Book</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="cashBookTable">Daily Entry</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-inr" />
              <span>Enpense Master</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="expenseTable">Expense Master</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-edit" />
              <span>Product Master</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="productTable">Add  Product</a>
              </li>

              
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-address-book" />
              <span>Supplier Master</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="supplierTable">Add Raw Supplier</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-address-book" />
              <span> Customer Forms</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="customerTable">Add Customer</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon icon-format_list_bulleted" />
              <span>Purchase Entry</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="purchaseTable">Purchase Entry</a>
              </li>
            </ul>
          </li>
          <li></li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon icon-format_list_bulleted" />
              <span>Sale Entry</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="saleEntryTable">Sale Entry</a>
              </li>
            </ul>
          </li>
          <li>
          <a href="javascript:void(0)">
            <i className="menu-icon icon-format_list_bulleted" />
            <span>Quatation</span>
            <i className="accordion-icon fa fa-angle-left" />
          </a>
          <ul className="sub-menu">
            <li>
              <a href="quatationTable">Quatation Entry</a>
            </li>
          </ul>
        </li>
          <li>
          <a href="javascript:void(0)">
            <i className="menu-icon icon-format_list_bulleted" />
            <span>Material Usage</span>
            <i className="accordion-icon fa fa-angle-left" />
          </a>
          <ul className="sub-menu">
            <li>
              <a href="rawUsage">Add Raw Usage</a>
            </li>
            <li>
              <a href="goodsUsage">Goods Production</a>
            </li>
            <li>
              <a href="materialDamage">Material Damage</a>
            </li>
          </ul>
        </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-file" />
              <span>E-Way Bill</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="invoice.html">E-way bill</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-book" />
              <span>Ledger</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="customerLedger">Customer Ledger</a>
              </li>
              <li>
                <a href="supplierLedger">Supplier Ledger</a>
              </li>
              <li>
              <a href="generalLedger">General Ledger</a>
            </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon  fa fa-credit-card" />
              <span>Purchase Payable </span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="purchasePayble">Purchase Payable</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon  fa fa-credit-card" />
              <span>Sale Payable</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="salePayble">Sale Payable</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon icon-users" />
              <span>Employee forms</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="employeeTable">Add Employee Details</a>
              </li>
              <li>
                <a href="employeePaymentTable">employee Payment</a>
              </li>
              <li>
                <a href="advancePaymentTable">Advance Payment</a>
              </li>
              <li>
                <a href="employeeAttendence">Employee attendance</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-industry" />
              <span>Company Details </span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="companyTable">Company Profile</a>
              </li>
              <li>
                <a href="bankDetails">Bank Details</a>
              </li>
            </ul>
          </li>
          <li>
            <hr style={{ width: "80%" }} />
          </li>
          <h5 style={{ color: "white", marginLeft: 37 }}>
            <u>REPORTS</u>
          </h5>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-industry" />
              <span>Invoice Report</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="saleInvoice">Good Sale Invoice</a>
              </li>
              <li>
                <a href="quatationInvoice">
                  Quatation Invoice
                </a>
              </li>

              <li>
              <a href="purchaseInvoice">
                Purchase Invoice
              </a>
            </li>
              
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i className="menu-icon fa fa-industry" />
              <span>Usage Report</span>
              <i className="accordion-icon fa fa-angle-left" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="rawUsageList">Raw Usage</a>
              </li>
              <li>
                <a href="goodsUsageList">Good Production</a>
              </li>
              <li>
              <a href="damageList">Damage Products</a>
            </li>
            </ul>
          </li>
          <hr style={{ width: "80%" }} />
          <li>
            <a href="index.html">
              <i className="menu-icon icon-help_outline" />
              <span>Documentation</span>
            </a>
          </li>
          <li>
            <a href="index.html">
              <i className="menu-icon icon-public" />
              <span>Changelog</span>
              <span className="label label-danger">1.0</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
    </div>
  );
}

export default SideBar;
