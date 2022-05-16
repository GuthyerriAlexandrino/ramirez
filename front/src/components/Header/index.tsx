import Image from "next/image";
import { HeaderContainer, MenuContainer } from "./style";
import Logo from "../../assets/logo.svg";

export function Header() {
    return (
        <HeaderContainer>
            <div>
                <Image 
                    src={Logo} 
                    width="123px" 
                    height="40px" 
                    style={{marginLeft: "20px"}} 
                />
                <MenuContainer>
                    <ul>
                        <li>
                            <a>Ajuda</a>
                        </li>
                        <li>
                            <a>Perfil</a>
                        </li>
                    </ul>
                </MenuContainer>
            </div>
        </HeaderContainer>
    )
}