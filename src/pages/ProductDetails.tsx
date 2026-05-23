import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Shield, Truck, AlertCircle, ArrowLeft, X } from 'lucide-react';
import API_URL from '../config';
import { getImageUrl } from '../utils/image';
import PromoBanner from '../components/PromoBanner';
import './ProductDetails.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
  rating?: number;
}

const CheckoutModal: React.FC<{ 
  product: Product; 
  quantity: number; 
  onClose: () => void;
  onSuccess: () => void;
}> = ({ product, quantity, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    whatsapp: '',
    shippingAddress: ''
  });
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => {
      const newData = { ...prev, customerPhone: value };
      if (sameAsMobile) {
        newData.whatsapp = value;
      }
      return newData;
    });
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!sameAsMobile) {
      setFormData({ ...formData, whatsapp: e.target.value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsMobile(checked);
    if (checked) {
      setFormData(prev => ({ ...prev, whatsapp: prev.customerPhone }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalAmount: product.price * quantity,
        }),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal glass-panel">
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        <h2>Finalize Acquisition</h2>
        <div className="order-summary-mini">
          <p><strong>Selected Piece:</strong> {product.name} (x{quantity})</p>
          <p><strong>Acquisition Total:</strong> ${(product.price * quantity).toFixed(2)}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Collector Name</label>
            <input 
              type="text" 
              placeholder="Your full name"
              required 
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            />
          </div>
          <div className="input-group">
            <label>Contact Email</label>
            <input 
              type="email" 
              placeholder="For order updates"
              required 
              value={formData.customerEmail}
              onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
            />
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                required 
                value={formData.customerPhone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="input-group">
              <label>WhatsApp Number</label>
              <input 
                type="tel" 
                required
                value={formData.whatsapp}
                onChange={handleWhatsAppChange}
                disabled={sameAsMobile}
              />
            </div>
          </div>
          <div className="checkbox-group">
            <input 
              type="checkbox" 
              id="sameAsMobile" 
              checked={sameAsMobile}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="sameAsMobile">WhatsApp is same as mobile number</label>
          </div>
          <div className="input-group">
            <label>Delivery Destination</label>
            <textarea 
              required 
              placeholder="Full shipping address"
              rows={3}
              value={formData.shippingAddress}
              onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
            />
          </div>
          <div className="form-actions-checkout">
            <button type="button" className="btn-secondary w-full" onClick={onClose} disabled={isSubmitting}>
              Exit
            </button>
            <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Securing Piece...' : 'Confirm Acquisition'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct({ ...data, rating: 5.0 });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Reviewing build specs...</div>;
  }

  if (!product) {
    return (
      <div className="product-details-error container text-center">
        <AlertCircle size={48} className="error-icon" />
        <h2>Piece Not Found</h2>
        <p>The automotive art you are looking for does not exist or has been moved from the vault.</p>
        <Link to="/shop" className="btn-primary">Return to Showroom</Link>
      </div>
    );
  }

  return (
    <div className="product-details-page container">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> Return to Showroom
      </Link>

      <div className="details-grid">
        {/* Product Visual */}
        <div className="visual-panel glass-panel" style={{ 
          backgroundImage: `url(${getImageUrl(product.imageUrl)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1a1a1a'
        }}>
          <div className="visual-glare"></div>
          <div className="badge-overlay">{product.category}</div>
          <div className="scale-overlay">
            {product.category.includes('Diecast') ? '1:24 Scale Precision' : 'Hand-Finished Masterpiece'}
          </div>
        </div>

        {/* Product Config & Checkout */}
        <div className="config-panel">
          <div className="brand-name">PISTON WALL</div>
          <h1 className="product-title">{product.name}</h1>
          
          <div className="rating-row">
            <div className="stars">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span>{product.rating} (Verified Piece)</span>
          </div>

          <div className="price-tag">${product.price.toFixed(2)}</div>

          <p className="product-long-desc">{product.description} Handcrafted by custom vehicle artists to bring high-octane engineering details to your space. Each frame comes numbered with a certificate of authenticity.</p>

          <div className="config-options">
            <div className="config-section">
              <h3>Build Options</h3>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>Standard specification applied. Bespoke builds available upon request.</p>
            </div>
          </div>

          {/* Checkout Controls */}
          <div className="cart-controls">
            <div className="qty-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button 
              className="btn-primary flex-grow" 
              onClick={() => setShowCheckout(true)}
              disabled={orderComplete}
            >
              {orderComplete ? 'Acquisition Confirmed ✓' : 'Secure This Piece'}
            </button>
          </div>

          {orderComplete && (
            <div className="success-message-box">
              <h3>Acquisition Successful!</h3>
              <p>Your piece has been secured. Our curators will contact you shortly to confirm the logistics.</p>
            </div>
          )}

          {/* Selling points */}
          <div className="selling-points">
            <div className="point">
              <Shield size={20} className="point-icon" />
              <div>
                <h4>Hand-Built Authenticity</h4>
                <p>100% inspected and detailed by hand in our specialized garage.</p>
              </div>
            </div>
            <div className="point">
              <Truck size={20} className="point-icon" />
              <div>
                <h4>Vault-Grade Shipping</h4>
                <p>Shipped in reinforced crates to guarantee showroom condition.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal 
          product={product} 
          quantity={quantity} 
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            setShowCheckout(false);
            setOrderComplete(true);
          }}
        />
      )}
    </div>
  );
}
