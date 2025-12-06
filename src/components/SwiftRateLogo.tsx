interface SwiftRateLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
}

export function SwiftRateLogo({ className = '', size = 'md', variant = 'full' }: SwiftRateLogoProps) {
  const sizes = {
    sm: { height: 32, fontSize: 'text-xl' },
    md: { height: 40, fontSize: 'text-2xl' },
    lg: { height: 56, fontSize: 'text-4xl' },
    xl: { height: 80, fontSize: 'text-6xl' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative">
        <svg
          width={currentSize.height}
          height={currentSize.height}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow circle */}
          <circle cx="40" cy="40" r="38" fill="url(#glow)" opacity="0.3" />
          
          {/* Main circle background */}
          <circle cx="40" cy="40" r="35" fill="url(#gradient)" />
          
          {/* Arrow symbol (Swift motion) */}
          <path
            d="M25 45 L35 35 L25 25"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M35 45 L50 30"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Exchange arrows */}
          <path
            d="M48 48 L55 48 M55 48 L52 45 M55 48 L52 51"
            stroke="#60A5FA"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 32 L25 32 M25 32 L28 29 M25 32 L28 35"
            stroke="#60A5FA"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Text */}
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent ${currentSize.fontSize}`}>
            Swift<span className="text-primary">Rate</span>
          </span>
        </div>
      )}
    </div>
  );
}
