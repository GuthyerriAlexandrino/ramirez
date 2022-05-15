import styled, { css } from "styled-components";
import { pallete } from "../../styles/colors";

interface PopupProps {
    isActive: boolean;
}

export const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 30px;
    border-radius: 5px;
    background-color: ${pallete.blackFour};
    margin-right: 1.5rem;
    cursor: pointer;

    small {
        font-size: 1rem;
        margin-right: 0.375rem;
        color: ${pallete.whietOne}
    }
    
    @media screen and (max-width: 870px) {
        width: 93%;
        margin-right: 0rem;
        margin-bottom: 0.3rem;
    }
`

export const Icon = styled.i`
    margin-top: 0.4rem;
`

export const PopupContainer = styled.div<PopupProps>`
    position: absolute;
    width: 100%;
    height: ${props => props.isActive ? "125px" : 0};
    top: 28px;
    left: 0%;
    ${props => props.isActive ? css`
        border-top: 1px solid #a2a2a2;
    `: css`
        border-top: 0px solid #a2a2a2;
    `};
    background-color: ${pallete.blackTwo};
    transition: all 0.2s ease;
    z-index: 999;
`

export const PopupList = styled.ul<PopupProps>`
    position: relative;
    list-style: none;
    overflow: hidden;
    height: 100%;
    ${props => props.isActive ? css`
        overflow-y: auto;
    ` : css`
        overflow-y: none;
    `};


    &::-webkit-scrollbar {
        width: 0.5rem;               
    }

    &::-webkit-scrollbar-track {
        background-color: ${pallete.blackSix};        
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${pallete.grayTwo};
        border-radius: 20px;       
        border: 3px solid ${pallete.grayTwo};
    }
`

export const PopupItem = styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    font-family: 500;
    font-size: 0.875rem;
    text-transform: capitalize;
    margin: 1rem 0;
    padding-left: 0.75rem;
    color: ${pallete.whietOne};
    cursor: pointer;

    &:hover {
        background-color: rgba(52, 52, 52);
    }
`