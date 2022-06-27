import { FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { parseCookies } from "nookies";
import { Header } from "../../components/Header";
import { 
    Button,
    CheckBoxArea,
    Container,
    EditForm,
    EditFormContainer,
    InputFlex,
    Panel,
    ProfileBasicInfo,
    ProfileData,
    ProfileImage,
    ProfileProfessionalData,
    Signal,
    SpecializationTags
} from "./style";

import Profile from "../../assets/profile.jpg";
import { Icon, InputContainer } from "../../styles/form";
import { 
    BagSimple, 
    Buildings, 
    CurrencyCircleDollar,
    Eye,
    EyeSlash,
    Key,
    Minus,
    Plus,
    User,
    XCircle 
} from "phosphor-react";
import Email from "../../assets/email.svg";
import { pallete } from "../../styles/colors";
import { makeFadeInRightAnimation } from "../../utils/animations";
import { motion } from "framer-motion";
import { useAuthLogin } from "../../context/AuthContext";

type User = {
    _id?: {
        $oid: string;
    },
    bio: string,
    city: string;
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
    photographer: boolean
    profile_img: string,
    services_price: number[],
    specialization: string[];
    state: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const { ["ramirez-user"]: token } = parseCookies(context);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const data: User = await fetch(`http://localhost:3001/users/${id}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    const user = {
        _id: data._id ?? null,
        bio: data.bio ?? null,
        city: data.city ?? null,
        email: data.email ?? null,
        name: data.name ?? null,
        photographer: data.photographer ?? null,
        profile_img: data.profile_img ?? null,
        services_price: data.services_price ?? null,
        specialization: data.specialization ?? null,
        state: data.state ?? null,
    }

    return {
        props: {
            user,
        },
    }
}

interface PhotographerProps {
    user: User;
}

interface Specialization {
    name: string;
}

const signalColors = [
    {color: pallete.green},
    {color: pallete.green},
    {color: pallete.yellow},
    {color: pallete.red},
]

export default function EditProfile({user}: PhotographerProps) {

    const [specializationOptions, setSpecializationOptions] = useState<Specialization[]>([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(user.specialization);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const [isPhotographer, setIsPhotographer] = useState(user.photographer);
    const [minusValue, setMinusValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [editedUser, setEditedUser] = useState<User>({
        bio: "",
        email: "",
        city: "",
        name: "",
        password: "",
        password_confirmation: "",
        photographer: false,
        profile_img: "",
        specialization: [],
        services_price: [0, 0],
        state: ""
    } as User);

    const {
        userSectionId
    } = useAuthLogin();


    useEffect(() => {
        async function getAllSpecializations() {
            const data = await fetch("http://localhost:3001/specializations", {
                method: "GET"
            }).then(response => response.json());
            setSpecializationOptions(data)
        }
        getAllSpecializations();
    }, [])

    async function editPhotographerData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let cookies = parseCookies();
        let token = cookies["ramirez-user"]

        const modifiedUserToEdit = {
            user: {
                bio: editedUser.bio,
                city: editedUser.city,
                specialization: editedUser.specialization,
                services_price: [minusValue, maxValue],
                name: editedUser.name,
                email: editedUser.email,
                password: editedUser.password,
                password_confirmation: editedUser.password_confirmation,
                photographer: editedUser.photographer,
                profile_img: editedUser.profile_img,
                state: editedUser.state,
            }
        }

        const res= await fetch(`http://localhost:3001/users/${user?._id?.$oid!}`, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(modifiedUserToEdit)
        })

        console.log(res)
    }
    
    function handleVisiblePassword() {
        setVisiblePassword(!visiblePassword);
    }

    function handleVisibleConfirmePassword() {
        setVisibleConfirmPassword(!visibleConfirmPassword);
    }

    function minusValueChange(value: number) {
        if (value < 0) {
            setMinusValue((minusValue - 1) < 0 ? 0 : minusValue - 1);
            return;
        }
        setMinusValue(minusValue + 1)
    }

    function maxValueChange(value: number) {
        if (value < 0) {
            setMaxValue((maxValue - 1) < 0 ? 0 : maxValue - 1);
            return;
        }
        setMaxValue(maxValue + 1)
    }

    function addNewSpecialization(specialization: string) {
        if (selectedSpecializations.length >= 3) {
            return;
        }
        setSelectedSpecializations([...selectedSpecializations, specialization])
        setEditedUser({...editedUser, specialization: [...selectedSpecializations, specialization]})
    }

    function removeSpecializationTag(specialization: string) {
        let index = selectedSpecializations.indexOf(specialization);
        if (index > -1) {
            setSelectedSpecializations(selectedSpecializations.filter((el, elIndex)=> elIndex !== index));
            setEditedUser({...editedUser, specialization: editedUser.specialization.filter((el, elIndex) => elIndex !== index)})
        }
    }

    function selectSignalColors(): string {
        if (selectedSpecializations.length > 3) {
            return signalColors[2].color
        }

        return signalColors[selectedSpecializations.length].color;
    }

    const variants = {
        animate: {
          transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        },
    };

    const variantsItems = {
        initial: {
            x: 60,
            opacity: 0,
            transition: {
                x: { stiffness: 1000, velocity: -100 }
            }
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                x: { stiffness: 1000, velocity: -100 }
            }
        }
    };

    return (
        <Container
            initial='initial' 
            animate='animate' 
        >
            <Header userId={userSectionId}/>
            <EditFormContainer variants={makeFadeInRightAnimation()}>
                <EditForm onSubmit={editPhotographerData}>
                    <ProfileBasicInfo>
                        <ProfileImage>
                            <Image 
                                src={Profile} 
                                objectFit="cover"
                                width={150} 
                                height={150}
                                alt={"Foto de perfil"}
                            />
                        </ProfileImage>
                        <h2>{user.name}</h2>
                    </ProfileBasicInfo>
                    <ProfileData variants={variants}>
                        <InputContainer variants={makeFadeInRightAnimation()}>
                            <Icon align="left">
                                <User size={24} color={pallete.blackFour} weight="fill" />
                            </Icon>
                            <label htmlFor="name"></label>
                            <input 
                                id="name" 
                                name="name" 
                                type="text" 
                                defaultValue={user.name}
                                placeholder="Nome" 
                                onChange={(event) => setEditedUser({...editedUser, name: event.target.value})}
                            />
                        </InputContainer>
                        <InputContainer variants={variantsItems}>
                            <Icon align="left">
                                <Image src={Email} width={24} height={24} alt="ícone de email"/>
                            </Icon>
                            <label htmlFor="email"></label>
                            <input 
                                id="email" 
                                name="email" 
                                type="text"
                                defaultValue={user.email} 
                                placeholder="E-mail" 
                                onChange={(event) => setEditedUser({...editedUser, email: event.target.value})}
                            />
                        </InputContainer>
                        <InputContainer variants={variantsItems}>
                            <Icon align="left">
                                <Key size={24} color={pallete.blackFour} weight="fill" />
                            </Icon>
                            <Icon align="right" onClick={handleVisiblePassword} valuePosition={10}>
                                {visiblePassword ? (
                                    <Eye size={24} color={pallete.turquoiseOne} weight="fill" />
                                ) : (
                                    <EyeSlash size={24} color={pallete.turquoiseOne} weight="fill" />
                                )}
                            </Icon>
                            <label htmlFor="password"></label>
                            <input 
                                id="password" 
                                name="password"
                                type="text" 
                                placeholder="Senha"  
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                onChange={(event) => setEditedUser({...editedUser, password: event.target.value})}
                            />
                        </InputContainer>
                        <InputContainer variants={variantsItems}>
                            <Icon align="left">
                                <Key size={24} color={pallete.blackFour} weight="fill" />
                            </Icon>
                            <Icon align="right" onClick={handleVisibleConfirmePassword} valuePosition={10}>
                                {visibleConfirmPassword ? (
                                    <Eye size={24} color={pallete.turquoiseOne} weight="fill" />
                                ) : (
                                    <EyeSlash size={24} color={pallete.turquoiseOne} weight="fill" />
                                )}
                            </Icon>
                            <label htmlFor="confirm_password"></label>
                            <input 
                                id="confirm_password"
                                name="confirm_password"
                                type="text" 
                                placeholder="Confirmação de senha"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                onChange={(event) => setEditedUser({...editedUser, password_confirmation: event.target.value})}
                            />
                        </InputContainer>
                    </ProfileData>
                    <ProfileProfessionalData>
                        <CheckBoxArea>
                            <input 
                                title="Checkbox para registro de fotógrafo" 
                                type="checkbox" 
                                id="photographer" 
                                name="photographer" 
                                checked={isPhotographer}
                                onChange={() => {
                                    setIsPhotographer(!isPhotographer); 
                                    setEditedUser({...editedUser, photographer: !isPhotographer})
                                }}
                            />
                            <label htmlFor="photographer">Quero ser fotógrafo</label>
                        </CheckBoxArea>
                        <Panel active={isPhotographer} animate={isPhotographer ? "animate": ""} >
                            <InputContainer variants={variantsItems}>
                                <label htmlFor="about"></label>
                                <textarea 
                                    id="about"
                                    name="about" 
                                    defaultValue={user.bio}
                                    placeholder="Escreva sobre você..."
                                    cols={50}
                                    minLength={0}
                                    maxLength={3000}
                                    onChange={(event) => setEditedUser({...editedUser, bio: event.target.value})} 
                                />
                            </InputContainer>
                            <InputContainer isSelect variants={variantsItems}>
                                <Icon align="left">
                                    <BagSimple size={24} color={pallete.blackFour} weight="fill" />
                                </Icon>
                                <label htmlFor="especializations"></label>
                                <select 
                                    id="especializations"
                                    name="especializations"
                                    placeholder="Especialização"
                                    defaultValue="Especialização"
                                    onChange={(event) => addNewSpecialization(event.target.value)}
                                    required={isPhotographer ? true : false}
                                >
                                    {specializationOptions.map((specialization) => (
                                        <option key={specialization.name} value={specialization.name}>{specialization.name}</option>
                                    ))}
                                </select>
                            </InputContainer>
                            <SpecializationTags variants={variants}>
                                <legend>
                                    Especializações {selectedSpecializations.length}/3
                                    <Signal color={selectSignalColors()}/>
                                </legend>
                                {selectedSpecializations.map((specialization) => (
                                    <motion.li
                                        variants={variants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={specialization} 
                                        onClick={() => removeSpecializationTag(specialization)}
                                    >
                                        <span>{specialization}</span>
                                        <XCircle size={20} weight="fill" />
                                    </motion.li>
                                ))}
                            </SpecializationTags>
                            <div>
                                <InputContainer variants={variantsItems}>
                                    <Icon align="left">
                                        <CurrencyCircleDollar size={24} color={pallete.blackFour} weight="fill" />
                                    </Icon>
                                    <Icon 
                                        align="right" 
                                        title="Valor mínimo"
                                        data-title="minus"
                                        valuePosition={40}
                                        onClick={() => minusValueChange(-1)}
                                    >
                                        <Minus 
                                            size={24} 
                                            color={pallete.red} 
                                            weight="bold" 
                                        />
                                    </Icon>
                                    <Icon 
                                        align="right" 
                                        title="Valor máximo"
                                        data-title="plus"
                                        valuePosition={10}
                                        onClick={() => minusValueChange(1)}
                                    >
                                        <Plus 
                                            size={24} 
                                            color={pallete.green} 
                                            weight="bold" 
                                        />
                                    </Icon>
                                    <label htmlFor="min_value"></label>
                                    <input 
                                        id="min_value" 
                                        name="min_value" 
                                        type={"number"}
                                        value={minusValue === 0 ? "" : minusValue}
                                        onChange={(event) => setMinusValue(Number(event.target.value))}
                                        placeholder="Valor mínimo"
                                        min={0}
                                    />
                                </InputContainer>
                                <InputContainer variants={variantsItems}>
                                    <Icon align="left">
                                        <CurrencyCircleDollar size={24} color={pallete.blackFour} weight="fill" />
                                    </Icon>
                                    <Icon 
                                        align="right" 
                                        title="Valor mínimo"
                                        data-title="minus"
                                        valuePosition={40}
                                        onClick={() => maxValueChange(-1)}
                                    >
                                        <Minus 
                                            size={24} 
                                            color={pallete.red} 
                                            weight="bold" 
                                        />
                                    </Icon>
                                    <Icon 
                                        align="right" 
                                        title="Valor máximo"
                                        data-title="plus"
                                        valuePosition={10}
                                        onClick={() => maxValueChange(1)}
                                    >
                                        <Plus 
                                            size={24} 
                                            color={pallete.green} 
                                            weight="bold" 
                                        />
                                    </Icon>
                                    <label htmlFor="max_value"></label>
                                    <input 
                                        id="max_value" 
                                        name="max_value" 
                                        type={"number"} 
                                        value={maxValue === 0 ? "" : maxValue}
                                        onChange={(event) => setMaxValue(Number(event.target.value))}
                                        placeholder="Valor máximo"
                                        min={0}
                                    />
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
                                            defaultValue={user.city}
                                            placeholder="Cidade"
                                            onChange={(event) => setEditedUser({...editedUser, city: event.target.value})}
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
                                            defaultValue={user.state}
                                            placeholder="Estado"
                                            onChange={(event) => setEditedUser({...editedUser, state: event.target.value})}
                                            required={isPhotographer ? true : false}
                                        />
                                    </InputContainer>
                                </InputFlex>
                            </div>
                        </Panel>
                    </ProfileProfessionalData>
                    <Button type="submit">Confirmar</Button>
                </EditForm>
            </EditFormContainer>
        </Container>
    )
}
