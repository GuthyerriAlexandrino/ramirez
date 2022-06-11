import Image from "next/image";
import { BackPageLink, Container, SignUpAside, SignUpFormContainer } from "./styles";
import Logo from "../../assets/logo.svg";
import ArrowBack from "../../assets/arrow-back.svg";
import Link from "next/link";
import { FormRegister } from "../../components/FormRegister";
import { makeFadeInRightAnimation, stagger } from "../../utils/animations";

export default function SignUp() {

    return (
        <Container
            initial='initial' 
            animate='animate' 
            exit={{ opacity: 0 }}
            variants={stagger}
        >
            <SignUpFormContainer variants={makeFadeInRightAnimation()}>
                <FormRegister/>
            </SignUpFormContainer>
            <SignUpAside variants={makeFadeInRightAnimation()}>
                <Link href="/">
                    <Image src={Logo} style={{cursor: "pointer"}}/>
                </Link>
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