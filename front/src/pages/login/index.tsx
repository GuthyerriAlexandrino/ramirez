import { useEffect, useRef, useState } from "react";
import { 
    Container,
    LogInAside,
    ExternaltLink,
    Divider,
    RegisterLink,
    PopUpInfo,
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

export default function LogIn()  {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [visible, setVisible] = useState(false);

    const {
        invalidCredentials,
        handleLogin
    } = useAuthLogin();

    function handleVisiblePassword() {
        setVisible(!visible);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        await handleLogin({email, password});
    }

    return (
        <Container>
            <LogInAside>
                <Image src={Logo}/>
                <h1>Faça o seu login na plataforma</h1>
            </LogInAside>
            <FormBody action="" onSubmit={handleSubmit}>
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
                    <Link href="#">
                        <ExternaltLink align="center" isBold={true}>Registre-se</ExternaltLink>
                    </Link>
                </RegisterLink>
            </FormBody>
        </Container>
    )
}