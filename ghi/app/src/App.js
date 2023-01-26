import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesList from './SalesList'
import RecordSaleForm from './RecordSaleForm';
import CreateCustomerForm from './CreateCustomer';
import CreateEmployeeForm from './CreateEmployee';
import EmployeeRecord from './EmployeeRecord';
import ManufacturerList from './ManufacturerList';
import CreateManufacturerForm from './CreateManufacturer';
import VehicleModelsList from './VehicleModelList';



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
