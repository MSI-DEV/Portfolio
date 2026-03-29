'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import personalInfo from '@/data/personal-info.json';

interface ProfileImageProps {
  size: 'small' | 'large';
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ size, className = '' }) => {
  const sizeClasses = {
    small: 'w-32 h-32 md:w-48 md:h-48',
    large: 'w-72 h-72 lg:w-80 lg:h-80',
  };

  const imageSources = useMemo(() => {
    const primary = personalInfo.personal.profileImage;
    const fallbacks = ['/owais-profile2.png', '/owais-profile2.png', '/placeholder.svg'];
    return [primary, ...fallbacks.filter((url) => url !== primary)];
  }, []);

  const [sourceIndex, setSourceIndex] = useState(0);
  const src = imageSources[sourceIndex] ?? imageSources[0];

  const handleError = useCallback(() => {
    setSourceIndex((i) => Math.min(i + 1, imageSources.length - 1));
  }, [imageSources.length]);

  const sizes =
    size === 'small'
      ? '(max-width: 768px) 8rem, 12rem'
      : '(max-width: 1024px) 18rem, 20rem';

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full bg-slate-700 overflow-hidden glass-card p-0.5`}
      >
        <div className="relative h-full w-full min-h-0 min-w-0 overflow-hidden rounded-full">
          <Image
            src={src}
            alt="Murayama genji - Full-Stack Developer & AI/ML Engineer"
            fill
            sizes={sizes}
            className="object-cover object-center"
            priority
            onError={handleError}
          />
        </div>
      </div>
      <div className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-spin animate-duration-8000" />
      <div className="absolute -inset-8 rounded-full border border-accent/10 animate-spin animate-duration-12000 animate-reverse" />
    </div>
  );
};

export default ProfileImage;
