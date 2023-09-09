import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { CashBookForm } from './Cash-Book/CashBookForm';
import { CashBookTable } from './Cash-Book/CashBookTable';
import { DashboardStructure } from './DashboardStructure';
import { ExpenseTable } from './Expenses/ExpenseTable';
import { ProductList } from './Product/ProductList';
import { SupplierTable } from './Supplier/SupplierTable';
import { CustomerTable } from './Customer/Customertable';
import { PurchaseTable } from './Purchase-Entry/PurchaseTable';
import { SaleEntryTable } from './Sale-Entry/SaleEntryTable';
import { EmployeeTable } from './Employee/EmployeeTable';
import { EmployeePaymentTable } from './Employee/EmployeePaymentTable';
import { AdvancePaymentTable } from './Employee/advancePaymentTable';
import { CompanyTable } from './Company/companyTable';
import { CashBookView } from './Cash-Book/CashBookView';
import { BankDetails } from './BankDetails/BankDetails';
import { CustomerView } from './Customer/CustomerView';
import { CompanyView } from './Company/CompanyView';
import { SupplierView } from './Supplier/SupplierView';
import { ExpenseView } from './Expenses/ExpenseView';
import { EmployeeDetailsView } from './Employee/EmployeeDetailsView';
import { EmployeePaymentView } from './Employee/EmployeePaymentView';
import { ProductView } from './Product/ProductView';
import { BankDetailsTable } from './BankDetails/BankDetailsTable';
import {RawUsage} from './Product/RawUsage'
import { EmployeeAttendenceTable } from './Employee/EmployeeAttendenceTable';
import { Purchase_Payble_Table } from './Payble/Purchase_Payble_Table';
import { Sale_Payable_Table } from './Payble/Sale_Payable_Table';
import CustomerList from './Ledgers/CustomerList';
import CustomerLedger from './Ledgers/CustomerLedger';
import SupplierList from './Ledgers/SupplierList';
import SupplierLedger from './Ledgers/SupplierLedger';
import SaleInvoice from './Invoices/SaleInvoice';
import Quotation from './Invoices/Quotation';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/cashBookForm" element={<CashBookForm />} />
          <Route path="/cashBookTable" element={<CashBookTable />} />
          <Route path="/" element={<DashboardStructure />} />
          <Route path="/expenseTable" element={<ExpenseTable />} />

          <Route path="/productTable" element={<ProductList />} />
          <Route path='rawUsage' element={<RawUsage />} />
          <Route path="/supplierTable" element={<SupplierTable />} />
          <Route path="/customerTable" element={<CustomerTable />} />
          <Route path="/purchaseTable" element={<PurchaseTable />} />
          <Route path="/saleEntryTable" element={<SaleEntryTable />} />
          <Route path="/employeeTable" element={<EmployeeTable />} />
          <Route path = '/employeeAttendence' element={<EmployeeAttendenceTable />} />
          <Route path="/employeePaymentTable" element={<EmployeePaymentTable />} />
          <Route path="/advancePaymentTable" element={<AdvancePaymentTable />} />
          <Route path="/companyTable" element={<CompanyTable />} />
          <Route path="/bankDetails" element={<BankDetailsTable />} />
          <Route path='purchasePayble' element = {<Purchase_Payble_Table/>} />
          <Route path='salePayble' element = {<Sale_Payable_Table/>} />

          <Route path='customerLedger' element = {<CustomerList/>}/>
          <Route path='customerLedgerReport' element = {<CustomerLedger/>}/>

          <Route path='supplierLedger' element = {<SupplierList/>}/>
          <Route path='supplierLedgerReport' element = {<SupplierLedger/>}/>

          <Route path='saleInvoice' element = {<SaleInvoice/>}/>
          
          <Route path='quatationInvoice' element = {<Quotation/>}/>

          <Route path="/cashBookView/:id" element={<CashBookView />} />
          <Route path="/customerView/:id" element={<CustomerView />} />
          <Route path="/companyView/:id" element={<CompanyView />} />
          <Route path="/supplierView/:id" element={<SupplierView />} />
          <Route path="/expenseView/:id" element={<ExpenseView />} />
          <Route path="/empDetailsView/:id" element={<EmployeeDetailsView />} />

          <Route path="/empPaymentDetailsView/:id" element={<EmployeePaymentView />} />
          <Route path="/productView/:id" element={<ProductView />} />







        </Routes>
      </Router>
    </div>
  );
}

export default App;
