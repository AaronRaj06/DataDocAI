import { useState } from 'react';

/**
 * React Bits inspired button with magnetic hover effect
 */
export const MagneticButton = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  ...props 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (disabled || !e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ 
      x: x * 0.3, 
      y: y * 0.3 
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={`relative transition-all duration-200 ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      {...props}
    >
      {isHovering && !disabled && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 blur-md animate-pulse" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

/**
 * Shimmer effect button
 */
export const ShimmerButton = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

/**
 * Ripple effect button
 */
export const RippleButton = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (disabled || !e.currentTarget) return;
    
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = {
        x,
        y,
        id: Date.now(),
      };
      
      setRipples([...ripples, newRipple]);
      
      setTimeout(() => {
        setRipples(ripples => ripples.filter(r => r.id !== newRipple.id));
      }, 600);
      
      if (onClick) onClick(e);
    } catch (error) {
      console.error('Ripple effect error:', error);
      if (onClick) onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '0px',
            height: '0px',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s ease-out',
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default MagneticButton;
