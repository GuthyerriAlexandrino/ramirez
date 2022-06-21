import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const Container = styled.section`
    min-height: 100vh;
    height: 100%;
    background-color: ${pallete.blackOne};
`

export const PostContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`                                                                            

export const PostArea = styled.div`
    max-width: 46.875rem;
    width: 100%;

`

export const PostContent = styled.section`
    width: 100%;
`

export const PostImage = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;

    img {
        border-radius: 10px;
    }
`

export const ContentFooter = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 1.125rem;
    
    span {
        font-style: normal;
        font-weight: 700;
        font-size: 1.25rem;
        line-height: 1.5rem;
        color: ${pallete.turquoiseOne};
    }
`

export const IconsArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const CommentaryInputContainer = styled.article`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 2rem;
    width: 100%;
`

export const CommentaryInput = styled.textarea`
    width: 100%;
    height: 6.25rem;
    resize: none;
    resize: none;
    border: 1px solid ${pallete.grayOne};
    border-radius: 10px;
    padding: 1rem;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    color: ${pallete.whiteOne};
    background-color: ${pallete.blackSix};
    transition: outline 0.1s ease-in;

    &:focus {
        outline: 2px solid ${pallete.turquoiseOne};
    }

`
export const CommentaryButton = styled.button`
    width: 7.188rem;
    border: 1px solid ${pallete.grayOne};
    border-radius: 5px;
    padding: 0.375rem 0.75rem;
    margin-top: 0.75rem;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    color: ${pallete.whiteOne};
    background-color: ${pallete.blackSix};
    transition: all 0.5s cubic-bezier( 0.7, 0.2, 0.88, 0.33 );
    cursor: pointer;

    &:hover {
        background-color: ${pallete.turquoiseOne};
        font-weight: 700;
        color: ${pallete.blackFive}
    }
`

export const FeedBackArea = styled.article`
    width: 100%;
    margin-top: 2.813rem;

    h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 1.5rem;
        text-align: left;
        color: ${pallete.whiteOne};
    }
`

export const FeedBackList = styled.div`


`              
