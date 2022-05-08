import styled, { css } from "styled-components";
import { pallete } from "../../styles/colors";

interface ExternaltLinkProps {
    align: string;
    isBold: boolean;
}

interface IconProps {
    align: string;
}

export const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: ${pallete.blackOne};
`

export const LogInAside = styled.aside`
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
        color: ${pallete.whietOne};
    }
`

export const LogInForm = styled.form`
    width: 38rem;
    padding: 4rem;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    background-color: ${pallete.blackSix};
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
        font-family: 'Montserrat', sans-serif;
        color: ${pallete.whietOne};
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
    ${props => props.align === "left" ?  css`
        left: 10px;
    ` : css`
        right: 10px;
        cursor: pointer;
    `}
`

export const ExternaltLink = styled.a<ExternaltLinkProps>`
    font-size: 0.875rem;
    text-align: ${props => props.align};
    text-decoration: none;
    color: ${props => props.isBold ? pallete.turquoiseOne : pallete.whietOne };
    cursor: pointer;
`

export const Button = styled.button`
    position: relative;
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
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
        color: ${pallete.whietOne};
        margin-right: 5px;
    }
`