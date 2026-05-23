import React, { useState, useEffect } from 'react';
import API_URL from '../config';
import './PromoBanner.css';

const PromoBanner: React.FC = () => {
  const [promoText, setPromoText] = useState('🔥 LIMITED TIME: 50% OFFER IN TODAY ONLY! 🔥');

  useEffect(() => {
    const fetchPromoText = async () => {
      try {
        const response = await fetch(`${API_URL}/settings/promo_text`);
        const data = await response.json();
        if (data && data.value) {
          setPromoText(data.value);
        }
      } catch (error) {
        console.error('Error fetching promo text:', error);
      }
    };

    fetchPromoText();
  }, []);

  return (
    <div className="promo-banner">
      <div className="promo-content">
        <span>{promoText}</span>
        <span>•</span>
        <span>{promoText}</span>
        <span>•</span>
        <span>{promoText}</span>
        <span>•</span>
        <span>{promoText}</span>
        <span>•</span>
        <span>{promoText}</span>
        <span>•</span>
      </div>
    </div>
  );
};

export default PromoBanner;
