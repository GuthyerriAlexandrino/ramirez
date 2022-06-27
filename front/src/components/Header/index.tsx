import Image from "next/image";
import { HeaderContainer, MenuContainer } from "./style";
import Logo from "../../assets/logo.svg";
import Link from "next/link";

interface HeaderProps {
    userId: string;
}

export function Header({userId}: HeaderProps) {
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
                            <a>Ajuda</a>
                        </li>
                        <li>
                            <Link href={`/profile/photographer/${userId}`}>
                                <Image
                                    src={"/default-user.png"}
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