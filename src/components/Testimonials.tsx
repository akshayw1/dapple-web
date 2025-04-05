import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  initialLetter: string;
  delay: number;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  textColor?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  name, 
  role, 
  initialLetter, 
  delay,
  gradientFrom,
  gradientTo,
  shadowColor,
  textColor = "text-white"
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-xl shadow-md p-8 border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
    >
      <span className="absolute top-4 left-6 text-8xl text-purple-100 font-serif leading-none">"</span>
      <p className="text-gray-700 mb-8 italic relative z-10">{quote}</p>
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${gradientFrom} to-${gradientTo} flex items-center justify-center ${textColor} font-bold text-lg mr-4 shadow-lg shadow-${shadowColor}`}>
          {initialLetter}
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      quote: "Since my son started using Dapple, his confidence in social situations has grown tremendously. The role-playing scenarios have helped him practice conversations in a safe environment.",
      name: "Alex P.",
      role: "Parent",
      initialLetter: "A",
      gradientFrom: "purple-600",
      gradientTo: "indigo-600",
      shadowColor: "purple-200",
      textColor: "text-white"
    },
    {
      quote: "The visual schedules and Help Cards have been game-changers for me. I can now communicate my needs even when I'm feeling overwhelmed, and the community is so supportive.",
      name: "Jamie L.",
      role: "User, 17",
      initialLetter: "J",
      gradientFrom: "yellow-400",
      gradientTo: "yellow-300",
      shadowColor: "yellow-200",
      textColor: "text-purple-900"
    },
    {
      quote: "I recommend Dapple to many of my clients as a supplementary tool. The AI-driven approach combined with professional oversight creates consistent practice opportunities.",
      name: "Dr. Morgan T.",
      role: "Speech Therapist",
      initialLetter: "M",
      gradientFrom: "teal-500",
      gradientTo: "teal-400",
      shadowColor: "teal-200",
      textColor: "text-white"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl -z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={ref}
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">Success Stories</h2>
          <p className="text-lg text-gray-600">
            Hear from our community about how Dapple has transformed their lives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              initialLetter={testimonial.initialLetter}
              delay={index * 0.1}
              gradientFrom={testimonial.gradientFrom}
              gradientTo={testimonial.gradientTo}
              shadowColor={testimonial.shadowColor}
              textColor={testimonial.textColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;