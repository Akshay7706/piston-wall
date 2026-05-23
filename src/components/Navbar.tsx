import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Logo from './Logo';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  return (
    <nav className={`navbar glass-panel ${isVisible ? '' : 'nav-hidden'}`}>
      <div className="container flex-between nav-container">
        <Link to="/" className="nav-brand flex-center" style={{ gap: '10px' }} onClick={() => setIsMenuOpen(false)}>
          <Logo />
          <span>PISTON <span className="text-accent">WALL</span></span>
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/custom-builds" className="nav-link" onClick={() => setIsMenuOpen(false)}>Custom Builds</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>

        <div className="nav-actions flex-center">
          <button className="cart-btn" aria-label="Cart">
            <ShoppingCart size={24} />
            <span className="cart-badge">0</span>
          </button>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
