import { useEffect, useState } from "react";
import { Button, CheckBoxArea, CheckBoxConfirm, FormBody, Icon, InputContainer, InputFlex, Panel } from "./style";
import { BagSimple, Buildings, CaretDown, Eye, EyeSlash, Key, User } from "phosphor-react";
import Email from "../../assets/email.svg";

import Image from "next/image";
import { pallete } from "../../styles/colors";
import { useNotify } from "../../context/NotifyContext";
import Router from "next/router";

type User = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    specialization: string;
    city: string;
    state: string;
    photographer: boolean
}

type Specialization = {
    name: string;
}

export function FormRegister() {

    const [newUser, setNewUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        specialization: "Nenhum",
        city: "",
        state: "",
        photographer: false
    } as User);

    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const [isPhotographer, setIsPhotographer] = useState(false);
    const [specializationOptions, setSpecializationOptions] = useState<Specialization[]>([]);

    const {
        notifySuccess,
        notifyError
    } = useNotify();

    function handleVisiblePassword() {
        setVisiblePassword(!visiblePassword);
    }

    function handleVisibleConfirmePassword() {
        setVisibleConfirmPassword(!visibleConfirmPassword);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (newUser.password !== newUser.password_confirmation) {
            notifyError("Falha no cadastro! Senha de confirmação inválida")
            return;
        }
        
        const user = {
            user: newUser
        }

        const res = await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .catch(error => error);

        if (res.error === "E11000") {
            notifyError("Falha no cadastro! Esse e-mail já está cadastrado");
            return;
        }
        if (res.error) {
            notifyError("Falha no cadastro! Verifique os campos preenchidos");
            return;
        } else {
            notifySuccess("Conta registrada!");
            Router.push("/conclusion")
            console.log(res)
        }
    }

    useEffect(() => {
        async function getAllSpecializations() {
            const data = await fetch("http://localhost:3001/specializations", {
                method: "GET"
            }).then(response => response.json());
            setSpecializationOptions(data)
        }
        getAllSpecializations();
    }, [])

    console.log(newUser.specialization)

    return (
        <FormBody action="" onSubmit={handleSubmit}>
            <h2>Criar a sua conta</h2>
            <InputContainer>
                <Icon align="left">
                    <User size={24} color={pallete.blackFour} weight="fill" />
                </Icon>
                <label htmlFor="name"></label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Nome" 
                    onChange={(event) => setNewUser({...newUser, name: event.target.value})}
                    required
                />
            </InputContainer>
            <InputContainer>
                <Icon align="left">
                    <Image src={Email} width={24} height={24}/>
                </Icon>
                <label htmlFor=""></label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    onChange={(event) => setNewUser({...newUser, email: event.target.value})}
                    required
                />
            </InputContainer>
            <InputContainer>
                <Icon align="left">
                    <Key size={24} color={pallete.blackFour} weight="fill" />
                </Icon>
                <Icon align="right" onClick={handleVisiblePassword}>
                    {visiblePassword ? (
                        <Eye size={24} color={pallete.turquoiseOne} weight="fill" />
                    ) : (
                        <EyeSlash size={24} color={pallete.turquoiseOne} weight="fill" />
                    )}
                </Icon>
                <label htmlFor="password"></label>
                <input
                    title="deve conter ao menos um número, uma letra maiúscula e minúscula e deve conter pelo menos 8 caracteres"
                    type={visiblePassword ? "text" : "password"} 
                    id="password"
                    name="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    placeholder="Senha"
                    onChange={(event) => setNewUser({...newUser, password: event.target.value})}
                    required
                />
            </InputContainer>
            <InputContainer>
                <Icon align="left">
                    <Key size={24} color={pallete.blackFour} weight="fill" />
                </Icon>
                <Icon align="right" onClick={handleVisibleConfirmePassword}>
                    {visibleConfirmPassword ? (
                        <Eye size={24} color={pallete.turquoiseOne} weight="fill" />
                    ) : (
                        <EyeSlash size={24} color={pallete.turquoiseOne} weight="fill" />
                    )}
                </Icon>
                <label htmlFor="password_confirmatiopn"></label>
                <input 
                    title="deve conter ao menos um número, uma letra maiúscula e minúscula e deve conter pelo menos 8 caracteres"
                    type={visibleConfirmPassword ? "text" : "password"} 
                    id="password_confirmatiopn"
                    name="password_confirmatiopn"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    placeholder="Confirme sua senha"
                    onChange={(event) => setNewUser({...newUser, password_confirmation: event.target.value})}
                    required
                />
            </InputContainer>
            <CheckBoxConfirm>
                <CheckBoxArea>
                    <input 
                        title="Checkbox para registro de fotógrafo" 
                        type="checkbox" 
                        id="photographer" 
                        name="photographer" 
                        checked={isPhotographer}
                        onChange={() => {
                            setIsPhotographer(!isPhotographer); 
                            setNewUser({...newUser, photographer: isPhotographer})
                        }}
                    />
                    <label htmlFor="photographer">Sou fotógrafo</label>
                </CheckBoxArea>
                <Panel active={isPhotographer}>
                    <InputContainer>
                        <Icon align="left">
                            <BagSimple size={24} color={pallete.blackFour} weight="fill" />
                        </Icon>
                        <Icon align="right">
                            <CaretDown size={24} weight="fill" style={{cursor: "auto"}} />
                        </Icon>
                        <label htmlFor="especializations"></label>
                        <select 
                            id="especializations"
                            name="especializations"
                            placeholder="Especialização"
                            onChange={(event) => setNewUser({...newUser, specialization: event.target.value})}
                            required={isPhotographer ? true : false}
                        >
                            {specializationOptions.map((specialization, index) => (
                                index > 0 && <option key={specialization.name} value={specialization.name}>{specialization.name}</option>
                            ))}
                        </select>
                    </InputContainer>
                    <InputFlex>
                        <InputContainer>
                            <Icon align="left">
                                <Buildings size={24} color={pallete.blackFour} weight="fill" />
                            </Icon>
                            <label htmlFor="city"></label>
                            <input 
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Cidade"
                                onChange={(event) => setNewUser({...newUser, city: event.target.value})}
                                required={isPhotographer ? true : false}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Icon align="left">
                                <Buildings size={24} color={pallete.blackFour} weight="fill" />
                            </Icon>
                            <label htmlFor="state"></label>
                            <input 
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Estado"
                                onChange={(event) => setNewUser({...newUser, state: event.target.value})}
                                required={isPhotographer ? true : false}
                            />
                        </InputContainer>
                    </InputFlex>
                </Panel>
            </CheckBoxConfirm>
            <Button>Cadastrar</Button>
        </FormBody>
    )
}