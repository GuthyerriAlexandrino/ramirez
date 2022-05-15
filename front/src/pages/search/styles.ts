import styled from "styled-components";
import { pallete } from "../../styles/colors";

interface LocationProps {
    isActive: boolean
}

export const Container = styled.section`
    min-height: 100vh;
    height: 100%;
    background-color: ${pallete.blackOne};
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
    width: 200px;

    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        width: 100%;

        li {
            margin-right: 10px;
            color: ${pallete.whietOne};
        }
    }
`

export const SearchPhotographerContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:100%;

    h1 {
        font-size: 1rem;
        font-weight: 500;
        text-align: left;
        margin-bottom: 0.625rem;
        width: 93%;
        text-align: left;
        color: ${pallete.whietOne};
    }
`

export const SearchInputContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 93%;

    & > div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        margin-bottom: 1.25rem;

        @media screen and (max-width: 500px) {
            flex-direction: column;
        }
    }
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    margin-right: 1.25rem;
`

export const InputName = styled.input`
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    border: 1px solid #515151;
    border-radius: 10px;
    padding: 0.75rem;
    margin-right: 1.813rem;

    @media screen and (max-width: 500px) {
        width: 93%;
        margin-right: 0rem;

    }
`

export const AditionalInputs = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
    @media screen and (max-width: 1102px) {
        gap: 10px 0;
    }

    @media screen and (max-width: 870px) {
        flex-direction: column;
    }
`

export const PriceRangeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    @media screen and (max-width: 870px) {
        flex-direction: column;
        width: 93%;
        margin-right: 0px;
        gap: 5px 0;

    }
`

export const PriceRange = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 30px;
    font-size: 1rem;
    margin-right: 1.5rem;
    color: ${pallete.whietOne};
    border-radius: 5px;
    background-color: ${pallete.blackFour};

    @media screen and (max-width: 870px) {
        width: 100%;
        margin-right: 0;

    }
`

export const GenericInput = styled.input`
    width: 125px;
    height: 30px;
    font-family: 'Inter', sans-serif;
    border: 2px solid #515151;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 5px;

    @media screen and (max-width: 870px) {
        width: 100%;
        margin-right: 0;
    }
`

export const Divider = styled.div`
    width: 1.25rem;
    height: 0.125rem;
    margin: 0 0.25rem;
    background-color: ${pallete.grayOne};

    @media screen and (max-width: 870px) {
       display: none;
    }
`

export const SearchButton = styled.button`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 2rem;
    background-color: ${pallete.turquoiseOne};

    @media screen and (max-width: 500px) {
        width: 93%;
        margin-top: 1rem;
    }   
`

export const LocationAccordion = styled.div<LocationProps>`
    position: relative;
    display: flex;
    align-items: center;
    max-width: 100%;
    min-width: 80px;

    label {
        position: relative;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 30px;
        font-size: 1rem;
        margin-right: 10px;
        padding-left: 30px;
        color: ${pallete.whietOne};
        border-radius: 5px;
        background-color: ${pallete.blackFour};

        @media screen and (max-width: 870px) {
            width: 100px;
        }

        div {
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(50%, 50%);
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: ${pallete.grayOne};

            &::before {
                content: '';
                top: 0;
                left: 0;
                transform: translate(50%, 0%);
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: ${props => props.isActive ? pallete.blackFour : "transparent"};
                transition: background 0.5s ease;
            }
        }
    }

    div {
        position: relative;
        display: flex;
        align-items: center;
        width: ${props => props.isActive ? "125px" : 0};
        height: 40px;
        overflow: hidden;
        transition: 0.5s;
        overflow-x: none;

        @media screen and (max-width: 870px) {
            width: ${props => props.isActive ? "100%" : 0};
        }
    }

    @media screen and (max-width: 870px) {
        width: 93%;
    }
`

export const PhotographersList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 93%;
    gap: 3.75rem;
`
