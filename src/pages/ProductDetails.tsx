import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Shield, Truck, AlertCircle, ArrowLeft } from 'lucide-react';
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

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
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

  const handlePlaceOrder = async () => {
    if (!product) return;
    setIsOrdering(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: 'Demo Customer', // In a real app, this would come from a form or auth
          customerEmail: 'demo@example.com',
          totalAmount: product.price * quantity,
        }),
      });

      if (response.ok) {
        setOrderComplete(true);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsOrdering(false);
    }
  };

  if (isLoading) {
    return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="product-details-error container text-center">
        <AlertCircle size={48} className="error-icon" />
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been moved.</p>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="product-details-page container">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="details-grid">
        {/* Product Visual */}
        <div className="visual-panel glass-panel" style={{ 
          backgroundImage: `url(${product.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1a1a1a'
        }}>
          <div className="visual-glare"></div>
          <div className="badge-overlay">{product.category}</div>
          <div className="scale-overlay">
            {product.category === 'Decor' ? 'Limited Edition Decor' : 'Premium Handcrafted Item'}
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
            <span>{product.rating} (Verified Product)</span>
          </div>

          <div className="price-tag">${product.price.toFixed(2)}</div>

          <p className="product-long-desc">{product.description} Handcrafted by custom vehicle artists to bring high-octane engineering details to your space. Each frame comes numbered with a certificate of authenticity.</p>

          <div className="config-options">
            <div className="config-section">
              <h3>Custom Options</h3>
              <p style={{ fontSize: '0.875rem', color: '#666' }}>Standard configuration applied. Custom builds available upon request.</p>
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
              onClick={handlePlaceOrder}
              disabled={isOrdering || orderComplete}
            >
              {isOrdering ? 'Processing...' : orderComplete ? 'Order Placed ✓' : 'Instant Checkout'}
            </button>
          </div>

          {orderComplete && (
            <div style={{ marginTop: '1rem', color: '#059669', fontWeight: '600' }}>
              Thank you! Your demo order has been logged in the admin panel.
            </div>
          )}

          {/* Selling points */}
          <div className="selling-points">
            <div className="point">
              <Shield size={20} className="point-icon" />
              <div>
                <h4>Handcrafted Guarantee</h4>
                <p>100% inspected and detailed by hand.</p>
              </div>
            </div>
            <div className="point">
              <Truck size={20} className="point-icon" />
              <div>
                <h4>Secured Shipping</h4>
                <p>Shipped in high-strength crates to guarantee safety.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
