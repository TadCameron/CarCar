import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesList from './Sales/SalesList'
import RecordSaleForm from './Sales/RecordSaleForm';
import CreateCustomerForm from './Sales/CreateCustomer';
import CreateEmployeeForm from './Sales/CreateEmployee';
import EmployeeRecord from './Sales/EmployeeRecord';
import ManufacturerList from './Inventory/ManufacturerList';
import CreateManufacturerForm from './Inventory/CreateManufacturer';
import VehicleModelsList from './Inventory/VehicleModelList';


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
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/create_manufacturers" element={<CreateManufacturerForm />} />
          <Route path="/vehicle_models" element={<VehicleModelsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
