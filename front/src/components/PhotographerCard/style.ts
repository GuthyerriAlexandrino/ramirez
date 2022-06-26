import { motion } from "framer-motion";
import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const CardContent = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px;
    background-color: ${pallete.blackFive};
    border-top-left-radius: 20px;
    transform: translateY(160px);
    transition: transform .25s;

    &::before {
        content: '';
        position: absolute;
        top: -47px;    
        right: -45px;
        width: 100px;
        height: 100px;
        transform: rotate(-175deg);
        border-radius: 50%;
        box-sizing: inset 48px 48px #fff;
    }

    h3 {
        font-size: 0.8rem;
        text-transform: uppercase;
        width: 100%;
        color: ${pallete.grayTwo};
        margin-bottom: 0.6rem;
    }

    div {
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s;

        article {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.4rem;

            span {
                color: ${pallete.whiteOne};
            }

            strong {
                font-size: 0.9rem;
                color: ${pallete.turquoiseOne};
                margin-bottom: 1rem;
            }
        }

    }
`

export const FilterImage = styled.div`
    width: 100%;
    height: 100%;
    background: transparent;
    transition: background 0.25s;
`

export const CardContainer = styled(motion.div)`
    position: relative;
    width: 250px;
    height: 250px;
    background-image: url("/default-user.png") ;
    background-size: cover;
    border-radius: 20px;
    cursor: pointer;
    overflow: hidden;
    transform: filter 0.25s;

    &:hover {

        ${FilterImage} {
            background: rgba(1,1,1, 0.25);
        }

        ${CardContent} {
            div {
                opacity: 1;
                transition-delay: 0.25s;
            }
            transform: translateY(2px);
        }
    }
`

export const ListSpecialization = styled.div`
    span {
        position: relative;
        display: block;
        color: ${pallete.whiteOne};
        font-size: 0.9rem;
        margin-bottom: 0.9rem;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: ${pallete.grayOne};
        }
    }

    ul {
        list-style: none;
        overflow-y: auto;
        height: 50px;

        li {
            font-size: 0.9rem;
            color: ${pallete.grayTwo};
        }
    }
`