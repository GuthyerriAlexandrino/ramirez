import { FormEvent, useEffect, useRef, useState } from "react";
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
    IconEdit,
    IconExclude,
    InputFlex,
    ModalChangeImage,
    ModalChangeImageContainer,
    Panel,
    ProfileBasicInfo,
    ProfileData,
    ProfileImage,
    ProfileProfessionalData,
    Signal,
    SpecializationTags,
    UpdateImage
} from "./style";

import { Icon, InputContainer } from "../../styles/form";
import { 
    BagSimple, 
    Buildings, 
    Camera, 
    CurrencyCircleDollar,
    Eye,
    EyeSlash,
    FilePlus,
    Key,
    Minus,
    Plus,
    User,
    XCircle 
} from "phosphor-react";
import Email from "../../assets/email.svg";
import { pallete } from "../../styles/colors";
import { makeFadeInRightAnimation, variants, variantsItems } from "../../utils/animations";
import { motion } from "framer-motion";
import { useAuthLogin } from "../../context/AuthContext";
import { useNotify } from "../../context/NotifyContext";
import { useRouter } from "next/router";

type User = {
    _id?: {
        $oid: string;
    },
    bio: string,
    city: string;
    email: string;
    name: string;
    profile_img?: string;
    password: string;
    password_confirmation: string;
    photographer: boolean
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

    const data: User = await fetch(`http://localhost:3001/user/${id}`, {
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
        password: data.password ?? null,
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

    const router = useRouter();

    let cookies = parseCookies();
    let userSectionId = cookies["ramirez-user-id"]

    const {
        userProfileImage
    } = useAuthLogin();

    const {
        notifyError,
        notifySuccess
    } = useNotify();

    const [hasInfoChanged, setHasInfoChanged] = useState(false);
    const [editImageFormIsActive, setEditImageFormIsActive] = useState(false);
    const [photoImageContent, setPhotoImageContent] = useState<File>();
    const [specializationOptions, setSpecializationOptions] = useState<Specialization[]>([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(user.specialization ? user.specialization : []);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const [isPhotographer, setIsPhotographer] = useState(user.photographer);
    const [minusValue, setMinusValue] = useState(user.services_price?.length > 0 ? user.services_price[0] : 0);
    const [maxValue, setMaxValue] = useState(user.services_price?.length > 0 ? user.services_price[1] : 0);
    const [editedUser, setEditedUser] = useState<User>({
        bio: user.bio,
        city: user.city,
        state: user.state,
        email: user.email,
        name: user.name,
        profile_img: user.profile_img,
        password: "",
        password_confirmation: "",
        photographer: isPhotographer,
        specialization: [],
        services_price: user.services_price?.length > 0 ? user.services_price : [0, 0],
    } as User);

    function verifyIfPhotographerHasImage() {
        if (userProfileImage) {
            return userProfileImage
        }
        return "/default-user.png"
    }

    useEffect(() => {
        if (hasInfoChanged) {
            setHasInfoChanged(false)
            router.push(`/editProfile/${userSectionId}`)
        }
    }, [hasInfoChanged, router, userSectionId])

    useEffect(() => {
        async function getAllSpecializations() {
            const data = await fetch("http://localhost:3001/specializations", {
                method: "GET"
            }).then(response => response.json());
            setSpecializationOptions(data)
        }
        getAllSpecializations();
    }, [])

    async function updatePhotographerImage() {

        let cookies = parseCookies();
        let token = cookies["ramirez-user"]

        const newProfileImage = new FormData();
        newProfileImage.append("image", photoImageContent!);

        const res = await fetch(`http://localhost:3001/user/profile_image`, {
            method: "PUT",
            headers:{
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${token}`
            },
            body: newProfileImage
        }).then(response => response)
        .catch(error => error)

        if (res.error) {
            notifyError("Não foi possível atualizar foto. Tente novamente!")
            return;
        }
        setEditedUser({...editedUser, profile_img: res})
        notifyError("Foto atualizada com sucesso")
        setHasInfoChanged(true)
    }

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
                state: editedUser.state,
            }
        }
        
        const res= await fetch(`http://localhost:3001/users/${userSectionId}`, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(modifiedUserToEdit)
        }).then(result => result.json())
        .catch(error => error.json())

        if (res.error) {
            notifyError("Não foi possível atualizar as informações. Verifique os campos!")
            return;
        }
        notifySuccess("Informações atualizadas!")
        setHasInfoChanged(true)
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

        if (specialization.toLowerCase() === "nenhum") {
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
        if (selectedSpecializations?.length > 3) {
            return signalColors[2].color
        }

        return signalColors[selectedSpecializations?.length].color;
    }

    return (
        <Container
            initial='initial' 
            animate='animate' 
        >
            <Header userId={userSectionId}/>
            <ModalChangeImageContainer isActive={editImageFormIsActive}>
                <ModalChangeImage>
                    <div data-name="photoEditImage">
                        <Image
                            src={photoImageContent ? URL.createObjectURL(photoImageContent!) : verifyIfPhotographerHasImage()} 
                            objectFit="cover"
                            width={100} 
                            height={100}
                            alt={"Foto de perfil"}
                        />
                        <IconEdit>
                            <FilePlus size={15} weight="bold" />
                        </IconEdit>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            placeholder="Insira aqui uma foto"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => e.target.files && setPhotoImageContent(e.target.files[0]!)}
                        />
                    </div>
                    <div data-name="photoImageContent">
                        <strong>{user.name}</strong>
                    </div>
                    <small data-name="photoImageSpan">Personalizando meu perfil</small>
                    <button 
                        type="button" 
                        onClick={() => updatePhotographerImage()}
                    >
                        Alterar foto
                    </button>
                    <IconExclude onClick={() => setEditImageFormIsActive(false)}>
                        <XCircle color={pallete.red} size={40} weight="fill" />
                    </IconExclude>
                </ModalChangeImage>
            </ModalChangeImageContainer>
            <EditFormContainer variants={makeFadeInRightAnimation()}>
                <EditForm onSubmit={editPhotographerData}>
                    <ProfileBasicInfo>
                        <ProfileImage onClick={() => setEditImageFormIsActive(true)}>
                            <Image 
                                src={verifyIfPhotographerHasImage()} 
                                objectFit="cover"
                                width={150} 
                                height={150}
                                alt={"Foto de perfil"}
                            />
                            <UpdateImage>
                                <Camera color={pallete.grayThree} size={30} weight="fill" />
                            </UpdateImage>
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
                                type={visiblePassword ? "text" : "password"} 
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
                                type={visibleConfirmPassword ? "text" : "password"} 
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
                                disabled={user.photographer ? true : false}
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
                                    maxLength={1000}
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
                                    Especializações {selectedSpecializations ? selectedSpecializations.length : "0" }/3
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
