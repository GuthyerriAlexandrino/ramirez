import { Container, Icon } from "./style";
import Select from "../../assets/select.svg"
import Image from "next/image";

interface SelectInputProps {
    name: string
}

export function SelectInput({name}: SelectInputProps) {
    return (
        <Container>
            <small>{name}</small>
            <Icon>
                <Image src={Select} width={15} height={15}/>
            </Icon>
        </Container>
    )
}