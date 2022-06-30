import { motion } from "framer-motion";
import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const LoadingArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 6rem;
`

export const LoadingContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 15rem;
    height: 2rem;
`

export const LoadingCircle = styled(motion.span)`
    display: block;
    width: 2rem;
    height: 2rem;
    background-color: ${pallete.whiteOne};
    border-radius: 2rem;
`