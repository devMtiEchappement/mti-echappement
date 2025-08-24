"use client";

import Image from "next/image";
import { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "../lib/utils";

type ImageParallaxProps = {
    image: any | null | undefined;
    i: number;
    aspectRatioClass?: string;
    marginOddClass?: string;
    marginEvenClass?: string;
    showAltAsLegend?: boolean;
};
function ImageParallax({
                           image,
                           i,
                           aspectRatioClass = "aspect-square",
                           marginOddClass = "",
                           marginEvenClass = "",
                           showAltAsLegend = false,
                       }: ImageParallaxProps) {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
    const position = i + 1;

    return (
        <div
            className={cn(
                "relative",
                i % 2 !== 0 && marginOddClass !== "" ? marginOddClass : marginEvenClass,
            )}
        >
            {showAltAsLegend && image?.alt && (
                <div className={"absolute bottom-0 z-10 w-full"}>
          <span className={"bg-background p-4  text-muted-foreground"}>
            {image.alt}
          </span>
                </div>
            )}
            <div
                ref={targetRef}
                className={cn(aspectRatioClass, "relative overflow-hidden")}
            >
                <motion.div
                    style={{ y }}
                    className={"relative h-[120%] overflow-hidden bg-primary"}
                >
                    <Image
                        fill
                        className="relative h-full w-full object-cover object-center"
                        src={image?.src}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt={""}
                    />

                    <div className="to-neutral-950/00 absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/20"></div>

                    {/*<div className="absolute inset-0 z-10 bg-light/20"></div>
                    <div className="to-neutral-950/00 absolute inset-0 z-20 bg-gradient-to-t from-neutral-950/60"></div>*/}
                </motion.div>
            </div>
        </div>
    );
}

export { ImageParallax };
