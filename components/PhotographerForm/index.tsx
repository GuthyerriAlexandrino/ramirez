import Link from "next/link";

import User from "../../assets/user.svg";
import Password from "../../assets/password.svg";
import Email from "../../assets/email.svg";
import EyeVisible from "../../assets/ant-design-eye-visible.svg"
import EyeInvisible from "../../assets/ant-design_eye-invisible-filled.svg"
import Image from "next/image";
import { useState } from "react";
import { Button, FormBody, Icon, InputContainer } from "../../styles/form";
import { InputFlex } from "./style";

export function PhotographerForm() {

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

    function handleVisiblePassword() {
        setVisiblePassword(!visiblePassword);
    }

    function handleVisibleConfirmePassword() {
        setVisibleConfirmPassword(!visibleConfirmPassword);
    }
    
    return (
        <FormBody action="">
            <h2>Criar a sua conta</h2>
            <InputContainer>
                <Icon align="left">
                    <Image src={Email} width={24} height={24}/>
                </Icon>
                <label htmlFor="email"></label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    required
                />
            </InputContainer>
            <InputContainer>
                <Icon align="left">
                    <Image src={User} width={24} height={24}/>
                </Icon>
                <label htmlFor="name"></label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Nome" 
                    required
                />
            </InputContainer>
            <InputContainer>
                <Icon align="left">
                    <Image src={Email} width={24} height={24}/>
                </Icon>
                <label htmlFor="especialization"></label>
                <input 
                    type="text"
                    id="especialization"
                    name="especialization"
                    placeholder="Especialização"
                    required
                />
            </InputContainer>
            <InputFlex>
                <InputContainer>
                    <Icon align="left">
                        <Image src={Email} width={24} height={24}/>
                    </Icon>
                    <label htmlFor="city"></label>
                    <input 
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Cidade"
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Icon align="left">
                        <Image src={Email} width={24} height={24}/>
                    </Icon>
                    <label htmlFor="state"></label>
                    <input 
                        type="text"
                        id="state"
                        name="state"
                        placeholder="Estado"
                        required
                    />
                </InputContainer>
            </InputFlex>
            <InputContainer>
                <Icon align="left">
                    <Image src={Password} width={24} height={24}/>
                </Icon>
                <Icon align="right" onClick={handleVisiblePassword}>
                    <Image src={visiblePassword ? EyeVisible : EyeInvisible} width={24} height={24}/>
                </Icon>
                <label htmlFor="password"></label>
                <input
                    title="deve conter ao menos um número, uma letra maiúscula e minúscula e deve conter pelo menos 8 caracteres"
                    type={visiblePassword ? "text" : "password"} 
                    id="password"
                    name="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    placeholder="Senha"
                    required
                />
            </InputContainer>
            <InputContainer>
                <Icon align="left">
                    <Image src={Password} width={24} height={24}/>
                </Icon>
                <Icon align="right" onClick={handleVisibleConfirmePassword}>
                    <Image src={visibleConfirmPassword ? EyeVisible : EyeInvisible} width={24} height={24}/>
                </Icon>
                <label htmlFor="confirmPassword"></label>
                <input 
                    title="deve conter ao menos um número, uma letra maiúscula e minúscula e deve conter pelo menos 8 caracteres"
                    type={visibleConfirmPassword ? "text" : "password"} 
                    id="confirmPassword"
                    name="confirmPassword"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    placeholder="Confirme sua senha"
                    required
                />
            </InputContainer>
            <Link href="#">
                <Button>CADASTRAR</Button>
            </Link>
        </FormBody>
    )
}