import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const HeaderContainer = styled.header`
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
        background-color: ${pallete.whiteOne};
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
    width: 10rem;

    ul {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        list-style: none;
        width: 90%;

        li {

            position: relative;
            display: flex;
            align-items: center;
            width: 45px;
            height: 45px;
            color: ${pallete.whiteOne};

            img {
                border-radius: 50%;
            }
        }
    }
`