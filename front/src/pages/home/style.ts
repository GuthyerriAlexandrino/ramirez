import styled from "styled-components";
import { pallete } from "../../styles/colors";

interface ButtonProps {
    background?: boolean
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: ${pallete.blackOne};
    color: ${pallete.whietOne};
`

export const Header = styled.header`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 3.75rem;

    &::after {
        content: '';
        display: block;
        bottom: 0;
        height: 1px;
        width: 93%;
        margin: 0 auto;
        background-color: ${pallete.whietOne};
    }

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 10px;
    }
`

export const MenuContainer = styled.nav`
    max-width: 300px;
    width: 100%;
    margin-right: 30px;

    ul {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        list-style: none;

        li {
            margin-right: 10px;
        }
    }
`

export const Button = styled.button<ButtonProps>`
    font-family: 'Inter', sans-serif;
    font-weight: ${props => props.background ? "normal" : 600};
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    padding: 5px;
    background: ${props => props.background ? pallete.whietOne : "none"};
    color: ${props => props.background ? "#000000" : pallete.whietOne};
    border: ${props => !props.background ? "none" : "1px solid #000000"};
    border-radius: ${props => props.background && "5px"};
`

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${pallete.blackOne};
`

export const Services = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;

    h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 6.25rem;
        line-height: 7.25rem;
        text-align: center;
        margin-bottom: 4rem;
        color: ${pallete.whietOne};
    }
`

export const ServiceCardArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2.25rem;
`

export const ServiceCard = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex: 0 1 386px;
    flex: 1 1 386px;
    font-size: 2rem;
    margin-bottom: 2rem;

    div {
        margin-left: 2.125rem;
    }

    h3 {
        font-weight: 600;
        font-size: 1.5rem;
        line-height: 2.125rem;
        width: 15.375rem;
        margin-bottom: 0.875rem;
        color: ${pallete.whietOne};
    }

    p {
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.625rem;
        color: ${pallete.whietOne};
        width: 17rem;
        height: 5.3125rem;
    }
`