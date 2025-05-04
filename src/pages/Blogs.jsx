import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Add AnimatePresence import
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
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <motion.div 
              className="fixed inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeDialog}
            ></motion.div>
            
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div 
                className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[85vh]"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                  duration: 0.4
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-indigo-400/20 rounded-bl-full -z-0"></div>
                
                {/* Close button */}
                <motion.button
                  onClick={closeDialog}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200 transition-all z-10 group"
                  aria-label="Close"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
                
                {selectedBlog && (
                  <div className="p-7">
                    {/* Add a more organized layout with improved typography and spacing */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                      <motion.div 
                        className="md:col-span-2"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {/* Enhanced profile section */}
                        <motion.div 
                          className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <img 
                            src={selectedBlog.image} 
                            alt={selectedBlog.name} 
                            className="w-full h-full object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <motion.h3 
                              className="text-2xl font-bold text-white"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.4 }}
                            >
                              {selectedBlog.name}
                            </motion.h3>
                            <motion.p 
                              className="text-blue-200"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4, duration: 0.4 }}
                            >
                              {selectedBlog.role}
                            </motion.p>
                          </div>
                        </motion.div>
                        
                        {/* Improved category badge with animation */}
                        <motion.div 
                          className="mt-5 space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                        >
                          <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                              selectedBlog.category === 'alumni' 
                                ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-800 border border-blue-200' 
                                : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-800 border border-emerald-200'
                            }`}>
                              {selectedBlog.category === 'alumni' ? (
                                <>
                                  <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 14L6 22L12 19L18 22L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  Alumni Story
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 14V17M16 14V17M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2.5 8.5H21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  Internship Experience
                                </>
                              )}
                            </span>
                          </div>

                          
                        </motion.div>
                      </motion.div>

                      <motion.div 
                        className="md:col-span-3 overflow-y-auto max-h-[70vh] pr-3 custom-scrollbar"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {/* Before the content, add a title bar with tab-like navigation */}
                        <div className="mb-6 border-b border-gray-200">
                          <div className="flex">
                            <button className="px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600">
                              Story
                            </button>
                            
                            {selectedBlog.category === 'intern' && (
                              <button className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">
                                Internship Details
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Enhance the content display with better typography */}
                        <div 
                          className="prose prose-lg max-w-none prose-headings:text-blue-700 prose-headings:font-bold prose-p:text-gray-600 prose-strong:text-gray-800 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-li:text-gray-600"
                          dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                        ></div>

                        {/* Add a "back to top" button for longer content */}
                        <motion.button
                          className="mt-8 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          onClick={() => {
                            // Scroll to top of modal content
                            const contentDiv = document.querySelector('.custom-scrollbar');
                            if (contentDiv) contentDiv.scrollTop = 0;
                          }}
                          whileHover={{ y: -3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                          </svg>
                          Back to top
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

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