import React, { useState } from 'react'
import data from "./data.js"

export default function Team() {
  const [activeBatch, setActiveBatch] = useState('ug');

  // Filter data based on active batch
  const filteredData = activeBatch === 'all' 
    ? data 
    : data.filter(student => student.batch === activeBatch);
    
  // Dynamic header based on selected batch
  const getHeaderText = () => {
    if (activeBatch === 'ug') return 'Meet Our UG Team';
    if (activeBatch === 'pg') return 'Meet Our PG Team';
    return 'Meet Our Team';
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-[100px] pb-20'>
      {/* Header Section with Background Styling */}
      <div className="relative mb-16">
        <div className="absolute inset-0 bg-blue-600 opacity-5 skew-y-3"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <h1 className='text-5xl font-bold text-center mb-3 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600'>
            {getHeaderText()}
          </h1>
        </div>
      </div>
      
      {/* Enhanced Filter Tabs with Advanced Animations */}
      <div className="max-w-md mx-auto mb-16">
        <div className="relative flex justify-center items-center bg-white/70 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-blue-100/50">
          {/* Background Pill Animation */}
          <div 
            className="absolute h-[calc(100%-6px)] transition-all duration-500 ease-out"
            style={{
              left: activeBatch === 'all' ? '0.375rem' : activeBatch === 'ug' ? 'calc(33.333% + 0.25rem)' : 'calc(66.666% + 0.125rem)',
              width: 'calc(33.333% - 0.5rem)',
              background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
              borderRadius: '9999px',
              boxShadow: '0 8px 16px -4px rgba(59, 130, 246, 0.2), 0 2px 6px -1px rgba(59, 130, 246, 0.1)',
              zIndex: 0
            }}
          >
            <div className="absolute inset-0 rounded-full bg-blue-200/10 animate-pulse"></div>
          </div>

          {/* Button Group */}
          <button 
            onClick={() => setActiveBatch('all')}
            className={`relative z-10 flex-1 py-2.5 px-2 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden
              ${activeBatch === 'all' 
                ? 'text-white' 
                : 'text-gray-700 hover:text-blue-600'}`}
          >
            <span className="relative z-10 transition-transform duration-300 flex items-center justify-center">
              <svg className={`w-4 h-4 ${activeBatch === 'all' ? 'mr-1.5 text-blue-100' : 'mr-1 text-blue-500'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
              <span className={`${activeBatch === 'all' ? 'transform scale-105' : ''} transition-transform duration-300`}>All</span>
            </span>

            {/* Bottom Dot Indicator */}
            <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white transition-all duration-500 ${
              activeBatch === 'all' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}></span>
          </button>

          <button 
            onClick={() => setActiveBatch('ug')}
            className={`relative z-10 flex-1 py-2.5 px-2 rounded-full font-medium text-sm transition-all duration-300
              ${activeBatch === 'ug' 
                ? 'text-white' 
                : 'text-gray-700 hover:text-blue-600'}`}
          >
            <span className="relative z-10 transition-transform duration-300 flex items-center justify-center">
              <svg className={`w-4 h-4 ${activeBatch === 'ug' ? 'mr-1.5 text-blue-100' : 'mr-1 text-blue-500'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
              </svg>
              <span className={`${activeBatch === 'ug' ? 'transform scale-105' : ''} transition-transform duration-300`}>Undergrad</span>
            </span>

            {/* Bottom Dot Indicator */}
            <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white transition-all duration-500 ${
              activeBatch === 'ug' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}></span>
          </button>

          <button 
            onClick={() => setActiveBatch('pg')}
            className={`relative z-10 flex-1 py-2.5 px-2 rounded-full font-medium text-sm transition-all duration-300
              ${activeBatch === 'pg' 
                ? 'text-white' 
                : 'text-gray-700 hover:text-blue-600'}`}
          >
            <span className="relative z-10 transition-transform duration-300 flex items-center justify-center">
              <svg className={`w-4 h-4 ${activeBatch === 'pg' ? 'mr-1.5 text-blue-100' : 'mr-1 text-blue-500'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span className={`${activeBatch === 'pg' ? 'transform scale-105' : ''} transition-transform duration-300`}>Postgrad</span>
            </span>

            {/* Bottom Dot Indicator */}
            <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white transition-all duration-500 ${
              activeBatch === 'pg' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}></span>
          </button>
        </div>
      </div>
      
      {/* Team Grid with Improved Cards */}
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {filteredData.length > 0 ? (
            filteredData.map((student, index) => (
              <div 
                key={index}
                className='bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group border border-gray-100'
              >
                <div className='relative h-72 overflow-hidden'>
                  <img 
                    src={student.img} 
                    alt={student.name} 
                    className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500'
                  />
                  
                  {/* Overlay with info on hover */}
                  <div className='absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6'>
                    <p className='text-white/90 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75'>
                      {student.role}
                    </p>
                    <div className='flex gap-3 mt-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100'>
                      {student.socials?.linkedin && (
                        <a href={student.socials.linkedin} target="_blank" rel="noopener noreferrer" className='text-white/80 hover:text-white'>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                      )}
                      {student.socials?.github && (
                        <a href={student.socials.github} target="_blank" rel="noopener noreferrer" className='text-white/80 hover:text-white'>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                      )}
                      {student.socials?.instagram && (
                        <a href={student.socials.instagram} target="_blank" rel="noopener noreferrer" className='text-white/80 hover:text-white'>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className='px-6 py-5'>
                  <h3 className='font-semibold text-xl text-gray-800 mb-1'>{student.name}</h3>
                  <div className="w-10 h-1 bg-blue-500 rounded-full mb-3"></div>
                  <p className='text-blue-600 font-medium text-sm'>{student.role}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-10 max-w-md mx-auto shadow-lg">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <p className="text-xl text-gray-500 mb-2">No team members found</p>
                <p className="text-gray-400 text-sm">Try selecting a different category</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
