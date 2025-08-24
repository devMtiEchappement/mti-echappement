'use client';
import { ReactNode, useRef, useState, createContext, useContext } from 'react';
import {
    motion,
    useInView,
    useReducedMotion,
    Variant,
    Transition,
    UseInViewOptions,
} from 'motion/react';

// Context pour gérer le stagger
const InViewStaggerContext = createContext<boolean>(false);

export type InViewProps = {
    children: ReactNode;
    variants?: {
        hidden: Variant;
        visible: Variant;
    };
    transition?: Transition;
    viewOptions?: UseInViewOptions;
    as?: React.ElementType;
    once?: boolean;
    className?: string;
};

export type InViewStaggerProps = {
    children: ReactNode;
    staggerChildren?: number;
    delayChildren?: number;
    transition?: Transition;
    viewOptions?: UseInViewOptions;
    as?: React.ElementType;
    once?: boolean;
    className?: string;
    faster?: boolean; // Compatibilité avec FadeInStagger
};

const defaultVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

const defaultViewport: UseInViewOptions = {
    once: true,
    margin: "0px 0px -50px"
};

export function InView({
                           children,
                           variants = defaultVariants,
                           transition,
                           viewOptions,
                           as = 'div',
                           once = true,
                           className,
                           ...props
                       }: InViewProps) {
    const ref = useRef(null);
    const shouldReduceMotion = useReducedMotion();
    const isInStaggerGroup = useContext(InViewStaggerContext);

    const isInView = useInView(ref, {
        ...defaultViewport,
        ...viewOptions
    });

    const [hasAnimated, setHasAnimated] = useState(false);

    const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

    // Adaptation des variants si reduce motion est activé
    const adaptedVariants = shouldReduceMotion ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    } : variants;

    const shouldAnimate = once ? (isInView && !hasAnimated) : isInView;

    return (
        <MotionComponent
            ref={ref}
            variants={adaptedVariants}
            transition={transition}
            className={className}
            {...(isInStaggerGroup
                ? {} // Dans un groupe stagger, le parent gère l'animation
                : {
                    initial: "hidden",
                    animate: shouldAnimate ? "visible" : "hidden",
                    onAnimationComplete: (definition) => {
                        if (once && definition === "visible") {
                            setHasAnimated(true);
                        }
                    }
                })}
            {...props}
        >
            {children}
        </MotionComponent>
    );
}

export function InViewStagger({
                                  children,
                                  staggerChildren,
                                  delayChildren = 0,
                                  transition,
                                  viewOptions,
                                  as = 'div',
                                  once = true,
                                  className,
                                  faster = false, // Compatibilité FadeInStagger
                                  ...props
                              }: InViewStaggerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        ...defaultViewport,
        ...viewOptions
    });

    const [hasAnimated, setHasAnimated] = useState(false);

    const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

    const shouldAnimate = once ? (isInView && !hasAnimated) : isInView;

    // Calcul du stagger basé sur faster ou valeur personnalisée
    const finalStaggerChildren = staggerChildren ?? (faster ? 0.12 : 0.2);

    const staggerTransition: Transition = {
        staggerChildren: finalStaggerChildren,
        delayChildren,
        ...transition
    };

    return (
        <InViewStaggerContext.Provider value={true}>
            <MotionComponent
                ref={ref}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                transition={staggerTransition}
                onAnimationComplete={(definition) => {
                    if (once && definition === "visible") {
                        setHasAnimated(true);
                    }
                }}
                className={className}
                {...props}
            >
                {children}
            </MotionComponent>
        </InViewStaggerContext.Provider>
    );
}