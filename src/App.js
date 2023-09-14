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
          <Route path='goodsUsage' element={<GoodUsage />} />
          <Route path='materialDamage' element={<Material_Damage/>} />

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


          <Route path='generalLedger' element = {<GeneralLedgerForm/>}/>
          <Route path='generalLedgerReport' element = {<GeneralLedger/>}/>



          <Route path='saleInvoice' element = {<SaleInvoice/>}/>
          <Route path='purchaseInvoice' element = {<PurchaseInvoice/>}/>

          
          <Route path='quatationTable' element = {<QuatationTable/>}/>
          <Route path='quatationInvoice' element = {<Quotation/>}/>

         <Route path='customerHistory' element = {<CustomerHistory/>}/>
         <Route path='saleHistory' element = {<OrderHistory/>}/>

         <Route path='supplierHistory' element = {<SupplierHistory/>}/>
         <Route path='purchaseHistory' element = {<PurchaseHistory/>}/>

          <Route path="/cashBookView/:id" element={<CashBookView />} />
          <Route path="/customerView/:id" element={<CustomerView />} />
          <Route path="/companyView/:id" element={<CompanyView />} />
          <Route path="/supplierView/:id" element={<SupplierView />} />
          <Route path="/expenseView/:id" element={<ExpenseView />} />
          <Route path="/empDetailsView/:id" element={<EmployeeDetailsView />} />

          <Route path="/empPaymentDetailsView/:id" element={<EmployeePaymentView />} />
          <Route path="/productView/:id" element={<ProductView />} />

          <Route path='rawUsageList' element = {<Raw_Usage_List/>}/>

          <Route path='goodsUsageList' element = {<Goods_Production_Report/>}/>

          <Route path='damageList' element = {<Damage_material_List/>}/>







        </Routes>
      </Router>
    </div>
  );
}

export default App;
