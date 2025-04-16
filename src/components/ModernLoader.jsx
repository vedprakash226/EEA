import React, { useState, useEffect } from 'react';
import './ModernLoader.css';

const ModernLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [animationStage, setAnimationStage] = useState(1);

  useEffect(() => {
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
      <div className={`loader-container ${fadeOut ? 'fade-out' : ''} stage-${animationStage}`}>
        <div className="background-effects">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={`bg-particle-${index}`} className={`bg-particle bg-particle-${index + 1}`}></div>
          ))}
        </div>
        
        <div className="loader-content">
          <div className="orbit-container">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={`orbit-${index}`} className={`orbit orbit-${index + 1}`}>
                <div className="orbit-dot"></div>
              </div>
            ))}
          </div>
          
          <div className="particle-container">
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={`particle-${index}`} className={`particle particle-${index + 1}`}></div>
            ))}
          </div>
          
          <div className="logo-container">
            <span className="logo-text">
              <span className="letter letter-e1">E</span>
              <span className="letter letter-e2">E</span>
              <span className="letter letter-a">A</span>
            </span>
            <div className="logo-underline"></div>
          </div>
          
          <div className="bar-container">
            <div className="loading-bar"></div>
            <div className="loading-pulse"></div>
          </div>
          
          <div className="loader-tagline">
            <span>EEA Welcomes</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ModernLoader;