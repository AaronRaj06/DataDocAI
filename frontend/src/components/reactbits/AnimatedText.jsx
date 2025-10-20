import { useEffect, useState } from 'react';

/**
 * React Bits inspired animated text component
 * Provides character-by-character fade-in animation
 */
export const AnimatedText = ({ 
  text = '', 
  className = '', 
  delay = 0.05,
  duration = 0.3 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Safety check
  if (!text || typeof text !== 'string') {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
            transitionDelay: `${index * delay}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

/**
 * Gradient text with typing animation effect
 */
export const GradientTypingText = ({ 
  text = '', 
  className = '',
  gradient = 'from-indigo-600 via-purple-600 to-pink-600'
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (text && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

/**
 * Blur fade-in animation for text
 */
export const BlurFadeText = ({ 
  text = '', 
  className = '',
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  // Safety check
  if (!text || typeof text !== 'string') {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out, filter 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {text}
    </span>
  );
};

export default AnimatedText;
