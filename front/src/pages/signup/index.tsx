import Image from "next/image";
import { BackPageLink, Container, SignUpAside, SignUpFormContainer } from "./styles";
import Logo from "../../assets/logo.svg";
import ArrowBack from "../../assets/arrow-back.svg";
import Link from "next/link";
import { FormRegister } from "../../components/FormRegister";
import { Variants } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];

const fadeInRight: Variants = {
    initial: {
        x: 60,
        opacity: 0,
        transition: { duration: 0.5, ease: easing }
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: easing }
    }
};
  
const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function SignUp() {

    return (
        <Container
            // initial={{width: 0}} 
            // animate={{width: "100vw"}} 
            //exit={{ x: "100%" }}
            initial='initial' 
            animate='animate' 
            exit={{ opacity: 0 }}
            variants={stagger}
        >
            <SignUpFormContainer variants={fadeInRight}>
                <FormRegister/>
            </SignUpFormContainer>
            <SignUpAside variants={fadeInRight}>
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