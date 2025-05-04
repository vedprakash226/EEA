import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { blogData } from './blogdata';

export default function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [animatedItems, setAnimatedItems] = useState([]);

  // Filter blogs based on category and search term
  const filteredBlogs = blogData.filter((blog) => {
    const matchesCategory = activeCategory === 'all' || blog.category === activeCategory;
    const matchesSearch = blog.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Function to handle selecting a blog
  const handleSelectBlog = useCallback((blog) => {
    setSelectedBlog(blog);
    setIsOpen(true);
    // Prevent scrolling when dialog is open
    document.body.style.overflow = 'hidden';
  }, []);

  // Function to close dialog
  const closeDialog = useCallback(() => {
    setIsOpen(false);
    // Re-enable scrolling when dialog is closed
    document.body.style.overflow = 'auto';
  }, []);

  // When component unmounts, ensure scrolling is enabled
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Animate cards sequentially
  useEffect(() => {
    const timer = setTimeout(() => {
      const ids = filteredBlogs.map(blog => blog.id);
      setAnimatedItems(ids);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filteredBlogs]);

  // Close dialog when pressing escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') closeDialog();
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [closeDialog]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-[100px] pb-20">
      {/* Header Section */}
      <div className="relative mb-16">
        <div className="absolute inset-0 bg-blue-600 opacity-5 skew-y-3"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Alumni & Internship Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get inspired by the remarkable journeys of our alumni and students who are making waves in their respective fields.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 whitespace-nowrap">Filter by:</span>
            <div className="bg-white rounded-full shadow-sm flex border border-gray-200 p-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('alumni')}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'alumni'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                Alumni
              </button>
              <button
                onClick={() => setActiveCategory('intern')}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'intern'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                Internships
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Cards Grid - Completely Redesigned */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.div 
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={animatedItems.includes(blog.id) ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleSelectBlog(blog)}
                className="relative group cursor-pointer"
              >
                {/* Card with angled bottom */}
                <div className="relative bg-white shadow-lg rounded-t-xl overflow-hidden h-[380px] transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      blog.category === 'alumni' 
                        ? 'bg-indigo-100 text-indigo-600' 
                        : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {blog.category === 'alumni' ? 'Alumni Story' : 'Internship'}
                    </span>
                  </div>
                  
                  {/* Image Section with Overlay */}
                  <div className="h-[220px] overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-blue-900/80"></div>
                  </div>
                  
                  {/* Circuit Board Pattern Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" 
                       style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                         backgroundSize: '24px 24px'
                       }}></div>
                  
                  {/* Content Area */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    {/* Role */}
                    <div className="text-blue-200 mb-2 text-sm font-medium">
                      {blog.role}
                    </div>
                    
                    {/* Name */}
                    <h3 className="text-white text-2xl font-bold mb-3">{blog.name}</h3>
                    
                    {/* Read more button */}
                    <div className="flex items-center mt-4 transform translate-y-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-blue-200 text-sm font-medium mr-2">Read story</span>
                      <svg className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Angled Element */}
                <div className="absolute bottom-0 -translate-y-[5px] w-full h-8 transform skew-y-2 bg-white shadow-lg z-[-1]"></div>
                
                {/* Additional Bottom Angled Element */}
                <div className="absolute bottom-0 -translate-y-[2px] w-[97%] mx-[1.5%] h-5 transform skew-y-1 bg-white/80 shadow-lg z-[-2]"></div>
                
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 rounded-t-xl bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {setActiveCategory('all'); setSearchTerm('');}}
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Custom Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={closeDialog}></div>
          
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all w-full max-w-5xl max-h-[85vh]">
              <button
                onClick={closeDialog}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {selectedBlog && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-2">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                        <img 
                          src={selectedBlog.image} 
                          alt={selectedBlog.name} 
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-xl font-bold text-white">{selectedBlog.name}</h3>
                          <p className="text-blue-200">{selectedBlog.role}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          selectedBlog.category === 'alumni' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {selectedBlog.category === 'alumni' ? 'Alumni Story' : 'Internship Experience'}
                        </span>
                      </div>
                      
                      
                    </div>

                    <div className="md:col-span-3 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedBlog.content }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5d1e5;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}</style>
    </div>
  );
}