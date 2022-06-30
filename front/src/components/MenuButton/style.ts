import styled from "styled-components";
import { pallete } from "../../styles/colors";

interface Menu {
    active: boolean;
}

interface OptionMenuProps {
    value: number;
    active: boolean;
}

export const ButtonContainer = styled.div`
    position: fixed;
    bottom: -50px;
    right: 0;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`

export const Toggle = styled.div<Menu>`
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: ${pallete.blackFive};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
    border-radius: 50%;
    cursor: pointer;;
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.15);
    font-size: 2em;
    transition: 1.25s;
    ${props => props.active && "transform: rotate(315deg)"};
`

export const Indicator = styled.div<Menu>`
    position: absolute;
    right: calc(50% + 5px);
    transform-origin: right;
    width: ${props => props.active ? "100px" : 0} ;
    height: 2px;
    background-color: ${pallete.turquoiseOne};
    pointer-events: none;
    transition: 0.5s;
    opacity: ${props => props.active ? 1 : 0};
    z-index: -1;

    &:before {
        content: '';
        position: absolute;
        top: -24px;
        width: 50px;
        height: 50px;
        background: #222327;
        box-shadow: 0 0 0 6px #29fd53;
        border-radius: 50%;
        transform: 0.5s;
    }
`

export const OptionMenu = styled.li<OptionMenuProps>`
    position: absolute;
    left: 0;
    list-style: none;
    transform-origin: 100px;
    transition: 0.5s;
    ${props => props.value ? `transition-delay: calc(0.1s * ${props.value})` : ""};
    transform: ${props => props.active ? `rotate(calc(360deg / 8 * ${props.value}))` : `rotate(0deg) translateX(80px)`};

    &:nth-child(2).active ~ ${Indicator} {
        transform: rotate(0deg);
    }

    &:nth-child(3).active ~ ${Indicator} {
        transform: rotate(46deg);

        &::before {
            top: -25px;
        }
    }

    &:nth-child(4).active ~ ${Indicator} {
        transform: rotate(92deg);
        right: calc(50% + 4px);
        width: 105px;

        &::before {
            top: -25px;
        }
    }

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: ${pallete.blackFive};
        border-radius: 50%;
        ${props => props.value ? `transform: rotate(calc(360deg / -8 * ${props.value}))` : ""};
        
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
        color: #111;
        transition: 0.5s;

        cursor: pointer;
    }
`