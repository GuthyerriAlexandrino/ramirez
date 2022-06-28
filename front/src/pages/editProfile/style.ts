import { motion } from "framer-motion";
import styled from "styled-components";
import { pallete } from "../../styles/colors";

interface PanelProps {
    active: boolean;
}

interface SignalProps {
    color: string;
}

interface ModalChangeImageContainerProps {
    isActive: boolean;
}

export const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const EditFormContainer = styled(motion.main)`
    display: grid;
    max-width: 700px;
    width: 100%;
    margin: 0 1.875rem;
    padding: 2rem;
    border-radius: 15px;
    background: ${pallete.blackSix};
    box-shadow: inset 20px -20px 60px #2a2a2a,
            inset -20px 20px 60px #383838;
 
`

export const EditForm = styled(motion.form)`
    display: grid;
    align-items: flex-start;
    max-width: 700px;
    grid-template-columns: 30% 70%;
    grid-template-rows: repeat(1fr, 2);
`

export const ProfileBasicInfo = styled.aside`
    display: flex;
    flex-direction: column;
    place-items: center;

    h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 1.25rem;
        text-align: center;
        width: 100%;
        margin: 0.625rem 0;
        color: ${pallete.whiteOne};
    }
`

export const UpdateImage = styled.div`
    position: absolute;
    bottom: -30px;
    display: flex;
    justify-content: center;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    background-color: ${pallete.blackFour};
    width: 150px;
    transition: all ease 0.2s;

`

export const ProfileImage = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 10rem;
    border-radius: 50%;
    overflow: hidden;
    transition: all ease 0.5s;
    cursor: pointer;

    img {
        border-radius: 50%;
    }

    &:hover {
        filter: grayscale(1);

        ${UpdateImage} {
            bottom: 0;
        }
    }

`

export const ProfileData = styled(motion.section)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;

    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 1rem;

        label {
            font-size: 1rem;
            color: ${pallete.whiteOne};
            margin-bottom: 0.6rem;
        }
    }
`

export const ProfileProfessionalData = styled.section`
    grid-column: 1 / 3;
`

export const CheckBoxArea = styled.div`
    display:flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 1rem;

    label {
        font-size: 1rem;
        letter-spacing: 0.04rem;
        color: ${pallete.whiteOne}
    }

    input {
        margin-right: 1rem;
    }
`

export const Signal = styled.div<SignalProps>`
    position: absolute;
    top: 5%;
    left: 210px;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${props => props.color};
    transition: all ease-in 0.5s;
    box-shadow: 0 0 10px ${props => props.color};
`

export const SpecializationTags = styled(motion.ul)`
    list-style: none;
    margin-bottom: 1.5rem;

    legend {
        position: relative;
        font-size: 1rem;
        color: ${pallete.grayOne};
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 1.2rem;
    }

    li {
        display: grid;
        align-items: center;
        grid-template-columns: 90% 10%;
        width: 100%;
        max-width: 253px;
        text-align: left;
        padding: 0.2rem;
        margin-bottom: 0.8rem;
        border-radius: 5px;
        color: ${pallete.turquoiseOne};
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        background: ${pallete.blackOne};
        transition: all ease-in 0.2s;
        cursor: pointer;

        &:hover {
            filter: brightness(90%);
        }
       

        span {
            margin-left: 0.5rem;
        }
    }
`

export const InputFlex = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`

export const Panel = styled(motion.div)<PanelProps>`
    width: 100%;
    height: ${props => props.active ? "550px" : "0px"};
    padding: ${props => props.active ? "2px" : "0px"};
    overflow: hidden;
    transition: all 0.2s ease-in-out;
`

export const Button = styled.button`
    grid-column: 1 / 3;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    border-radius: 5px;
    margin-top: 1rem;
    padding: 0.5rem 0;
    color: #000000;
    background-color: #f2f2f2;
    cursor: pointer;
    transition: filter 0.2s ease-in-out;

    &:hover {
        filter: brightness(0.9);
    }
`

export const ModalChangeImageContainer = styled.section<ModalChangeImageContainerProps>`
    position: fixed;
    display: ${props => props.isActive ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10000;
`

export const IconEdit = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${pallete.grayOne};
    color: ${pallete.blackFive};
`

export const IconExclude = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
`

export const ModalChangeImage = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    max-width: 600px;
    width: 600px;
    min-height: 250px;
    border-radius: 6px;
    background-color: ${pallete.blackFive};

    div[data-name=photoEditImage] {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transition: all ease 0.5s;
        border-radius: 50%;

        img {
            border-radius: 50%;
        }

        input {
            background-color: red;
            border-radius: 40%;
            width: 100px;
            height: 100px;
            transform: translate(2%, -104%);
            opacity: 0;
            cursor: pointer;
        }

    }

    div[data-name=photoImageContent] {
        strong {
            color: ${pallete.whiteOne};
            margin-right: 0.2rem;
        }
    }

    small {
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: -1px;
        color: ${pallete.turquoiseOne};
    }

    button {
        font-size: 0.8rem;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
        color: #000000;
        background-color: #f2f2f2;
        cursor: pointer;
        transition: filter 0.2s ease-in-out;

        &:hover {
            filter: brightness(0.9);
        }
    }
`