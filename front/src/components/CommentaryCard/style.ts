import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    margin: 1.313rem 0;
    background-color: ${pallete.blackSix};
`

export const CommentaryInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem 1rem 0.625rem 1rem;  
`

export const CommentaryProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

`

export const CommentaryImage = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;

    img {
        border-radius: 50%;
    }
`

export const CommentaryDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    margin-left: 0.75rem;

    span {
        font-style: normal;
        font-weight: 500;
        font-size: 1rem;
        color: ${pallete.whiteOne};

            &:nth-child(1) {
                margin-bottom: 0.75rem;
            }
    }
`
export const Content = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    padding: 0 1rem 1rem 1rem;
    color: ${pallete.whiteOne};
`

export const IconsArea = styled.div`

`
