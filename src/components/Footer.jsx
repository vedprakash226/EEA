import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png' // Update path as needed

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);
  
  // Track cursor position and create effects when hovering the footer
  const handleMouseMove = (e) => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      const newPosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // Calculate speed for dynamic effects
      const dx = newPosition.x - lastPosition.x;
      const dy = newPosition.y - lastPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setMouseSpeed(Math.min(distance, 30)); // Cap the speed
      
      // Update cursor trail
      setCursorTrail(prev => {
        const newTrail = [...prev, { ...newPosition, opacity: 1 }];
        return newTrail.slice(-8); // Keep last 8 positions for trail
      });
      
      // Update positions
      setCursorPosition(newPosition);
      setLastPosition(newPosition);
    }
  };
  
  // Fade out cursor trail over time
  useEffect(() => {
    if (cursorTrail.length > 0 && isHovering) {
      const timer = setInterval(() => {
        setCursorTrail(prev => 
          prev.map((point, i) => ({
            ...point,
            opacity: Math.max(point.opacity - (i === 0 ? 0.15 : 0.05), 0)
          })).filter(point => point.opacity > 0)
        );
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [cursorTrail, isHovering]);
  
  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-b from-[#0a1a35] via-[#071d3e] to-[#051a33] text-white border-t border-blue-500/20 w-full mt-auto overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setCursorTrail([]);
      }}
    >
      {/* Enhanced background with subtle pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0xOGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC00MS44IDQtNHptMTggOWMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] pointer-events-none z-0"></div>
      
      {/* Improved gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-indigo-950/20 to-blue-950/40 pointer-events-none"></div>
      
      {/* Enhanced glow effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none"></div>
      
      {/* Primary cursor effect with improved colors */}
      <div 
        className="pointer-events-none absolute rounded-full blur-2xl transition-all duration-300 z-0"
        style={{
          opacity: isHovering ? 0.18 : 0,
          transform: `translate(${cursorPosition.x - 120}px, ${cursorPosition.y - 120}px)`,
          width: `${240 + mouseSpeed * 3}px`,
          height: `${240 + mouseSpeed * 3}px`,
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(59, 130, 246, 0.15) 70%, rgba(37, 99, 235, 0) 100%)`,
          transition: mouseSpeed > 5 ? 'opacity 0.3s ease' : 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      ></div>
      
      {/* Cursor trail with improved blue colors */}
      {cursorTrail.map((point, index) => (
        <div
          key={index}
          className="pointer-events-none absolute rounded-full blur-xl z-0"
          style={{
            left: point.x - 40,
            top: point.y - 40,
            width: 80 - index * 8,
            height: 80 - index * 8,
            opacity: point.opacity * 0.15,
            background: `radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(59, 130, 246, 0.15) 60%, rgba(37, 99, 235, 0) 100%)`,
            transform: `scale(${1 - index * 0.1})`,
          }}
        ></div>
      ))}
      
      {/* Updated particles */}
      <div className="absolute inset-0 z-0 hidden sm:block">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full w-1.5 h-1.5 bg-blue-400/30 pointer-events-none"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${20 + Math.floor(i / 4) * 30}%`,
              transform: isHovering ? 
                `translate(${
                  (cursorPosition.x < window.innerWidth/2 ? 15 : -15) + 
                  Math.sin(i) * (mouseSpeed/2)
                }px, ${
                  (cursorPosition.y < window.innerHeight/2 ? 15 : -15) + 
                  Math.cos(i) * (mouseSpeed/2)
                }px)` : 
                'translate(0, 0)',
              transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)',
              opacity: isHovering ? 1 : 0.5,
            }}
          ></div>
        ))}
      </div>
      
      {/* Enhanced borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-12 z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Column 1: Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-5 sm:mb-6 group">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-blue-500/20 blur-lg group-hover:bg-blue-500/30 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <img src={logo} alt="EEA Logo" className="h-14 w-14 sm:h-16 sm:w-16 relative z-10 transition-transform duration-300 group-hover:scale-105" />
              </div>
            </Link>
            <p className="text-gray-300 text-sm mb-4 sm:mb-5">
              Electrical Engineering Association
            </p>
            <div className="flex space-x-4 sm:space-x-5 mt-4 sm:mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform-gpu">
                <div className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform-gpu">
                <div className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </a>
              <a href="mailto:eea@example.com" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform-gpu">
                <div className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-10 sm:w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400"></span>
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="https://www.instagram.com/eea_iitk/" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mr-2 group-hover:bg-blue-400 transition-all duration-300"></span>
                  Instagram
                </Link>
              </li>
              <li>
                <Link to="https://www.linkedin.com/company/eea-iitk/" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mr-2 group-hover:bg-blue-400 transition-all duration-300"></span>
                  Linkedin
                </Link>
              </li>
              <li>
                <Link to="https://www.iitk.ac.in/ee/" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mr-2 group-hover:bg-blue-400 transition-all duration-300"></span>
                  EE Department
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mr-2 group-hover:bg-blue-400 transition-all duration-300"></span>
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-white relative inline-block">
              Resources
              <span className="absolute -bottom-1 left-0 w-10 sm:w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400"></span>
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/blogs" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mr-2 group-hover:bg-blue-400 transition-all duration-300"></span>
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mr-2 group-hover:bg-blue-400 transition-all duration-300"></span>
                  Past Events
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mr-2 group-hover:bg-blue-400 transition-all duration-300"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mr-2 group-hover:bg-blue-400 transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div className="col-span-2 md:col-span-1 mt-2 sm:mt-0">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-white relative inline-block">
              Contact
              <span className="absolute -bottom-1 left-0 w-10 sm:w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400"></span>
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-300">
              <li className="flex items-start group">
                <div className="p-1.5 sm:p-2 rounded-md bg-white/5 mr-3 text-blue-400 group-hover:bg-white/10 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span className="text-sm sm:text-base group-hover:text-white transition-colors duration-300">ACES Building Near DOAA</span>
              </li>
              <li className="flex items-center group">
                <div className="p-1.5 sm:p-2 rounded-md bg-white/5 mr-3 text-blue-400 group-hover:bg-white/10 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span className="text-sm sm:text-base group-hover:text-white transition-colors duration-300">eea@iitk.ac.in</span>
              </li>
              <li className="flex items-center group">
                <div className="p-1.5 sm:p-2 rounded-md bg-white/5 mr-3 text-blue-400 group-hover:bg-white/10 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <span className="text-sm sm:text-base group-hover:text-white transition-colors duration-300">0512-2596523</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright section with elegant separator */}
        <div className="mt-10 pt-6 border-t border-blue-900/50 text-center text-gray-400 text-xs sm:text-sm">
          <p>© {currentYear} Electrical Engineering Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
