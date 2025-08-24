"use client";

import React from "react";

// Type pour définir une feature avec des nœuds React
type FeatureItem = {
    id: string | number;
    content: React.ReactNode;
    imageSrc: string;
    direction: "ltr" | "rtl";
    topPosition?: string;
};

interface FeatureScrollProps {
    direction: "ltr" | "rtl";
    imageSrc: string;
    children: React.ReactNode;
    topPosition?: string;
}

const DefaultFeature = () => (
    <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0 items-center justify-center lg:items-start lg:justify-start text-center lg:text-left">
        <h1 className="text-4xl font-bold">Scroll Feature</h1>
        <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptates, quibusdam.
        </p>
        <div className="flex gap-4">
            <button className="bg-neutral-100 text-black px-4 py-2 rounded-md">
                Learn More
            </button>
            <button className="bg-neutral-800 text-white px-4 py-2 rounded-md">
                Learn More
            </button>
        </div>
    </div>
);



const FeatureScrollContainer: React.FC<FeatureScrollProps> = ({
                                                                  direction,
                                                                  children,
                                                                  imageSrc,
                                                                  topPosition = "50%",
                                                              }) => {
    const isLTR = direction === "ltr";

    return (
        <div className="w-full">
            <div className="lg:hidden flex flex-col gap-y-10">
                <img
                    src={imageSrc}
                    alt="Scrolling"
                    className={`w-full max-w-[300px] mx-auto mb-4 ${isLTR ? "order-1" : "order-2"}`}
                />
                <div className={isLTR ? "order-2" : "order-1"}>{children}</div>
            </div>
            <div className="hidden lg:grid lg:grid-cols-2 h-fit w-full justify-center items-start relative">
                <div
                    className="sticky flex justify-center items-center"
                    style={{ top: topPosition }}
                >
                    {children}
                </div>
                <div
                    className={`flex items-center justify-center h-fit ${isLTR ? "" : "row-start-1"}`}
                >
                    <img
                        src={imageSrc}
                        alt="Scrolling"
                        className="w-full max-w-[300px]"
                    />
                </div>
            </div>
        </div>
    );
};
// Export des composants et types pour utilisation externe
export { FeatureScrollContainer, DefaultFeature, type FeatureItem };

// Demo
const demoData: FeatureItem[] = [
    {
        id: 1,
        direction: "rtl",
        imageSrc: "https://cdn.magicui.design/iphone.png",
        topPosition: "10%",
        content: <DefaultFeature />,
    },
    {
        id: 2,
        direction: "ltr",
        imageSrc: "https://cdn.magicui.design/iphone.png",
        topPosition: "10%",
        content: <DefaultFeature />,
    },
];

export function FeatureScrollDemo({ features = demoData }: { features?: FeatureItem[] }) {
    return (
        <section>
            <div className="h-[50vh] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <h3 className="text-4xl font-bold">Hero Section</h3>
            </div>
            <div className="flex flex-col gap-20 container p-10">
                {features.map((feature) => (
                    <FeatureScrollContainer
                        key={feature.id}
                        topPosition={feature.topPosition}
                        direction={feature.direction}
                        imageSrc={feature.imageSrc}
                    >
                        {feature.content}
                    </FeatureScrollContainer>
                ))}
            </div>
            <div className="h-[50vh] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <h3 className="text-4xl font-bold">Footer Section</h3>
            </div>
        </section>
    );
}

