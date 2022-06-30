import { Container, Icon, PopupContainer, PopupItem, PopupList } from "./style";
import Select from "../../assets/select.svg"
import Image from "next/image";
import { useState } from "react";

interface SelectInputProps {
    selectName: string;
    children: React.ReactNode
}

const data = [
    {id: 1, value: "Fotojornalismo"},
    {id: 2, value: "Gastronomia"},
    {id: 3, value: "Astrofotografia"},
    {id: 4, value: "Publicidade"},
    {id: 5, value: "Subaquática"},
    {id: 6, value: "Aérea"},
]

export function SelectInput({selectName, children}: SelectInputProps) {

    const [isActive, setIsActive] = useState(false);

    return (
        <Container onClick={() => setIsActive(!isActive)}>
            <small>{selectName.length > 16 ? `${selectName.substring(0, 14)}...` : selectName}</small>
            <Icon>
                <Image src={Select} width={15} height={15}/>
            </Icon>
            <PopupContainer isActive={isActive}>
                <PopupList isActive={isActive}>
                    {children}
                </PopupList>
            </PopupContainer>
        </Container>
    )
}