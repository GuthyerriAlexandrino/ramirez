import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 30px;
    border-radius: 5px;
    background-color: ${pallete.blackFour};
    margin-right: 1.5rem;

    small {
        font-size: 1rem;
        margin-right: 0.375rem;
        color: ${pallete.whietOne}
    }
`

export const Icon = styled.i`
    margin-top: 0.4rem;
`