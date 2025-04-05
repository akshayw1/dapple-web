import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Users, Bot, MessageSquare, CheckSquare, MessageCircle } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientColors: {
    from: string;
    to: string;
  };
}

const FeaturePair: React.FC<{ features: FeatureProps[]; gif: string; reverse: boolean }> = ({ features, gif, reverse }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-10 py-16`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={gif}
        alt="Feature GIF"
        className="w-full md:w-1/2 h-[500px] object-cover rounded-2xl shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      <div className="md:w-1/2 grid gap-4">
        {features.map((feature, idx) => (
          <div key={idx} className="space-y-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${feature.gradientColors.from}, ${feature.gradientColors.to})`,
                boxShadow: `0 10px 25px ${feature.gradientColors.from}40`,
              }}
            >
              <div className="w-8 h-8 text-white">{feature.icon}</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const featurePairs = [
    {
      gif: 'src/assets/dapple.gif',
      features: [
        { icon: <Brain className="w-full h-full" />, title: 'Personalized Learning', description: 'Tailored learning modules adapt to your unique strengths, challenges, and preferred learning style.', gradientColors: { from: '#6A5AE0', to: '#9E94EB' } },
        { icon: <Users className="w-full h-full" />, title: 'Supportive Community', description: 'Connect with peers, share experiences, and receive support from therapists and other users.', gradientColors: { from: '#FFD166', to: '#FFBD59' } },
      ],
    },
    {
      gif: 'src/assets/talkwithexpert1.gif',
      features: [
        { icon: <Bot className="w-full h-full" />, title: 'AI-Driven Role-Play', description: 'Practice conversations and social interactions with AI scenarios and receive real-time feedback.', gradientColors: { from: '#00CEC9', to: '#4FD1C5' } },
        { icon: <MessageSquare className="w-full h-full" />, title: 'Virtual Therapy', description: 'Access one-on-one and group therapy sessions with licensed professionals from your device.', gradientColors: { from: '#9E94EB', to: '#F687B3' } },
      ],
    },
    {
      gif: 'src/assets/callai.gif',
      features: [
        { icon: <CheckSquare className="w-full h-full" />, title: 'Productivity Tools', description: 'Stay organized with Pomodoro timers, visual schedules, and AI-driven focus features.', gradientColors: { from: '#FFD166', to: '#F97316' } },
        { icon: <MessageCircle className="w-full h-full" />, title: 'Communication Aids', description: 'Help Cards and visual communication tools assist non-verbal users in expressing needs effectively.', gradientColors: { from: '#00CEC9', to: '#10B981' } },
      ],
    },
  ];

  return (
    <section className="bg-white dark:bg-[#151525] py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            className="text-4xl font-bold bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Our Features
          </motion.h2>

          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore the comprehensive tools designed to support and empower your learning journey.
          </p>
        </div>

        {featurePairs.map((pair, idx) => (
          <FeaturePair key={idx} features={pair.features} gif={pair.gif} reverse={idx % 2 !== 0} />
        ))}

        <div className="text-center mt-20">
          <motion.h3
            className="text-3xl font-bold text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Learning?
          </motion.h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of users who have discovered a more personalized, supportive, and effective learning experience.
          </p>

          <motion.button
            className="bg-gradient-to-r from-[#6A5AE0] to-[#9E94EB] text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Features;