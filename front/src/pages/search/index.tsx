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
import { useEffect, useState } from "react";
import { PhotographerCard } from "../../components/PhotographerCard";
import { Header } from "../../components/Header";

export type User = {
    _id: {
        "$oid": string;
    },
    name: string;
    city: string;
    state: string;
    specialization: string;
}

export default function Search() {

    const [isLocationActive, setIsLocationActive] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function getUsers() {
            const data = await fetch("http://localhost:3001/users", {
                headers:{
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(res => res.json());
            setUsers(data);
        } 
        getUsers();
    }, [])

    console.log(users)

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
                    {users.map(user => (
                        <PhotographerCard key={user._id.$oid} user={user}/>
                    ))}
                </PhotographersList>
            </SearchPhotographerContainer>
        </Container>
    )
}
