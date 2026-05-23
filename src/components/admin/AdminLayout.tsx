import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, ExternalLink, LayoutDashboard, Package, ShoppingCart, MessageSquare } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Mobile Header */}
      <header className="admin-mobile-header">
        <div className="mobile-header-content">
          <h2>Admin Panel</h2>
          <button className="menu-toggle-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar (Drawer on mobile) */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Welcome, {user?.username}</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMobileMenu}>
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMobileMenu}>
            <Package size={18} /> <span>Products</span>
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMobileMenu}>
            <ShoppingCart size={18} /> <span>Orders</span>
          </NavLink>
          <NavLink to="/admin/messages" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMobileMenu}>
            <MessageSquare size={18} /> <span>Messages</span>
          </NavLink>
          <NavLink to="/" className="view-site" onClick={closeMobileMenu}>
            <ExternalLink size={18} /> <span>View Site</span>
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && <div className="admin-sidebar-overlay" onClick={closeMobileMenu}></div>}

      <main className="admin-content">
        <div className="admin-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
