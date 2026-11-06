import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'wine';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showTagline = true,
  className = '',
}) => {
  // Dimension scales
  const scales = {
    sm: { height: 38, monogramSize: 32, textScale: 'text-xs', subtext: 'text-[9px]' },
    md: { height: 48, monogramSize: 42, textScale: 'text-sm', subtext: 'text-[10px]' },
    lg: { height: 64, monogramSize: 56, textScale: 'text-base tracking-[0.25em]', subtext: 'text-xs' },
    xl: { height: 96, monogramSize: 84, textScale: 'text-xl tracking-[0.3em]', subtext: 'text-sm' },
  };

  const current = scales[size];

  const primaryColor = variant === 'light' ? '#FFFFFF' : variant === 'wine' ? '#7E2433' : '#1E1E1E';
  const accentColor = variant === 'light' ? '#F4C6C3' : '#7E2433';
  const subtextColor = variant === 'light' ? 'rgba(255,255,255,0.75)' : '#6B5E51';

  return (
    <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
      {/* Script top accent: Glow Naturally */}
      {showTagline && (
        <span
          className="font-script leading-none mb-0.5 tracking-wide"
          style={{
            color: accentColor,
            fontSize: size === 'xl' ? '24px' : size === 'lg' ? '20px' : size === 'md' ? '16px' : '14px',
          }}
        >
          Glow Naturally
        </span>
      )}

      {/* Center Monogram: Handcrafted SVG intertwined 'S' and 'N' with delicate botanical pink blossom */}
      <div className="relative flex items-center justify-center">
        <svg
          width={current.monogramSize}
          height={current.monogramSize * 0.9}
          viewBox="0 0 100 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Subtle Watercolor Blossom behind letters */}
          <g transform="translate(48, 42) scale(0.95)">
            {/* 5 Petals of soft watercolor flower */}
            <path
              d="M0,0 C-10,-24 10,-24 0,0"
              fill="#F4C6C3"
              fillOpacity="0.75"
              transform="rotate(0)"
            />
            <path
              d="M0,0 C-10,-24 10,-24 0,0"
              fill="#EFA9A5"
              fillOpacity="0.8"
              transform="rotate(72)"
            />
            <path
              d="M0,0 C-10,-24 10,-24 0,0"
              fill="#F4C6C3"
              fillOpacity="0.75"
              transform="rotate(144)"
            />
            <path
              d="M0,0 C-10,-24 10,-24 0,0"
              fill="#EFA9A5"
              fillOpacity="0.8"
              transform="rotate(216)"
            />
            <path
              d="M0,0 C-10,-24 10,-24 0,0"
              fill="#F4C6C3"
              fillOpacity="0.75"
              transform="rotate(288)"
            />
            {/* Center pistil dot */}
            <circle cx="0" cy="0" r="3" fill="#C8872E" />
            <circle cx="-1" cy="-1" r="1.2" fill="#7E2433" />
          </g>

          {/* Letter S - Classical Luxury Calligraphic Serif */}
          <path
            d="M 44 26 C 42 16 30 14 24 20 C 18 26 22 36 34 40 C 47 44 50 54 44 64 C 38 74 22 73 16 64 C 13 60 14 58 17 58 C 19 58 21 61 24 64 C 29 67 36 67 40 61 C 44 55 42 47 30 43 C 18 39 12 30 19 20 C 26 10 40 10 47 19 C 48 20 46 25 44 26 Z"
            fill={primaryColor}
          />

          {/* Letter N - Regal Serif Stroke intertwined */}
          <path
            d="M 52 20 L 52 68 L 57 68 L 57 36 L 79 68 L 86 68 L 86 20 L 80 20 L 80 52 L 59 20 Z"
            fill={primaryColor}
          />

          {/* Elegant Serif Finials */}
          <path d="M 49 20 L 56 20" stroke={primaryColor} strokeWidth="1.8" strokeLinecap="square" />
          <path d="M 49 68 L 56 68" stroke={primaryColor} strokeWidth="1.8" strokeLinecap="square" />
          <path d="M 80 20 L 88 20" stroke={primaryColor} strokeWidth="1.8" strokeLinecap="square" />
          <path d="M 80 68 L 88 68" stroke={primaryColor} strokeWidth="1.8" strokeLinecap="square" />
        </svg>
      </div>

      {/* Wordmark: ALANKARANA */}
      <div
        className="font-cinzel tracking-[0.26em] uppercase font-semibold mt-0.5 leading-tight"
        style={{
          color: primaryColor,
          fontSize: size === 'xl' ? '24px' : size === 'lg' ? '18px' : size === 'md' ? '14px' : '12px',
        }}
      >
        ALANKARANA
      </div>

      {/* Subtext: Herbal Hair & Skin Care with subtle divider lines */}
      <div className="flex items-center gap-2 mt-0.5">
        <span
          className="h-[1px] w-4 md:w-6 transition-all"
          style={{ backgroundColor: accentColor, opacity: 0.55 }}
        />
        <span
          className="font-sans font-light tracking-[0.16em] uppercase whitespace-nowrap"
          style={{
            color: subtextColor,
            fontSize: size === 'xl' ? '12px' : size === 'lg' ? '10px' : '8.5px',
          }}
        >
          Herbal Hair & Skin Care
        </span>
        <span
          className="h-[1px] w-4 md:w-6 transition-all"
          style={{ backgroundColor: accentColor, opacity: 0.55 }}
        />
      </div>
    </div>
  );
};
