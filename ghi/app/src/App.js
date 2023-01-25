import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServicesManager from './ServicesManager';
import ServicesPage from './ServicesPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services-manager" element={<ServicesManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
