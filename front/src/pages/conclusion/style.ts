import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const Container = styled.main`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: ${pallete.blackOne};
`

export const Icon = styled.i`
    position: relative;
    width: 300px;
    height: 275px;
    border: 10px solid ${pallete.turquoiseOne};
    border-radius: 50%;

`

export const Typography = styled.h1`
    color: ${pallete.whietOne};
    font-style: normal;
    font-weight: 00;
    font-size: 36px;
    line-height: 42px;
    text-align: center;;
    text-transform: uppercase;
`

export const BackPageLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        border: none;
        color: ${pallete.turquoiseOne};
        margin-left: 0.875rem;
        background-color: transparent;
        cursor: pointer;

    }
`