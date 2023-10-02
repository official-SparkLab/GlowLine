import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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

import { BankDetails } from './BankDetails/BankDetails';

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
import { QuatationTable } from './Quatation/QuatationTable';
import CustomerHistory from './History/CustomerHistory';
import OrderHistory from './History/OrderHistory';
import SupplierHistory from './History/SupplierHistory';
import PurchaseHistory from './History/PurchaseHistory';
import { GoodUsage } from './Product/GoodUsage';
import PurchaseInvoice from './Invoices/PurchaseInvoice';
import GeneralLedgerForm from './Ledgers/GeneralLedgerForm';
import GeneralLedger from './Ledgers/GeneralLedger';
import { Material_Damage } from './Product/Material_Damage';
import { Raw_Usage_List } from './UsageReport/Raw_Usage_Report';
import { Goods_Production_Report } from './UsageReport/Goods_Production_Report';
import { Damage_material_List } from './UsageReport/Damage_Material_List';
import Login from './Login';
import Users from './User/Users';
import { AuthProvider } from './Utils/AuthContext';


function App() {

  const isLoggedIn = () => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    return loggedIn === 'true';
  };

  const PrivateRoute = ({ element, path }) => {
    return isLoggedIn() ? element : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>

      <Router>

        <Routes>
          <Route path="/cashBookForm" element={<PrivateRoute element={<CashBookForm/>}/>} />
          <Route path="/cashBookTable" element={<PrivateRoute element={<CashBookTable/>}/>} />
          <Route path="/" element={<PrivateRoute element={<DashboardStructure/>}/>} />
          <Route path="/expenseTable" element={<PrivateRoute element={<ExpenseTable/>}/>} />

          <Route path="/productTable" element={<PrivateRoute element={<ProductList/>}/>} />
          <Route path='rawUsage' element={<PrivateRoute element={<RawUsage/>}/>} />
          <Route path='goodsUsage' element={<PrivateRoute element={<GoodUsage/>}/>} />
          <Route path='materialDamage' element={<PrivateRoute element={<Material_Damage/>}/>} />

          <Route path="/supplierTable" element={<PrivateRoute element={<SupplierTable/>}/>}/>
          <Route path="/customerTable" element={<PrivateRoute element={<CustomerTable/>}/>} />
          <Route path="/purchaseTable" element={<PrivateRoute element={<PurchaseTable/>}/>} />
          <Route path="/saleEntryTable" element={<PrivateRoute element={<SaleEntryTable/>}/>} />
          <Route path="/employeeTable" element={<PrivateRoute element={<EmployeeTable/>}/>} />
          <Route path = '/employeeAttendence' element={<PrivateRoute element={<EmployeeAttendenceTable/>}/>} />
          <Route path="/employeePaymentTable" element={<PrivateRoute element={<EmployeePaymentTable/>}/>} />
          <Route path="/advancePaymentTable" element={<PrivateRoute element={<AdvancePaymentTable/>}/>} />
          <Route path="/companyTable" element={<PrivateRoute element={<CompanyTable/>}/>} />
          <Route path="/bankDetails" element={<PrivateRoute element={<BankDetails/>}/>} />
          <Route path='purchasePayble' element = {<PrivateRoute element={<Purchase_Payble_Table/>}/>} />
          <Route path='salePayble' element = {<PrivateRoute element={<Sale_Payable_Table/>}/>} />

          <Route path='customerLedger' element = {<PrivateRoute element={<CustomerList/>}/>}/>
          <Route path='customerLedgerReport' element ={<PrivateRoute element={<CustomerLedger/>}/>}/>

          <Route path='supplierLedger' element ={<PrivateRoute element={<SupplierList/>}/>}/>
          <Route path='supplierLedgerReport' element = {<PrivateRoute element={<SupplierLedger/>}/>}/>


          <Route path='generalLedger' element = {<PrivateRoute element={<GeneralLedgerForm/>}/>}/>
          <Route path='generalLedgerReport' element = {<PrivateRoute element={<GeneralLedger/>}/>}/>



          <Route path='saleInvoice' element = {<PrivateRoute element={<SaleInvoice/>}/>}/>
          <Route path='purchaseInvoice' element = {<PrivateRoute element={<PurchaseInvoice/>}/>}/>

          
          <Route path='quatationTable' element = {<PrivateRoute element={<QuatationTable/>}/>}/>
          <Route path='quatationInvoice' element ={<PrivateRoute element={<Quotation/>}/>}/>

         <Route path='customerHistory' element = {<PrivateRoute element={<CustomerHistory/>}/>}/>
         <Route path='saleHistory' element = {<PrivateRoute element={<OrderHistory/>}/>}/>

         <Route path='supplierHistory' element = {<PrivateRoute element={<SupplierHistory/>}/>}/>
         <Route path='purchaseHistory' element = {<PrivateRoute element={<PurchaseHistory/>}/>}/>


          <Route path='rawUsageList' element = {<PrivateRoute element={<Raw_Usage_List/>}/>}/>

          <Route path='goodsUsageList' element = {<PrivateRoute element={<Goods_Production_Report/>}/>}/>

          <Route path='damageList' element = {<PrivateRoute element={<Damage_material_List/>}/>}/>
          <Route path="/users" element={<PrivateRoute element={<Users/>}/>} />

          <Route path='login' element = {<Login/>}/>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
