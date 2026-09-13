import React from 'react';

interface TvkLogoProps {
  size?: number;
  className?: string;
  alt?: string;
  variant?: 'badge' | 'flag' | 'leader-emblem';
  style?: React.CSSProperties;
}

export default function TvkLogo({
  size = 52,
  className = '',
  alt = 'Tamilaga Vettri Kazhagam (TVK) Official Logo',
  variant = 'badge',
  style = {},
}: TvkLogoProps) {
  let src = '/assets/images/tvk/tvk-logo.png';
  let aspectRatio = '1 / 1';

  if (variant === 'flag') {
    src = '/assets/images/tvk/tvk-flag.png';
    aspectRatio = '3 / 2';
  } else if (variant === 'leader-emblem') {
    src = '/assets/images/tvk/tvk-leader-emblem.png';
    aspectRatio = '1 / 1';
  }

  return (
    <img
      src={src}
      alt={alt}
      width={variant === 'flag' ? Math.round(size * 1.5) : size}
      height={size}
      className={`tvk-official-logo tvk-${variant} ${className}`}
      style={{
        width: variant === 'flag' ? `${Math.round(size * 1.5)}px` : `${size}px`,
        height: `${size}px`,
        aspectRatio,
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
