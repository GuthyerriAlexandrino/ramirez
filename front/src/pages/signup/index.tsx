import Image from "next/image";
import { useEffect, useState } from "react";
import { ClientForm } from "../../components/ClientForm";
import { BackPageLink, Container, NavBar, NavBarSelector, SignUpAside, SignUpFormContainer } from "./styles";

import Logo from "../../assets/logo.svg";
import ArrowBack from "../../assets/arrow-back.svg";
import Link from "next/link";
import { PhotographerForm } from "../../components/PhotographerForm";

export default function SignUp() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [indicatorPosition, setIndicatorPosition] = useState(0);
    const [activedForm, setActivedForm] = useState(0);

    const formComponents = [
        {component: <ClientForm/>},
        {component: <PhotographerForm/>}
    ]

    useEffect(() => {
        setIndicatorPosition(currentIndex * 100);
    }, [currentIndex])

    return (
        <Container>
            <SignUpFormContainer>
                <NavBar>
                    <ul>
                        <li onClick={() => {setCurrentIndex(0), setActivedForm(0)}}>
                            <span>
                                Cliente
                            </span>
                        </li>
                        <li onClick={() => {setCurrentIndex(1), setActivedForm(1)}}>
                            <span>
                                Fotógrafo
                            </span>
                        </li>
                        <NavBarSelector positionX={indicatorPosition}/>
                    </ul>
                </NavBar>
                {formComponents[activedForm].component}
            </SignUpFormContainer>
            <SignUpAside>
                <Image src={Logo}/>
                <h1>Encontre profissionais ou destaque o seu trabalho</h1>
                <p>Junte-se a nossa comunidade e una-se a outros profissionais</p>
                <BackPageLink>
                    <Link href="/login">
                        <div>
                            <Image src={ArrowBack}/>
                            <button>Voltar para o login</button>
                        </div>
                    </Link>
                </BackPageLink>
            </SignUpAside>
        </Container>
    )
}