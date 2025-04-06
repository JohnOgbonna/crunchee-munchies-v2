export const delayedFadeInAnimationVariants = {
    initial: {
        opacity: 0,
        y: 100,
    },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: .3 + (0.05 * index),
            duration: .7,
            type: "spring",
            stiffness: 90
        }
    })
}


