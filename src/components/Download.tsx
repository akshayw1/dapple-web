import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Apple, Download as DownloadIcon } from 'lucide-react';
import dappleWaving from '../assets/dapple-waving.png';

const Download: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleDownload = () => {
    // Direct link to the APK file on GitHub
    window.location.href = "https://github.com/akshayw1/dapple-web/raw/main/src/assets/app-release.apk";
  };
  const handleAppleDownload = () => {
    // Placeholder for Apple download
    alert("Apple version coming soon!");
  };


  return (
    <section 
      id="download" 
      className="py-16 md:py-24 bg-gradient-to-br from-[#f8f9ff] via-[#f0f1fd] to-[#e8e9fb] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6A5AE0]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FFD166]/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern-light.svg')] bg-center opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            ref={ref}
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Clear, solid text header */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#333333]">
              Start Your Journey Today
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Download Dapple now and take the first step towards improved social communication. Start with a free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8">
              <motion.a 
                onClick={handleAppleDownload}
                className="group bg-[#6A5AE0] hover:bg-[#5949d8] transition-colors rounded-xl px-8 py-4 flex items-center shadow-lg disabled shadow-[#6A5AE0]/20"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Apple className="h-8 w-8 mr-4 text-white" />
                <div className="text-left text-white">
                  <span className="block text-sm font-medium">Download for</span>
                  <span className="block text-xl font-bold">Apple (Soooon )</span>
                </div>
              </motion.a>
              
              <motion.a 
                onClick={handleDownload}
                href="https://github.com/akshayw1/dapple-web/raw/main/src/assets/app-release.apk"
                download="Dapple.apk"
                className="group bg-white hover:bg-gray-50 transition-colors rounded-xl px-8 py-4 flex items-center border-2 border-[#6A5AE0] shadow-lg shadow-[#6A5AE0]/10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <DownloadIcon className="h-8 w-8 mr-4 text-[#6A5AE0]" />
                <div className="text-left text-[#6A5AE0]">
                  <span className="block text-sm font-medium">Download for</span>
                  <span className="block text-xl font-bold">Android</span>
                </div>
              </motion.a>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              By downloading, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Simplified character display */}
            <div className="relative">
              {/* Simple blur background */}
              <div className="absolute inset-0 bg-[#6A5AE0]/10 rounded-full blur-xl transform scale-90"></div>
              
              {/* Character with subtle animation */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0, -3, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src={dappleWaving} 
                  alt="Dapple Character Waving" 
                  className="w-full max-w-md drop-shadow-2xl relative z-10"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Download;