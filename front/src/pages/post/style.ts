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
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25); 

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
