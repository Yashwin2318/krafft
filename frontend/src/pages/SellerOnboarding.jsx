import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleComplete = (e) => {
    e.preventDefault();
    navigate('/seller');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#FDFDFB] p-8">
      <div className="w-full max-w-xl">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-accent mb-2">Step {step} of 2</p>
          <h1 className="text-4xl font-serif">Tell us about your craft.</h1>
        </div>

        <form onSubmit={handleComplete} className="space-y-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted block mb-2">Shop Name</label>
                <input 
                  type="text" 
                  className="w-full border-b border-muted bg-transparent py-4 text-2xl font-serif outline-none focus:border-accent transition-colors" 
                  placeholder="e.g. The Ink Atelier"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted block mb-2">Shop Bio</label>
                <textarea 
                  rows="3" 
                  className="w-full border-b border-muted bg-transparent py-4 text-lg outline-none focus:border-accent transition-colors resize-none" 
                  placeholder="A few words about what makes your goods unique..."
                ></textarea>
              </div>
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Next <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-muted flex items-center justify-center text-muted relative group cursor-pointer hover:border-accent hover:text-accent transition-colors">
                  <Camera size={32} />
                  <span className="absolute -bottom-2 bg-white px-2 text-[10px] uppercase tracking-tighter border">Upload Photo</span>
                </div>
                <div className="text-center">
                  <h3 className="font-medium">Profile Photo</h3>
                  <p className="text-sm text-muted">A personal touch for your shopfront.</p>
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest text-muted block mb-2">Location</label>
                <input 
                  type="text" 
                  className="w-full border-b border-muted bg-transparent py-4 text-xl outline-none focus:border-accent transition-colors" 
                  placeholder="e.g. Kyoto, Japan"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="btn-outline flex-1"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="btn-primary flex-1"
                >
                  Start Selling
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SellerOnboarding;
