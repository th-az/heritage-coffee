'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Coffee } from 'lucide-react';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK =
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80';

export default function SafeImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className,
  fill,
  width,
  height,
  ...rest
}: SafeImageProps) {
  const [errorCount, setErrorCount] = useState(0);

  // If both src and fallbackSrc fail, render a stylish luxury placeholder
  if (errorCount >= 2) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-coffee-dark via-coffee to-stone-900 text-cream-100 p-4 ${
          fill ? 'absolute inset-0 w-full h-full' : ''
        } ${className || ''}`}
        style={!fill && width && height ? { width, height } : undefined}
      >
        <Coffee className="w-8 h-8 text-amberGold mb-1 opacity-80" />
        <span className="font-serif text-[11px] font-semibold tracking-wider text-amber-100 uppercase text-center truncate max-w-[90%]">
          {alt || 'Heritage Coffee'}
        </span>
      </div>
    );
  }

  const currentSrc = errorCount === 0 ? src : fallbackSrc;

  return (
    <Image
      src={currentSrc}
      alt={alt || 'Heritage Coffee & Roastery'}
      className={className}
      fill={fill}
      width={width}
      height={height}
      onError={() => setErrorCount((prev) => prev + 1)}
      {...rest}
    />
  );
}