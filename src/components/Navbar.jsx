import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { useNavigate, Link, useLocation } from 'react-router-dom';
// Import the PDF file
import joinEeaPdf from '../assets/Join_EEA.pdf'; // Update the path as needed

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const isDarkBackground = scrollPosition > 20;
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Update active item based on current path
  useEffect(() => {
    const path = location.pathname;
    const currentItem = navItems.find(item => item.path === path);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location]);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);
    
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Teams', path: '/teams' },
    { name: 'Join EEA', path: '/join', isPdf: true }
  ];

  const handleNavClick = (item) => {
    setActiveItem(item.name);
    
    if (item.isPdf) {
      // Open the PDF
      window.open(joinEeaPdf, '_blank');
    } else {
      navigate(item.path);
    }
    
    // Close mobile menu after clicking
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 w-full z-50 px-5 py-3 transition-all duration-300 ${
      isDarkBackground 
        ? 'backdrop-blur-md bg-gray-900/90 shadow-lg' 
        : 'backdrop-blur-md bg-white/20 shadow-lg'
    }`}>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <div className='flex items-center justify-center'>
          <Link to="/">
            {/* Logo with bluish glow effect - similar to footer */}
            <div className="relative group">
              <div className={`absolute -inset-2 rounded-full ${
                isDarkBackground ? 'bg-blue-500/20' : 'bg-blue-500/10'
              } blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
              <img 
                src={logo} 
                alt="logo" 
                className='w-[60px] h-[60px] relative z-10 transition-all duration-300 group-hover:scale-105'
                onClick={() => setActiveItem('Home')}
              />
            </div>
          </Link>
        </div>

        {/* Desktop Menu with adaptive colors */}
        <div className='hidden md:flex items-center justify-center gap-6'>
          {navItems.map((item) => (
            <button 
              key={item.name}
              onClick={() => handleNavClick(item)}
              className={`relative group px-3 py-2 rounded-lg transition-all duration-300 ${
                item.isPdf 
                  ? isDarkBackground 
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-50 hover:bg-blue-100' 
                  : ''
              }`}
            >
              <span className={`font-semibold text-[18px] ${
                activeItem === item.name 
                  ? isDarkBackground 
                    ? 'text-blue-400' 
                    : 'text-blue-600'
                  : item.isPdf 
                    ? isDarkBackground
                      ? 'text-white group-hover:text-white'
                      : 'text-blue-600 group-hover:text-blue-700'
                    : isDarkBackground
                      ? 'text-white group-hover:text-blue-300'
                      : 'text-gray-700 group-hover:text-blue-500'
              } transition-colors duration-300`}>
                {item.name}
                {item.isPdf && (
                  <span className="ml-1 text-xs align-top">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 inline">
                      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                    </svg>
                  </span>
                )}
              </span>
              
              {/* Animated underline */}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                activeItem === item.name ? 'scale-x-100' : ''
              }`}></span>
              
              {/* Subtle highlight effect - adjusted for dark mode */}
              <span className={`absolute inset-0 ${
                isDarkBackground
                  ? item.isPdf ? 'bg-blue-500/20' : 'bg-white/10'
                  : item.isPdf ? 'bg-blue-100/50' : 'bg-blue-50/30'
              } rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300`}></span>
            </button>
          ))}
        </div>
        
        {/* Mobile Hamburger Menu Button - with adaptive colors */}
        <div className="md:hidden mobile-menu-container relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="p-2 focus:outline-none rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-center gap-1.5">
              <span className={`h-0.5 transition-all duration-300 ${
                isDarkBackground ? 'bg-white' : 'bg-gray-800'
              } ${isMenuOpen ? 'w-6 -rotate-45 translate-y-2' : 'w-6'}`}></span>
              
              <span className={`h-0.5 transition-all duration-300 ${
                isDarkBackground ? 'bg-white' : 'bg-gray-800'
              } ${isMenuOpen ? 'opacity-0 w-0' : 'opacity-100 w-4'}`}></span>
              
              <span className={`h-0.5 transition-all duration-300 ${
                isDarkBackground ? 'bg-white' : 'bg-gray-800'
              } ${isMenuOpen ? 'w-6 rotate-45 -translate-y-2' : 'w-6'}`}></span>
            </div>
          </button>
          
          {/* Mobile Menu Dropdown */}
          <div 
            className={`absolute right-0 top-[calc(100%+10px)] w-64 ${
              isDarkBackground ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-xl overflow-hidden transition-all duration-300 origin-top transform z-50 ${
              isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-2">
              {navItems.map((item) => (
                <button 
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left px-4 py-3 transition-colors flex items-center justify-between ${
                    isDarkBackground ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`${
                    activeItem === item.name 
                      ? isDarkBackground 
                        ? 'text-blue-400 font-semibold' 
                        : 'text-blue-600 font-semibold'
                      : isDarkBackground
                        ? 'text-gray-200'
                        : 'text-gray-700'
                  }`}>
                    {item.name}
                  </span>
                  
                  {activeItem === item.name && (
                    <span className={isDarkBackground ? 'text-blue-400' : 'text-blue-600'}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  )}
                  
                  {item.isPdf && (
                    <span className={isDarkBackground ? 'text-blue-400' : 'text-blue-600'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-2 pb-4 px-4">
              <a 
                href="mailto:eea@iitk.ac.in" 
                className="block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
