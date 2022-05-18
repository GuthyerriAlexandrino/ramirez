import Image from "next/image";
import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1 158px;
    flex: 0 1 158px;
    height: 100%;
    border: 1px solid ${pallete.blackTwo};
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: 1rem 0;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    background: rgba(255, 255, 255, 0.04);
    cursor: pointer;
    transition: all 0.2s ease;

    @media screen and (max-width: 375px){
        flex: 1 1 158px;
        flex: 1 1 158px;
    }

    &:hover {
        transform: scale(1.1);
    }
`

export const PhotographerImage = styled(Image)`
    border-radius: 50%;
`

export const PhotographerInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${pallete.whiteOne};
    margin-top: 10px;
    margin-bottom: 1rem;

    span {
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1.063rem;
        text-align: center;
    }

    small {
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1rem;
        text-align: center;
        width: 100%;
    }

`

export const Especialization = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: ${pallete.grayTwo};
    font-size: 0.875rem;

    span {
        text-align: center;
        width: 93%;
    }

    span:nth-child(1) {
        font-weight: 600;
        margin-bottom: 8px;
    }
`
