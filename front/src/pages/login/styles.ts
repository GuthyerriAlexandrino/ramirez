import { motion } from "framer-motion";
import styled from "styled-components";
import { pallete } from "../../styles/colors";

interface ExternaltLinkProps {
    align: string;
    isBold: boolean;
}

export const Container = styled(motion.section)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: ${pallete.blackOne};

    @media screen and (max-width: 1145px) {
        display: grid;
        place-items: center;
    }
`

export const LogInAside = styled(motion.aside)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-right: 3.375rem;

    h1 {
        font-weight: 600;
        font-size: 3.375rem;
        line-height: 4rem;
        max-width: 500px;
        width: 100%;
        color: ${pallete.whiteOne};
    }

    @media screen and (max-width: 1145px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 0rem;


        h1 {
            text-align: center;
            font-size: 1rem;
            line-height: 1.5rem;
            margin-top: 2rem;
            width: 98%;

        }
    }
`

export const ExternaltLink = styled.a<ExternaltLinkProps>`
    font-size: 0.875rem;
    text-align: ${props => props.align};
    text-decoration: none;
    color: ${props => props.isBold ? pallete.turquoiseOne : pallete.whiteOne };
    cursor: pointer;
`

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    margin: 1rem 0;;
    background-color: ${pallete.grayOne};
`

export const RegisterLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    
    span {
        color: ${pallete.whiteOne};
        margin-right: 5px;
    }

    @media screen and (max-width: 380px) {
        flex-direction: column;

        span {
            margin-bottom: 0.5rem;
        }
    }
`