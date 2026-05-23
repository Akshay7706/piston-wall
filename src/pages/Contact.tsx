import { useState } from 'react';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import './Contact.css';

interface FaqItem {
  question: string;
  answer: string;
}

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs: FaqItem[] = [
    {
      question: "How long does shipping take?",
      answer: "Standard orders are processed and shipped within 3-5 business days. Premium items require 7-10 business days as they are handcrafted to order. Custom builds take 2-3 weeks, depending on the complexity of your modifications."
    },
    {
      question: "Can I request specific wheel setups or colors for my custom frame?",
      answer: "Yes, absolutely! When you submit a custom build request, you can list your modifications in the notes. We will do our absolute best to match your exact wheel design, body kit elements, and paint finish."
    },
    {
      question: "What scales of diecast cars do you support?",
      answer: "We primarily work with 1:24 scale diecast models for our standard frame collection. For custom orders, we can also build configurations around 1:18 scale models."
    },
    {
      question: "Do you ship worldwide?",
      answer: "Yes, we ship our premium art globally. International orders are packed in heavy-duty wooden crates or high-strength cardboard boxes to ensure everything arrives safely."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(prev => (prev === index ? null : index));
  };

  return (
    <div className="contact-page container">
      <div className="contact-header text-center">
        <h1>Get in Touch</h1>
        <p>Questions about our frames or custom commissions? Reach out and we'll reply shortly.</p>
      </div>

      <div className="contact-grid">
        {/* Contact Info and FAQs */}
        <div className="contact-info-section">
          <h2>Contact Info</h2>
          
          <div className="info-cards">
            <div className="info-card glass-panel">
              <Mail className="info-icon" />
              <div>
                <h3>Email Us</h3>
                <p>support@pistonwall.com</p>
              </div>
            </div>

            <div className="info-card glass-panel">
              <Phone className="info-icon" />
              <div>
                <h3>Call Us</h3>
                <p>+1 (555) 796-0182</p>
              </div>
            </div>

            <div className="info-card glass-panel">
              <MapPin className="info-icon" />
              <div>
                <h3>Headquarters</h3>
                <p>Detroit, Michigan, USA</p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-item glass-panel ${activeFaq === index ? 'active' : ''}`}>
                  <button className="faq-question flex-between" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <ChevronDown className="faq-chevron" size={18} />
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <div className="form-wrapper glass-panel">
            {formSubmitted ? (
              <div className="form-success text-center">
                <h2>Message Sent!</h2>
                <p>Thank you for reaching out. We have received your message and will get back to you within 24 hours.</p>
                <button className="btn-primary" onClick={() => setFormSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <h2>Send Message</h2>
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    placeholder="Custom Order Inquiry" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    placeholder="Tell us what you're thinking..." 
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
