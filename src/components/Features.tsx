import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Users, Bot, MessageSquare, CheckSquare, MessageCircle, ArrowRight } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientColors: {
    from: string;
    to: string;
  };
}

// Background animated lines component
const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent opacity-30"
          style={{
            top: `${15 + i * 15}%`,
            width: '100%',
            left: 0,
          }}
          animate={{
            x: [i % 2 === 0 ? -1000 : 1000, i % 2 === 0 ? 1000 : -1000],
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent opacity-30"
          style={{
            left: `${20 + i * 20}%`,
            height: '100%',
            top: 0,
          }}
          animate={{
            y: [i % 2 === 0 ? -1000 : 1000, i % 2 === 0 ? 1000 : -1000],
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Floating particles component
const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-30"
          style={{
            background: i % 3 === 0 
              ? 'linear-gradient(135deg, #6A5AE0, #9E94EB)' 
              : i % 3 === 1 
                ? 'linear-gradient(135deg, #FFD166, #FFBD59)'
                : 'linear-gradient(135deg, #00CEC9, #4FD1C5)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced feature card with hover effects
const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, gradientColors }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800/40 p-8 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-lg"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-10 z-0"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle at 50% 50%, ${gradientColors.from}80, transparent 70%)`
            : `radial-gradient(circle at 50% 50%, ${gradientColors.from}00, transparent 0%)`
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="z-10 relative">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`,
            boxShadow: `0 10px 25px ${gradientColors.from}40`,
          }}
        >
          <div className="w-8 h-8 text-white">{icon}</div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        
        <motion.div 
          className="flex items-center text-sm font-medium"
          style={{ color: gradientColors.from }}
          animate={{ x: isHovered ? 5 : 0 }}
        >
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Feature pair with improved layout and animations
const FeaturePair: React.FC<{ features: FeatureProps[]; gif: string; reverse: boolean }> = ({ features, gif, reverse }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 py-16 relative`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
      }}
    >
      <motion.div 
        className="w-full lg:w-1/2 relative"
        variants={{
          hidden: { opacity: 0, x: reverse ? 50 : -50 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
      >
        {/* Decorative elements behind the GIF */}
        <div className="absolute inset-4 border-2 border-dashed rounded-2xl border-gray-200 dark:border-gray-700 -z-10 transform rotate-3"></div>
        
        <motion.img
          src={gif}
          alt="Feature GIF"
          className="w-full h-[500px] object-cover rounded-2xl shadow-xl relative z-10"
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          style={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        />
        
        {/* Colored dots animation */}
        <motion.div 
          className="absolute -top-5 -right-5 w-10 h-10 rounded-full"
          style={{ background: features[0].gradientColors.from }}
          animate={{ y: [0, -15, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-5 -left-5 w-6 h-6 rounded-full"
          style={{ background: features[1].gradientColors.to }}
          animate={{ y: [0, 15, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      <div className="w-full lg:w-1/2 grid grid-cols-1 gap-6">
        {features.map((feature, idx) => (
          <motion.div 
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const featurePairs = [
    {
      gif: 'https://github.com/akshayw1/dapple-web/blob/main/src/assets/dapple.gif?raw=true',
      features: [
        { icon: <Brain className="w-full h-full" />, title: 'Personalized Learning', description: 'Tailored learning modules adapt to your unique strengths, challenges, and preferred learning style.', gradientColors: { from: '#6A5AE0', to: '#9E94EB' } },
        { icon: <Users className="w-full h-full" />, title: 'Supportive Community', description: 'Connect with peers, share experiences, and receive support from therapists and other users.', gradientColors: { from: '#FFD166', to: '#FFBD59' } },
      ],
    },
    {
      gif: 'https://github.com/akshayw1/dapple-web/blob/main/src/assets/talkwithexpert1.gif?raw=true',
      features: [
        { icon: <Bot className="w-full h-full" />, title: 'AI-Driven Role-Play', description: 'Practice conversations and social interactions with AI scenarios and receive real-time feedback.', gradientColors: { from: '#00CEC9', to: '#4FD1C5' } },
        { icon: <MessageSquare className="w-full h-full" />, title: 'Virtual Therapy', description: 'Access one-on-one and group therapy sessions with licensed professionals from your device.', gradientColors: { from: '#9E94EB', to: '#F687B3' } },
      ],
    },
    {
      gif: 'https://github.com/akshayw1/dapple-web/blob/main/src/assets/callai.gif?raw=true',
      features: [
        { icon: <CheckSquare className="w-full h-full" />, title: 'Productivity Tools', description: 'Stay organized with Pomodoro timers, visual schedules, and AI-driven focus features.', gradientColors: { from: '#FFD166', to: '#F97316' } },
        { icon: <MessageCircle className="w-full h-full" />, title: 'Communication Aids', description: 'Help Cards and visual communication tools assist non-verbal users in expressing needs effectively.', gradientColors: { from: '#00CEC9', to: '#10B981' } },
      ],
    },
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative bg-gray-50 dark:bg-[#151525] py-20 overflow-hidden">
      {/* Background animations */}
      <AnimatedBackground />
      <FloatingParticles />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.1 
            }}
            viewport={{ once: true }}
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
              Powerful Features
            </span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] bg-clip-text text-transparent">
              Discover Our Features
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore the comprehensive tools designed to support and empower your learning journey.
          </motion.p>
        </motion.div>

        {featurePairs.map((pair, idx) => (
          <FeaturePair key={idx} features={pair.features} gif={pair.gif} reverse={idx % 2 !== 0} />
        ))}

        <motion.div 
          ref={ref}
          className="text-center mt-24 relative"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {/* Background card with glow effect */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-white dark:bg-gray-800/30 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-xl"></div>
          <div className="absolute inset-0 -z-20 rounded-3xl bg-gradient-to-r from-[#6A5AE0]/20 to-[#9E94EB]/20 blur-2xl transform scale-105"></div>
          
          <div className="py-16 px-8">
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              Ready to Transform Your Learning?
            </motion.h3>

            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
              }}
            >
              Join thousands of users who have discovered a more personalized, supportive, and effective learning experience.
            </motion.p>

            <motion.button
              className="relative group bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started Now</span>
              
              {/* Button shine effect */}
              <motion.span 
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: ["100%", "100%", "-100%"], opacity: [0, 0.5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;