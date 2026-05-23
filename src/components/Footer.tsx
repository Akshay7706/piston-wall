import { Link } from 'react-router-dom';
import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-top">
        <div className="footer-brand-col">
          <div className="footer-brand flex-center" style={{ gap: '10px', justifyContent: 'flex-start' }}>
            <Logo />
            <span>PISTON <span className="text-accent">WALL</span></span>
          </div>
          <p className="footer-desc">
            Premium 3D diecast car frames, custom prints, and collector artwork designed for true automotive enthusiasts.
          </p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shop">3D Diecast Frames</Link>
          <Link to="/custom-builds">Custom Edits</Link>
          <Link to="/shop">Premium Posters</Link>
          <Link to="/shop">Bestsellers</Link>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <a href="#how">How to Order</a>
          <Link to="/contact">Shipping Info</Link>
          <Link to="/contact">Returns & FAQ</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="https://wa.me/15557960182" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
          <Link to="/contact">Email Support</Link>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <Link to="/about">About Us</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} Piston Wall. All rights reserved.
        </div>
        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://wa.me/15557960182" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
