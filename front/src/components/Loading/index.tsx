import { motion } from "framer-motion"
import { LoadingArea, LoadingCircle, LoadingContainer } from "./style"

const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  }
  

const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },

    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
}

const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  }
  

export const Loading = () => {
    return (
        <LoadingArea>
            <LoadingContainer
                variants={loadingContainerVariants}
                initial="start"
                animate="end"
            >
                <LoadingCircle
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                <LoadingCircle
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                <LoadingCircle
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
            </LoadingContainer>
        </LoadingArea>
    )
}