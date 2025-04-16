import React, { useEffect, useState } from 'react'
import img from "../assets/about2.jpg"
import img1 from "../assets/about1.jpeg"
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  // State to track scroll position for parallax effect
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  
  // Hook for smooth parallax scrolling with Framer Motion
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // Manual scroll handler for browsers without Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 mt-[85px]">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <motion.div 
            className="absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%]"
            style={{ 
              y: backgroundY 
            }}
          >
            <img 
              src={img1} 
              alt="EEA Background" 
              className="w-full h-full object-cover object-center"
              style={{
                transform: `scale(1.1)`,
                transformOrigin: "center center"
              }}
            />
          </motion.div>
          
          {/* Optional: Subtle floating particles for added depth */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white/10"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  filter: "blur(1px)"
                }}
                animate={{
                  y: [0, Math.random() * 20 - 10],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Hero content with enhanced animations */}
        <div className="container mx-auto px-6 z-20 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Electrical Engineering<br />Association
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Bridging the gap between innovation and education in electrical engineering
          </motion.p>
          
          {/* Optional: Add a call-to-action button */}
          <motion.button
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium
                      transition-all duration-300 transform hover:scale-105 hover:shadow-lg 
                      shadow-blue-600/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={()=>{navigate("/events")}}
          >
            Explore Our Work
          </motion.button>
        </div>
        
        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div 
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <motion.div 
              className="w-1 h-2 bg-white/80 rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            />
          </motion.div>
          <motion.p
            className="text-white/70 text-xs mt-2 font-light tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            SCROLL DOWN
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={img} 
                alt="About EEA" 
                className="w-full h-[400px] object-cover rounded-xl shadow-2xl shadow-blue-900/20"
              />
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-blue-400 mb-2">ABOUT EEA</h2>
              <h3 className="text-4xl font-bold text-white mb-6">Empowering Future Innovators</h3>
              
              <p className="text-gray-300 mb-6 text-lg">
                The Electrical Engineering Association (EEA) is a student body under the Department of Electrical Engineering at IIT Kanpur that aims to foster innovation, collaboration, and excellence in the field of electrical engineering.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Promote Electrical Engineering through events, workshops and competitions",
                  "Bridge the gap between students and professors of the department by offering a common platform",
                  "Act as a source of quality information and diverse opportunities for students of the EE department",
                  "Serve as a platform to reach out to the vast alumni base of the Electrical Engineering department of IIT Kanpur"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="text-blue-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            
            </motion.div>
          </div>
        </div>
      </section>
      
    </div>
  )
}
