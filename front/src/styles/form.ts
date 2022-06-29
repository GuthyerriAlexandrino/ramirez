import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { pallete } from "./colors";

interface IconProps {
    align: string;
    valuePosition?: number;
}

interface InputContainer {
    isselect?: string;
}

export const FormBody = styled(motion.form)`
    width: 38rem;
    padding: 4rem;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    background-color: ${pallete.blackSix};

    h2 {
        font-weight: 500;
        font-size: 1.563rem;
        line-height: 1.875rem;
        margin-bottom: 1rem;
        color: ${pallete.whiteOne};
    }

    @media screen and (max-width: 641px) {
        width: 95%;
    }
`

export const InputContainer = styled(motion.div)<InputContainer>`
    position: relative;
    margin-bottom: 1rem;

    ${props => props.isselect ? css`
        &::after {
            content: '';
            position: absolute;
            top: 42%;
            right: 0;
            transform: translate(-100%, 0%);
            height: 10px;
            width: 10px;
            background-color: ${pallete.whiteOne};
            clip-path: polygon(100% 0%, 0 0%, 50% 100%);
        }
    ` : ""}

    label {
        position: absolute;
        top: 25%;
        left: 52px;
        color: ${pallete.grayTwo};
    }

    input {
        width: 100%;
        height: 3.125rem;
        outline: 0px solid ${pallete.turquoiseOne};
        border: none;
        border-radius: 5px;
        padding-left: 52px;
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
        color: ${pallete.whiteOne};
        background-color: ${pallete.blackFive};
        transition: outline 0.1s ease-in;

        &:focus {
            outline: 2px solid ${pallete.turquoiseOne};
        }
    }

    input[type=number] {
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
    }

    select {
        width: 100%;
        height: 3.125rem;
        outline: 0px solid ${pallete.turquoiseOne};
        border: none;
        border-radius: 5px;
        padding-left: 52px;
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
        color: ${pallete.whiteOne};
        background-color: ${pallete.blackFive};
        transition: outline 0.1s ease-in;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        &:focus {
            outline: 2px solid ${pallete.turquoiseOne};
        }
    }

    textarea {
        width: 100%;
        height: 100px;
        resize: none;
        border: none;
        border-radius: 5px;
        padding: 1rem;
        font-size: 1rem;
        font-family: 'Inter', sans-serif;
        color: ${pallete.whiteOne};
        background-color: ${pallete.blackFive};
        transition: outline 0.1s ease-in;

        &:focus {
            outline: 2px solid ${pallete.turquoiseOne};
        }
    }
`

export const Icon = styled.i<IconProps>`
    position: absolute;
    top: 25%;
    ${props => props.align === "left" ? css`
        left: 10px;
    ` : css`
        right: ${props.valuePosition}px;
        cursor: pointer;
    `}
    transition: all ease 0.2s;


    &[data-title=minus] {
        &:nth-child(2):hover {
            filter: brightness(85%);
        }
    }

    &[data-title=plus] {
        &:nth-child(3):hover {
            filter: brightness(85%);
        }
    }
`

export const Button = styled.button`
    position: relative;
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    border-radius: 5px;
    margin-top: 1rem;
    padding: 0.5rem 0;
    color: #000000;
    background-color: #f2f2f2;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
        background-color: #E1E1E1;
    }
`