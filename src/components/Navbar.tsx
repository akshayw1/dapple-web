import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#151525]/80 backdrop-blur-md py-3 border-b border-white/10' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#" 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Logo with gradient glow */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6A5AE0] to-[#9E94EB] p-0.5 shadow-[0_0_20px_rgba(106,90,224,0.5)] relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9E94EB] to-[#6A5AE0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-full h-full rounded-full bg-[#151525] flex items-center justify-center relative z-10">
                <span className="bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] bg-clip-text text-transparent font-bold text-xl">D</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] bg-clip-text text-transparent">D</span>apple
            </span>
          </motion.a>
          
          {/* Mobile menu button */}
          <motion.button 
            type="button" 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'How It Works', 'Testimonials', 'Pricing'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative font-medium text-white group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
            
            <motion.a 
              href="#download" 
              className="relative px-6 py-2 rounded-full overflow-hidden group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB]"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#9E94EB] to-[#6A5AE0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 text-white font-medium">Download</span>
              <span className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full -translate-x-10 -translate-y-4 blur-xl opacity-50 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"></span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden fixed inset-0 bg-[#151525]/95 backdrop-blur-lg z-40 transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out pt-24 px-6 border-l border-white/10`}
        initial={false}
      >
        <div className="flex flex-col space-y-8">
          {['Features', 'How It Works', 'Testimonials', 'Pricing'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xl font-medium text-white border-b border-white/10 pb-2"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10 }}
            >
              {item}
            </motion.a>
          ))}
          
          <motion.a 
            href="#download" 
            className="bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] text-white px-6 py-3 rounded-full text-center font-medium shadow-[0_5px_20px_rgba(106,90,224,0.5)]"
            onClick={() => setMobileMenuOpen(false)}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            whileTap={{ y: 0 }}
          >
            Download
          </motion.a>
          
          {/* Social icons */}
          <div className="flex justify-center space-x-6 pt-6 mt-4 border-t border-white/10">
            {['twitter', 'facebook', 'instagram', 'github'].map((social, index) => (
              <motion.a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#6A5AE0]/20 transition-colors"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                whileHover={{ y: -2, scale: 1.1 }}
              >
                <i className={`fab fa-${social}`}></i>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;