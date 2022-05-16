import Image from "next/image";
import { 
    AditionalInputs,
     Container,
     Divider,
     InputName,
     LocationAccordion,
     PhotographersList,
     GenericInput,
     PriceRange,
     SearchButton,
     SearchInputContainer, 
     SearchPhotographerContainer, 
     PriceRangeContainer
} from "./styles";
import { SelectInput } from "../../components/SelectInput";
import { useState } from "react";
import { PhotographerCard } from "../../components/PhotographerCard";
import { Header } from "../../components/Header";

export default function Search() {

    const [isLocationActive, setIsLocationActive] = useState(false);

    return (
        <Container>
            <Header/>
            <SearchPhotographerContainer>
                <h1>Pesquisa por algum fotógrafo</h1>
                <SearchInputContainer>
                    <div>
                        <InputName type="text" placeholder="Digite aqui o nome de um fotógrafo" required/>
                        <SearchButton>Pesquisar</SearchButton>
                    </div>
                    <AditionalInputs>
                        <SelectInput selectName="Especialização"/>
                        <SelectInput selectName="Ordenação por:"/>
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
