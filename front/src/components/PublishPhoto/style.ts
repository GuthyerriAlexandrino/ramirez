import { motion } from "framer-motion";
import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const PopupContainer = styled(motion.div)`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    top: 0;
    left:0;
    background-color: rgba(0, 0, 0, 0.4);
`

export const FormAreaContainer = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 93%;
    height: 94%;
    padding: 1rem 0;
    background-color: ${pallete.blackOne};
`

export const IconArea = styled.i`
    position: absolute;
    top: 0.625rem;
    right: 0.625rem;
    cursor: pointer;
`

export const Typography = styled.h1`
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.75rem;
    text-align: left;
    width: 700px;
    margin-bottom: 1.688rem;
    color: ${pallete.whiteOne};
`

export const FormArea = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 700px;
    padding: 1.25rem 1.063rem; 
    border-radius: 5px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    background-color: ${pallete.blackSix};
    overflow-y: auto;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 600px;
    margin-top: 2.188rem;

    label {
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        text-align: left;
        width: 100%;
        margin-bottom: 0.625rem;
        color: ${pallete.whiteOne};
    }
`

export const InputValue = styled.input`
    width: 100%;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.063rem;
    color: #9f9f9f;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: ${pallete.blackFive};
`

export const InputFileLabel = styled.label`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 168px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: ${pallete.blackFive};

    span {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-size: 1rem;
        color: ${pallete.grayTwo};
    }
`;

export const PreviewImage = styled.div`
    width: 6.25rem;
    height: 6.25rem;
    border-radius: 10px;

    img {
        border-radius: 10px;
    }
`

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6.25rem;
    height: 6.25rem;
    margin-top: 1.25rem;
    border: 1px dashed ${pallete.grayTwo};
    border-radius: 10px;
`

export const InputFile = styled.input`
    display: none;
`

export const ButtonSubmit = styled.button`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    color: #000000;
    margin-top: 1.5rem;
    padding: 0.813rem 3.375rem;
    border: none;
    border-radius: 10px;
    background-color: ${pallete.whiteOne};
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background-color: #ededed;
    }
`
