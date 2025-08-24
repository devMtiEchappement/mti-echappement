'use client';

import React, { useCallback, useEffect, useRef } from 'react';

import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { NextButton, PrevButton, useCarouselButtons } from './carousel-button';
import { CarouselIndicator, useCarouselIndicator } from './carousel-indicator';

const TWEEN_FACTOR_BASE = 0.2;

// EmblaCarousel component avec effet parallax
export const EmblaCarousel: React.FC<{
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  autoplay?: boolean;
  autoplayDelay?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
  enableParallax?: boolean;
  tweenFactorBase?: number;
}> = ({
  slides,
  options,
  autoplay = false,
  autoplayDelay = 5000,
  showIndicators = true,
  showArrows = true,
  className = '',
  enableParallax = true,
  tweenFactorBase = TWEEN_FACTOR_BASE,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoplay
      ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
      : [],
  );

  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useCarouselButtons(emblaApi);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useCarouselIndicator(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__parallax__layer') as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback(
    (emblaApi: EmblaCarouselType) => {
      tweenFactor.current = tweenFactorBase * emblaApi.scrollSnapList().length;
    },
    [tweenFactorBase],
  );

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === 'scroll';

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        // Correction : vérification que slidesInSnap existe
        if (!slidesInSnap) return;

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `translateX(${translate}%)`;
          }
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi || !enableParallax) return;

    const handleReInit = () => {
      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenParallax(emblaApi);
    };

    const handleScroll = () => tweenParallax(emblaApi, 'scroll');
    const handleSlideFocus = () => tweenParallax(emblaApi, 'slideFocus');

    // Configuration initiale
    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    // Ajout des écouteurs
    emblaApi
      .on('reInit', handleReInit)
      .on('scroll', handleScroll)
      .on('slideFocus', handleSlideFocus);

    return () => {
      // Nettoyage
      emblaApi
        .off('reInit', handleReInit)
        .off('scroll', handleScroll)
        .off('slideFocus', handleSlideFocus);
    };
  }, [emblaApi, enableParallax, setTweenNodes, setTweenFactor, tweenParallax]);

  return (
    <div className={`embla relative h-full w-full ${className}`}>
      <div
        className="embla__viewport h-full w-full overflow-hidden"
        ref={emblaRef}
      >
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div
              className="embla__slide relative min-w-0 flex-[0_0_100%]"
              key={index}
            >
              {enableParallax ? (
                <div className="embla__parallax absolute inset-0 overflow-hidden">
                  <div className="embla__parallax__layer absolute inset-0 -left-[5%] h-full w-[110%]">
                    {slide}
                  </div>
                </div>
              ) : (
                <div className="embla__slide__content h-full w-full">
                  {slide}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <PrevButton
            className="absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/90 shadow-lg transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/90 shadow-lg transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center justify-center gap-3">
            {scrollSnaps.map((_, index) => (
              <CarouselIndicator
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={
                  'h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ' +
                  (index === selectedIndex
                    ? 'scale-125 bg-white'
                    : 'bg-white/60 hover:bg-white/80')
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
