import Image from "next/image";
import Link from "next/link";
import { Container, BackPageLink, Icon, Typography } from "./style";

import Logo from "../../assets/logo.svg"
import Confirm from "../../assets/confirm.svg"
import ArrowBack from "../../assets/arrow-back.svg"

export default function Conclusion() {
    return (
        <Container>
            <Image src={Logo}/>
            <Icon>
                <Image src={Confirm}/>
            </Icon>
            <Typography>Cadastro concluído!</Typography>
            <Link href="/login">
                <BackPageLink>
                    <Image src={ArrowBack}/>
                    <button>Voltar para o login</button>
                </BackPageLink>
            </Link>
        </Container>
    )
}