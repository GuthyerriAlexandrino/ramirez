import { Container, Icon, PopupContainer, PopupItem, PopupList } from "./style";
import Select from "../../assets/select.svg"
import Image from "next/image";
import { useState } from "react";

interface SelectInputProps {
    selectName: string;
}

const data = [
    {id: 1, value: "Fotojornalismo"},
    {id: 2, value: "Gastronomia"},
    {id: 3, value: "Astrofotografia"},
    {id: 4, value: "Publicidade"},
    {id: 5, value: "Subaquática"},
    {id: 6, value: "Aérea"},
]

export function SelectInput({selectName}: SelectInputProps) {

    const [currentName, setCurrentName] = useState(selectName);
    const [isActive, setIsActive] = useState(false);

    return (
        <Container onClick={() => setIsActive(!isActive)}>
            <small>{currentName}</small>
            <Icon>
                <Image src={Select} width={15} height={15}/>
            </Icon>
            <PopupContainer isActive={isActive}>
                <PopupList isActive={isActive}>
                    {data.map((item, id) => (
                        <PopupItem key={id} onClick={() => setCurrentName(item.value)}>
                            {item.value}
                        </PopupItem>
                    ))}
                </PopupList>
            </PopupContainer>
        </Container>
    )
}