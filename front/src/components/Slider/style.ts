import Image from "next/image";
import styled, { css } from "styled-components";
import { pallete } from "../../styles/colors";

interface SlideProps {
    isActive: boolean;
}

export const Container = styled.section`
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-items: center;
    margin: 3rem 0;

    @media screen and (max-width: 771px) {
        height: 100%;
    }
`

export const ArrowSliderLeft = styled(Image)`
    position: absolute;
    top: 50%;
    left: 32px;
    z-index: 10;
    cursor: pointer;
    user-select: none;
`

export const ArrowSliderRight = styled(Image)`
    position: absolute;
    top: 50%;
    right: 32px;
    z-index: 10;
    cursor: pointer;
    user-select: none;
`

export const Slide = styled.div<SlideProps>`
    position: relative;
    opacity: ${props => props.isActive ? 1 : 0};
    transition-duration: 1s ease;
    ${props => props.isActive && css`
        transition-duration: 1s;
        transform: scale(1.08);
    `}
`

export const SlideContent = styled.div`
    position: relative;
`

export const ImageSlider = styled(Image)`
    border-radius: 0px;
`

export const Bar = styled.div`
    top: 0;
    left: 0;
    width: 70px;
    height: 1px;
    background-color: ${pallete.whiteOne};
`

export const Divider = styled.div`
    width: 20px;
    height: 1px;
    background-color: ${pallete.whiteOne};
`

export const Typography = styled.h3`
    font-size: min(4.375rem, 5vw) ;
    max-width: 31.75rem;
    width: 100%;
    margin: 3rem 0;
`

export const SlideIndex = styled.span`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: min(0.875rem, 5vw);
`

export const SlideContentItems = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top: calc(100% - 70%);
    left: 15%;
    width: auto;
    height: auto;

`