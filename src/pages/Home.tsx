import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Star, ArrowUpRight } from 'lucide-react';
import Logo from '../components/Logo';
import API_URL from '../config';
import './Home.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 4)); // Show first 4 as featured
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <video 
            className="hero-video" 
            src="/WhatsApp%20Video%202026-05-23%20at%204.19.00%20PM.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <h1 className="hero-title">
            The Ultimate <br />
            <span className="text-gradient">Garage Art</span>
          </h1>
          <p className="hero-subtitle">
            Premium 3D diecast frames and custom edits built for the true automotive enthusiast. 
            Transform your passion into a masterpiece.
          </p>
          <div className="hero-cta">
            <Link to="/shop" className="btn-primary">
              Shop Collection <ArrowRight size={18} style={{ display: 'inline', marginLeft: '8px', verticalAlign: 'middle' }}/>
            </Link>
            <Link to="/custom-builds" className="btn-outline">
              Custom Builds
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories container" id="categories">
        <div className="section-header flex-between">
          <div>
            <span className="section-tag">Browse by type</span>
            <h2>Our Expertise</h2>
          </div>
          <Link to="/shop" className="view-all-link">View All <ChevronRight size={16} /></Link>
        </div>
        
        <div className="category-grid">
          <div className="category-card glass-panel group">
            <div className="card-image-placeholder"></div>
            <div className="card-content">
              <h3>3D Diecast Frames</h3>
              <p>Precision scaled models encased in premium acrylic and carbon fiber backing.</p>
              <span className="card-action">Explore <ArrowRight size={16} /></span>
            </div>
          </div>

          <div className="category-card glass-panel group">
            <div className="card-image-placeholder alt-bg"></div>
            <div className="card-content">
              <h3>Custom Edits</h3>
              <p>Your car, your build. Upload your photo and we immortalize it.</p>
              <span className="card-action">Commission <ArrowRight size={16} /></span>
            </div>
          </div>

          <div className="category-card glass-panel group">
            <div className="card-image-placeholder alt-bg-2"></div>
            <div className="card-content">
              <h3>Premium Posters</h3>
              <p>High-octane prints on museum-quality archival paper.</p>
              <span className="card-action">Shop Prints <ArrowRight size={16} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks / Bestsellers */}
      <section className="featured" id="featured">
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <span className="section-tag">🔥 Top picks</span>
              <h2 className="light-text">Bestsellers</h2>
            </div>
            <Link to="/shop" className="view-all-link">View All <ChevronRight size={16} /></Link>
          </div>

          <div className="products-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div key={product.id} className="product-card glass-panel">
                  <div className="product-image-container" style={{ 
                    backgroundImage: `url(${product.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#1a1a1a'
                  }}>
                    <span className="product-badge">Bestseller</span>
                    <div className="card-logo-badge">
                      <Logo />
                    </div>
                    <div className="card-dots">
                      <span className="card-dot active"></span>
                      <span className="card-dot"></span>
                      <span className="card-dot"></span>
                      <span className="card-dot"></span>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-sub">{product.category} Series</p>
                    <div className="product-footer-row">
                      <span className="price-pill">${product.price.toFixed(2)}</span>
                      <Link to={`/product/${product.id}`} className="buy-button">
                        <span>Buy Now</span>
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'white', textAlign: 'center', gridColumn: 'span 4' }}>Loading featured products...</p>
            )}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how container" id="how">
        <div className="section-header-center text-center">
          <span className="section-tag">Custom orders</span>
          <h2>How it Works</h2>
          <p className="section-subtitle">Get a custom, hand-assembled car frame in 3 easy steps.</p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-num">1</div>
            <h3 className="step-title">Choose Your Car</h3>
            <p className="step-desc">Pick from our catalogue or tell us your dream car—any make, model, or year.</p>
          </div>
          <div className="step-card">
            <div className="step-num">2</div>
            <h3 className="step-title">Send Us Details</h3>
            <p className="step-desc">Share photos, custom modifications, wrap colors, and plate details for the render.</p>
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            <h3 className="step-title">Receive Your Frame</h3>
            <p className="step-desc">Your 3D frame is built by specialists, carefully detailed, and shipped safely to your door.</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews" id="reviews">
        <div className="container">
          <div className="section-header-center text-center">
            <span className="section-tag">What people say</span>
            <h2 className="light-text">Customer Reviews</h2>
          </div>

          <div className="reviews-grid">
            <div className="review-card glass-panel">
              <div className="stars">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="review-text">"Absolutely love my Ferrari 250 GTO print. The quality is incredible — sharp, rich colours, and it looks stunning on my garage wall."</p>
              <div className="review-author">
                <div className="author-avatar">RK</div>
                <div>
                  <div className="author-name">Rahul K.</div>
                  <div className="author-location">Bangalore, India</div>
                </div>
              </div>
            </div>

            <div className="review-card glass-panel">
              <div className="stars">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="review-text">"Ordered a custom poster of my Maruti 800 — sounds funny but the result was jaw-dropping. They made it look like a proper race car poster!"</p>
              <div className="review-author">
                <div className="author-avatar">AS</div>
                <div>
                  <div className="author-name">Arjun S.</div>
                  <div className="author-location">Chennai, India</div>
                </div>
              </div>
            </div>

            <div className="review-card glass-panel">
              <div className="stars">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="review-text">"Fast delivery, great packaging, and the print quality is top notch. I've already ordered three and planning more. Highly recommend!"</p>
              <div className="review-author">
                <div className="author-avatar">PM</div>
                <div>
                  <div className="author-name">Priya M.</div>
                  <div className="author-location">Kochi, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
