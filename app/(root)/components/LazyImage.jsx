'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  style = {},
  fill = false,
  sizes = '100vw',
  placeholder = 'blur',
  blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQviwAAAABJRU5ErkJggg==',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Load images 200px before they come into view
  });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        height: fill ? '100%' : height ? `${height}px` : 'auto',
        width: fill ? '100%' : width ? `${width}px` : 'auto',
      }}
    >
      {inView && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          quality={quality}
          fill={fill}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
      {!isLoaded && inView && (
        <div
          className="absolute inset-0 animate-pulse bg-gray-200"
          style={{ borderRadius: style.borderRadius }}
        />
      )}
      {!inView && (
        <div
          className="absolute inset-0 bg-gray-200"
          style={{ borderRadius: style.borderRadius }}
        />
      )}
    </div>
  );
};

export default LazyImage;
