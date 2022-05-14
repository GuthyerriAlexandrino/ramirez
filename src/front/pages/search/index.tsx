import Image from "next/image";
import { 
    AditionalInputs,
     Container,
     Divider,
     Header,
     InputContainer,
     InputName,
     LocationAccordion,
     MenuContainer,
     PhotographersList,
     GenericInput,
     PriceRange,
     SearchButton,
     SearchInputContainer, 
     SearchPhotographerContainer 
} from "./styles";
import Logo from "../../assets/logo.svg";
import { SelectInput } from "../../components/SelectInput";
import { useState } from "react";

export default function Search() {

    const [isLocationActive, setIsLocationActive] = useState(false);

    return (
        <Container>
            <Header>
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
            </Header>
            <SearchPhotographerContainer>
                <h1>Pesquisa por algum fotógrafo</h1>
                <SearchInputContainer>
                    <div>
                        <InputName type="text" placeholder="Digite aqui o nome de um fotógrafo" required/>
                        <SearchButton>Pesquisar</SearchButton>
                    </div>
                    <AditionalInputs>
                        <SelectInput name="Especialização"/>
                        <SelectInput name="Ordenar por"/>
                        <PriceRange>Faixa de preço:</PriceRange>
                        <GenericInput type="number" id="price" name="price" placeholder="Mínimo"/>
                        <Divider/>
                        <GenericInput type="number" id="price" name="price" placeholder="Máximo"/>
                        <LocationAccordion isActive={isLocationActive}>
                            <label htmlFor="location" onClick={() => setIsLocationActive(!isLocationActive)}>
                                <div></div>
                                Local
                            </label>
                            <div>
                                <GenericInput type="text" id="location" name="location" placeholder="Quixadá"/>
                            </div>
                        </LocationAccordion>
                    </AditionalInputs>
                </SearchInputContainer>
                <PhotographersList>
                    {/* <PhotographerCard/> */}
                </PhotographersList>
            </SearchPhotographerContainer>
        </Container>
    )
}