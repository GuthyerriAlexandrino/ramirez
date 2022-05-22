import styled, { css } from "styled-components";
import { pallete } from "../../styles/colors";

interface IconProps {
    align: string;
}

interface PanelProps {
    active: boolean;
}

export const FormBody = styled.form`
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

export const InputFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
`

export const InputContainer = styled.div`
    position: relative;
    margin-bottom: 1rem;

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
`

export const Icon = styled.i<IconProps>`
    position: absolute;
    top: 25%;
    ${props => props.align === "left" ? css`
        left: 10px;
    ` : css`
        right: 10px;
        cursor: pointer;
    `}
`

export const CheckBoxConfirm = styled.article`
    color: #444;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 1rem;
    color: ${pallete.whiteOne};
    transition: 0.4s;
`

export const CheckBoxArea = styled.div`
    display:flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 1rem;

    input {
        margin-right: 1rem;
    }
`

export const Panel = styled.div<PanelProps>`
    width: 100%;
    height: ${props => props.active ? "132px" : "0px"};
    padding: ${props => props.active ? "2px" : "0px"};
    overflow: hidden;
    transition: all 0.2s ease-in-out;
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