import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Star, Eye, ArrowUpRight } from 'lucide-react';
import Logo from '../components/Logo';
import './Shop.css';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
  rating?: number; // Optional as it's not in DB yet
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        // Add default ratings for UI consistency
        const productsWithRatings = data.map((p: Product) => ({
          ...p,
          rating: p.rating || 5.0
        }));
        setProducts(productsWithRatings);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category.toLowerCase().includes(selectedCategory.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // Featured / default
    });

  if (isLoading) {
    return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading products...</div>;
  }

  return (
    <div className="shop-page container">
      <div className="shop-header">
        <h1>Piston Wall Shop</h1>
        <p>Choose from our meticulously handcrafted collections or request your custom build.</p>
      </div>

      <div className="shop-controls glass-panel">
        <div className="filter-group">
          <Filter size={18} />
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Products
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'Decor' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Decor')}
          >
            Decor
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'Lighting' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Lighting')}
          >
            Lighting
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'Accessories' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Accessories')}
          >
            Accessories
          </button>
        </div>

        <div className="sort-group">
          <label htmlFor="sort">Sort By</label>
          <select 
            id="sort" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card glass-panel">
            <div className="product-image-container" style={{ 
              backgroundImage: `url(${product.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#1a1a1a'
            }}>
              <div className="card-badge">
                {product.rating && product.rating >= 4.9 ? 'Best Seller' : product.category}
              </div>
              <div className="card-logo-badge">
                <Logo />
              </div>
              <div className="card-dots">
                <span className="card-dot active"></span>
                <span className="card-dot"></span>
                <span className="card-dot"></span>
                <span className="card-dot"></span>
              </div>
              <div className="hover-actions">
                <Link to={`/product/${product.id}`} className="action-btn" aria-label="View Details">
                  <Eye size={20} />
                </Link>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-sub">{product.category} Series</p>
              <p className="product-desc">{product.description}</p>
              <div className="rating">
                <Star size={14} fill="currentColor" className="star-icon" />
                <span>{product.rating}</span>
              </div>
              <div className="product-footer-row">
                <span className="price-pill">${product.price.toFixed(2)}</span>
                <Link to={`/product/${product.id}`} className="buy-button">
                  <span>Buy Now</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
