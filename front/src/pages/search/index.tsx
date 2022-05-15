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
     SearchPhotographerContainer, 
     PriceRangeContainer
} from "./styles";
import Logo from "../../assets/logo.svg";
import { SelectInput } from "../../components/SelectInput";
import { useState } from "react";
import { PhotographerCard } from "../../components/PhotographerCard";

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
                        <SelectInput name="Especialização" selectName="Especialização"/>
                        <SelectInput name="Ordenar por" selectName="Ordenação por:"/>
                        <PriceRangeContainer>
                            <PriceRange>Faixa de preço:</PriceRange>
                            <label htmlFor="minPrice"></label>
                            <GenericInput type="number" id="minPrice" name="minPrice" placeholder="Mínimo"/>
                            <Divider/>
                            <label htmlFor="maxPrice"></label>
                            <GenericInput type="number" id="maxPrice" name="maxPrice" placeholder="Máximo"/>
                        </PriceRangeContainer>
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
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                    <PhotographerCard/>
                </PhotographersList>
            </SearchPhotographerContainer>
        </Container>
    )
}
