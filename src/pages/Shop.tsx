import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye } from 'lucide-react';
import API_URL from '../config';
import { getImageUrl } from '../utils/image';
import './Shop.css';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
  rating?: number;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        
        const productsWithRatings = data.map((p: Product) => ({
          ...p,
          rating: p.rating || 5.0
        }));
        setProducts(productsWithRatings);

        const uniqueCategories = Array.from(new Set(data.map((p: Product) => p.category))) as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  if (isLoading) {
    return <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>Reviewing Showroom Specs...</div>;
  }

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <span className="section-tag">Showroom</span>
          <h1>The Collector's Vault</h1>
          <p>Explore our limited-run diecast frames, bespoke custom edits, and museum-quality automotive posters.</p>
        </div>

        <div className="shop-controls glass-panel">
          <div className="filter-group">
            <button 
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Pieces
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
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
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <div 
                  className="product-img-bg"
                  style={{ 
                    backgroundImage: `url(${getImageUrl(product.imageUrl)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    width: '100%'
                  }}
                ></div>
                <div className="card-badge">{product.category}</div>
                <div className="hover-actions">
                  <Link to={`/product/${product.id}`} className="action-btn" aria-label="View Details">
                    <Eye size={20} />
                  </Link>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="rating">
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating} (Verified)</span>
                </div>
                <div className="price-row">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <Link to={`/product/${product.id}`} className="btn-primary-sm">
                    View Specs
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
