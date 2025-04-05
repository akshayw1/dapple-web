import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dapplePointing from '../assets/dapple-pointing.png';
import { ArrowRight } from 'lucide-react';

interface StepProps {
  number: string;
  title: string;
  description: string;
  delay: number;
  color: {
    from: string;
    to: string;
  };
  isActive: boolean;
  onHover: () => void;
}

const Step: React.FC<StepProps> = ({ 
  number, 
  title, 
  description, 
  delay, 
  color,
  isActive,
  onHover
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className={`flex mb-10 last:mb-0 p-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/10 backdrop-blur-sm border border-white/10' : 'hover:bg-white/5'}`}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={onHover}
      whileHover={{ x: 5 }}
    >
      <div className="flex-shrink-0 mr-5">
        <motion.div 
          className="relative flex items-center justify-center w-16 h-16 rounded-2xl text-white font-bold text-xl overflow-hidden"
          animate={{
            boxShadow: isActive 
              ? [
                  `0 0 20px ${color.from}70`,
                  `0 0 30px ${color.from}50`,
                  `0 0 20px ${color.from}70`
                ] 
              : `0 10px 30px ${color.from}30`
          }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          style={{
            background: `linear-gradient(135deg, ${color.from}, ${color.to})`
          }}
        >
          {/* Animated background effect */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                `linear-gradient(135deg, ${color.from}, ${color.to})`,
                `linear-gradient(225deg, ${color.from}, ${color.to})`,
                `linear-gradient(315deg, ${color.from}, ${color.to})`,
                `linear-gradient(45deg, ${color.from}, ${color.to})`
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">{number}</span>
          
          {/* Animated particles */}
          {isActive && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/80"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 0.8 
                  }}
                  animate={{ 
                    x: [0, (Math.random() - 0.5) * 60], 
                    y: [0, (Math.random() - 0.5) * 60], 
                    opacity: [0.8, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.6,
                    ease: "easeOut" 
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </div>
      
      <div className="pt-1">
        <motion.h3 
          className="text-xl font-bold mb-2 text-white"  // Always white for visibility
          animate={{ 
            textShadow: isActive ? `0 0 10px ${color.from}50` : 'none'
          }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-200" // Lighter text for better visibility
        >
          {description}
        </motion.p>
        
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center mt-4 text-white/70"
          >
            <span className="text-sm mr-2">Learn more</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight size={14} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const HowItWorks: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // For the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const offsetX = event.clientX - rect.left - width / 2;
    const offsetY = event.clientY - rect.top - height / 2;
    
    x.set(offsetX);
    y.set(offsetY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Active step state
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Personalized Assessment",
      description: "The app evaluates your communication style, challenges, and learning preferences to create a tailored plan.",
      color: {
        from: "#6A5AE0",
        to: "#9E94EB"
      }
    },
    {
      number: "02",
      title: "Interactive Learning",
      description: "Engage with interactive modules designed to build skills progressively through notes, quizzes, and scenarios.",
      color: {
        from: "#FFD166",
        to: "#FFBD59"
      }
    },
    {
      number: "03",
      title: "AI Practice Sessions",
      description: "Practice social skills with AI-driven role-playing scenarios that simulate real-life interactions.",
      color: {
        from: "#00CEC9",
        to: "#4FD1C5"
      }
    },
    {
      number: "04",
      title: "Professional Support",
      description: "Connect with therapists and join group sessions to apply skills with guidance from experts.",
      color: {
        from: "#F687B3",
        to: "#9E94EB"
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-br from-[#151525] via-[#1F1D36] to-[#151525] text-white relative overflow-hidden">
      {/* Backdrop circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6A5AE0]/10 rounded-full opacity-30 blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD166]/10 rounded-full opacity-20 blur-3xl -z-0"></div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={ref}
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section tag */}
          <motion.div
            className="inline-block mb-4 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block"
            >
              🔄
            </motion.span>{" "}
            <span className="text-white/80">Simple Process</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-[#9E94EB] bg-clip-text text-transparent">How Dapple Works</h2>
          
          <p className="text-gray-300">
            Our comprehensive approach combines AI technology with evidence-based methods.
          </p>
          
          {/* Animated underline */}
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] rounded-full mx-auto mt-6"
            initial={{ width: 0, opacity: 0 }}
            animate={inView ? { width: 80, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 order-2 lg:order-1 p-4 rounded-2xl backdrop-blur-sm bg-black/10">
            {steps.map((step, index) => (
              <Step 
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                delay={index * 0.1}
                color={step.color}
                isActive={activeStep === index}
                onHover={() => setActiveStep(index)}
              />
            ))}
          </div>
          
          <motion.div 
            ref={imageRef}
            className="lg:w-1/2 order-1 lg:order-2 flex justify-center mb-10 lg:mb-0 select-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            style={{
              perspective: 1000
            }}
          >
            <motion.div
              className="relative"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Glowing circle */}
              <motion.div
                className="absolute -inset-4 rounded-full blur-3xl z-0"
                animate={{
                  background: [
                    `radial-gradient(circle, ${steps[activeStep].color.from}40, transparent 60%)`,
                    `radial-gradient(circle, ${steps[activeStep].color.to}40, transparent 60%)`,
                    `radial-gradient(circle, ${steps[activeStep].color.from}40, transparent 60%)`
                  ],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Character image with 3D effect */}
              <motion.div 
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img 
                  src={dapplePointing} 
                  alt="Dapple Character with Point Up" 
                  className="w-full max-w-md relative z-10 drop-shadow-2xl"
                  style={{ transform: "translateZ(50px)" }}
                />
                
                {/* Animated rays around character */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  {[...Array(8)].map((_, i) => {
                    const rotation = i * (360 / 8);
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-1 bg-white/30 rounded-full"
                        style={{
                          height: "40%",
                          transformOrigin: "bottom center",
                          rotate: `${rotation}deg`,
                          opacity: 0
                        }}
                        animate={{
                          opacity: [0, 0.6, 0],
                          height: ["30%", "40%", "30%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    );
                  })}
                </div>
                
                {/* Process indicator */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex space-x-3">
                    {steps.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-3 h-3 rounded-full ${i === activeStep ? 'bg-white' : 'bg-white/30'}`}
                        animate={{
                          scale: i === activeStep ? [1, 1.3, 1] : 1,
                          backgroundColor: i === activeStep 
                            ? [steps[i].color.from, steps[i].color.to, steps[i].color.from]
                            : 'rgba(255, 255, 255, 0.3)'
                        }}
                        transition={{
                          duration: i === activeStep ? 2 : 0.3,
                          repeat: i === activeStep ? Infinity : 0
                        }}
                        onClick={() => setActiveStep(i)}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;