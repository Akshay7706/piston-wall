import React, { useState, useEffect } from 'react';
import API_URL from '../../config';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    messages: 0,
  });
  const [promoText, setPromoText] = useState('');
  const [isSaving, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, messagesRes, settingsRes] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/messages`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/settings/promo_text`),
        ]);

        const products = await productsRes.json();
        const orders = await ordersRes.json();
        const messages = await messagesRes.json();
        const settings = await settingsRes.json();

        setStats({
          products: products.length,
          orders: orders.length,
          messages: messages.length,
        });

        if (settings && settings.value) {
          setPromoText(settings.value);
        } else {
          setPromoText('🔥 LIMITED TIME: 50% OFFER IN TODAY ONLY! 🔥');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ key: 'promo_text', value: promoText }),
      });

      if (response.ok) {
        alert('Promo banner updated successfully!');
      }
    } catch (error) {
      console.error('Error updating promo text:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <div className="admin-announcement-section" style={{ marginTop: '3rem' }}>
        <h2>Site Announcements</h2>
        <div className="announcement-card">
          <form onSubmit={handleUpdatePromo}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Promo Banner Text
              </label>
              <input 
                type="text" 
                value={promoText} 
                onChange={(e) => setPromoText(e.target.value)} 
                placeholder="Enter moving banner text..."
                required
              />
              <small style={{ display: 'block', marginTop: '0.5rem', color: '#64748b' }}>
                This text will appear in the moving banner at the top of the showroom.
              </small>
            </div>
            <button 
              type="submit" 
              className="save-btn" 
              disabled={isSaving}
            >
              {isSaving ? 'Updating...' : 'Update Banner Text'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
