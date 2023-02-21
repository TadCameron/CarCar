import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="con+tainer-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <NavLink className="navbar-brand" to="/">CarCar</NavLink>
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown">Sales</button>
              <ul className="dropdown-menu bg-success bg-gradient">
                <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/sales">Sale Logs</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/record">Record a Sale</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/delete_sale">Delete a Sale</NavLink></li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown">Employees</button>
              <ul className="dropdown-menu bg-success bg-gradient">
                <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/create_employee">Create Employee</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/track_records">Track Records</NavLink></li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown">Automobiles</button>
              <ul className="dropdown-menu bg-success bg-gradient">
              <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/manufacturers">Manufacturer List</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/create_manufacturers">Create Manufacturers</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/vehicle_models">Vehicle Models</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/autos-manager">Autos Manager</NavLink></li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn dropdown-toggle" data-bs-toggle="dropdown">Services</button>
              <ul className="dropdown-menu bg-success bg-gradient">
              <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/services">Create Appointment</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/services-manager">Services Manager</NavLink></li>
              </ul>
            </div>
              <li className="nav-item"><NavLink className="nav-link active" aria-current="page" to="/create_customer">Create a Customer</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
