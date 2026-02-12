'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

interface ImageWithFallbackProps extends Readonly<
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>
> {
  readonly src: string;
  readonly alt: string;
  /** 우선 로딩 여부 (LCP 이미지에 사용, useNextImage=true일 때만 적용) */
  readonly priority?: boolean;
  /** 이미지 크기 (useNextImage=true일 때 필수) */
  readonly width?: number;
  readonly height?: number;
  /** fill 모드 사용 여부 (useNextImage=true일 때 적용) */
  readonly fill?: boolean;
  /** 스켈레톤 표시 여부 (기본값: false) */
  readonly showSkeleton?: boolean;
}

/**
 * 폴백 기능이 있는 이미지 컴포넌트
 * - useNextImage=true: Next.js Image 컴포넌트 사용 (최적화, priority 등)
 * - useNextImage=false: 일반 HTML img 태그 사용
 * - showSkeleton=true: 로딩 중 스켈레톤 UI 표시
 */
export function ImageWithFallback(props: Readonly<ImageWithFallbackProps>) {
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setDidError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const {
    src,
    alt,
    style,
    className,
    priority = false,
    width,
    height,
    fill = false,
    showSkeleton = false,
    ...rest
  } = props;

  // 에러 상태일 때
  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ERROR_IMG_SRC}
            alt="로딩 실패"
            {...rest}
            data-original-url={src}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* 스켈레톤 로딩 */}
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full" />
      )}

      {/* 이미지 */}
      <Image
        src={src}
        alt={alt}
        className={`${className} ${isLoading && showSkeleton ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        style={style}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
        {...(fill
          ? { fill: true }
          : { width: width || 500, height: height || 500 })}
        {...rest}
      />
    </div>
  );
}
