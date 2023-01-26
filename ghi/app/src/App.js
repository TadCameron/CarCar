import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesList from './SalesList'
import RecordSaleForm from './RecordSaleForm';
import CreateCustomerForm from './CreateCustomer';
import CreateEmployeeForm from './CreateEmployee';
import EmployeeRecord from './EmployeeRecord';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/record" element={<RecordSaleForm />} />
          <Route path="/create_customer" element={<CreateCustomerForm />} />
          <Route path="/create_employee" element={<CreateEmployeeForm />} />
          <Route path="/track_records" element={<EmployeeRecord />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
