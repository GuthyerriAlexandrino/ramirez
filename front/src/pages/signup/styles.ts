import styled, { css } from "styled-components";
import { pallete } from "../../styles/colors";

interface NavBarSelectorProps {
    positionX: number;
}

export const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding: 46px 0;
    background-color: ${pallete.blackOne};

    @media screen and (max-width: 1008px) {
        display: grid;
        grid-template-rows: repeat(2, 0.7fr);
    }

    @media screen and (max-width: 486px) {
        grid-template-rows: repeat(2, 0.7fr);
    }
`

export const NavBar = styled.nav`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    margin-left: 4rem;
    margin-bottom: 1.875rem;

    ul {
        position: relative;
        display: flex;

        li {
            position: relative;
            list-style: none;
            padding-bottom: 1rem;
            cursor: pointer;

            span {
                position: relative;
                text-decoration: none;
                color: ${pallete.whietOne};
                width: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    @media screen and (max-width: 1008px) {
        margin-left: 0rem;

    }

    @media screen and (max-width: 641px) {
        justify-content: center;
    }
`

export const NavBarSelector = styled.div<NavBarSelectorProps>`
    position: absolute;
    width: 100px;
    height: 5px;
    bottom: 0;
    z-index: 0;
    background-color: ${pallete.turquoiseOne};
    transform: ${props => `translateX(${props.positionX}px)`};
    transition: all 0.5s ease 0s;
`

export const SignUpFormContainer = styled.section`
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1008px) {
        grid-row: 2 / 3;
        place-items: center;
    }

    @media screen and (max-width: 641px) {
        width:100vw;
    }
`

export const SignUpAside = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 30rem;
    margin-left: 8.25rem;

    h1 {
        font-size: 2.25rem;
        line-height: 2.625rem;
        margin-top: 2.375rem;
        color: ${pallete.whietOne};
    }

    p {
        font-size: 1rem;
        line-height: 1.188rem;
        margin-top: 2.375rem;
        margin-bottom: 3.75rem;
        color: ${pallete.grayThree};
    }

    @media screen and (max-width: 1008px) {
        grid-row: 1 / 2;
        place-items: center;
        width: 40rem;
        margin-left: 0rem;
        margin-bottom: 3rem;

        h1, p {
            text-align: center;
        }
    }

    @media screen and (max-width: 641px) {
        width:100vw;
        
        h1 {
            font-size: 1.5rem;
            width: 95%;
        }

        p {
            font-size: 1rem;
            line-height: 1.8rem;
            width: 95%;
        }
    }
`

export const BackPageLink = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;

    div {
        cursor: pointer;

        button {
            margin-left: 0.875rem;
            font-size: 1rem;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            color: ${pallete.turquoiseOne};
            border: none;
            background-color: transparent;
            cursor: pointer;
        }
    }
`