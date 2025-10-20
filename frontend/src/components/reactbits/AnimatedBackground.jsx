/**
 * React Bits inspired animated background components
 */

/**
 * Particles background with floating dots
 */
export const ParticlesBackground = ({ 
  particleCount = 30,
  className = '' 
}) => {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-sm"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Grid pattern background
 */
export const GridBackground = ({ 
  size = 40,
  color = 'indigo',
  opacity = 0.1,
  className = '' 
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
};

/**
 * Gradient orbs floating in background
 */
export const GradientOrbs = ({ 
  orbCount = 3,
  className = '' 
}) => {
  const orbs = [
    { 
      gradient: 'from-indigo-500/30 to-purple-500/30',
      position: 'top-0 left-0',
      size: 'w-96 h-96',
      animation: 'blob 7s infinite',
    },
    { 
      gradient: 'from-purple-500/30 to-pink-500/30',
      position: 'top-1/2 right-0',
      size: 'w-96 h-96',
      animation: 'blob 9s infinite 2s',
    },
    { 
      gradient: 'from-pink-500/30 to-indigo-500/30',
      position: 'bottom-0 left-1/3',
      size: 'w-96 h-96',
      animation: 'blob 11s infinite 4s',
    },
  ].slice(0, orbCount);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`absolute ${orb.position} ${orb.size} bg-gradient-to-br ${orb.gradient} rounded-full mix-blend-multiply filter blur-3xl opacity-70`}
          style={{
            animation: orb.animation,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Spotlight effect that follows cursor
 */
export const SpotlightBackground = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 via-purple-900/5 to-pink-900/5" />
    </div>
  );
};

export default ParticlesBackground;
