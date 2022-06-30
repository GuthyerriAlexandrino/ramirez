import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled, { css } from "styled-components";
import { pallete } from "../../../../styles/colors";

interface DividerProps {
    height: number;
    vertical: boolean;
}
interface CareerDataProps {
    isRight: boolean;
}

export const Container = styled(motion.section)`
    min-height: 100vh;
    height: 100%;
    background-color: ${pallete.blackOne};
`

export const ProfileInfoContainer = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    width: 100%;

    @media screen and (max-width: 935px) {
        padding: 0 1rem;
    }
`

export const ProfileInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 3.375rem;
    row-gap: 1.875rem;
    width: 57.5rem;
`

export const ProfileAside = styled.aside`
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    background-color: ${pallete.blackSix};

    @media screen and (max-width: 935px) {
        grid-column: 1 / 3;
    }
`

export const ProfileImage = styled.div`
    width: 11rem;
    height: 11rem;
    border-radius: 50%;

    img {
        border-radius: 50%;
    }
`

export const ProfileName = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.25rem;
    text-align: center;
    width: 100%;
    margin: 0.625rem 0;
    color: ${pallete.whiteOne};
`

export const ProfileLocation = styled.small`
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    width: 100%;
    margin-bottom: 0.625rem;
    color: ${pallete.whiteOne};
`


export const Divider = styled.div<DividerProps>`
    width: ${props => props.vertical ? "4px" : "100%"};
    height: ${props => `${props.height}px`};
    background-color: ${pallete.turquoiseOne};
`

export const DividerArea = styled.div`
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1.875rem;
`

export const ProfileViews = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 0.938rem;
    text-align: center;
    margin: 0.625rem 0;

    p {
        color: ${pallete.grayThree};

        span {
            color: ${pallete.turquoiseOne};
            font-weight: 700;
        }
    }

`

export const ProfileAbout = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    border-radius: 5px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    background-color: ${pallete.blackSix};
    min-width: 38.75rem;
    width: 100%;
    height: 100%;

    h2, p {
        line-height: 20px;
        color: ${pallete.whiteOne};
        margin: 1.25rem 1.25rem 0 1.25rem;
    }

    p[data-bio=hasBio] {
        font-weight: 500;
        color: ${pallete.whiteOne};
    }

    p[data-bio=noBio] {
        font-weight: 500;
        color: ${pallete.grayOne}
    }

    @media screen and (max-width: 935px) {
        min-width: 100%;
        width: 100%;
        grid-column: 1 / 3;

        p {
            margin-bottom: 1rem;
        }
    }
    
`

export const ProfileCareer = styled.section`
    border-radius: 5px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    background-color: ${pallete.blackSix};
    min-width: 38.75rem;
    width: 100%;


    h2 {
        line-height: 20px;
        color: ${pallete.whiteOne};
        margin: 1.25rem;
    }

    @media screen and (max-width: 935px) {
        min-width: 100%;
        width: 100%;
        grid-column: 1 / 3;
    }
`

export const CareerDataContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1.25rem;
`

export const CareerData = styled.div<CareerDataProps>`
    display: flex;
    flex-direction: column;
    align-items: ${props => props.isRight ? "flex-end" : "flex-start"};
    ${props => props.isRight ? css`
        margin-right: 1.25rem;
    ` : css`
        margin-left: 1.25rem;
    `}
    width: inherit;

    h3 {
        font-style: normal;
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.25rem;
        margin-bottom: 1.063rem;
        color: ${pallete.whiteOne};
    }

    span {
        color: ${pallete.grayThree}
    }
`

export const PhotosGallery = styled(motion.main)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: transparent;
`

export const ImageLazyLoad = styled(LazyLoadImage)`
    max-width: 100%;
    width: 100%;
    margin:  0 0 20px;
    padding: 10px;
    overflow: hidden;
    break-inside: avoid;
    border: 0px solid ${pallete.turquoiseOne};
    transition: all 0.2s ease;
    cursor: pointer;
    
    &:hover {
        border: 1px solid ${pallete.turquoiseOne};
    }
`

export const MansoryGrid = styled(motion.div)`
    width: 97%;
    margin: 20px auto;
    columns: 4;
    column-gap: 40px;

    @media screen and (max-width: 1200px) {
        columns: 3;
        width: calc(100% - 40px);
        box-sizing: border-box;
        padding: 20px 20px 20px 0;
    }

    @media screen and (max-width: 768px) {
        columns: 2;
    }

    @media screen and (max-width: 480px) {
        columns: 1;
    }
`