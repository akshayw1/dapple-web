import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
          
          </div>
          
            <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">Dapple</div>
            <p className="text-gray-400 mb-6">
              Empowering neurodiverse individuals to communicate and connect confidently.
            </p>
          
          
        
          
          
        </div>
        
        <div className="text-center pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Dapple. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;