import Image from "next/image";
import { HeaderContainer, MenuContainer } from "./style";
import Logo from "../../assets/logo.svg";
import Link from "next/link";
import { useAuthLogin } from "../../context/AuthContext";
import { useEffect } from "react";

interface HeaderProps {
    userId: string;
}

export function Header({userId}: HeaderProps) {

    const {
        userProfileImage,
        getProfileImage,
        removeToken
    } = useAuthLogin();


    useEffect(() => {
        getProfileImage();
    }, [])

    return (
        <HeaderContainer>
            <div>
                {/* eslint-disable-next-line @next/next/link-passhref */}
                <Link href="/">
                    <Image 
                        src={Logo} 
                        width="123px" 
                        height="40px" 
                        style={{marginLeft: "20px", cursor: "pointer"}}
                        alt="logo"
                    />
                </Link>
                <MenuContainer>
                    <ul>
                        <li>
                            <Link href={"/search"}>
                                <span>Pesquisar</span>
                            </Link>
                        </li>
                        <li onClick={() => removeToken()}>
                            <Link href={"/login"}>
                                <span>Sair</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/profile/photographer/${userId}`}>
                                <Image
                                    src={userProfileImage ? userProfileImage : "/default-user.png"}
                                    layout="fill"
                                    objectFit="cover"
                                    width={45}
                                    height={45}
                                    alt={"Foto de perfil"}
                                />
                            </Link>
                        </li>
                    </ul>
                </MenuContainer>
            </div>
        </HeaderContainer>
    )
}