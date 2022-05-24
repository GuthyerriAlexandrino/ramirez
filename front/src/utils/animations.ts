import { Variants } from "framer-motion";

export const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};


export function makeFadeInRightAnimation() {

    const fadeIn: Variants = {
        initial: {
            x: 60,
            opacity: 0,
            transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
        }
    }

    return fadeIn;
}

export function makeFadeInUptAnimation() {

    const fadeIn: Variants = {
        initial: {
            y: 60,
            opacity: 0,
            transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
        }
    }

    return fadeIn;
}