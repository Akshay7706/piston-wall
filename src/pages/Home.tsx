import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star, ArrowUpRight, Quote, CheckCircle } from 'lucide-react';
import Logo from '../components/Logo';
import PromoBanner from '../components/PromoBanner';
import API_URL from '../config';
import { getImageUrl } from '../utils/image';
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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

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

      <PromoBanner />

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
          <Link to="/shop" className="category-card group">
            <div className="card-image-placeholder" style={{ backgroundColor: '#1a1a2e' }}></div>
            <div className="card-content">
              <h3>3D Diecast Frames</h3>
              <p>Precision scaled models encased in premium acrylic and carbon fiber backing.</p>
              <span className="card-action">View Collections <ArrowRight size={16} /></span>
            </div>
          </Link>

          <Link to="/shop" className="category-card group">
            <div className="card-image-placeholder" style={{ backgroundColor: '#2c2c3e' }}></div>
            <div className="card-content">
              <h3>Custom Edits</h3>
              <p>Your car, your build. Upload your photo and we immortalize it in a premium frame.</p>
              <span className="card-action">Commission Piece <ArrowRight size={16} /></span>
            </div>
          </Link>

          <Link to="/shop" className="category-card group">
            <div className="card-image-placeholder" style={{ backgroundColor: '#121212' }}></div>
            <div className="card-content">
              <h3>Premium Posters</h3>
              <p>High-octane prints on museum-quality archival paper for the modern collector.</p>
              <span className="card-action">Shop Gallery <ArrowRight size={16} /></span>
            </div>
          </Link>
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
                    backgroundImage: `url(${getImageUrl(product.imageUrl)})`,
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

      {/* Collector Testimonials */}
      <section className="reviews" id="reviews">
        <div className="container">
          <div className="section-header-center text-center">
            <span className="section-tag">Authenticity</span>
            <h2 className="light-text">The Collector's Voice</h2>
            <p className="section-subtitle light-text">Trusted by automotive enthusiasts worldwide.</p>
          </div>

          <div className="slider-wrapper">
            <button className="slider-nav-btn left" onClick={() => scroll('left')} aria-label="Previous testimonial">
              <ChevronLeft size={24} />
            </button>
            
            <div className="reviews-grid" ref={scrollRef}>
              <div className="review-card premium-garage-card">
                <div className="card-accent-line"></div>
                <Quote className="quote-icon" size={32} />
                <div className="stars">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <p className="review-text">"The Porsche 911 GT3 RS frame is a masterpiece. The carbon fiber backing and museum-quality glass make it the centerpiece of my home office. Truly world-class craftsmanship."</p>
                <div className="review-author">
                  <div className="author-avatar-wrapper">
                    <div className="author-avatar">RK</div>
                    <CheckCircle className="verified-badge" size={16} />
                  </div>
                  <div>
                    <div className="author-name">Rahul K.</div>
                    <div className="author-role">Diecast Collector</div>
                  </div>
                </div>
              </div>

              <div className="review-card premium-garage-card">
                <div className="card-accent-line"></div>
                <Quote className="quote-icon" size={32} />
                <div className="stars">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <p className="review-text">"Commissioned a bespoke frame for my first project car. The level of detail in the digital edit matched my real build perfectly. This isn't just art; it's a piece of my car's history."</p>
                <div className="review-author">
                  <div className="author-avatar-wrapper">
                    <div className="author-avatar">AS</div>
                    <CheckCircle className="verified-badge" size={16} />
                  </div>
                  <div>
                    <div className="author-name">Arjun S.</div>
                    <div className="author-role">Bespoke Client</div>
                  </div>
                </div>
              </div>

              <div className="review-card premium-garage-card">
                <div className="card-accent-line"></div>
                <Quote className="quote-icon" size={32} />
                <div className="stars">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <p className="review-text">"The vault-grade packaging was impressive. My JDM Legends poster arrived in pristine showroom condition. The print quality is so sharp you can see the grain in the tarmac."</p>
                <div className="review-author">
                  <div className="author-avatar-wrapper">
                    <div className="author-avatar">PM</div>
                    <CheckCircle className="verified-badge" size={16} />
                  </div>
                  <div>
                    <div className="author-name">Priya M.</div>
                    <div className="author-role">Automotive Enthusiast</div>
                  </div>
                </div>
              </div>
            </div>

            <button className="slider-nav-btn right" onClick={() => scroll('right')} aria-label="Next testimonial">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
