import styled, { css } from "styled-components";
import { pallete } from "../../styles/colors";

interface ExternaltLinkProps {
    align: string;
    isBold: boolean;
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

export const ExternaltLink = styled.a<ExternaltLinkProps>`
    font-size: 0.875rem;
    text-align: ${props => props.align};
    text-decoration: none;
    color: ${props => props.isBold ? pallete.turquoiseOne : pallete.whietOne };
    cursor: pointer;
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