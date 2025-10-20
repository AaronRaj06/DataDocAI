/**
 * React Bits inspired loading animations
 */

/**
 * Bouncing dots loader
 */
export const BouncingDots = ({ 
  color = 'indigo',
  size = 'md',
  className = '' 
}) => {
  const sizeMap = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const colorMap = {
    indigo: 'bg-indigo-600',
    purple: 'bg-purple-600',
    pink: 'bg-pink-600',
  };

  return (
    <div className={`flex gap-1.5 items-center ${className}`}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className={`${sizeMap[size]} ${colorMap[color]} rounded-full animate-bounce`}
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Pulse ring loader
 */
export const PulseRing = ({ 
  color = 'indigo',
  size = 'md',
  className = '' 
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      <span className={`absolute inset-0 rounded-full bg-gradient-to-br from-${color}-500 to-purple-500 opacity-75 animate-ping`} />
      <span className={`absolute inset-0 rounded-full bg-gradient-to-br from-${color}-600 to-purple-600`} />
    </div>
  );
};

/**
 * Spinner with gradient
 */
export const GradientSpinner = ({ 
  size = 'md',
  className = '' 
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <div className="w-full h-full rounded-full border-4 border-gray-200">
        <div className="w-full h-full rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600 animate-spin" />
      </div>
    </div>
  );
};

/**
 * Skeleton loader with shimmer effect
 */
export const SkeletonLoader = ({ 
  className = '',
  lines = 3,
  avatar = false 
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {avatar && (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/3 animate-shimmer" 
              style={{ backgroundSize: '200% 100%' }} 
            />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer"
          style={{
            width: `${Math.random() * 40 + 60}%`,
            backgroundSize: '200% 100%',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Progress bar with gradient
 */
export const GradientProgress = ({ 
  progress = 0,
  className = '' 
}) => {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>
    </div>
  );
};

export default BouncingDots;
