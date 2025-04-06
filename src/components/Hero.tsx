import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Apple, Play } from 'lucide-react';
import dappleJumping from '../assets/dapple-jumping.png';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Custom cursor animation
  const [_mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHidden, setCursorHidden] = useState(true);
  // const ss = mousePosition;
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX - 16);
      cursorY.set(clientY - 16);
      setMousePosition({ x: clientX, y: clientY });
      
      if (cursorHidden) setCursorHidden(false);
    };
    
    const handleMouseLeave = () => setCursorHidden(true);
    const handleMouseEnter = () => setCursorHidden(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorHidden]);

  // Track hoverable elements
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Control elements that should affect cursor state
  const handleMouseEnter = (element: string) => {
    setHoveredElement(element);
  };
  
  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  return (
    <section 
      ref={ref}
      id="home" 
      className="pt-24 pb-16 min-h-screen flex items-center relative overflow-hidden bg-[#151525]"
    >
      {/* Custom cursor */}
      <motion.div 
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference ${cursorHidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: hoveredElement ? 'transparent' : 'white',
          border: hoveredElement ? '2px solid white' : 'none',
          scale: hoveredElement ? 1.5 : 1
        }}
      >
        {hoveredElement === 'button' && (
          <span className="flex items-center justify-center w-full h-full text-xs font-bold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </motion.div>

      {/* Gradient background with moving effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1D36] via-[#3F3D70] to-[#151525]"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-30"></div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#6A5AE0] rounded-full opacity-10 blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#9E94EB] rounded-full opacity-10 blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FFD166] rounded-full opacity-10 blur-[100px]"></div>
      </motion.div>
      
     
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 text-center md:text-left text-white mb-10 md:mb-0"
            style={{ y: textY, opacity: opacityText }}
          >
            {/* Highlight badge */}
            <motion.div
              className="inline-block mb-4 px-3 py-1 rounded-full bg-[#6A5AE0]/20 border border-[#6A5AE0]/30 text-[#9E94EB] backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => handleMouseEnter('badge')}
              onMouseLeave={handleMouseLeave}
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block"
              >
                ✨
              </motion.span>{" "}
              AI-Powered Communication
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-[#9E94EB]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empowering Neurodiverse Communication
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Dapple helps individuals with autism and neurodiversity develop social skills through AI-powered learning, therapy sessions, and a supportive community.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a 
                href="#download" 
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] text-white font-medium transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden shadow-[0_0_30px_rgba(106,90,224,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => handleMouseEnter('button')}
                onMouseLeave={handleMouseLeave}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#9E94EB] to-[#6A5AE0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Apple className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Download for Apple</span>
                <motion.span 
                  className="absolute right-0 -bottom-10 w-20 h-20 rounded-full bg-white/10 blur-xl"
                  animate={{ 
                    x: [0, 10, 0], 
                    y: [0, -10, 0],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </motion.a>
              
              <motion.a 
                href="#download" 
                className="group relative px-8 py-4 rounded-full bg-white/10 backdrop-blur-lg text-white font-medium transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden border border-white/20 hover:border-white/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => handleMouseEnter('button')}
                onMouseLeave={handleMouseLeave}
              >
                <Play className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Download for Android</span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.a>
            </motion.div>
            
            {/* Stats counter */}
            <motion.div
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
            
              
              <motion.div 
                className="p-4 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
                onMouseEnter={() => handleMouseEnter('stat')}
                onMouseLeave={handleMouseLeave}
              >
                <CounterAnimation value={98}>
                  {(value) => (
                    <div className="text-2xl font-bold text-white">{value}%</div>
                  )}
                </CounterAnimation>
                <div className="text-sm text-gray-400">Success Rate</div>
              </motion.div>
              
              <motion.div 
                className="p-4 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 col-span-2 sm:col-span-1"
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
                onMouseEnter={() => handleMouseEnter('stat')}
                onMouseLeave={handleMouseLeave}
              >
                <CounterAnimation value={24}>
                  {(value) => (
                    <div className="text-2xl font-bold text-white">{value}/7</div>
                  )}
                </CounterAnimation>
                <div className="text-sm text-gray-400">Social Inclusivity</div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <div className="md:w-1/2 flex justify-center">
            {/* Glowing ring effect behind character */}
            <div className="relative">
              {/* Spotlight effect */}
              <motion.div 
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#6A5AE0]/30 rounded-full blur-xl"
                animate={{
                  width: ["32%", "36%", "32%"],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Orbit particles */}
              <div className="absolute inset-0 -m-10">
                {[...Array(6)].map((_, i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  const radius = 160;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-[#9E94EB]/40 backdrop-blur-sm"
                      style={{ 
                        left: '50%',
                        top: '50%',
                        marginLeft: -2,
                        marginTop: -2 
                      }}
                      animate={{
                        x: [x, x * 1.05, x],
                        y: [y, y * 1.05, y],
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
              </div>
              
              <motion.div 
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#6A5AE0]/20 to-transparent blur-3xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Continuously floating character */}
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  y: [0, -15, 0],
                  x: [0, 5, 0, -5, 0],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  y: { 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  x: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <img 
                  src={dappleJumping} 
                  alt="Dapple Character" 
                  className="w-full max-w-md drop-shadow-2xl"
                />
                
                {/* Reflection */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-6 bg-[#6A5AE0]/20 blur-md rounded-full"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    width: ["70%", "80%", "70%"],
                    height: [6, 8, 6]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Animated stroke around character */}
              <svg className="absolute -inset-1 w-full h-full z-0 opacity-50" viewBox="0 0 100 100">
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="48" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="0.5"
                  strokeDasharray="1,3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 0.5, 0.8, 0.5],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    pathLength: { duration: 2, ease: "easeInOut" },
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6A5AE0" />
                    <stop offset="100%" stopColor="#9E94EB" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Star sparks around character */}
              {[...Array(5)].map((_, i) => {
                const randomX = (Math.random() - 0.5) * 160;
                const randomY = (Math.random() - 0.5) * 160;
                const randomScale = Math.random() * 0.5 + 0.5;
                const randomDelay = Math.random() * 5;
                
                return (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute w-3 h-3 text-yellow-300"
                    style={{ left: '50%', top: '50%', x: randomX, y: randomY }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, randomScale, 0],
                      rotate: [0, 180]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: randomDelay,
                      ease: "easeOut"
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
          whileHover={{ scale: 1.2 }}
          onMouseEnter={() => handleMouseEnter('scroll')}
          onMouseLeave={handleMouseLeave}
        >
          <motion.svg 
            className="w-8 h-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ 
              strokeWidth: [2, 3, 2],
              stroke: ["rgba(255,255,255,0.7)", "rgba(255,255,255,1)", "rgba(255,255,255,0.7)"] 
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7" 
              animate={{ 
                pathLength: [0, 1, 0],
                pathOffset: [0, 0, 1] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
};

// Counter animation component
const CounterAnimation = ({ 
  value, 
  // plus = false,
  children 
}: { 
  value: number, 
  plus?: boolean,
  children: (value: string) => React.ReactNode 
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  
  React.useEffect(() => {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    // const counter = Math.ceil(value / totalFrames);
    
    let currentFrame = 0;
    const timer = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / totalFrames, 1);
      setDisplayValue(Math.ceil(progress * value));
      
      if (currentFrame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return children(displayValue.toLocaleString());
};

export default Hero;