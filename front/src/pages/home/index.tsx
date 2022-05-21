import { NextPage } from "next";
import { 
    Container, 
    Header, 
    MenuContainer, 
    Button,
    Main, 
    Services,
    ServiceCardArea,
    ServiceCard,
    MenuIcon,
    HeaderContent,
    LogoImage
} from "./style";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import logoHome from "../../assets/logo-home.svg";
import Icon1 from "../../assets/icon1.svg";
import Icon2 from "../../assets/icon2.svg";
import Icon3 from "../../assets/icon3.svg";
import { Slider } from "../../components/Slider";
import Link from "next/link";
import { List, X } from "phosphor-react";
import { useState } from "react";


export const HomePage: NextPage = () => {

    const [menuIsActive, setMenuIsActive] = useState(false);

    return (
        <Container>
            <MenuIcon onClick={() => setMenuIsActive(!menuIsActive)}>
                {menuIsActive ? (
                    <X size={40} />
                ) : (
                    <List size={40}/>

                )}
            </MenuIcon>
            <Header toggleMenu={menuIsActive}>
                <HeaderContent>
                    <LogoImage>
                        <Image 
                            src={logo} 
                            width={123}
                            height={40}
                            objectFit="contain"
                        />
                    </LogoImage>
                    <MenuContainer>
                        <ul>
                            <li>
                                <Button>Sobre</Button>
                            </li>
                            <li>
                                <Link href="/login">
                                    <Button>Log-in</Button>
                                </Link>
                            </li>
                            <li>
                                /
                            </li>
                            <li>
                                <Link href="/signup">
                                    <Button background={true}>
                                        Sign-up
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </MenuContainer>
                </HeaderContent>
            </Header>
            <Main>
                <Image src={logoHome}/>
                <Slider/>
                <Services>
                    <h1>Serviços</h1>
                    <ServiceCardArea>
                        <ServiceCard>
                            <Image src={Icon1}/>
                            <div>
                                <h3>Construa seu portfólio</h3>
                                <p>Adicione os seus trabalhos em nosso site e inicie o seu portfólio para adquirir novos clientes</p>
                            </div>
                        </ServiceCard>
                        <ServiceCard>
                            <Image src={Icon2}/>
                            <div>
                                <h3>Pesquise por profissionais</h3>
                                <p>Busque por profissionais de diversas áreas e que atenda as suas necessidades</p>
                            </div>
                        </ServiceCard>
                        <ServiceCard>
                            <Image src={Icon3}/>
                            <div>
                                <h3>Indique o seu valor tipo de serviço</h3>
                                <p>Informe aos futuros clientes o seu modo de trabalho e o seu valor de serviço</p>
                            </div>
                        </ServiceCard>
                    </ServiceCardArea>
                </Services>
            </Main>
        </Container>
    )
}
