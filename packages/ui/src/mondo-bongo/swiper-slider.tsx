"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";
import { cn } from "../lib/utils";
import type { SwiperRef } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperSettings {
    autoplay?: {
        delay: number;
        disableOnInteraction?: boolean;
    };
    className?: string;
    speed?: number;
    watchSlidesProgress?: boolean;
    parallax?: boolean;
    loop?: boolean;
    slidesPerView?: number;
    navigation?: {
        nextEl: string;
        prevEl: string;
    } | boolean;
    pagination?: {
        clickable?: boolean;
        dynamicBullets?: boolean;
    } | boolean;
    observer?: boolean;
    observeParents?: boolean;
    watchOverflow?: boolean;
}

type SwiperSliderProps = {
    children: React.ReactNode;
    sliderCName?: string;
    settings?: SwiperSettings;
};

function SwiperSlider({ children, sliderCName, settings }: SwiperSliderProps) {
    const swiperRef = useRef<SwiperRef>(null);
    const [isClient, setIsClient] = useState(false);
    const [swiper, setSwiper] = useState<any>(null);

    // S'assurer que nous sommes côté client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Forcer la mise à jour après le montage
    useEffect(() => {
        if (isClient && swiper) {
            const timer = setTimeout(() => {
                swiper.update();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [isClient, swiper]);

    const sliderOptions: SwiperSettings = {
        // Options par défaut pour éviter les problèmes
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        watchOverflow: true,
        ...settings,
    };

    // Ne pas rendre côté serveur
    if (!isClient) {
        return (
            <div className={cn(sliderCName, "swiperSlider h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center")}>
                <div className="text-gray-400">Chargement du slider...</div>
            </div>
        );
    }

    return (
        <Swiper
            ref={swiperRef}
            modules={[Pagination, Parallax, Autoplay, Navigation]}
            className={cn(sliderCName && sliderCName, "swiperSlider")}
            onSwiper={setSwiper}
            {...sliderOptions}
        >
            {children}

            {/* Navigation uniquement si configurée */}
            {settings?.navigation && (
                <div className="absolute bottom-0 left-1/2 z-50 -translate-x-1/2">
                    <div className="flex items-center justify-center">
                        <div className="custom-swiper-button-next flex h-20 w-20 cursor-pointer items-center justify-center bg-background text-lg font-bold text-foreground after:absolute after:right-1/2 after:h-1/3 after:w-px after:bg-border after:content-['']">
                            ←
                        </div>
                        <div className="custom-swiper-button-prev flex h-20 w-20 cursor-pointer items-center justify-center bg-background text-lg font-bold text-foreground">
                            →
                        </div>
                    </div>
                </div>
            )}
        </Swiper>
    );
}

export { SwiperSlide as Slide, SwiperSlider };