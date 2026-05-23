import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PromoBanner from './components/PromoBanner';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CustomBuilds from './pages/CustomBuilds';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMessages from './pages/admin/AdminMessages';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><main><Home /></main><Footer /></>} />
          <Route path="/shop" element={<><Navbar /><main><Shop /></main><Footer /></>} />
          <Route path="/custom-builds" element={<><Navbar /><main><CustomBuilds /></main><Footer /></>} />
          <Route path="/about" element={<><Navbar /><main><About /></main><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><main><Contact /></main><Footer /></>} />
          <Route path="/product/:id" element={<><Navbar /><main><ProductDetails /></main><Footer /></>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
