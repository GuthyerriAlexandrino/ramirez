import Link from "next/link";
import { FilePlus, GearSix, Info, UserCircleGear } from "phosphor-react";
import { useEffect, useState } from "react";
import { pallete } from "../../styles/colors";
import { Toggle, ButtonContainer, OptionMenu, Indicator } from "./style";

interface MenuButtonProps {
    id: string;
    openModal: (value: boolean) => void;
}

export function MenuButton({id, openModal}: MenuButtonProps) {

    const buttonsRender = [
        {style: 0, icon: <Link href={`/editProfile/${id}`}><UserCircleGear size={20} color={pallete.whiteOne} weight="fill" /></Link>},
        {style: 1, icon: <FilePlus onClick={() => openModal(true)} size={20}  color={pallete.whiteOne} weight="fill" />},
        {style: 2, icon: <Info size={20} color={pallete.whiteOne} weight="fill" />},
    ]

    const [actived, setActived] = useState(false);

    useEffect(() => {
        const itemsList = document.querySelectorAll("#menu-li");
        function activeLink(this: any) {
            itemsList.forEach((item) => {
                item.classList.remove("active")
                this.classList.add("active")
            })
        }
        itemsList.forEach(item => item.addEventListener('click', activeLink))
    }, [])


    return (
        <ButtonContainer >
            <Toggle onClick={() => setActived(!actived)} active={actived}>
                <GearSix size={30} color={pallete.whiteOne} weight="fill" />
            </Toggle>
            {buttonsRender.map((button, index) => (
                <OptionMenu key={index} id="menu-li" value={button.style} active={actived}>
                    <i>
                        {button.icon}
                    </i>
                </OptionMenu>
            ))}
            <Indicator active={actived}/>
        </ButtonContainer>
    )
}