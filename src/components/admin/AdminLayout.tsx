import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Welcome, {user?.username}</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''}>
            Products
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : ''}>
            Orders
          </NavLink>
          <NavLink to="/admin/messages" className={({ isActive }) => isActive ? 'active' : ''}>
            Messages
          </NavLink>
          <NavLink to="/" className="view-site">
            View Site
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
