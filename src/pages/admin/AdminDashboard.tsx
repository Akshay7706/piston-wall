import React, { useState, useEffect } from 'react';
import API_URL from '../../config';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    messages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, messagesRes] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/orders`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          }),
          fetch(`${API_URL}/messages`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          }),
        ]);

        const products = await productsRes.json();
        const orders = await ordersRes.json();
        const messages = await messagesRes.json();

        setStats({
          products: products.length,
          orders: orders.length,
          messages: messages.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{stats.products}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{stats.orders}</p>
        </div>
        <div className="stat-card">
          <h3>Contact Messages</h3>
          <p className="stat-number">{stats.messages}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
