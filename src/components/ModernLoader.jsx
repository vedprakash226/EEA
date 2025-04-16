import React, { useState, useEffect } from 'react';
import './ModernLoader.css';

const ModernLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [animationStage, setAnimationStage] = useState(1);
  const [lightningFlash, setLightningFlash] = useState(false);

  useEffect(() => {
    // Enhanced lightning flash effects with multiple micro-flashes
    const flashTimings = [500, 1300];
    
    flashTimings.forEach(timing => {
      setTimeout(() => {
        // Create a series of rapid flashes for each main flash event
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 40);
        
        // Secondary flashes
        setTimeout(() => {
          setLightningFlash(true);
          setTimeout(() => setLightningFlash(false), 25);
          
          // Third smaller flash
          setTimeout(() => {
            setLightningFlash(true);
            setTimeout(() => setLightningFlash(false), 15);
          }, 60);
        }, 80);
      }, timing);
    });
    
    // Stage progression for sophisticated animation sequence
    const stageTimer = setTimeout(() => {
      setAnimationStage(2);
    }, 1200);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(stageTimer);
      clearTimeout(fadeTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  if (loading) {
    return (
      <div className={`loader-container ${fadeOut ? 'fade-out' : ''} stage-${animationStage} ${lightningFlash ? 'lightning-flash' : ''}`}>
        {/* Lightning bolts */}
        <div className="lightning-container">
          <div className="lightning lightning-1"></div>
          <div className="lightning lightning-2"></div>
          <div className="lightning lightning-3"></div>
        </div>
        
        {/* Circuit board pattern */}
        <div className="circuit-board">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={`circuit-line-${index}`} className={`circuit-line circuit-line-${index + 1}`}>
              <div className="circuit-node"></div>
            </div>
          ))}
        </div>
        
        <div className="background-effects">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={`bg-particle-${index}`} className={`bg-particle bg-particle-${index + 1}`}></div>
          ))}
        </div>
        
        <div className="loader-content">
          <div className="electricity-aura"></div>
          
          {/* Power symbols */}
          <div className="power-symbols">
            <div className="power-symbol power-symbol-1">⚡</div>
            <div className="power-symbol power-symbol-2">⚡</div>
          </div>
          
          <div className="orbit-container">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={`orbit-${index}`} className={`orbit orbit-${index + 1}`}>
                <div className="orbit-dot"></div>
                <div className="electron"></div>
              </div>
            ))}
          </div>
          
          <div className="particle-container">
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={`particle-${index}`} className={`particle particle-${index + 1}`}></div>
            ))}
          </div>
          
          <div className="logo-container">
            <div className="voltage-meter">
              <div className="voltage-needle"></div>
              <div className="voltage-display">2500V</div>
            </div>
            
            <span className="logo-text">
              <span className="letter letter-e1">E</span>
              <span className="letter letter-e2">E</span>
              <span className="letter letter-a">A</span>
            </span>
            <div className="logo-underline"></div>
          </div>
          
          {/* Replace bar container with electrical wiring */}
          <div className="wiring-container">
            <div className="switch-box left-box">
              <div className="switch-light"></div>
            </div>
            
            <div className="wire-path">
              <div className="wire-segment wire-segment-1"></div>
              <div className="wire-segment wire-segment-2"></div>
              <div className="wire-segment wire-segment-3"></div>
              <div className="wire-segment wire-segment-4"></div>
              <div className="wire-segment wire-segment-5"></div>
              
              <div className="electricity-pulse pulse-1"></div>
              <div className="electricity-pulse pulse-2"></div>
              <div className="electricity-pulse pulse-3"></div>
              
              <div className="connector connector-1"></div>
              <div className="connector connector-2"></div>
              <div className="connector connector-3"></div>
              <div className="connector connector-4"></div>
            </div>
            
            <div className="switch-box right-box">
              <div className="switch-light"></div>
            </div>
          </div>
          
          <div className="loader-tagline">
            <span>Welcome Back</span>
          </div>
        </div>
      </div>
    );
  } 

  return <>{children}</>;
};

export default ModernLoader;