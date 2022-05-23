import { useState } from "react";
import { 
    Container,
    LogInAside,
    ExternaltLink,
    Divider,
    RegisterLink,
} from "./styles";
import { 
    Button, 
    FormBody, 
    Icon, 
    InputContainer 
} from "../../styles/form";
import Logo from "../../assets/logo.svg";
import Password from "../../assets/password.svg";
import Email from "../../assets/email.svg";
import EyeVisible from "../../assets/ant-design-eye-visible.svg"
import EyeInvisible from "../../assets/ant-design_eye-invisible-filled.svg"

import Link from "next/link";
import Image from "next/image";
import { useAuthLogin } from "../../context/AuthContext";
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

export default function LogIn()  {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const {
        handleLogin,
    } = useAuthLogin();

    function handleVisiblePassword() {
        setVisible(!visible);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        await handleLogin({email, password});
    }

    return (
        <Container
            // initial={{width: 0}} 
            // animate={{width: "100vw"}} 
            // exit={{ x: 100 }}
            initial='initial' 
            animate='animate' 
            exit={{ opacity: 0 }}
            variants={stagger}
        >
            <LogInAside variants={fadeInRight}>
                <Image src={Logo}/>
                <h1>Faça o seu login na plataforma</h1>
            </LogInAside>
            <FormBody variants={fadeInRight} action="" onSubmit={handleSubmit}>
                <InputContainer>
                    <Icon align="left">
                        <Image src={Email} width={24} height={24}/>
                    </Icon>
                    <label htmlFor="email"></label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Icon align="left">
                        <Image src={Password} width={24} height={24}/>
                    </Icon>
                    <Icon align="right" onClick={handleVisiblePassword}>
                        <Image src={visible ? EyeVisible : EyeInvisible} width={24} height={24}/>
                    </Icon>
                    <label htmlFor="passworld"></label>
                    <input 
                        title="deve conter ao menos um número, uma letra maiúscula e minúscula e deve conter pelo menos 8 caracteres"
                        type={visible ? "text" : "password"} 
                        id="passworld" 
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        pattern="(?=.*[a-z]).{8,}"
                        placeholder="Senha" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                </InputContainer>
                <Link href="#">
                    <ExternaltLink align="left" isBold={false}>Esqueci minha senha</ExternaltLink>
                </Link>
                <Button type="submit">Entrar</Button>
                <Divider/>
                <RegisterLink>
                    <span>Não tem uma conta?</span>
                    <Link href="/signup">
                        <ExternaltLink align="center" isBold={true}>Registre-se</ExternaltLink>
                    </Link>
                </RegisterLink>
            </FormBody>
        </Container>
    )
}