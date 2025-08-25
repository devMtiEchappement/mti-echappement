import React from 'react';

import Image from 'next/image';

import { EmblaCarousel } from '@kit/ui/embla-carousel';
import { cn } from '@kit/ui/utils';

export interface HeroImage {
  src: string;
  alt: string;
  title?: string;
  theme?: 'light' | 'dark';
}

interface HeroProps {
  pill?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  cta?: React.ReactNode;
  images?: HeroImage[];
  className?: string;
  animate?: boolean;
}

export function Hero({ title, subtitle, cta, images, className }: HeroProps) {
  return (
    <>
      <div className="relative h-[70vh] w-full">
        {/* Section logo */}
        <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          {/* Section logo */}
          <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
            <div className="relative h-40 w-80 md:h-56 md:w-[28rem] lg:h-72 lg:w-[36rem]">
              <Image
                fill
                src={'/images/mti.png'}
                alt={'logo MTI Échappement'}
                sizes="(max-width: 768px) 448px, (max-width: 1200px) 576px, 320px"
                priority={true}
                className="object-contain"
              />
            </div>
          </div>

        </div>

        {/* Section slider fullscreen */}
        {images && images.length > 0 && (
          <EmblaCarousel
            slides={images.map((item, index) => (
              <div
                key={`hero-slide-${index}`}
                className="relative h-full w-full overflow-hidden"
              >
                <Image
                  fill
                  src={item.src}
                  alt={item.alt}
                  className="object-cover object-center"
                  priority={index === 0}
                />
                {item.title && (
                  <div
                    className={cn(
                      'absolute bottom-24 left-0 z-10 w-full text-center',
                      item.theme === 'light' ? 'text-black' : 'text-white',
                    )}
                  >
                    <h3 className="text-xl">{item.title}</h3>
                  </div>
                )}
              </div>
            ))}
            options={{
              align: 'center',
              loop: false,
              skipSnaps: true,
              inViewThreshold: 0.7,
            }}
            autoplay={true}
            autoplayDelay={5000}
            showArrows={true}
            showIndicators={true}
            enableParallax={true}
            tweenFactorBase={0.2}
          />
        )}
      </div>

      {/* Section contenu textuel */}
      <div className={cn('bg-mti-foreground w-full py-16', className)}>
        <div className="container flex flex-col items-center text-center">
          {title && (
            <h1 className="text-mti-background max-w-3xl py-4 text-4xl font-bold tracking-tight uppercase">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="text-muted-foreground max-w-6xl py-2 text-lg uppercase">
              {subtitle}
            </p>
          )}

          {cta && <div className="flex justify-center">{cta}</div>}
        </div>
      </div>
    </>
  );
}
