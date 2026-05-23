import { useState } from 'react';
import { Upload, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import './CustomBuilds.css';

export default function CustomBuilds() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [carDetails, setCarDetails] = useState({
    model: '',
    year: '',
    plate: '',
    frameSize: 'A3',
    frameStyle: 'carbon-stealth',
    customText: '',
    userName: '',
    userEmail: '',
    notes: ''
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep(); // Goes to success screen (Step 4)
  };

  return (
    <div className="custom-builds container">
      <div className="custom-header">
        <h1><span className="accent-text">Bespoke</span> Car Frames</h1>
        <p>Upload your own car, customize the presentation, and let us handcraft your garage art.</p>
      </div>

      <div className="builder-container glass-panel">
        {/* Step Indicator */}
        <div className="step-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'complete' : ''}`}>
            {step > 1 ? <Check size={14} /> : '1'}
            <span className="step-label">Upload Car</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'complete' : ''}`}>
            {step > 2 ? <Check size={14} /> : '2'}
            <span className="step-label">Design & Specs</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''} ${step > 3 ? 'complete' : ''}`}>
            {step > 3 ? <Check size={14} /> : '3'}
            <span className="step-label">Review Details</span>
          </div>
        </div>

        {/* Mobile Step Indicator */}
        <div className="mobile-step-indicator">
          {step <= 3 ? `Step ${step} of 3: ${
            step === 1 ? 'Upload Car' : 
            step === 2 ? 'Design & Specs' : 
            'Review Details'
          }` : 'Complete!'}
        </div>

        {/* Builder Panel */}
        <form onSubmit={handleSubmit} className="builder-form">
          {step === 1 && (
            <div className="form-step fade-in">
              <h2>Step 1: Upload Your Car Photo</h2>
              <p className="step-desc">For the best result, upload a high-resolution 3/4 front angle photo of your car in good lighting.</p>
              
              <div className="upload-zone">
                <input 
                  type="file" 
                  id="car-upload" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="file-input"
                />
                <label htmlFor="car-upload" className="upload-label">
                  <Upload size={48} className="upload-icon" />
                  <span>{fileName ? fileName : 'Drag & drop or browse your files'}</span>
                  <span className="upload-hint">Supports JPEG, PNG up to 25MB</span>
                </label>
              </div>

              <div className="input-grid">
                <div className="input-group">
                  <label htmlFor="model">Car Model Name</label>
                  <input 
                    type="text" 
                    id="model" 
                    placeholder="e.g. Porsche Cayman GT4"
                    value={carDetails.model}
                    onChange={e => setCarDetails({...carDetails, model: e.target.value})}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="year">Year</label>
                  <input 
                    type="text" 
                    id="year" 
                    placeholder="e.g. 2021"
                    value={carDetails.year}
                    onChange={e => setCarDetails({...carDetails, year: e.target.value})}
                  />
                </div>
              </div>

              <div className="btn-row-right">
                <button 
                  type="button" 
                  className="btn-primary" 
                  disabled={!carDetails.model || !fileName}
                  onClick={nextStep}
                >
                  Next Step <ChevronRight size={18} style={{ display: 'inline', marginLeft: '6px', verticalAlign: 'middle' }} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step fade-in">
              <h2>Step 2: Choose Frame Specs</h2>
              
              <div className="specs-grid">
                <div className="spec-section">
                  <h3>Frame Size</h3>
                  <div className="options-selector">
                    <label className={`option-card ${carDetails.frameSize === 'A4' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="frameSize" 
                        value="A4" 
                        checked={carDetails.frameSize === 'A4'}
                        onChange={() => setCarDetails({...carDetails, frameSize: 'A4'})}
                      />
                      <span>A4 Size</span>
                      <span className="option-price">+$0.00</span>
                    </label>
                    <label className={`option-card ${carDetails.frameSize === 'A3' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="frameSize" 
                        value="A3" 
                        checked={carDetails.frameSize === 'A3'}
                        onChange={() => setCarDetails({...carDetails, frameSize: 'A3'})}
                      />
                      <span>A3 Size (Recommended)</span>
                      <span className="option-price">+$25.00</span>
                    </label>
                  </div>
                </div>

                <div className="spec-section">
                  <h3>Backboard & Frame Style</h3>
                  <div className="options-selector">
                    <label className={`option-card ${carDetails.frameStyle === 'carbon-stealth' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="frameStyle" 
                        value="carbon-stealth"
                        checked={carDetails.frameStyle === 'carbon-stealth'}
                        onChange={() => setCarDetails({...carDetails, frameStyle: 'carbon-stealth'})}
                      />
                      <span>Stealth Carbon</span>
                      <span className="option-price">+$0.00</span>
                    </label>
                    <label className={`option-card ${carDetails.frameStyle === 'neon-glow' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="frameStyle" 
                        value="neon-glow"
                        checked={carDetails.frameStyle === 'neon-glow'}
                        onChange={() => setCarDetails({...carDetails, frameStyle: 'neon-glow'})}
                      />
                      <span>Neon Glow Accent</span>
                      <span className="option-price">+$15.00</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="input-group mt-2">
                <label htmlFor="customText">Custom Text (Printed on plate below the car)</label>
                <input 
                  type="text" 
                  id="customText" 
                  placeholder="e.g. 'Built, Not Bought' or your Instagram handle"
                  value={carDetails.customText}
                  onChange={e => setCarDetails({...carDetails, customText: e.target.value})}
                />
              </div>

              <div className="btn-row flex-between">
                <button type="button" className="btn-outline" onClick={prevStep}>
                  <ChevronLeft size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Back
                </button>
                <button type="button" className="btn-primary" onClick={nextStep}>
                  Next Step <ChevronRight size={18} style={{ display: 'inline', marginLeft: '6px', verticalAlign: 'middle' }} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step fade-in">
              <h2>Step 3: Contact & Request Review</h2>
              
              <div className="input-grid">
                <div className="input-group">
                  <label htmlFor="userName">Your Name</label>
                  <input 
                    type="text" 
                    id="userName" 
                    placeholder="John Doe"
                    value={carDetails.userName}
                    onChange={e => setCarDetails({...carDetails, userName: e.target.value})}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="userEmail">Email Address</label>
                  <input 
                    type="email" 
                    id="userEmail" 
                    placeholder="john@example.com"
                    value={carDetails.userEmail}
                    onChange={e => setCarDetails({...carDetails, userEmail: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="notes">Special Requests or Mod Lists</label>
                <textarea 
                  id="notes" 
                  rows={4}
                  placeholder="List any aftermarket modifications we should highlight or custom requests..."
                  value={carDetails.notes}
                  onChange={e => setCarDetails({...carDetails, notes: e.target.value})}
                />
              </div>

              <div className="btn-row flex-between">
                <button type="button" className="btn-outline" onClick={prevStep}>
                  <ChevronLeft size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Back
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={!carDetails.userName || !carDetails.userEmail}
                >
                  Submit Configuration
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="success-step fade-in text-center">
              <div className="success-icon-container">
                <Sparkles size={48} className="sparkle-icon" />
              </div>
              <h2>Build Request Submitted!</h2>
              <p>We have received your custom setup details. Our car design specialists will review your uploaded photos and email you a free digital preview and custom quote within 24-48 hours.</p>
              
              <div className="summary-card glass-panel">
                <h3>Your Build Summary:</h3>
                <ul>
                  <li><strong>Car Model:</strong> {carDetails.model} {carDetails.year ? `(${carDetails.year})` : ''}</li>
                  <li><strong>Frame Config:</strong> {carDetails.frameSize} Size / {carDetails.frameStyle === 'carbon-stealth' ? 'Carbon Stealth' : 'Neon Glow'}</li>
                  {carDetails.customText && <li><strong>Custom Plate Text:</strong> "{carDetails.customText}"</li>}
                </ul>
              </div>

              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => {
                  setStep(1);
                  setFileName(null);
                  setCarDetails({
                    model: '',
                    year: '',
                    plate: '',
                    frameSize: 'A3',
                    frameStyle: 'carbon-stealth',
                    customText: '',
                    userName: '',
                    userEmail: '',
                    notes: ''
                  });
                }}
              >
                Create Another Build
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
