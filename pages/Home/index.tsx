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
} from "./style";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import logoHome from "../../assets/logo-home.svg";
import Icon1 from "../../assets/icon1.svg";
import Icon2 from "../../assets/icon2.svg";
import Icon3 from "../../assets/icon3.svg";
import { Slider } from "../../components/Slider";


export const HomePage: NextPage = () => {
    return (
        <Container>
            <Header>
                <div>
                    <Image src={logo} 
                        width="123px" 
                        height="40px" 
                        style={{marginLeft: "20px"}} 
                    />
                    <MenuContainer>
                        <ul>
                            <li>
                                <Button>Sobre</Button>
                            </li>
                            <li>
                                <Button>Log-in</Button>
                            </li>
                            <li>
                                /
                            </li>
                            <li>
                                <Button background={true}>
                                    Sign-up
                                </Button>
                            </li>
                        </ul>
                    </MenuContainer>
                </div>
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